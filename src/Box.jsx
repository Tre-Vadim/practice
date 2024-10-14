export const Box = (props) => (
  <mesh {...props}>
    <boxGeometry />
    <meshBasicMaterial color={0x00ff00} wireframe />
  </mesh>
)
