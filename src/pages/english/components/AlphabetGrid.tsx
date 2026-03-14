import { useState } from 'react';
import { type Letter } from '../data/english';
import { speak } from '../utils/tts';
import { FONT } from '../../../styles/theme';

interface Props {
  letters: Letter[];
}

export default function AlphabetGrid({ letters }: Props) {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(l: Letter) {
    setActive(l.letter);
    speak(`${l.name}. ${l.word}`);
    setTimeout(() => setActive(null), 600);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
        Click a letter to hear the sound! 👂
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 16,
      }}>
        {letters.map((l) => {
          const isActive = active === l.letter;
          return (
            <button
              key={l.letter}
              onClick={() => handleClick(l)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '20px 12px',
                borderRadius: 24,
                background: isActive
                  ? 'linear-gradient(135deg, #fbbf2430, #f59e0b18)'
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isActive ? '#f59e0b' : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isActive ? '0 8px 24px #f59e0b35' : '0 2px 12px rgba(0,0,0,0.06)',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.18s',
                cursor: 'pointer', fontFamily: FONT,
              }}
            >
              <span style={{ fontSize: 38, fontWeight: 900, color: '#d97706', lineHeight: 1 }}>{l.letter}</span>
              <span style={{ fontSize: 26 }}>{l.emoji}</span>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 700 }}>{l.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
