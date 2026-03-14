import { useState, useEffect, useCallback } from 'react';
import { CONSONANTS, VOWELS } from '../data/hangul';
import { speak } from '../utils/tts';

const ALL = [...CONSONANTS, ...VOWELS];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getChoices(correct: typeof ALL[0]) {
  const others = shuffle(ALL.filter(l => l.letter !== correct.letter)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export default function Quiz() {
  const [question, setQuestion] = useState(shuffle(ALL)[0]);
  const [choices, setChoices] = useState(() => getChoices(shuffle(ALL)[0]));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const next = useCallback(() => {
    const q = shuffle(ALL)[0];
    setQuestion(q);
    setChoices(getChoices(q));
    setSelected(null);
  }, []);

  useEffect(() => {
    // 첫 문제 소리
    setTimeout(() => speak(question.name, 0.75), 300);
  }, [question]);

  function handleAnswer(letter: string) {
    if (selected) return;
    setSelected(letter);
    setTotal(t => t + 1);
    if (letter === question.letter) {
      setScore(s => s + 1);
      speak('맞았어요! 정말 잘했어요!', 0.9);
    } else {
      speak(`아쉬워요. 정답은 ${question.name} 이에요.`, 0.85);
    }
    setTimeout(next, 1800);
  }

  const correct = selected === question.letter;

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      {/* 점수 */}
      <div className="flex gap-4 mb-6 text-lg font-bold">
        <span className="text-green-500">맞음 {score}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">총 {total}</span>
      </div>

      {/* 문제 */}
      <div
        className="w-full bg-white rounded-3xl p-8 flex flex-col items-center gap-4 mb-6 shadow-lg cursor-pointer active:scale-95 transition-transform"
        onClick={() => speak(question.name, 0.75)}
        style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.15)' }}
      >
        <span className="text-5xl">{question.emoji}</span>
        <p className="text-xl text-gray-600">이 소리는 어떤 글자일까요?</p>
        <div className="flex items-center gap-2 text-purple-400 text-xl">
          <span>🔊</span>
          <span className="text-2xl font-bold text-purple-600">"{question.name}"</span>
        </div>
        <span className="text-sm text-gray-400">눌러서 다시 들어요</span>
      </div>

      {/* 보기 */}
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
          {correct ? '🎉 정말 잘했어요!' : `💪 정답은 "${question.letter}" 이에요!`}
        </p>
      )}
    </div>
  );
}
