// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  chickenAttack?: boolean;
};

const Chicken = ({
                   position = [0, 0, 0],
                   rotation,
                   scale,
                   chickenAttack,
                 }: Props): JSX.Element => {
  const { scene, animations } = useGLTF('/assets/chicken.glb');
  const { actions } = useAnimations(animations, scene);
  const chickenRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (actions) {
      const idleAction = actions['RPG_Armed_Idle'];
      const rollAction = actions['RPG_Armed_Roll_Forward'];

      // Play idle animation by default
      if (idleAction) {
        idleAction.reset().play();
      }

      if (chickenAttack && rollAction) {
        // Stop idle animation
        if (idleAction) idleAction.stop();

        // Set roll animation speed to 0.5x
        rollAction.setEffectiveTimeScale(0.5);

        // Play roll animation
        rollAction.reset().play();
        rollAction.setLoop(THREE.LoopOnce, 1);
        rollAction.clampWhenFinished = true;

        // Update position during roll
        const duration = rollAction.getClip().duration / 0.5; // Adjust duration based on speed
        const startTime = performance.now();

        const startPosition = new THREE.Vector3(...position);
        const targetPosition = new THREE.Vector3(-3, 0, 10);

        const animatePosition = () => {
          const elapsed = (performance.now() - startTime) / 1000; // Convert to seconds
          const t = Math.min(elapsed / duration, 1); // Normalize time (0 to 1)

          const currentPosition = startPosition.clone().lerp(targetPosition, t);
          if (chickenRef.current) {
            chickenRef.current.position.copy(currentPosition);
          }

          if (t < 1) {
            requestAnimationFrame(animatePosition);
          }
        };

        animatePosition();

        // After roll animation finishes, play idle animation again
        rollAction.getMixer().addEventListener('finished', (e) => {
          if (e.action === rollAction) {
            rollAction.stop();
            if (idleAction) idleAction.reset().play();
          }
        });
      }
    }
  }, [actions, chickenAttack, position]);

  return (
    <primitive
      ref={chickenRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};

export default Chicken;
