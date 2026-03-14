import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';
import { type BuildingConfig } from '../../config/buildings';

interface Props {
  building: BuildingConfig;
  onClick: (b: BuildingConfig) => void;
}

export default function BuildingMesh({ building, onClick }: Props) {
  const bodyRef = useRef<Mesh>(null!);
  const roofRef = useRef<Mesh>(null!);
  const groupRef = useRef<{ position: { y: number } }>(null!);

  const [hovered, setHovered] = useState(false);
  const targetY = useRef(0);

  useFrame(() => {
    const target = hovered ? 0.3 : 0;
    targetY.current += (target - targetY.current) * 0.12;
    if (groupRef.current) {
      groupRef.current.position.y = targetY.current;
    }
  });

  const isLive = building.status === 'live';
  const wallColor = isLive ? building.color : '#d1d5db';
  const roofColor = isLive ? building.roofColor : '#9ca3af';

  // 건물 타입별 지붕 모양
  const roofShape = building.component === 'lab' ? 'box' : 'cone';

  return (
    // @ts-ignore — drei group ref 타입 허용
    <group
      ref={groupRef}
      position={building.position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = isLive ? 'pointer' : 'default'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      onClick={() => onClick(building)}
    >
      {/* 벽체 */}
      <mesh ref={bodyRef} position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.8, 1.5, 1.8]} />
        <meshToonMaterial color={wallColor} />
      </mesh>

      {/* 지붕 */}
      {roofShape === 'cone' ? (
        <mesh ref={roofRef} position={[0, 1.9, 0]} castShadow>
          <coneGeometry args={[1.4, 1.0, 4]} />
          <meshToonMaterial color={roofColor} />
        </mesh>
      ) : (
        <mesh ref={roofRef} position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[2.0, 0.3, 2.0]} />
          <meshToonMaterial color={roofColor} />
        </mesh>
      )}

      {/* 문 */}
      <mesh position={[0, 0.3, 0.91]}>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshToonMaterial color={isLive ? '#92400e' : '#6b7280'} />
      </mesh>

      {/* 자물쇠 (coming_soon) */}
      {!isLive && (
        <mesh position={[0, 1.2, 0.92]}>
          <boxGeometry args={[0.25, 0.25, 0.05]} />
          <meshToonMaterial color="#f59e0b" />
        </mesh>
      )}

      {/* 라벨 */}
      <Html
        position={[0, 3.0, 0]}
        center
        distanceFactor={12}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
          borderRadius: '12px',
          padding: '4px 10px',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#1f2937',
          whiteSpace: 'nowrap',
          boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {building.icon} {building.name}
          {!isLive && <span style={{ marginLeft: '4px', fontSize: '10px', color: '#9ca3af' }}>준비중</span>}
        </div>
      </Html>
    </group>
  );
}
