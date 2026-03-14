import { useRef } from 'react';
import { Mesh } from 'three';

export default function Terrain() {
  const ref = useRef<Mesh>(null!);

  return (
    <group>
      {/* 잔디 바닥 */}
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshToonMaterial color="#86efac" />
      </mesh>

      {/* 중앙 광장 (돌판) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[2.5, 12]} />
        <meshToonMaterial color="#d6d3d1" />
      </mesh>

      {/* 중앙 분수대 */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.8, 1.0, 0.6, 12]} />
        <meshToonMaterial color="#bae6fd" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshToonMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}
