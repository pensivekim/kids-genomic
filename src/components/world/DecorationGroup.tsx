import { useMemo } from 'react';

const TREE_POSITIONS: [number, number, number][] = [
  [-12, 0, -12], [-10, 0, -14], [-14, 0, -8], [-16, 0, -4],
  [-15, 0, 2],   [-13, 0, 8],   [-12, 0, 13], [-8, 0, 15],
  [-3, 0, 16],   [3, 0, 16],    [8, 0, 15],   [12, 0, 13],
  [14, 0, 8],    [15, 0, 2],    [16, 0, -4],  [14, 0, -8],
  [12, 0, -12],  [8, 0, -14],   [3, 0, -15],  [-3, 0, -15],
  [-9, 0, -10],  [9, 0, -10],   [11, 0, 0],   [-11, 0, 0],
  [-9, 0, 10],   [9, 0, 10],    [0, 0, -14],  [-6, 0, -13],
  [6, 0, -13],   [0, 0, 14],
];

const CLOUD_POSITIONS: [number, number, number][] = [
  [-8, 8, -10], [4, 9, -12], [10, 7, -6], [-5, 10, 2], [7, 8, 5],
];

function Tree({ position }: { position: [number, number, number] }) {
  const scale = 0.7 + Math.random() * 0.5;
  return (
    <group position={position}>
      {/* 줄기 */}
      <mesh position={[0, scale * 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, scale, 6]} />
        <meshToonMaterial color="#92400e" />
      </mesh>
      {/* 잎 */}
      <mesh position={[0, scale * 1.3, 0]}>
        <coneGeometry args={[scale * 0.5, scale * 1.0, 6]} />
        <meshToonMaterial color="#16a34a" />
      </mesh>
      <mesh position={[0, scale * 1.8, 0]}>
        <coneGeometry args={[scale * 0.35, scale * 0.7, 6]} />
        <meshToonMaterial color="#15803d" />
      </mesh>
    </group>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[1.2, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
      <mesh position={[-1.0, 0, 0]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
    </group>
  );
}

export default function DecorationGroup() {
  // 랜덤 scale이 매 렌더마다 바뀌지 않도록 고정
  const trees = useMemo(() => TREE_POSITIONS, []);

  return (
    <group>
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
      {CLOUD_POSITIONS.map((pos, i) => (
        <Cloud key={i} position={pos} />
      ))}
    </group>
  );
}
