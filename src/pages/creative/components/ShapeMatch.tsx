import { useState } from 'react';

interface Puzzle {
  question: string;
  emoji: string;
  options: string[];
  answer: string;
}

const PUZZLES: Puzzle[] = [
  { question: '피자 한 조각은 어떤 모양일까요?', emoji: '🍕', options: ['삼각형', '사각형', '원', '별'], answer: '삼각형' },
  { question: '시계는 어떤 모양일까요?', emoji: '🕐', options: ['삼각형', '원', '별', '하트'], answer: '원' },
  { question: '책은 어떤 모양일까요?', emoji: '📚', options: ['원', '삼각형', '사각형', '별'], answer: '사각형' },
  { question: '당근 단면은 어떤 모양일까요?', emoji: '🥕', options: ['원', '삼각형', '사각형', '별'], answer: '원' },
  { question: '수박 씨는 어떤 모양일까요?', emoji: '🍉', options: ['삼각형', '원', '사각형', '별'], answer: '타원' },
  { question: '별사탕은 어떤 모양일까요?', emoji: '🍬', options: ['원', '삼각형', '별', '사각형'], answer: '별' },
];

const SHAPE_EMOJI: Record<string, string> = {
  '삼각형': '🔺', '사각형': '🟦', '원': '🔵', '별': '⭐', '하트': '❤️', '타원': '🥚',
};

export default function ShapeMatch() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const puzzle = PUZZLES[idx];
  const correct = selected === puzzle.answer;

  function next() {
    setIdx(i => (i + 1) % PUZZLES.length);
    setSelected(null);
  }

  // options를 4개로 보장 (answer가 없으면 추가)
  const opts = puzzle.options.includes(puzzle.answer)
    ? puzzle.options
    : [...puzzle.options.slice(0, 3), puzzle.answer].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      <div className="w-full bg-white rounded-3xl p-6 shadow-lg text-center mb-6"
        style={{ border: '2px solid #e5e7eb' }}>
        <span className="text-7xl">{puzzle.emoji}</span>
        <p className="text-xl text-gray-700 font-medium mt-3">{puzzle.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mb-4">
        {opts.map(opt => {
          let bg = 'white', border = '#e5e7eb', textColor = '#374151';
          if (selected) {
            if (opt === puzzle.answer) { bg = '#dcfce7'; border = '#22c55e'; textColor = '#16a34a'; }
            else if (opt === selected) { bg = '#fee2e2'; border = '#ef4444'; textColor = '#dc2626'; }
          }
          return (
            <button key={opt} onClick={() => !selected && setSelected(opt)}
              className="py-5 rounded-2xl text-xl font-bold transition-all active:scale-95 flex flex-col items-center gap-1"
              style={{ background: bg, border: `3px solid ${border}`, color: textColor }}>
              <span className="text-3xl">{SHAPE_EMOJI[opt] || '❓'}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4" style={{ color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? '🎉 맞았어요!' : `💪 정답은 "${puzzle.answer}"예요!`}
          </p>
          <button onClick={next}
            className="px-8 py-4 rounded-2xl text-white font-bold text-xl active:scale-95"
            style={{ background: '#c026d3' }}>
            다음 문제 →
          </button>
        </div>
      )}

      <p className="mt-4 text-gray-400 text-sm">{idx + 1} / {PUZZLES.length}</p>
    </div>
  );
}
