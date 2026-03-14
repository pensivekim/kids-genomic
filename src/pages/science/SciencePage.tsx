import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimalBook from './components/AnimalBook';
import Experiments from './components/Experiments';
import StarMap from './components/StarMap';

type Mode = 'home' | 'animal' | 'experiment' | 'star';

const MODES = [
  { id: 'animal',     emoji: '🦁', label: '동물 도감',   sublabel: '24마리 동물을 만나요!', color: '#22c55e', bg: '#f0fdf4' },
  { id: 'experiment', emoji: '🌋', label: '신기한 실험', sublabel: '왜 그럴까요?',           color: '#ef4444', bg: '#fef2f2' },
  { id: 'star',       emoji: '🌙', label: '별자리 탐험', sublabel: '밤하늘의 이야기',        color: '#6366f1', bg: '#eef2ff' },
] as const;

export default function SciencePage() {
  const [mode, setMode] = useState<Mode>('home');
  const navigate = useNavigate();
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fef2f2 50%, #eef2ff 100%)' }}>
      <div className="text-center pt-8 pb-4 px-4">
        {mode === 'home' ? (
          <>
            <button onClick={() => navigate('/')} className="mb-4 text-green-500 text-base underline">
              ← 세계지도로 돌아가기
            </button>
            <h1 className="text-4xl font-bold text-green-600 mb-1">🔬 과학 연구소</h1>
            <p className="text-lg text-green-400">신기한 세상을 탐험해요!</p>
          </>
        ) : (
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <button onClick={() => setMode('home')}
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform">
              ←
            </button>
            <h1 className="text-2xl font-bold" style={{ color: current?.color }}>
              {current?.emoji} {current?.label}
            </h1>
            <div className="w-12" />
          </div>
        )}
      </div>

      {mode === 'home' && (
        <div className="grid grid-cols-1 gap-4 px-4 pb-8 max-w-sm mx-auto mt-4">
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id as Mode)}
              className="flex items-center gap-4 p-5 rounded-3xl shadow-md active:scale-95 transition-all"
              style={{ background: m.bg, border: `3px solid ${m.color}22` }}>
              <span className="text-5xl">{m.emoji}</span>
              <div className="text-left">
                <p className="text-xl font-bold" style={{ color: m.color }}>{m.label}</p>
                <p className="text-sm text-gray-400">{m.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === 'animal'     && <div className="mt-4"><AnimalBook /></div>}
      {mode === 'experiment' && <div className="mt-4"><Experiments /></div>}
      {mode === 'star'       && <div className="mt-6"><StarMap /></div>}
    </div>
  );
}
