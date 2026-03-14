'use client';
import { useState } from 'react';
import { WORDS } from '@/data/hangul';
import { speak } from '@/utils/tts';
import { FONT } from '@/styles/theme';

export default function WordCards() {
  const [idx, setIdx] = useState(0);
  const card = WORDS[idx];

  function handleSpeak() { speak(card.word); }
  function prev() { setIdx((i) => (i - 1 + WORDS.length) % WORDS.length); }
  function next() { setIdx((i) => (i + 1) % WORDS.length); }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px 24px 32px', fontFamily: FONT,
      display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div
        onClick={handleSpeak}
        style={{
          width: '100%',
          background: 'linear-gradient(145deg, #fff7ed, #fffbf0)',
          borderRadius: 36,
          boxShadow: '0 12px 48px rgba(234,88,12,0.18)',
          padding: '56px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
          cursor: 'pointer',
          border: '2px solid rgba(234,88,12,0.12)',
          marginBottom: 32,
          transition: 'transform 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={e => (e.currentTarget.style.transform = '')}
      >
        <span style={{ fontSize: 120, lineHeight: 1 }}>{card.emoji}</span>
        <span style={{ fontSize: 64, fontWeight: 900, color: '#ea580c', fontFamily: FONT }}>{card.word}</span>
        <span style={{ fontSize: 24, color: '#94a3b8', fontFamily: FONT }}>{card.syllables}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f97316', fontSize: 18 }}>
          <span>🔊</span>
          <span style={{ fontFamily: FONT }}>눌러서 들어봐요!</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button
          onClick={prev}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #fed7aa, #fdba74)',
            border: 'none', fontSize: 26, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(234,88,12,0.2)',
            transition: 'all 0.15s',
          }}
        >◀</button>
        <span style={{ fontSize: 20, color: '#94a3b8', fontFamily: FONT, minWidth: 80, textAlign: 'center' }}>
          {idx + 1} / {WORDS.length}
        </span>
        <button
          onClick={next}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #fed7aa, #fdba74)',
            border: 'none', fontSize: 26, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(234,88,12,0.2)',
            transition: 'all 0.15s',
          }}
        >▶</button>
      </div>
    </div>
  );
}
