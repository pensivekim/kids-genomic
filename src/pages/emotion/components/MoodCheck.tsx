import { useState } from 'react';
import { speak } from '../../../utils/tts';

const MOODS = [
  { emoji: '😁', label: '너무 좋아!', color: '#fbbf24', message: '와! 오늘 기분이 최고예요! 그 기쁨을 친구와 나눠봐요 🌟', activity: '좋아하는 노래 크게 불러봐요 🎵' },
  { emoji: '😊', label: '좋아요',     color: '#22c55e', message: '기분이 좋네요! 오늘도 즐거운 하루예요 😊',              activity: '오늘 좋았던 일 하나를 생각해봐요 ✨' },
  { emoji: '😐', label: '보통이에요', color: '#94a3b8', message: '그럴 수도 있어요. 특별한 걸 해보면 어떨까요?',           activity: '좋아하는 간식 먹어봐요 🍎' },
  { emoji: '😔', label: '별로예요',   color: '#6b7280', message: '속상한 일이 있었나요? 말해보면 나아질 거예요.',           activity: '좋아하는 책을 읽어봐요 📚' },
  { emoji: '😢', label: '슬퍼요',     color: '#60a5fa', message: '많이 속상하군요. 엄마, 아빠한테 안아달라고 해봐요.',      activity: '엄마, 아빠 손 잡아봐요 🤝' },
];

export default function MoodCheck() {
  const [selected, setSelected] = useState<typeof MOODS[0] | null>(null);

  function handleMood(mood: typeof MOODS[0]) {
    setSelected(mood);
    speak(`${mood.message} ${mood.activity}`);
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      <div className="w-full bg-white rounded-3xl p-6 shadow-lg text-center mb-6"
        style={{ border: '2px solid #fce7f3' }}>
        <p className="text-2xl font-bold text-pink-600 mb-1">오늘 기분이 어때요?</p>
        <p className="text-gray-400 text-sm">솔직하게 골라봐요!</p>
      </div>

      <div className="flex flex-col gap-3 w-full mb-6">
        {MOODS.map(mood => (
          <button key={mood.label} onClick={() => handleMood(mood)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow transition-all active:scale-95"
            style={{
              border: selected?.label === mood.label ? `3px solid ${mood.color}` : '2px solid #e5e7eb',
              background: selected?.label === mood.label ? mood.color + '10' : 'white',
            }}>
            <span className="text-4xl">{mood.emoji}</span>
            <span className="text-xl font-bold" style={{ color: mood.color }}>{mood.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="w-full bg-white rounded-3xl p-5 shadow-lg text-center"
          style={{ border: `2px solid ${selected.color}44` }}>
          <span className="text-6xl mb-3 block">{selected.emoji}</span>
          <p className="text-lg text-gray-700 leading-relaxed mb-3">{selected.message}</p>
          <div className="rounded-2xl p-3 mb-2" style={{ background: selected.color + '15' }}>
            <p className="text-sm font-bold text-gray-500 mb-1">💡 이렇게 해봐요!</p>
            <p className="text-base font-bold" style={{ color: selected.color }}>{selected.activity}</p>
          </div>
          <button onClick={() => speak(`${selected.message} ${selected.activity}`)}
            className="text-sm text-blue-400 underline">🔊 다시 듣기</button>
        </div>
      )}
    </div>
  );
}
