import { useState } from 'react';
import PatternGame from './components/PatternGame';
import DotConnect from './components/DotConnect';
import ShapeMatch from './components/ShapeMatch';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'pattern' | 'dot' | 'shape';

const MODES = [
  { id: 'pattern', emoji: '🔴', label: '패턴 놀이',    sublabel: '규칙을 찾아봐요!',    color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'dot',     emoji: '✏️', label: '점 잇기',      sublabel: '순서대로 이어요!',    color: '#c026d3', bg: '#fdf4ff' },
  { id: 'shape',   emoji: '🔺', label: '모양 맞추기',  sublabel: '어떤 모양일까요?',    color: '#f59e0b', bg: '#fffbeb' },
] as const;

export default function CreativePage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #fffbeb 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🧩" title="창의 놀이터" color="#7c3aed" />

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

        {mode === 'pattern' && <div className="mt-6"><PatternGame /></div>}
        {mode === 'dot'     && <div className="mt-4"><DotConnect /></div>}
        {mode === 'shape'   && <div className="mt-6"><ShapeMatch /></div>}
      </div>
    </div>
  );
}
