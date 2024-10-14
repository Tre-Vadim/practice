import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const Box = (props) => {
  const ref = useRef(null);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      onPointerDown={(event) => console.log('event', event)}
      onPointerOver={(event) => console.log('event - over', event)}
      onPointerOut={(event) => console.log('event - out', event)}
      onUpdate={(self) => console.log('self', self)}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  );
};
