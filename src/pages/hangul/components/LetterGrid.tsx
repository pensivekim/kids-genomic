import { useState } from 'react';
import { type Letter } from '../data/hangul';
import { speak } from '../utils/tts';

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
    <div className="grid grid-cols-4 gap-3 px-4 pb-8 max-w-lg mx-auto">
      {letters.map((l) => (
        <button
          key={l.letter}
          onClick={() => handleClick(l)}
          className="flex flex-col items-center gap-1 p-4 rounded-3xl bg-white shadow-md transition-all active:scale-90"
          style={{
            border: `3px solid ${active === l.letter ? color : '#e5e7eb'}`,
            transform: active === l.letter ? 'scale(1.1)' : 'scale(1)',
            boxShadow: active === l.letter ? `0 4px 20px ${color}44` : '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <span className="text-4xl font-bold" style={{ color }}>{l.letter}</span>
          <span className="text-sm text-gray-500">{l.name}</span>
          <span className="text-2xl">{l.emoji}</span>
          <span className="text-xs text-gray-400">{l.example}</span>
        </button>
      ))}
    </div>
  );
}
