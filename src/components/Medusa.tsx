// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

type Props = {
  position?: [number, number, number],
  rotation?: [number, number, number],
  scale?: [number, number, number],
  killDusa?: boolean
}

const Medusa = ({ position, rotation, scale, killDusa }: Props): JSX.Element => {
  const { scene, animations } = useGLTF('/assets/medusa.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const deathAnimation = actions['Golpeada'];
    if (deathAnimation && killDusa) {
      deathAnimation.reset();
      deathAnimation.setLoop(THREE.LoopOnce);
      deathAnimation.clampWhenFinished = true;
      deathAnimation.play();

    }
  }, [actions, killDusa])


  return <primitive scale={scale}
                    object={scene}
                    position={position}
                    rotation={rotation} />;
};

export default Medusa;
