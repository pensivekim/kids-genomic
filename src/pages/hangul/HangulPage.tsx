import { useState } from 'react';
import LetterGrid from './components/LetterGrid';
import WordCards from './components/WordCards';
import Quiz from './components/Quiz';
import { CONSONANTS, VOWELS } from './data/hangul';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'consonant' | 'vowel' | 'word' | 'quiz';

const MODES = [
  { id: 'consonant', emoji: '🔤', label: '자음 배우기', sublabel: 'ㄱㄴㄷ...', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'vowel',     emoji: '🅰️', label: '모음 배우기', sublabel: 'ㅏㅑㅓ...', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'word',      emoji: '📝', label: '단어 카드',   sublabel: '낱말 익히기', color: '#f97316', bg: '#fff7ed' },
  { id: 'quiz',      emoji: '🎯', label: '퀴즈 놀이',   sublabel: '맞춰 봐요!', color: '#10b981', bg: '#ecfdf5' },
] as const;

export default function HangulPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #fef9c3 0%, #dbeafe 50%, #f0fdf4 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🔤" title="한글 나라" color="#3b82f6" />

      <div style={{ paddingTop: 80 }}>
        {mode !== 'home' && (
          <div className="text-center pt-4 pb-2 px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button
                onClick={() => setMode('home')}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform"
              >
                ←
              </button>
              <h2 className="text-2xl font-bold" style={{ color: current?.color }}>
                {current?.emoji} {current?.label}
              </h2>
              <div className="w-12" />
            </div>
          </div>
        )}

        {mode === 'home' && (
          <div className="grid grid-cols-2 gap-4 px-8 pb-8 max-w-4xl mx-auto mt-6">
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
    </div>
  );
}
