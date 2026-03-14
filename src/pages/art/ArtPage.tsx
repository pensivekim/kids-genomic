import { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import StampPlay from './components/StampPlay';
import ColorMix from './components/ColorMix';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'draw' | 'stamp' | 'color';

const MODES = [
  { id: 'draw',  emoji: '🖌️', label: '자유 그림판', sublabel: '마음대로 그려봐요!', color: '#f97316', desc: '색연필로 무엇이든 그려봐요!' },
  { id: 'stamp', emoji: '🌟', label: '도장 놀이',   sublabel: '도장을 찍어봐요!',   color: '#8b5cf6', desc: '귀여운 도장으로 그림을 만들어요!' },
  { id: 'color', emoji: '🎨', label: '색 섞기',     sublabel: '무슨 색이 될까요?',  color: '#ec4899', desc: '두 색을 섞으면 어떤 색이 될까요?' },
] as const;

export default function ArtPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fff7ed 0%, #f5f3ff 50%, #fdf2f8 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🎨" title="미술 갤러리" color="#ea580c" />

      <div style={{ paddingTop: 68 }}>
        {mode !== 'home' && (
          <div style={{ padding: '16px 24px 8px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => setMode('home')}
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'white', border: '2px solid #e5e7eb',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  fontSize: 22, cursor: 'pointer', fontFamily: FONT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >←</button>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: current?.color, margin: 0 }}>
                {current?.emoji} {current?.label}
              </h2>
              <div style={{ width: 48 }} />
            </div>
          </div>
        )}

        {mode === 'home' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 48px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>🎨</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ea580c', margin: '0 0 10px',
                textShadow: '0 2px 12px rgba(234,88,12,0.2)' }}>미술 갤러리</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>
                그림도 그리고, 도장도 찍고, 색도 섞어봐요!
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  style={{
                    background: `linear-gradient(145deg, ${m.color}22, ${m.color}0d)`,
                    border: `2px solid ${m.color}35`,
                    borderRadius: 28,
                    padding: '40px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    cursor: 'pointer',
                    boxShadow: `0 8px 32px ${m.color}20`,
                    transition: 'all 0.2s',
                    fontFamily: FONT,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${m.color}35`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${m.color}20`;
                  }}
                >
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.color}35, ${m.color}15)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 52,
                    boxShadow: `0 6px 20px ${m.color}25`,
                    border: `3px solid ${m.color}20`,
                  }}>
                    {m.emoji}
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 900, color: m.color, margin: 0 }}>{m.label}</p>
                  <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'draw'  && <div style={{ maxWidth: 1200, margin: '0 auto' }}><DrawingCanvas /></div>}
        {mode === 'stamp' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><StampPlay /></div>}
        {mode === 'color' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><ColorMix /></div>}
      </div>
    </div>
  );
}
