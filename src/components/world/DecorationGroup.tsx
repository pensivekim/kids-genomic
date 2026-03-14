import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

const TREE_DATA: { pos: [number, number, number]; scale: number }[] = [
  { pos: [-12, 0, -12], scale: 1.0 }, { pos: [-10, 0, -14], scale: 0.8 },
  { pos: [-14, 0, -8],  scale: 1.2 }, { pos: [-16, 0, -4],  scale: 0.9 },
  { pos: [-15, 0, 2],   scale: 1.1 }, { pos: [-13, 0, 8],   scale: 0.75 },
  { pos: [-12, 0, 13],  scale: 1.0 }, { pos: [-8, 0, 15],   scale: 0.85 },
  { pos: [-3, 0, 16],   scale: 1.15 },{ pos: [3, 0, 16],    scale: 0.9 },
  { pos: [8, 0, 15],    scale: 1.0 }, { pos: [12, 0, 13],   scale: 0.8 },
  { pos: [14, 0, 8],    scale: 1.2 }, { pos: [15, 0, 2],    scale: 0.95 },
  { pos: [16, 0, -4],   scale: 1.0 }, { pos: [14, 0, -8],   scale: 0.85 },
  { pos: [12, 0, -12],  scale: 1.1 }, { pos: [8, 0, -14],   scale: 0.9 },
  { pos: [3, 0, -15],   scale: 0.8 }, { pos: [-3, 0, -15],  scale: 1.0 },
  { pos: [-9, 0, -10],  scale: 1.15 },{ pos: [9, 0, -10],   scale: 0.75 },
  { pos: [11, 0, 0],    scale: 1.0 }, { pos: [-11, 0, 0],   scale: 0.9 },
  { pos: [-9, 0, 10],   scale: 1.05 },{ pos: [9, 0, 10],    scale: 0.85 },
  { pos: [0, 0, -14],   scale: 1.0 }, { pos: [-6, 0, -13],  scale: 0.9 },
  { pos: [6, 0, -13],   scale: 1.1 }, { pos: [0, 0, 14],    scale: 0.95 },
];

const CLOUD_DATA: { pos: [number, number, number]; speed: number; range: number }[] = [
  { pos: [-8, 14, -10], speed: 0.4, range: 30 },
  { pos: [4,  16, -12], speed: 0.25, range: 28 },
  { pos: [10, 13, -6],  speed: 0.35, range: 32 },
];

function Tree({ pos, scale }: { pos: [number, number, number]; scale: number }) {
  return (
    <group position={pos}>
      <mesh position={[0, scale * 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, scale, 6]} />
        <meshToonMaterial color="#92400e" />
      </mesh>
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

function AnimatedCloud({ initPos, speed, range }: {
  initPos: [number, number, number];
  speed: number;
  range: number;
}) {
  const ref = useRef<Group>(null!);
  const offset = useRef(initPos[0]); // 현재 X 위치 추적

  useFrame((_, delta) => {
    if (!ref.current) return;
    offset.current += speed * delta;
    // 오른쪽 끝 넘어가면 왼쪽으로 순환
    if (offset.current > range / 2) offset.current -= range;
    ref.current.position.x = offset.current;
    // Y축 살짝 bobbing
    ref.current.position.y = initPos[1] + Math.sin(offset.current * 0.3) * 0.3;
  });

  return (
    <group ref={ref} position={initPos}>
      <mesh>
        <sphereGeometry args={[0.7, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
      <mesh position={[0.75, 0.1, 0]}>
        <sphereGeometry args={[0.55, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
      <mesh position={[-0.65, 0.05, 0]}>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshToonMaterial color="white" />
      </mesh>
    </group>
  );
}

export default function DecorationGroup() {
  const trees = useMemo(() => TREE_DATA, []);

  return (
    <group>
      {trees.map((t, i) => (
        <Tree key={i} pos={t.pos} scale={t.scale} />
      ))}
      {CLOUD_DATA.map((c, i) => (
        <AnimatedCloud key={i} initPos={c.pos} speed={c.speed} range={c.range} />
      ))}
    </group>
  );
}
