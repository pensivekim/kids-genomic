import { useState } from 'react';
import { speak } from '../../../utils/tts';
import { FONT } from '../../../styles/theme';

const MOODS = [
  { emoji: '😁', label: '너무 좋아!', color: '#fbbf24', message: '와! 오늘 기분이 최고예요! 그 기쁨을 친구와 나눠봐요 🌟', activity: '좋아하는 노래 크게 불러봐요 🎵' },
  { emoji: '😊', label: '좋아요',     color: '#22c55e', message: '기분이 좋네요! 오늘도 즐거운 하루예요 😊',              activity: '오늘 좋았던 일 하나를 생각해봐요 ✨' },
  { emoji: '😐', label: '보통이에요', color: '#94a3b8', message: '그럴 수도 있어요. 특별한 걸 해보면 어떨까요?',           activity: '좋아하는 간식 먹어봐요 🍎' },
  { emoji: '😔', label: '별로예요',   color: '#6b7280', message: '속상한 일이 있었나요? 말해보면 나아질 거예요.',           activity: '좋아하는 책을 읽어봐요 📚' },
  { emoji: '😢', label: '슬퍼요',     color: '#60a5fa', message: '많이 속상하군요. 엄마, 아빠한테 안아달라고 해봐요.',      activity: '엄마, 아빠 손 잡아봐요 🤝' },
];

export default function MoodCheck() {
  const [selected, setSelected] = useState<typeof MOODS[0] | null>(null);

  function handleMood(mood: typeof MOODS[0]) {
    setSelected(mood);
    speak(`${mood.message} ${mood.activity}`);
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <div style={{
        background: 'linear-gradient(145deg, #fdf2f8, #fce7f3)',
        borderRadius: 28, padding: '28px 32px', marginBottom: 24,
        border: '2px solid rgba(236,72,153,0.12)', textAlign: 'center',
        boxShadow: '0 4px 20px rgba(236,72,153,0.1)',
      }}>
        <p style={{ fontSize: 26, fontWeight: 900, color: '#db2777', margin: '0 0 6px', fontFamily: FONT }}>
          오늘 기분이 어때요?
        </p>
        <p style={{ fontSize: 15, color: '#9ca3af', margin: 0, fontFamily: FONT }}>솔직하게 골라봐요!</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {MOODS.map(mood => {
          const isSelected = selected?.label === mood.label;
          return (
            <button key={mood.label} onClick={() => handleMood(mood)}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 28px',
                borderRadius: 22,
                background: isSelected
                  ? `linear-gradient(135deg, ${mood.color}25, ${mood.color}12)`
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isSelected ? mood.color : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isSelected ? `0 6px 20px ${mood.color}30` : '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer', fontFamily: FONT, transition: 'all 0.18s',
              }}>
              <span style={{ fontSize: 40 }}>{mood.emoji}</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: isSelected ? mood.color : '#374151', fontFamily: FONT }}>
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{
          background: `linear-gradient(145deg, ${selected.color}12, ${selected.color}06)`,
          borderRadius: 28, padding: '28px 32px',
          border: `2px solid ${selected.color}30`,
          boxShadow: `0 8px 32px ${selected.color}18`,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 64, display: 'block', marginBottom: 16 }}>{selected.emoji}</span>
          <p style={{ fontSize: 18, color: '#374151', lineHeight: 1.7, marginBottom: 20, fontFamily: FONT }}>
            {selected.message}
          </p>
          <div style={{ borderRadius: 20, padding: '16px 20px', background: selected.color + '18', marginBottom: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#6b7280', margin: '0 0 8px', fontFamily: FONT }}>
              💡 이렇게 해봐요!
            </p>
            <p style={{ fontSize: 18, fontWeight: 900, color: selected.color, margin: 0, fontFamily: FONT }}>
              {selected.activity}
            </p>
          </div>
          <button onClick={() => speak(`${selected.message} ${selected.activity}`)}
            style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 14,
              cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT }}>
            🔊 다시 듣기
          </button>
        </div>
      )}
    </div>
  );
}
