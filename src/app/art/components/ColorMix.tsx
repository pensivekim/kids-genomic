'use client';
import { useState } from 'react';
import { FONT } from '@/styles/theme';

interface Mix { a: string; b: string; result: string; name: string; emoji: string; }

const MIXES: Mix[] = [
  { a: '#ef4444', b: '#eab308', result: '#f97316', name: '주황색', emoji: '🍊' },
  { a: '#ef4444', b: '#3b82f6', result: '#8b5cf6', name: '보라색', emoji: '🍇' },
  { a: '#eab308', b: '#3b82f6', result: '#22c55e', name: '초록색', emoji: '🌿' },
  { a: '#ef4444', b: '#ffffff', result: '#fca5a5', name: '분홍색', emoji: '🌸' },
  { a: '#3b82f6', b: '#ffffff', result: '#93c5fd', name: '하늘색', emoji: '☁️' },
  { a: '#000000', b: '#ffffff', result: '#9ca3af', name: '회색',   emoji: '🌫️' },
];

const COLOR_NAMES: Record<string, string> = {
  '#ef4444': '빨간색 🔴',
  '#eab308': '노란색 🟡',
  '#3b82f6': '파란색 🔵',
  '#ffffff': '흰색 ⚪',
  '#000000': '검은색 ⚫',
};

export default function ColorMix() {
  const [selected, setSelected] = useState<Mix | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(mix: Mix) {
    setSelected(mix);
    setRevealed(false);
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
        색을 섞으면 어떻게 될까요? 눌러서 선택해요!
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16, marginBottom: 28,
      }}>
        {MIXES.map((mix, i) => (
          <button
            key={i}
            onClick={() => handleSelect(mix)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '20px 16px',
              borderRadius: 24,
              background: selected === mix
                ? 'rgba(99,102,241,0.08)'
                : 'rgba(255,255,255,0.85)',
              border: `3px solid ${selected === mix ? '#6366f1' : 'rgba(0,0,0,0.07)'}`,
              boxShadow: selected === mix ? '0 6px 20px rgba(99,102,241,0.2)' : '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer', transition: 'all 0.18s',
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: mix.a,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', border: '2px solid rgba(255,255,255,0.5)' }} />
            <span style={{ fontSize: 22, fontWeight: 900, color: '#9ca3af', fontFamily: FONT }}>+</span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: mix.b,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', border: '2px solid rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 22, fontWeight: 900, color: '#9ca3af', fontFamily: FONT }}>=</span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f3f4f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#9ca3af', border: '2px dashed #d1d5db' }}>?</div>
          </button>
        ))}
      </div>

      {selected && (
        <div style={{
          background: 'rgba(255,255,255,0.9)', borderRadius: 28,
          padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '2px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: selected.a,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)', border: '3px solid rgba(255,255,255,0.5)' }} />
              <span style={{ fontSize: 14, color: '#6b7280', fontFamily: FONT }}>{COLOR_NAMES[selected.a]}</span>
            </div>
            <span style={{ fontSize: 40, fontWeight: 900, color: '#9ca3af', fontFamily: FONT }}>+</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: selected.b,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)', border: '3px solid rgba(0,0,0,0.1)' }} />
              <span style={{ fontSize: 14, color: '#6b7280', fontFamily: FONT }}>{COLOR_NAMES[selected.b]}</span>
            </div>
            <span style={{ fontSize: 40, fontWeight: 900, color: '#9ca3af', fontFamily: FONT }}>=</span>
            {revealed ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: selected.result,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)', border: '3px solid rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 14, color: '#6b7280', fontFamily: FONT }}>{selected.name}</span>
              </div>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                  border: '3px dashed #8b5cf6',
                  fontSize: 28, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8b5cf6', fontWeight: 900,
                  boxShadow: '0 4px 16px rgba(139,92,246,0.2)',
                }}
              >?</button>
            )}
          </div>

          {revealed ? (
            <p style={{ fontSize: 26, fontWeight: 900, color: '#6366f1', textAlign: 'center', fontFamily: FONT }}>
              {selected.emoji} {selected.name}이 됐어요!
            </p>
          ) : (
            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 16, fontFamily: FONT }}>
              ? 를 눌러서 확인해봐요!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
