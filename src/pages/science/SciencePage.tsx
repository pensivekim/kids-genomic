import { useState } from 'react';
import AnimalBook from './components/AnimalBook';
import Experiments from './components/Experiments';
import StarMap from './components/StarMap';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'animal' | 'experiment' | 'star';

const MODES = [
  { id: 'animal',     emoji: '🦁', label: '동물 도감',   sublabel: '24마리 동물을 만나요!', color: '#22c55e', bg: '#f0fdf4' },
  { id: 'experiment', emoji: '🌋', label: '신기한 실험', sublabel: '왜 그럴까요?',           color: '#ef4444', bg: '#fef2f2' },
  { id: 'star',       emoji: '🌙', label: '별자리 탐험', sublabel: '밤하늘의 이야기',        color: '#6366f1', bg: '#eef2ff' },
] as const;

export default function SciencePage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #fef2f2 50%, #eef2ff 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🔬" title="과학 연구소" color="#16a34a" />

      <div style={{ paddingTop: 80 }}>
        {mode !== 'home' && (
          <div className="text-center pt-4 pb-2 px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button onClick={() => setMode('home')}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform">
                ←
              </button>
              <h2 className="text-2xl font-bold" style={{ color: current?.color }}>
                {current?.emoji} {current?.label}
              </h2>
              <div className="w-12" />
            </div>
          </div>
        )}

        {mode === 'home' && (
          <div className="grid grid-cols-1 gap-4 px-8 pb-8 max-w-4xl mx-auto mt-6">
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
    </div>
  );
}
