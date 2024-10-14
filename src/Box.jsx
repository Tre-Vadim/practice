import { useRef } from 'react';

export const Box = (props) => {
  const instanceRef = useRef(null);
  const materialRef = useRef(null);
  console.log('instanceRef', instanceRef);
  console.log('materialRef', materialRef);
  return (
    <mesh ref={instanceRef} {...props}>
      <boxGeometry />
      <meshBasicMaterial ref={materialRef} color={0x00ff00} wireframe />
    </mesh>
  );
};
