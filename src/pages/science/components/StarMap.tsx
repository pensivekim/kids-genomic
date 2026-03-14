import { useState } from 'react';
import { CONSTELLATIONS, type Star } from '../data/science';

function speak(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR'; u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

export default function StarMap() {
  const [selected, setSelected] = useState<Star | null>(null);

  function handleSelect(s: Star) {
    setSelected(s);
    speak(`${s.name}. ${s.story}`);
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      <p className="text-center text-gray-400 mb-4">별자리를 눌러봐요! ✨</p>

      {/* 별자리 선택 */}
      <div className="flex gap-3 mb-5 flex-wrap justify-center">
        {CONSTELLATIONS.map(c => (
          <button key={c.name} onClick={() => handleSelect(c)}
            className="px-4 py-2 rounded-full font-bold text-sm transition-all"
            style={{
              background: selected?.name === c.name ? '#1e1b4b' : '#f3f4f6',
              color: selected?.name === c.name ? '#c7d2fe' : '#374151',
              border: selected?.name === c.name ? '2px solid #6366f1' : '2px solid transparent',
            }}>
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* 밤하늘 SVG */}
      <div className="w-full rounded-3xl overflow-hidden shadow-2xl mb-4" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a4e 60%, #24243e 100%)', aspectRatio: '4/3' }}>
        <svg viewBox="0 0 100 75" className="w-full h-full">
          {/* 배경 별들 */}
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={i}
              cx={(i * 37 + 13) % 100}
              cy={(i * 53 + 7) % 75}
              r={i % 5 === 0 ? 0.4 : 0.2}
              fill="white" opacity={0.3 + (i % 4) * 0.15} />
          ))}

          {/* 선택된 별자리 선 */}
          {selected && selected.stars.map((star, i) => {
            if (i === 0) return null;
            const prev = selected.stars[i - 1];
            return (
              <line key={i}
                x1={prev.x} y1={prev.y} x2={star.x} y2={star.y}
                stroke="#a5b4fc" strokeWidth="0.5" opacity="0.6" />
            );
          })}

          {/* 선택된 별자리 별 */}
          {selected && selected.stars.map((star, i) => (
            <g key={i}>
              <circle cx={star.x} cy={star.y} r={2} fill="#fef08a" opacity="0.3" />
              <circle cx={star.x} cy={star.y} r={1} fill="#fef08a" />
            </g>
          ))}

          {/* 선택 안 된 별자리들도 희미하게 */}
          {CONSTELLATIONS.filter(c => c !== selected).map(c =>
            c.stars.map((star, i) => (
              <circle key={`${c.name}-${i}`} cx={star.x} cy={star.y} r={0.5} fill="white" opacity="0.4" />
            ))
          )}
        </svg>
      </div>

      {/* 설명 카드 */}
      {selected ? (
        <div className="w-full bg-white rounded-3xl p-5 shadow-lg flex items-start gap-4">
          <span className="text-5xl">{selected.emoji}</span>
          <div>
            <p className="text-xl font-bold text-indigo-700 mb-1">{selected.name}</p>
            <p className="text-base text-gray-600 leading-relaxed">{selected.story}</p>
            <button onClick={() => speak(`${selected.name}. ${selected.story}`)}
              className="mt-2 text-sm text-blue-400 underline">🔊 다시 듣기</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-base">별자리를 선택하면 이야기를 들려줘요 🌟</p>
      )}
    </div>
  );
}
