import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionCards from './components/EmotionCards';
import MoodCheck from './components/MoodCheck';
import EmotionQuiz from './components/EmotionQuiz';

type Mode = 'home' | 'cards' | 'mood' | 'quiz';

const MODES = [
  { id: 'cards', emoji: '😊', label: '감정 카드',    sublabel: '8가지 감정을 배워요!',   color: '#f59e0b', bg: '#fffbeb' },
  { id: 'mood',  emoji: '🌈', label: '오늘 기분은?', sublabel: '지금 기분을 말해봐요!',  color: '#ec4899', bg: '#fdf2f8' },
  { id: 'quiz',  emoji: '🎯', label: '감정 퀴즈',    sublabel: '어떤 기분일까요?',        color: '#8b5cf6', bg: '#f5f3ff' },
] as const;

export default function EmotionPage() {
  const [mode, setMode] = useState<Mode>('home');
  const navigate = useNavigate();
  const current = MODES.find(m => m.id === mode);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fdf2f8 50%, #f5f3ff 100%)' }}>
      <div className="text-center pt-8 pb-4 px-4">
        {mode === 'home' ? (
          <>
            <button onClick={() => navigate('/')} className="mb-4 text-pink-400 text-base underline">
              ← 세계지도로 돌아가기
            </button>
            <h1 className="text-4xl font-bold text-pink-500 mb-1">😊 감정 쉼터</h1>
            <p className="text-lg text-pink-300">내 마음을 알아봐요!</p>
          </>
        ) : (
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <button onClick={() => setMode('home')}
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl active:scale-90 transition-transform">
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
        <div className="grid grid-cols-1 gap-4 px-4 pb-8 max-w-sm mx-auto mt-4">
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id as Mode)}
              className="flex items-center gap-4 p-5 rounded-3xl shadow-md active:scale-95 transition-all"
              style={{ background: m.bg, border: `3px solid ${m.color}22` }}>
              <span className="text-5xl">{m.emoji}</span>
              <div className="text-left">
                <p className="text-xl font-bold" style={{ color: m.color }}>{m.label}</p>
                <p className="text-sm text-gray-400">{m.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === 'cards' && <div className="mt-4"><EmotionCards /></div>}
      {mode === 'mood'  && <div className="mt-4"><MoodCheck /></div>}
      {mode === 'quiz'  && <div className="mt-6"><EmotionQuiz /></div>}
    </div>
  );
}
