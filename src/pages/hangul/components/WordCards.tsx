import { useState } from 'react';
import { WORDS } from '../data/hangul';
import { speak } from '../utils/tts';

export default function WordCards() {
  const [idx, setIdx] = useState(0);
  const card = WORDS[idx];

  function handleSpeak() {
    speak(card.word, 0.7);
  }

  function prev() {
    setIdx((i) => (i - 1 + WORDS.length) % WORDS.length);
  }
  function next() {
    setIdx((i) => (i + 1) % WORDS.length);
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8">
      {/* 카드 */}
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center gap-4 mb-6 cursor-pointer active:scale-95 transition-transform"
        style={{ boxShadow: '0 8px 40px rgba(234,88,12,0.15)' }}
        onClick={handleSpeak}
      >
        <span className="text-9xl">{card.emoji}</span>
        <span className="text-5xl font-bold text-orange-500">{card.word}</span>
        <span className="text-xl text-gray-400">{card.syllables}</span>
        <div className="flex items-center gap-2 text-orange-400 text-lg">
          <span>🔊</span>
          <span>눌러서 들어봐요!</span>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          className="w-14 h-14 rounded-full bg-orange-100 text-orange-500 text-2xl font-bold flex items-center justify-center active:scale-90 transition-transform"
        >
          ◀
        </button>
        <span className="text-gray-400 text-lg">{idx + 1} / {WORDS.length}</span>
        <button
          onClick={next}
          className="w-14 h-14 rounded-full bg-orange-100 text-orange-500 text-2xl font-bold flex items-center justify-center active:scale-90 transition-transform"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
