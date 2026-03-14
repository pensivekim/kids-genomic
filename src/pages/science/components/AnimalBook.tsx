import { useState } from 'react';
import { ANIMALS, type Animal } from '../data/science';

type Category = 'land' | 'sea' | 'sky';

const TABS: { id: Category; label: string; emoji: string; color: string }[] = [
  { id: 'land', label: '육지', emoji: '🌿', color: '#22c55e' },
  { id: 'sea',  label: '바다', emoji: '🌊', color: '#3b82f6' },
  { id: 'sky',  label: '하늘', emoji: '☁️', color: '#8b5cf6' },
];

function speak(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR'; u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

export default function AnimalBook() {
  const [tab, setTab] = useState<Category>('land');
  const [selected, setSelected] = useState<Animal | null>(null);

  const animals = ANIMALS.filter(a => a.category === tab);
  const tabInfo = TABS.find(t => t.id === tab)!;

  function handleClick(a: Animal) {
    setSelected(a);
    speak(`${a.name}. ${a.fact}`);
  }

  return (
    <div className="px-4 pb-8 max-w-lg mx-auto">
      {/* 탭 */}
      <div className="flex gap-2 justify-center mb-4">
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelected(null); }}
            className="px-5 py-2 rounded-full font-bold text-sm transition-all"
            style={{ background: tab === t.id ? t.color : '#f3f4f6', color: tab === t.id ? 'white' : '#6b7280' }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* 동물 그리드 */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {animals.map(a => (
          <button key={a.name} onClick={() => handleClick(a)}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white shadow-md transition-all active:scale-90"
            style={{ border: selected?.name === a.name ? `3px solid ${tabInfo.color}` : '2px solid #e5e7eb' }}>
            <span className="text-4xl">{a.emoji}</span>
            <span className="text-xs font-bold text-gray-600">{a.name}</span>
          </button>
        ))}
      </div>

      {/* 선택된 동물 설명 */}
      {selected ? (
        <div className="bg-white rounded-3xl p-5 shadow-lg flex items-start gap-4"
          style={{ border: `2px solid ${tabInfo.color}33` }}>
          <span className="text-6xl">{selected.emoji}</span>
          <div>
            <p className="text-xl font-bold text-gray-800 mb-1">{selected.name}</p>
            <p className="text-base text-gray-600 leading-relaxed">{selected.fact}</p>
            <button onClick={() => speak(`${selected.name}. ${selected.fact}`)}
              className="mt-2 text-sm text-blue-400 underline">🔊 다시 듣기</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">동물을 눌러봐요!</p>
      )}
    </div>
  );
}
