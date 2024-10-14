import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const Box = (props) => {
  const ref = useRef(null);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  );
};
