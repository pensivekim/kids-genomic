import { useState } from 'react';
import { FONT } from '../../../styles/theme';

const CHARACTERS = [
  { id: 'bear',     emoji: '🐻', name: '곰돌이' },
  { id: 'rabbit',   emoji: '🐰', name: '토끼' },
  { id: 'fox',      emoji: '🦊', name: '여우' },
  { id: 'cat',      emoji: '🐱', name: '고양이' },
  { id: 'dinosaur', emoji: '🦕', name: '공룡' },
  { id: 'elephant', emoji: '🐘', name: '코끼리' },
  { id: 'penguin',  emoji: '🐧', name: '펭귄' },
  { id: 'lion',     emoji: '🦁', name: '사자' },
];

const SETTINGS = [
  { id: 'forest',   emoji: '🌲', name: '초록 숲속' },
  { id: 'ocean',    emoji: '🌊', name: '파란 바다' },
  { id: 'space',    emoji: '🌟', name: '별빛 우주' },
  { id: 'village',  emoji: '🏡', name: '작은 마을' },
  { id: 'mountain', emoji: '⛰️', name: '높은 산' },
  { id: 'candy',    emoji: '🍭', name: '사탕 왕국' },
];

const THEMES = [
  { id: 'friendship', emoji: '🤝', name: '우정과 나눔' },
  { id: 'courage',    emoji: '💪', name: '용기와 도전' },
  { id: 'kindness',   emoji: '💖', name: '친절과 배려' },
  { id: 'curiosity',  emoji: '🔍', name: '호기심 탐험' },
];

interface Props {
  onGenerate: (character: string, setting: string, theme: string) => void;
  error: string;
}

function SectionHeader({ step, label, color }: { step: number; label: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: `linear-gradient(135deg, ${color}18, ${color}08)`,
      border: `2px solid ${color}25`,
      borderRadius: 20, padding: '14px 22px',
      marginBottom: 20,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 900, fontSize: 20,
        flexShrink: 0, fontFamily: FONT,
        boxShadow: `0 4px 12px ${color}40`,
      }}>{step}</div>
      <p style={{ fontSize: 22, fontWeight: 900, color, margin: 0, fontFamily: FONT }}>{label}</p>
    </div>
  );
}

function PickCard({ emoji, name, selected, onClick, color }: {
  emoji: string; name: string; selected: boolean; onClick: () => void; color: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected
          ? `linear-gradient(135deg, ${color}30, ${color}18)`
          : 'rgba(255,255,255,0.85)',
        border: selected ? `3px solid ${color}` : '2px solid rgba(0,0,0,0.07)',
        borderRadius: 22,
        padding: '22px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer',
        boxShadow: selected
          ? `0 8px 28px ${color}35`
          : '0 2px 12px rgba(0,0,0,0.06)',
        transform: selected ? 'scale(1.07)' : 'scale(1)',
        transition: 'all 0.18s',
        fontFamily: FONT,
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: selected ? `${color}22` : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40,
        transition: 'all 0.18s',
      }}>
        {emoji}
      </div>
      <span style={{
        fontSize: 16, fontWeight: 800,
        color: selected ? color : '#374151',
        fontFamily: FONT,
      }}>{name}</span>
    </button>
  );
}

export default function Picker({ onGenerate, error }: Props) {
  const [character, setCharacter] = useState('');
  const [setting, setSetting] = useState('');
  const [theme, setTheme] = useState('');

  const ready = character && setting && theme;

  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '32px 40px 48px',
      fontFamily: FONT,
    }}>

      {/* 주인공 */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader step={1} label="주인공을 골라요!" color="#7c3aed" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 14,
        }}>
          {CHARACTERS.map(c => (
            <PickCard key={c.id} emoji={c.emoji} name={c.name} color="#7c3aed"
              selected={character === c.id} onClick={() => setCharacter(c.id)} />
          ))}
        </div>
      </div>

      {/* 배경 */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader step={2} label="어디서 살까요?" color="#2563eb" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 14,
        }}>
          {SETTINGS.map(s => (
            <PickCard key={s.id} emoji={s.emoji} name={s.name} color="#2563eb"
              selected={setting === s.id} onClick={() => setSetting(s.id)} />
          ))}
        </div>
      </div>

      {/* 주제 */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader step={3} label="어떤 이야기를 할까요?" color="#db2777" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {THEMES.map(t => (
            <PickCard key={t.id} emoji={t.emoji} name={t.name} color="#db2777"
              selected={theme === t.id} onClick={() => setTheme(t.id)} />
          ))}
        </div>
      </div>

      {error && (
        <p style={{ textAlign: 'center', color: '#ef4444', fontSize: 18, marginBottom: 16, fontFamily: FONT }}>
          {error}
        </p>
      )}

      <button
        onClick={() => ready && onGenerate(character, setting, theme)}
        disabled={!ready}
        style={{
          width: '100%', padding: '22px 0',
          borderRadius: 28, border: 'none',
          background: ready
            ? 'linear-gradient(135deg, #7c3aed, #db2777)'
            : '#e5e7eb',
          color: ready ? 'white' : '#9ca3af',
          fontSize: 24, fontWeight: 900,
          fontFamily: FONT, cursor: ready ? 'pointer' : 'not-allowed',
          boxShadow: ready ? '0 8px 32px rgba(124,58,237,0.4)' : 'none',
          transition: 'all 0.2s',
          letterSpacing: '-0.3px',
        }}
      >
        {ready ? '✨ 동화 만들기!' : '위에서 모두 골라요!'}
      </button>
    </div>
  );
}
