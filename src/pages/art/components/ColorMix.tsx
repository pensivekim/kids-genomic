import { useState } from 'react';

interface Mix { a: string; b: string; result: string; name: string; emoji: string; }

const MIXES: Mix[] = [
  { a: '#ef4444', b: '#eab308', result: '#f97316', name: '주황색', emoji: '🍊' },
  { a: '#ef4444', b: '#3b82f6', result: '#8b5cf6', name: '보라색', emoji: '🍇' },
  { a: '#eab308', b: '#3b82f6', result: '#22c55e', name: '초록색', emoji: '🌿' },
  { a: '#ef4444', b: '#ffffff', result: '#fca5a5', name: '분홍색', emoji: '🌸' },
  { a: '#3b82f6', b: '#ffffff', result: '#93c5fd', name: '하늘색', emoji: '☁️' },
  { a: '#000000', b: '#ffffff', result: '#9ca3af', name: '회색',   emoji: '🌫️' },
];

const COLOR_NAMES: Record<string, string> = {
  '#ef4444': '빨간색 🔴',
  '#eab308': '노란색 🟡',
  '#3b82f6': '파란색 🔵',
  '#ffffff': '흰색 ⚪',
  '#000000': '검은색 ⚫',
};

export default function ColorMix() {
  const [selected, setSelected] = useState<Mix | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(mix: Mix) {
    setSelected(mix);
    setRevealed(false);
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      <p className="text-center text-gray-500 mb-6 text-lg">색을 섞으면 어떻게 될까요?</p>

      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {MIXES.map((mix, i) => (
          <button
            key={i}
            onClick={() => handleSelect(mix)}
            className="flex items-center gap-2 p-4 rounded-2xl bg-white shadow transition-all active:scale-95"
            style={{ border: selected === mix ? '3px solid #6366f1' : '2px solid #e5e7eb' }}
          >
            <div className="w-8 h-8 rounded-full" style={{ background: mix.a }} />
            <span className="text-xl font-bold text-gray-400">+</span>
            <div className="w-8 h-8 rounded-full" style={{ background: mix.b }} />
            <span className="text-xl font-bold text-gray-400">=</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
              ?
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full shadow" style={{ background: selected.a }} />
              <span className="text-xs text-gray-500">{COLOR_NAMES[selected.a]}</span>
            </div>
            <span className="text-3xl font-bold text-gray-400">+</span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full shadow" style={{ background: selected.b }} />
              <span className="text-xs text-gray-500">{COLOR_NAMES[selected.b]}</span>
            </div>
            <span className="text-3xl font-bold text-gray-400">=</span>
            {revealed ? (
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full shadow" style={{ background: selected.result }} />
                <span className="text-xs text-gray-500">{selected.name}</span>
              </div>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl active:scale-90"
              >
                ?
              </button>
            )}
          </div>

          {revealed && (
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {selected.emoji} {selected.name}이 됐어요!
            </p>
          )}
          {!revealed && (
            <p className="text-gray-400">? 를 눌러서 확인해봐요!</p>
          )}
        </div>
      )}
    </div>
  );
}
