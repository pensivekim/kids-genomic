import { useState } from 'react';
import { BUILDINGS, type BuildingConfig } from '../../config/buildings';
import ServiceModal from './ServiceModal';

export default function FlatWorldMap() {
  const [selected, setSelected] = useState<BuildingConfig | null>(null);

  return (
    <div className="w-full h-full overflow-auto" style={{ background: 'linear-gradient(to bottom, #bae6fd, #e0f2fe)' }}>
      <div className="flex flex-col items-center py-8 px-4">
        <h1 className="text-2xl font-bold text-green-700 mb-2">🌳 제노믹 어린이 마을</h1>
        <p className="text-gray-500 text-sm mb-6">배울 곳을 골라 보세요!</p>

        <div className="grid grid-cols-3 gap-3 max-w-sm w-full">
          {BUILDINGS.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className="flex flex-col items-center p-3 rounded-2xl shadow transition-transform active:scale-95"
              style={{
                background: b.status === 'live' ? b.color + '33' : '#f3f4f6',
                border: `2px solid ${b.status === 'live' ? b.color : '#d1d5db'}`,
              }}
            >
              <span className="text-3xl mb-1">{b.icon}</span>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">{b.name}</span>
              {b.status === 'coming_soon' && (
                <span className="text-xs text-gray-400 mt-1">준비중</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <ServiceModal building={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
