import { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import StampPlay from './components/StampPlay';
import ColorMix from './components/ColorMix';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'draw' | 'stamp' | 'color';

const MODES = [
  { id: 'draw',  emoji: '🖌️', label: '자유 그림판', sublabel: '마음대로 그려봐요!', color: '#f97316', bg: '#fff7ed' },
  { id: 'stamp', emoji: '🌟', label: '도장 놀이',   sublabel: '도장을 찍어봐요!',   color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'color', emoji: '🎨', label: '색 섞기',     sublabel: '무슨 색이 될까요?',  color: '#ec4899', bg: '#fdf2f8' },
] as const;

export default function ArtPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #fff7ed 0%, #f5f3ff 50%, #fdf2f8 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🎨" title="미술 갤러리" color="#ea580c" />

      <div style={{ paddingTop: 80 }}>
        {mode !== 'home' && (
          <div className="text-center pt-4 pb-2 px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button
                onClick={() => setMode('home')}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform"
              >
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

        {mode === 'draw'  && <div className="mt-4"><DrawingCanvas /></div>}
        {mode === 'stamp' && <div className="mt-4"><StampPlay /></div>}
        {mode === 'color' && <div className="mt-6"><ColorMix /></div>}
      </div>
    </div>
  );
}
