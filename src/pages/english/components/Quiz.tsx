import { useState, useEffect, useCallback } from 'react';
import { ALPHABET } from '../data/english';
import { speak } from '../utils/tts';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getChoices(correct: typeof ALPHABET[0]) {
  const others = shuffle(ALPHABET.filter(l => l.letter !== correct.letter)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export default function Quiz() {
  const [question, setQuestion] = useState(shuffle(ALPHABET)[0]);
  const [choices, setChoices] = useState(() => getChoices(shuffle(ALPHABET)[0]));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const next = useCallback(() => {
    const q = shuffle(ALPHABET)[0];
    setQuestion(q);
    setChoices(getChoices(q));
    setSelected(null);
  }, []);

  useEffect(() => {
    setTimeout(() => speak(`${question.name}. ${question.word}`, 0.8), 300);
  }, [question]);

  function handleAnswer(letter: string) {
    if (selected) return;
    setSelected(letter);
    setTotal(t => t + 1);
    const correct = letter === question.letter;
    if (correct) {
      setScore(s => s + 1);
      speak('Great job!', 0.9);
    } else {
      speak(`The answer is ${question.name}.`, 0.85);
    }
    setTimeout(next, 1800);
  }

  const correct = selected === question.letter;

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      <div className="flex gap-4 mb-6 text-lg font-bold">
        <span className="text-green-500">맞음 {score}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">총 {total}</span>
      </div>

      <div
        className="w-full bg-white rounded-3xl p-8 flex flex-col items-center gap-4 mb-6 shadow-lg cursor-pointer active:scale-95 transition-transform"
        onClick={() => speak(`${question.name}. ${question.word}`, 0.8)}
        style={{ boxShadow: '0 8px 40px rgba(245,158,11,0.15)' }}
      >
        <span className="text-6xl">{question.emoji}</span>
        <p className="text-xl text-gray-600">이 그림의 첫 글자는?</p>
        <div className="flex items-center gap-2 text-amber-400 text-xl">
          <span>🔊</span>
          <span className="text-2xl font-bold text-amber-600">"{question.word}"</span>
        </div>
        <span className="text-sm text-gray-400">눌러서 다시 들어요</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {choices.map((c) => {
          let bg = 'white';
          let border = '#e5e7eb';
          if (selected === c.letter) {
            bg = correct ? '#dcfce7' : '#fee2e2';
            border = correct ? '#22c55e' : '#ef4444';
          } else if (selected && c.letter === question.letter) {
            bg = '#dcfce7';
            border = '#22c55e';
          }
          return (
            <button
              key={c.letter}
              onClick={() => handleAnswer(c.letter)}
              className="py-6 rounded-3xl text-4xl font-bold transition-all active:scale-95"
              style={{ background: bg, border: `3px solid ${border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              {c.letter}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="mt-5 text-xl font-bold" style={{ color: correct ? '#16a34a' : '#dc2626' }}>
          {correct ? '🎉 Great job!' : `💪 정답은 "${question.letter}" 이에요!`}
        </p>
      )}
    </div>
  );
}
