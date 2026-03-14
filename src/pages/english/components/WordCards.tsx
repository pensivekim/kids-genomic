import { useState } from 'react';
import { WORDS } from '../data/english';
import { speak } from '../utils/tts';

export default function WordCards() {
  const [idx, setIdx] = useState(0);
  const card = WORDS[idx];

  function prev() { setIdx((i) => (i - 1 + WORDS.length) % WORDS.length); }
  function next() { setIdx((i) => (i + 1) % WORDS.length); }

  return (
    <div className="flex flex-col items-center px-4 pb-8">
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center gap-4 mb-6 cursor-pointer active:scale-95 transition-transform"
        style={{ boxShadow: '0 8px 40px rgba(245,158,11,0.2)' }}
        onClick={() => speak(card.word, 0.75)}
      >
        <span className="text-9xl">{card.emoji}</span>
        <span className="text-5xl font-bold text-amber-500">{card.word}</span>
        <span className="text-2xl text-gray-400">{card.meaning}</span>
        <div className="flex items-center gap-2 text-amber-400 text-lg">
          <span>🔊</span>
          <span>눌러서 들어봐요!</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          className="w-14 h-14 rounded-full bg-amber-100 text-amber-500 text-2xl font-bold flex items-center justify-center active:scale-90 transition-transform"
        >
          ◀
        </button>
        <span className="text-gray-400 text-lg">{idx + 1} / {WORDS.length}</span>
        <button
          onClick={next}
          className="w-14 h-14 rounded-full bg-amber-100 text-amber-500 text-2xl font-bold flex items-center justify-center active:scale-90 transition-transform"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
