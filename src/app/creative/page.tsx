'use client';
import { useState } from 'react';
import PatternGame from './components/PatternGame';
import DotConnect from './components/DotConnect';
import ShapeMatch from './components/ShapeMatch';
import PageHeader from '@/components/ui/PageHeader';
import { FONT } from '@/styles/theme';

type Mode = 'home' | 'pattern' | 'dot' | 'shape';

const MODES = [
  { id: 'pattern', emoji: '🔴', label: '패턴 놀이',   sublabel: '규칙을 찾아봐요!',  color: '#8b5cf6', desc: '반복되는 패턴의 규칙을 찾아요!' },
  { id: 'dot',     emoji: '✏️', label: '점 잇기',     sublabel: '순서대로 이어요!',   color: '#c026d3', desc: '순서대로 점을 이으면 그림이 나와요!' },
  { id: 'shape',   emoji: '🔺', label: '모양 맞추기', sublabel: '어떤 모양일까요?',   color: '#f59e0b', desc: '퍼즐처럼 모양을 맞춰봐요!' },
] as const;

export default function CreativePage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 50%, #fffbeb 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🧩" title="창의 놀이터" color="#7c3aed" />

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
              <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>🧩</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#7c3aed', margin: '0 0 10px',
                textShadow: '0 2px 12px rgba(124,58,237,0.2)' }}>창의 놀이터</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>
                패턴도 찾고, 점도 잇고, 모양도 맞춰봐요!
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

        {mode === 'pattern' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><PatternGame /></div>}
        {mode === 'dot'     && <div style={{ maxWidth: 1200, margin: '0 auto' }}><DotConnect /></div>}
        {mode === 'shape'   && <div style={{ maxWidth: 1200, margin: '0 auto' }}><ShapeMatch /></div>}
      </div>
    </div>
  );
}
