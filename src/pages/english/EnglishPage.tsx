import { useState } from 'react';
import AlphabetGrid from './components/AlphabetGrid';
import WordCards from './components/WordCards';
import Quiz from './components/Quiz';
import { ALPHABET } from './data/english';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'alphabet' | 'word' | 'quiz';

const MODES = [
  { id: 'alphabet', emoji: '🔤', label: 'ABC 배우기',  sublabel: 'A B C D...', color: '#f59e0b', bg: '#fffbeb' },
  { id: 'word',     emoji: '📝', label: '단어 카드',   sublabel: '그림으로 배워요', color: '#10b981', bg: '#ecfdf5' },
  { id: 'quiz',     emoji: '🎯', label: '퀴즈 놀이',   sublabel: '맞춰 봐요!',  color: '#3b82f6', bg: '#eff6ff' },
] as const;

export default function EnglishPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #d1fae5 50%, #dbeafe 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🌍" title="영어 마을" color="#d97706" />

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
          <>
            {/* 알파벳 띠 */}
            <div className="mt-4 overflow-x-auto">
              <div className="flex gap-2 px-4 py-2 w-max mx-auto">
                {ALPHABET.slice(0, 13).map(l => (
                  <span key={l.letter} className="text-2xl font-bold text-amber-300">{l.letter}</span>
                ))}
              </div>
              <div className="flex gap-2 px-4 py-1 w-max mx-auto">
                {ALPHABET.slice(13).map(l => (
                  <span key={l.letter} className="text-2xl font-bold text-amber-300">{l.letter}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-8 pb-8 max-w-4xl mx-auto mt-4">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  className="flex items-center gap-4 p-5 rounded-3xl shadow-md active:scale-95 transition-all"
                  style={{ background: m.bg, border: `3px solid ${m.color}22` }}
                >
                  <span className="text-5xl">{m.emoji}</span>
                  <div className="text-left">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.label}</p>
                    <p className="text-sm text-gray-400">{m.sublabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {mode === 'alphabet' && (
          <div className="mt-4">
            <p className="text-center text-gray-500 mb-4">글자를 누르면 소리가 나요!</p>
            <AlphabetGrid letters={ALPHABET} />
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
