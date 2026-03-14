import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group } from 'three';
import { type BuildingConfig } from '../../config/buildings';

interface Props {
  building: BuildingConfig;
  onClick: (b: BuildingConfig) => void;
}

export default function BuildingMesh({ building, onClick }: Props) {
  const groupRef   = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  const hoverY     = useRef(0);
  const clickScale = useRef(1);
  const clickedAt  = useRef<number | null>(null); // clock.elapsedTime 기준

  useFrame((state) => {
    if (!groupRef.current) return;

    // hover 부상 (lerp)
    const hoverTarget = hovered ? 0.3 : 0;
    hoverY.current += (hoverTarget - hoverY.current) * 0.12;

    // 클릭 튕김
    if (clickedAt.current !== null) {
      const elapsed = state.clock.elapsedTime - clickedAt.current;
      if (elapsed < 0.5) {
        clickScale.current = 1 + Math.sin((elapsed / 0.5) * Math.PI) * 0.2;
      } else {
        clickScale.current = 1;
        clickedAt.current = null;
      }
    }

    groupRef.current.position.y = hoverY.current;
    groupRef.current.scale.setScalar(clickScale.current);
  });

  const isLive    = building.status === 'live';
  const wallColor = isLive ? building.color    : '#d1d5db';
  const roofColor = isLive ? building.roofColor : '#9ca3af';
  const roofShape = building.component === 'lab' ? 'box' : 'cone';

  return (
    <group
      ref={groupRef}
      position={building.position}
      onPointerOver={() => { setHovered(true);  document.body.style.cursor = isLive ? 'pointer' : 'default'; }}
      onPointerOut ={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      onClick={(e) => {
        e.stopPropagation();
        clickedAt.current = e.timeStamp / 1000; // useFrame clock과 동기화
        onClick(building);
      }}
    >
      {/* 벽체 */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.8, 1.5, 1.8]} />
        <meshToonMaterial color={wallColor} />
      </mesh>

      {/* 지붕 */}
      {roofShape === 'cone' ? (
        <mesh position={[0, 1.9, 0]}>
          <coneGeometry args={[1.4, 1.0, 4]} />
          <meshToonMaterial color={roofColor} />
        </mesh>
      ) : (
        <mesh position={[0, 1.65, 0]}>
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
      <Html position={[0, 3.0, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(255,255,255,0.88)',
          borderRadius: '12px',
          padding: '5px 12px',
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#1f2937',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          fontFamily: 'system-ui, sans-serif',
          userSelect: 'none',
        }}>
          {building.icon} {building.name}
          {!isLive && <span style={{ marginLeft: '6px', fontSize: '12px', color: '#9ca3af' }}>준비중</span>}
        </div>
      </Html>
    </group>
  );
}
