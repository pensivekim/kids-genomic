import { useState } from 'react';

interface Question {
  situation: string;
  emoji: string;
  answer: string;
  answerEmoji: string;
  options: { label: string; emoji: string }[];
}

const QUESTIONS: Question[] = [
  {
    situation: '생일 케이크에 촛불을 불었어요!',
    emoji: '🎂',
    answer: '기쁨',
    answerEmoji: '😊',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '화남', emoji: '😠' }, { label: '무서움', emoji: '😨' }],
  },
  {
    situation: '좋아하는 장난감이 망가졌어요.',
    emoji: '🧸',
    answer: '슬픔',
    answerEmoji: '😢',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '편안함', emoji: '😌' }, { label: '놀람', emoji: '😮' }],
  },
  {
    situation: '어두운 방에 갑자기 들어갔어요.',
    emoji: '🌑',
    answer: '무서움',
    answerEmoji: '😨',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '화남', emoji: '😠' }, { label: '무서움', emoji: '😨' }, { label: '편안함', emoji: '😌' }],
  },
  {
    situation: '친구가 내 블록을 부쉈어요.',
    emoji: '🧱',
    answer: '화남',
    answerEmoji: '😠',
    options: [{ label: '화남', emoji: '😠' }, { label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '놀람', emoji: '😮' }],
  },
  {
    situation: '선물 상자를 열어봤더니 원하던 거예요!',
    emoji: '🎁',
    answer: '놀람',
    answerEmoji: '😮',
    options: [{ label: '슬픔', emoji: '😢' }, { label: '놀람', emoji: '😮' }, { label: '무서움', emoji: '😨' }, { label: '화남', emoji: '😠' }],
  },
  {
    situation: '엄마 품에 안겨서 잠들었어요.',
    emoji: '🛌',
    answer: '편안함',
    answerEmoji: '😌',
    options: [{ label: '화남', emoji: '😠' }, { label: '슬픔', emoji: '😢' }, { label: '편안함', emoji: '😌' }, { label: '무서움', emoji: '😨' }],
  },
];

export default function EmotionQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = QUESTIONS[idx];
  const correct = selected === q.answer;

  function handleAnswer(label: string) {
    if (selected) return;
    setSelected(label);
    if (label === q.answer) setScore(s => s + 1);
  }

  function next() {
    if (idx < QUESTIONS.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
    }
  }

  const finished = idx === QUESTIONS.length - 1 && selected;

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      <div className="flex gap-4 mb-5 text-lg font-bold">
        <span className="text-pink-500">맞음 {score}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">총 {QUESTIONS.length}</span>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-lg text-center mb-5"
        style={{ border: '2px solid #fce7f3' }}>
        <span className="text-6xl block mb-3">{q.emoji}</span>
        <p className="text-xl text-gray-700 font-medium">{q.situation}</p>
        <p className="text-gray-400 mt-2 text-sm">이 상황에서 기분이 어떨까요?</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mb-4">
        {q.options.map(opt => {
          let bg = 'white', border = '#e5e7eb';
          if (selected) {
            if (opt.label === q.answer) { bg = '#dcfce7'; border = '#22c55e'; }
            else if (opt.label === selected) { bg = '#fee2e2'; border = '#ef4444'; }
          }
          return (
            <button key={opt.label} onClick={() => handleAnswer(opt.label)}
              className="py-4 rounded-2xl font-bold text-lg flex flex-col items-center gap-1 transition-all active:scale-95"
              style={{ background: bg, border: `3px solid ${border}` }}>
              <span className="text-3xl">{opt.emoji}</span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="text-center">
          <p className="text-xl font-bold mb-3" style={{ color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? `🎉 맞아요! ${q.answerEmoji}` : `💪 정답은 "${q.answer}" ${q.answerEmoji} 이에요!`}
          </p>
          {!finished ? (
            <button onClick={next}
              className="px-8 py-4 rounded-2xl text-white font-bold text-xl active:scale-95"
              style={{ background: '#ec4899' }}>
              다음 →
            </button>
          ) : (
            <div>
              <p className="text-2xl font-bold text-pink-600 mb-3">{score}점 / {QUESTIONS.length}점 🌟</p>
              <button onClick={() => { setIdx(0); setSelected(null); setScore(0); }}
                className="px-8 py-4 rounded-2xl text-white font-bold text-xl active:scale-95"
                style={{ background: '#ec4899' }}>
                🔄 다시
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
