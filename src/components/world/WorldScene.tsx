import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE, TOUCH } from 'three';
import { Suspense, useState } from 'react';
import Terrain from './Terrain';
import DecorationGroup from './DecorationGroup';
import PathNetwork from './PathNetwork';
import Mascot from './Mascot';
import BuildingGroup from '../buildings/BuildingGroup';
import ServiceModal from '../ui/ServiceModal';
import { type BuildingConfig } from '../../config/buildings';

export default function WorldScene() {
  const [selected, setSelected] = useState<BuildingConfig | null>(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 60%, #86efac 100%)' }}>
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        orthographic
        camera={{ zoom: 70, position: [12, 12, 12], near: 0.1, far: 500 }}
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[8, 15, 8]} intensity={1.5} />

          <Terrain />
          <PathNetwork />
          <DecorationGroup />
          <Mascot />
          <BuildingGroup onSelect={setSelected} />

          <OrbitControls
            enableRotate={false}
            enableZoom={true}
            enablePan={true}
            minZoom={35}
            maxZoom={160}
            zoomSpeed={0.5}
            panSpeed={0.8}
            mouseButtons={{
              LEFT: MOUSE.PAN,
              MIDDLE: MOUSE.DOLLY,
              RIGHT: MOUSE.PAN,
            }}
            touches={{
              ONE: TOUCH.PAN,
              TWO: TOUCH.DOLLY_PAN,
            }}
          />
        </Suspense>
      </Canvas>

      {/* 상단 타이틀 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg pointer-events-none">
        <h1 className="text-2xl font-bold text-green-700">🌳 제노믹 어린이 마을</h1>
      </div>

      {/* 조작 힌트 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white text-sm rounded-full px-5 py-2 pointer-events-none">
        건물을 클릭하면 입장할 수 있어요!
      </div>

      {/* 서비스 모달 */}
      <ServiceModal building={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
