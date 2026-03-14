'use client';
import { useState } from 'react';
import { PIANO_KEYS } from '@/data/music';
import { playTone } from '@/utils/audio';
import { FONT } from '@/styles/theme';

export default function MiniPiano() {
  const [active, setActive] = useState<string | null>(null);

  function handleKey(note: string, freq: number) {
    setActive(note + freq);
    playTone(freq, 0.8);
    setTimeout(() => setActive(null), 300);
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 32, fontSize: 16 }}>
        건반을 눌러서 연주해요! 🎵
      </p>

      {/* 건반 */}
      <div style={{
        display: 'flex', gap: 12, justifyContent: 'center',
        marginBottom: 40,
        background: 'linear-gradient(145deg, #1e1b4b, #312e81)',
        borderRadius: 28, padding: '40px 32px 48px',
        boxShadow: '0 16px 48px rgba(30,27,75,0.4)',
      }}>
        {PIANO_KEYS.map((k) => {
          const isActive = active === k.note + k.freq;
          return (
            <button
              key={k.freq}
              onPointerDown={() => handleKey(k.note, k.freq)}
              style={{
                width: 72, height: 220,
                borderRadius: '0 0 16px 16px',
                background: isActive
                  ? `linear-gradient(180deg, ${k.color}, ${k.color}cc)`
                  : 'linear-gradient(180deg, #ffffff, #f3f4f6)',
                border: `3px solid ${k.color}`,
                transform: isActive ? 'translateY(6px)' : 'translateY(0)',
                boxShadow: isActive
                  ? `0 2px 8px ${k.color}88`
                  : `0 10px 0 ${k.color}66, 0 12px 16px rgba(0,0,0,0.3)`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                alignItems: 'center', paddingBottom: 14,
                transition: 'all 0.1s',
                userSelect: 'none',
              }}
            >
              <span style={{
                fontSize: 16, fontWeight: 900, fontFamily: FONT,
                color: isActive ? 'white' : k.color,
              }}>
                {k.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 동요 악보 */}
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24, padding: '20px 32px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '2px solid rgba(99,102,241,0.12)',
      }}>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 10, fontFamily: FONT }}>🎵 나비야 나비야</p>
        <p style={{ fontSize: 24, fontWeight: 900, color: '#6366f1', letterSpacing: '0.1em', fontFamily: FONT }}>
          솔 미 미 · 파 레 레 · 도 레 미 파 솔 솔 솔
        </p>
      </div>
    </div>
  );
}
