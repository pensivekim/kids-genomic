import { useState } from 'react';

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

function PickCard({ emoji, name, selected, onClick }: {
  emoji: string; name: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-3xl border-4 transition-all active:scale-95"
      style={{
        borderColor: selected ? '#a855f7' : '#e9d5ff',
        background: selected ? '#f3e8ff' : 'white',
        transform: selected ? 'scale(1.08)' : 'scale(1)',
        boxShadow: selected ? '0 4px 20px rgba(168,85,247,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <span className="text-5xl">{emoji}</span>
      <span className="text-lg font-bold text-gray-700">{name}</span>
    </button>
  );
}

export default function Picker({ onGenerate, error }: Props) {
  const [character, setCharacter] = useState('');
  const [setting, setSetting] = useState('');
  const [theme, setTheme] = useState('');

  const ready = character && setting && theme;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">

      {/* 주인공 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          1️⃣ 주인공을 골라요!
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {CHARACTERS.map(c => (
            <PickCard key={c.id} emoji={c.emoji} name={c.name}
              selected={character === c.id} onClick={() => setCharacter(c.id)} />
          ))}
        </div>
      </div>

      {/* 배경 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          2️⃣ 어디서 살까요?
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {SETTINGS.map(s => (
            <PickCard key={s.id} emoji={s.emoji} name={s.name}
              selected={setting === s.id} onClick={() => setSetting(s.id)} />
          ))}
        </div>
      </div>

      {/* 주제 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          3️⃣ 어떤 이야기를 할까요?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map(t => (
            <PickCard key={t.id} emoji={t.emoji} name={t.name}
              selected={theme === t.id} onClick={() => setTheme(t.id)} />
          ))}
        </div>
      </div>

      {/* 오류 */}
      {error && (
        <p className="text-center text-red-500 text-lg mb-4">{error}</p>
      )}

      {/* 생성 버튼 */}
      <button
        onClick={() => ready && onGenerate(character, setting, theme)}
        disabled={!ready}
        className="w-full py-5 rounded-3xl text-2xl font-bold text-white transition-all active:scale-95"
        style={{
          background: ready
            ? 'linear-gradient(135deg, #a855f7, #ec4899)'
            : '#d1d5db',
          cursor: ready ? 'pointer' : 'not-allowed',
          boxShadow: ready ? '0 6px 24px rgba(168,85,247,0.4)' : 'none',
        }}
      >
        {ready ? '✨ 동화 만들기!' : '위에서 모두 골라요!'}
      </button>
    </div>
  );
}
