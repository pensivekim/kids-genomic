import { useState } from 'react';
import { PIANO_KEYS } from '../data/music';
import { playTone } from '../utils/audio';

export default function MiniPiano() {
  const [active, setActive] = useState<string | null>(null);

  function handleKey(note: string, freq: number) {
    setActive(note + freq);
    playTone(freq, 0.8);
    setTimeout(() => setActive(null), 300);
  }

  return (
    <div className="px-4 pb-8 max-w-lg mx-auto">
      <p className="text-center text-gray-500 mb-6">건반을 눌러서 연주해요! 🎵</p>

      {/* 건반 */}
      <div className="flex gap-2 justify-center mb-6">
        {PIANO_KEYS.map((k) => {
          const isActive = active === k.note + k.freq;
          return (
            <button
              key={k.freq}
              onPointerDown={() => handleKey(k.note, k.freq)}
              className="flex flex-col items-end justify-end rounded-2xl shadow-lg transition-all select-none"
              style={{
                width: 52,
                height: 160,
                background: isActive ? k.color : 'white',
                border: `3px solid ${k.color}`,
                transform: isActive ? 'translateY(4px)' : 'translateY(0)',
                boxShadow: isActive ? `0 2px 8px ${k.color}88` : `0 6px 0 ${k.color}88`,
                paddingBottom: 10,
              }}
            >
              <span
                className="text-sm font-bold w-full text-center"
                style={{ color: isActive ? 'white' : k.color }}
              >
                {k.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 동요 악보 힌트 */}
      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <p className="text-gray-500 text-sm mb-2">🎵 나비야 나비야</p>
        <p className="text-lg font-bold text-purple-500 tracking-widest">
          솔 미 미 · 파 레 레 · 도 레 미 파 솔 솔 솔
        </p>
      </div>
    </div>
  );
}
