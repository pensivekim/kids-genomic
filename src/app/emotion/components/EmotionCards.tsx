'use client';
import { useState } from 'react';
import { speak } from '@/utils/tts';
import { FONT } from '@/styles/theme';

const EMOTIONS = [
  { emoji: '😊', name: '기쁨',   color: '#fbbf24', desc: '좋은 일이 생겼을 때 기뻐요. 웃음이 나와요!',          tip: '기쁠 때는 친구에게 나눠봐요 🤝' },
  { emoji: '😢', name: '슬픔',   color: '#60a5fa', desc: '마음이 아프고 눈물이 나요. 울어도 괜찮아요.',         tip: '슬플 때는 엄마, 아빠한테 안아달라고 해봐요 🤗' },
  { emoji: '😠', name: '화남',   color: '#ef4444', desc: '마음에 안 드는 일이 생기면 화가 나요.',                tip: '화날 때는 심호흡을 10번 해봐요 🌬️' },
  { emoji: '😨', name: '무서움', color: '#8b5cf6', desc: '모르는 것이 생기면 무서울 수 있어요.',                 tip: '무서울 때는 좋아하는 인형을 꼭 안아봐요 🧸' },
  { emoji: '😮', name: '놀람',   color: '#f97316', desc: '갑자기 뜻밖의 일이 생기면 깜짝 놀라요.',               tip: '좋은 놀람은 즐기고, 나쁜 놀람은 말해봐요!' },
  { emoji: '😌', name: '편안함', color: '#22c55e', desc: '모든 게 좋고 마음이 평온해요. 가장 좋은 느낌이에요.', tip: '편안할 때 좋아하는 걸 더 즐겨봐요 🌈' },
  { emoji: '😔', name: '실망',   color: '#6b7280', desc: '바라던 것이 안 됐을 때 속이 상해요.',                 tip: '실망해도 괜찮아요. 다음에 또 도전해봐요 💪' },
  { emoji: '🥰', name: '사랑',   color: '#ec4899', desc: '소중한 사람이 있으면 마음이 따뜻해요.',                tip: '사랑하는 사람에게 "사랑해"라고 말해봐요 ❤️' },
];

export default function EmotionCards() {
  const [selected, setSelected] = useState<typeof EMOTIONS[0] | null>(null);

  function handleClick(e: typeof EMOTIONS[0]) {
    setSelected(e);
    speak(`${e.name}. ${e.desc} ${e.tip}`);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>감정을 눌러봐요!</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16, marginBottom: 24,
      }}>
        {EMOTIONS.map(e => {
          const isSelected = selected?.name === e.name;
          return (
            <button key={e.name} onClick={() => handleClick(e)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '24px 12px',
                borderRadius: 24,
                background: isSelected
                  ? `linear-gradient(135deg, ${e.color}30, ${e.color}18)`
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isSelected ? e.color : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isSelected ? `0 8px 24px ${e.color}35` : '0 2px 12px rgba(0,0,0,0.06)',
                transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.18s', cursor: 'pointer', fontFamily: FONT,
              }}>
              <span style={{ fontSize: 48 }}>{e.emoji}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: isSelected ? e.color : '#374151' }}>{e.name}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{
          background: `linear-gradient(145deg, ${selected.color}12, ${selected.color}06)`,
          borderRadius: 28,
          padding: '28px 32px',
          border: `2px solid ${selected.color}30`,
          boxShadow: `0 8px 32px ${selected.color}18`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: 56 }}>{selected.emoji}</span>
            <p style={{ fontSize: 28, fontWeight: 900, color: selected.color, margin: 0, fontFamily: FONT }}>
              {selected.name}
            </p>
          </div>
          <p style={{ fontSize: 18, color: '#374151', lineHeight: 1.7, marginBottom: 16, fontFamily: FONT }}>
            {selected.desc}
          </p>
          <div style={{ borderRadius: 20, padding: '16px 20px', background: selected.color + '18', marginBottom: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#6b7280', margin: '0 0 6px', fontFamily: FONT }}>💡 이럴 때는요:</p>
            <p style={{ fontSize: 16, color: '#374151', margin: 0, fontFamily: FONT }}>{selected.tip}</p>
          </div>
          <button onClick={() => speak(`${selected.name}. ${selected.desc} ${selected.tip}`)}
            style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 14, cursor: 'pointer',
              textDecoration: 'underline', fontFamily: FONT }}>
            🔊 다시 듣기
          </button>
        </div>
      )}
    </div>
  );
}
