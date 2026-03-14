'use client';
import { useState } from 'react';
import { INSTRUMENTS } from '@/data/music';
import { speak } from '@/utils/tts';
import { FONT } from '@/styles/theme';

export default function InstrumentCards() {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(id: string, sound: string) {
    setActive(id);
    speak(sound);
    setTimeout(() => setActive(null), 600);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
        악기를 누르면 소리를 들을 수 있어요! 🎵
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 20,
      }}>
        {INSTRUMENTS.map((inst) => {
          const isActive = active === inst.id;
          return (
            <button
              key={inst.id}
              onClick={() => handleClick(inst.id, inst.sound)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                padding: '32px 20px',
                borderRadius: 28,
                background: isActive
                  ? `linear-gradient(135deg, ${inst.color}30, ${inst.color}15)`
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isActive ? inst.color : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isActive ? `0 8px 28px ${inst.color}35` : '0 2px 12px rgba(0,0,0,0.06)',
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.18s',
                cursor: 'pointer', fontFamily: FONT,
              }}
            >
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: `linear-gradient(135deg, ${inst.color}25, ${inst.color}12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 52, border: `2px solid ${inst.color}20`,
              }}>
                {inst.emoji}
              </div>
              <span style={{ fontSize: 20, fontWeight: 900, color: inst.color, fontFamily: FONT }}>
                {inst.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
