import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterGrid from './components/LetterGrid';
import WordCards from './components/WordCards';
import Quiz from './components/Quiz';
import { CONSONANTS, VOWELS } from './data/hangul';

type Mode = 'home' | 'consonant' | 'vowel' | 'word' | 'quiz';

const MODES = [
  { id: 'consonant', emoji: '🔤', label: '자음 배우기', sublabel: 'ㄱㄴㄷ...', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'vowel',     emoji: '🅰️', label: '모음 배우기', sublabel: 'ㅏㅑㅓ...', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'word',      emoji: '📝', label: '단어 카드',   sublabel: '낱말 익히기', color: '#f97316', bg: '#fff7ed' },
  { id: 'quiz',      emoji: '🎯', label: '퀴즈 놀이',   sublabel: '맞춰 봐요!', color: '#10b981', bg: '#ecfdf5' },
] as const;

export default function HangulPage() {
  const [mode, setMode] = useState<Mode>('home');
  const navigate = useNavigate();
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #dbeafe 50%, #f0fdf4 100%)' }}>
      <div className="text-center pt-8 pb-4 px-4">
        {mode === 'home' ? (
          <>
            <button
              onClick={() => navigate('/')}
              className="mb-4 text-blue-400 text-base underline"
            >
              ← 세계지도로 돌아가기
            </button>
            <h1 className="text-4xl font-bold text-blue-700 mb-1">🔤 한글 나라</h1>
            <p className="text-lg text-blue-400">한글을 재미있게 배워요!</p>
          </>
        ) : (
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <button
              onClick={() => setMode('home')}
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold" style={{ color: current?.color }}>
              {current?.emoji} {current?.label}
            </h1>
            <div className="w-12" />
          </div>
        )}
      </div>

      {mode === 'home' && (
        <div className="grid grid-cols-2 gap-4 px-4 pb-8 max-w-lg mx-auto mt-4">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as Mode)}
              className="flex flex-col items-center gap-2 p-6 rounded-3xl shadow-md active:scale-95 transition-all"
              style={{ background: m.bg, border: `3px solid ${m.color}22` }}
            >
              <span className="text-5xl">{m.emoji}</span>
              <span className="text-xl font-bold" style={{ color: m.color }}>{m.label}</span>
              <span className="text-sm text-gray-400">{m.sublabel}</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'consonant' && (
        <div className="mt-4">
          <p className="text-center text-gray-500 mb-4">글자를 누르면 소리가 나요!</p>
          <LetterGrid letters={CONSONANTS} color="#3b82f6" />
        </div>
      )}

      {mode === 'vowel' && (
        <div className="mt-4">
          <p className="text-center text-gray-500 mb-4">글자를 누르면 소리가 나요!</p>
          <LetterGrid letters={VOWELS} color="#8b5cf6" />
        </div>
      )}

      {mode === 'word' && (
        <div className="mt-6">
          <WordCards />
        </div>
      )}

      {mode === 'quiz' && (
        <div className="mt-6">
          <Quiz />
        </div>
      )}
    </div>
  );
}
