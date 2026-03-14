import { useState } from 'react';
import { type Letter } from '../data/hangul';
import { speak } from '../utils/tts';
import { FONT } from '../../../styles/theme';

interface Props {
  letters: Letter[];
  color: string;
}

export default function LetterGrid({ letters, color }: Props) {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(l: Letter) {
    setActive(l.letter);
    speak(`${l.name}. ${l.example}`);
    setTimeout(() => setActive(null), 600);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
        글자를 누르면 소리가 나요! 👂
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
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
                  ? `linear-gradient(135deg, ${color}30, ${color}18)`
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isActive ? color : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isActive ? `0 8px 24px ${color}35` : '0 2px 12px rgba(0,0,0,0.06)',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.18s',
                cursor: 'pointer', fontFamily: FONT,
              }}
            >
              <span style={{ fontSize: 40, fontWeight: 900, color, lineHeight: 1 }}>{l.letter}</span>
              <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 700 }}>{l.name}</span>
              <span style={{ fontSize: 28 }}>{l.emoji}</span>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>{l.example}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
