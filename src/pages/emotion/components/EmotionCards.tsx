import { useState } from 'react';
import { speak } from '../../../utils/tts';

const EMOTIONS = [
  { emoji: '😊', name: '기쁨',  color: '#fbbf24', desc: '좋은 일이 생겼을 때 기뻐요. 웃음이 나와요!',              tip: '기쁠 때는 친구에게 나눠봐요 🤝' },
  { emoji: '😢', name: '슬픔',  color: '#60a5fa', desc: '마음이 아프고 눈물이 나요. 울어도 괜찮아요.',             tip: '슬플 때는 엄마, 아빠한테 안아달라고 해봐요 🤗' },
  { emoji: '😠', name: '화남',  color: '#ef4444', desc: '마음에 안 드는 일이 생기면 화가 나요.',                   tip: '화날 때는 심호흡을 10번 해봐요 🌬️' },
  { emoji: '😨', name: '무서움', color: '#8b5cf6', desc: '모르는 것이 생기면 무서울 수 있어요.',                   tip: '무서울 때는 좋아하는 인형을 꼭 안아봐요 🧸' },
  { emoji: '😮', name: '놀람',  color: '#f97316', desc: '갑자기 뜻밖의 일이 생기면 깜짝 놀라요.',                  tip: '좋은 놀람은 즐기고, 나쁜 놀람은 말해봐요!' },
  { emoji: '😌', name: '편안함', color: '#22c55e', desc: '모든 게 좋고 마음이 평온해요. 가장 좋은 느낌이에요.',     tip: '편안할 때 좋아하는 걸 더 즐겨봐요 🌈' },
  { emoji: '😔', name: '실망',  color: '#6b7280', desc: '바라던 것이 안 됐을 때 속이 상해요.',                    tip: '실망해도 괜찮아요. 다음에 또 도전해봐요 💪' },
  { emoji: '🥰', name: '사랑',  color: '#ec4899', desc: '소중한 사람이 있으면 마음이 따뜻해요.',                   tip: '사랑하는 사람에게 "사랑해"라고 말해봐요 ❤️' },
];

export default function EmotionCards() {
  const [selected, setSelected] = useState<typeof EMOTIONS[0] | null>(null);

  function handleClick(e: typeof EMOTIONS[0]) {
    setSelected(e);
    speak(`${e.name}. ${e.desc} ${e.tip}`);
  }

  return (
    <div className="px-4 pb-8 max-w-lg mx-auto">
      <p className="text-center text-gray-500 mb-4">감정을 눌러봐요!</p>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {EMOTIONS.map(e => (
          <button key={e.name} onClick={() => handleClick(e)}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white shadow-md active:scale-90 transition-all"
            style={{
              border: selected?.name === e.name ? `3px solid ${e.color}` : '2px solid #e5e7eb',
              transform: selected?.name === e.name ? 'scale(1.05)' : 'scale(1)',
            }}>
            <span className="text-4xl">{e.emoji}</span>
            <span className="text-xs font-bold text-gray-600">{e.name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-white rounded-3xl p-5 shadow-lg" style={{ border: `2px solid ${selected.color}44` }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{selected.emoji}</span>
            <p className="text-2xl font-bold" style={{ color: selected.color }}>{selected.name}</p>
          </div>
          <p className="text-base text-gray-700 leading-relaxed mb-3">{selected.desc}</p>
          <div className="rounded-2xl p-3" style={{ background: selected.color + '15' }}>
            <p className="text-sm font-bold text-gray-600">💡 이럴 때는요:</p>
            <p className="text-sm text-gray-600 mt-1">{selected.tip}</p>
          </div>
          <button onClick={() => speak(`${selected.name}. ${selected.desc} ${selected.tip}`)}
            className="mt-3 text-sm text-blue-400 underline">🔊 다시 듣기</button>
        </div>
      )}
    </div>
  );
}
