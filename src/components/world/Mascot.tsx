import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function Mascot() {
  const groupRef = useRef<Group>(null!);
  const bodyRef  = useRef<Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // 전체 위아래 bobbing
      groupRef.current.position.y = 0.1 + Math.sin(t * 1.8) * 0.08;
    }
    if (bodyRef.current) {
      // 좌우 살짝 흔들기
      bodyRef.current.rotation.z = Math.sin(t * 1.8) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, -1.2]}>
      <group ref={bodyRef}>
        {/* 몸통 */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.28, 0.32, 0.7, 10]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>

        {/* 머리 */}
        <mesh position={[0, 1.18, 0]}>
          <sphereGeometry args={[0.32, 12, 10]} />
          <meshToonMaterial color="#fde68a" />
        </mesh>

        {/* 눈 (왼) */}
        <mesh position={[-0.11, 1.22, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshToonMaterial color="#1f2937" />
        </mesh>
        {/* 눈 (오) */}
        <mesh position={[0.11, 1.22, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshToonMaterial color="#1f2937" />
        </mesh>

        {/* 볼터치 (왼) */}
        <mesh position={[-0.22, 1.15, 0.22]}>
          <sphereGeometry args={[0.07, 8, 6]} />
          <meshToonMaterial color="#fca5a5" />
        </mesh>
        {/* 볼터치 (오) */}
        <mesh position={[0.22, 1.15, 0.22]}>
          <sphereGeometry args={[0.07, 8, 6]} />
          <meshToonMaterial color="#fca5a5" />
        </mesh>

        {/* 코 */}
        <mesh position={[0, 1.12, 0.3]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshToonMaterial color="#f97316" />
        </mesh>

        {/* 팔 (왼) */}
        <mesh position={[-0.42, 0.72, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.08, 0.06, 0.42, 8]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>
        {/* 팔 (오) */}
        <mesh position={[0.42, 0.72, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.08, 0.06, 0.42, 8]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>

        {/* 다리 (왼) */}
        <mesh position={[-0.12, 0.18, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.36, 8]} />
          <meshToonMaterial color="#f59e0b" />
        </mesh>
        {/* 다리 (오) */}
        <mesh position={[0.12, 0.18, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.36, 8]} />
          <meshToonMaterial color="#f59e0b" />
        </mesh>

        {/* 귀 (왼) */}
        <mesh position={[-0.28, 1.42, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.1, 0.24, 6]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>
        {/* 귀 (오) */}
        <mesh position={[0.28, 1.42, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.1, 0.24, 6]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>
      </group>
    </group>
  );
}
