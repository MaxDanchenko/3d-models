// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

type Props = {
  position?: [number, number, number],
  rotation?: [number, number, number],
  scale?: [number, number, number],
}

const Hort = ({ position, rotation, scale }: Props): JSX.Element => {
  const { scene, animations } = useGLTF('/assets/hort.glb');
  const { actions } = useAnimations(animations, scene);
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (animations.length >= 2) {
      const action0 = actions?.[animations[0]?.name];
      const action1 = actions?.[animations[1]?.name];

      if (playAnimation && action0 && action1) {
        action0.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        action1.reset().setLoop(THREE.LoopRepeat, Infinity).play();
      }

      return () => {
        action0?.stop();
        action1?.stop();
      };
    }
  }, [actions, animations, playAnimation]);

  const handleClick = () => setPlayAnimation(!playAnimation);

  return <primitive scale={scale}
                    onClick={handleClick}
                    object={scene}
                    position={position}
                    rotation={rotation} />;
};

export default Hort;
