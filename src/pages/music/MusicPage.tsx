import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstrumentCards from './components/InstrumentCards';
import MiniPiano from './components/MiniPiano';
import RhythmGame from './components/RhythmGame';

type Mode = 'home' | 'instrument' | 'piano' | 'rhythm';

const MODES = [
  { id: 'instrument', emoji: '🎻', label: '악기 탐험',   sublabel: '어떤 소리일까?',    color: '#ec4899', bg: '#fdf2f8' },
  { id: 'piano',      emoji: '🎹', label: '미니 피아노', sublabel: '도레미 연주해요!',   color: '#6366f1', bg: '#eef2ff' },
  { id: 'rhythm',     emoji: '🥁', label: '리듬 놀이',   sublabel: '리듬을 따라해봐요!', color: '#f59e0b', bg: '#fffbeb' },
] as const;

export default function MusicPage() {
  const [mode, setMode] = useState<Mode>('home');
  const navigate = useNavigate();
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #eef2ff 50%, #fffbeb 100%)' }}>
      <div className="text-center pt-8 pb-4 px-4">
        {mode === 'home' ? (
          <>
            <button onClick={() => navigate('/')} className="mb-4 text-pink-400 text-base underline">
              ← 세계지도로 돌아가기
            </button>
            <h1 className="text-4xl font-bold text-pink-600 mb-1">🎵 음악의 집</h1>
            <p className="text-lg text-pink-400">악기 소리를 들어봐요!</p>
          </>
        ) : (
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <button
              onClick={() => setMode('home')}
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform"
            >
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
            <button
              key={m.id}
              onClick={() => setMode(m.id as Mode)}
              className="flex items-center gap-4 p-5 rounded-3xl shadow-md active:scale-95 transition-all"
              style={{ background: m.bg, border: `3px solid ${m.color}22` }}
            >
              <span className="text-5xl">{m.emoji}</span>
              <div className="text-left">
                <p className="text-xl font-bold" style={{ color: m.color }}>{m.label}</p>
                <p className="text-sm text-gray-400">{m.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === 'instrument' && <div className="mt-4"><InstrumentCards /></div>}
      {mode === 'piano'      && <div className="mt-6"><MiniPiano /></div>}
      {mode === 'rhythm'     && <div className="mt-6"><RhythmGame /></div>}
    </div>
  );
}
