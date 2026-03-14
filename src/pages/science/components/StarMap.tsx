import { useState } from 'react';
import { CONSTELLATIONS, type Star } from '../data/science';
import { speak } from '../../../utils/tts';
import { FONT } from '../../../styles/theme';

export default function StarMap() {
  const [selected, setSelected] = useState<Star | null>(null);

  function handleSelect(s: Star) {
    setSelected(s);
    speak(`${s.name}. ${s.story}`);
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
        별자리를 눌러봐요! ✨
      </p>

      {/* 별자리 선택 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {CONSTELLATIONS.map(c => {
          const isSelected = selected?.name === c.name;
          return (
            <button key={c.name} onClick={() => handleSelect(c)}
              style={{
                padding: '12px 24px', borderRadius: 20,
                background: isSelected
                  ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                  : 'rgba(255,255,255,0.8)',
                color: isSelected ? '#c7d2fe' : '#374151',
                fontSize: 16, fontWeight: 800, fontFamily: FONT, cursor: 'pointer',
                boxShadow: isSelected
                  ? '0 4px 16px rgba(30,27,75,0.4)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                border: isSelected ? '2px solid #6366f1' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
              {c.emoji} {c.name}
            </button>
          );
        })}
      </div>

      {/* 밤하늘 SVG */}
      <div style={{
        width: '100%', borderRadius: 28, overflow: 'hidden',
        background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a4e 60%, #24243e 100%)',
        boxShadow: '0 12px 48px rgba(15,12,41,0.5)',
        marginBottom: 24,
        border: '2px solid rgba(99,102,241,0.2)',
      }}>
        <svg viewBox="0 0 100 75" style={{ width: '100%', display: 'block', aspectRatio: '4/3' }}>
          {/* 배경 별들 */}
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={i}
              cx={(i * 37 + 13) % 100}
              cy={(i * 53 + 7) % 75}
              r={i % 5 === 0 ? 0.4 : 0.2}
              fill="white" opacity={0.3 + (i % 4) * 0.15} />
          ))}

          {/* 선택된 별자리 선 */}
          {selected && selected.stars.map((star, i) => {
            if (i === 0) return null;
            const prev = selected.stars[i - 1];
            return (
              <line key={i}
                x1={prev.x} y1={prev.y} x2={star.x} y2={star.y}
                stroke="#a5b4fc" strokeWidth="0.6" opacity="0.7" />
            );
          })}

          {/* 선택된 별자리 별 */}
          {selected && selected.stars.map((star, i) => (
            <g key={i}>
              <circle cx={star.x} cy={star.y} r={2.5} fill="#fef08a" opacity="0.3" />
              <circle cx={star.x} cy={star.y} r={1.2} fill="#fef08a" />
            </g>
          ))}

          {/* 선택 안 된 별자리들 희미하게 */}
          {CONSTELLATIONS.filter(c => c !== selected).map(c =>
            c.stars.map((star, i) => (
              <circle key={`${c.name}-${i}`} cx={star.x} cy={star.y} r={0.5} fill="white" opacity="0.4" />
            ))
          )}
        </svg>
      </div>

      {/* 설명 카드 */}
      {selected ? (
        <div style={{
          background: 'linear-gradient(145deg, #eef2ff, #e0e7ff)',
          borderRadius: 28, padding: '28px 32px',
          border: '2px solid rgba(99,102,241,0.2)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
          display: 'flex', alignItems: 'flex-start', gap: 20,
        }}>
          <span style={{ fontSize: 60, flexShrink: 0 }}>{selected.emoji}</span>
          <div>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#4f46e5', margin: '0 0 10px', fontFamily: FONT }}>
              {selected.name}
            </p>
            <p style={{ fontSize: 18, color: '#374151', lineHeight: 1.7, margin: '0 0 14px', fontFamily: FONT }}>
              {selected.story}
            </p>
            <button onClick={() => speak(`${selected.name}. ${selected.story}`)}
              style={{
                background: 'none', border: 'none', color: '#60a5fa',
                fontSize: 14, cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT,
              }}>
              🔊 다시 듣기
            </button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 18, fontFamily: FONT }}>
          별자리를 선택하면 이야기를 들려줘요 🌟
        </p>
      )}
    </div>
  );
}
