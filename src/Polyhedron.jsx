import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export const Polyhedron = ({ polyhedron, color, ...props }) => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  console.log(polyhedron);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}>
      <meshBasicMaterial color={color} wireframe />
      <axesHelper />
    </mesh>
  );
};
