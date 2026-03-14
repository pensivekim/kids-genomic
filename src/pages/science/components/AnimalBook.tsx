import { useState } from 'react';
import { ANIMALS, type Animal } from '../data/science';
import { speak } from '../../../utils/tts';
import { FONT } from '../../../styles/theme';

type Category = 'land' | 'sea' | 'sky';

const TABS: { id: Category; label: string; emoji: string; color: string }[] = [
  { id: 'land', label: '육지', emoji: '🌿', color: '#22c55e' },
  { id: 'sea',  label: '바다', emoji: '🌊', color: '#3b82f6' },
  { id: 'sky',  label: '하늘', emoji: '☁️', color: '#8b5cf6' },
];

export default function AnimalBook() {
  const [tab, setTab] = useState<Category>('land');
  const [selected, setSelected] = useState<Animal | null>(null);

  const animals = ANIMALS.filter(a => a.category === tab);
  const tabInfo = TABS.find(t => t.id === tab)!;

  function handleClick(a: Animal) {
    setSelected(a);
    speak(`${a.name}. ${a.fact}`);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      {/* 탭 */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelected(null); }}
            style={{
              padding: '12px 32px', borderRadius: 24, border: 'none',
              background: tab === t.id
                ? `linear-gradient(135deg, ${t.color}, ${t.color}cc)`
                : 'rgba(255,255,255,0.85)',
              color: tab === t.id ? 'white' : '#6b7280',
              fontSize: 18, fontWeight: 900, fontFamily: FONT, cursor: 'pointer',
              boxShadow: tab === t.id ? `0 4px 16px ${t.color}40` : '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
            }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* 동물 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 16, marginBottom: 24,
      }}>
        {animals.map(a => {
          const isSelected = selected?.name === a.name;
          return (
            <button key={a.name} onClick={() => handleClick(a)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '20px 12px',
                borderRadius: 24,
                background: isSelected
                  ? `linear-gradient(135deg, ${tabInfo.color}25, ${tabInfo.color}12)`
                  : 'rgba(255,255,255,0.9)',
                border: `3px solid ${isSelected ? tabInfo.color : 'rgba(0,0,0,0.07)'}`,
                boxShadow: isSelected ? `0 8px 24px ${tabInfo.color}30` : '0 2px 12px rgba(0,0,0,0.06)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.18s', cursor: 'pointer', fontFamily: FONT,
              }}>
              <span style={{ fontSize: 48 }}>{a.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: isSelected ? tabInfo.color : '#374151' }}>
                {a.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 동물 설명 */}
      {selected ? (
        <div style={{
          background: `linear-gradient(145deg, ${tabInfo.color}12, ${tabInfo.color}06)`,
          borderRadius: 28, padding: '28px 32px',
          border: `2px solid ${tabInfo.color}25`,
          boxShadow: `0 8px 32px ${tabInfo.color}15`,
          display: 'flex', alignItems: 'flex-start', gap: 24,
        }}>
          <span style={{ fontSize: 72, flexShrink: 0 }}>{selected.emoji}</span>
          <div>
            <p style={{ fontSize: 26, fontWeight: 900, color: tabInfo.color, margin: '0 0 10px', fontFamily: FONT }}>
              {selected.name}
            </p>
            <p style={{ fontSize: 18, color: '#374151', lineHeight: 1.7, margin: '0 0 16px', fontFamily: FONT }}>
              {selected.fact}
            </p>
            <button onClick={() => speak(`${selected.name}. ${selected.fact}`)}
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
          동물을 눌러봐요!
        </p>
      )}
    </div>
  );
}
