import { Canvas } from '@react-three/fiber';
import Medusa from './components/Medusa.tsx';
import Chicken from './components/Chicken.tsx';

type Props = {
  killDusa: boolean
  chickenAttack: boolean
}

const CanvasComponent = ({killDusa, chickenAttack}: Props) => {

  return (
    <Canvas
      camera={{
        position: [0, 18, 22],
        fov: 50,
        rotation: [-0.7, 0, 0],
      }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={3} />

      <Medusa killDusa={killDusa} rotation={[-0.7, -1.5, 0]} position={[6, 8, 15]} scale={[0.02, 0.02, 0.02]}  />
      <Chicken chickenAttack={chickenAttack} rotation={[-0.7, 1.7, 0]} position={[-12, 0, 10]} scale={[4.5, 4.5, 4.5]}  />
    </Canvas>
  );
};

export default CanvasComponent;