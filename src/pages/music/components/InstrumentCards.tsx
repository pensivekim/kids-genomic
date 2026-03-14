import { useState } from 'react';
import { INSTRUMENTS } from '../data/music';

function speak(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

export default function InstrumentCards() {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(id: string, sound: string) {
    setActive(id);
    speak(sound);
    setTimeout(() => setActive(null), 600);
  }

  return (
    <div className="px-4 pb-8 max-w-lg mx-auto">
      <p className="text-center text-gray-500 mb-4">악기를 눌러봐요!</p>
      <div className="grid grid-cols-2 gap-4">
        {INSTRUMENTS.map((inst) => (
          <button
            key={inst.id}
            onClick={() => handleClick(inst.id, inst.sound)}
            className="flex flex-col items-center gap-2 p-5 rounded-3xl bg-white shadow-md transition-all active:scale-90"
            style={{
              border: `3px solid ${active === inst.id ? inst.color : '#e5e7eb'}`,
              transform: active === inst.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: active === inst.id ? `0 4px 20px ${inst.color}44` : '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-5xl">{inst.emoji}</span>
            <span className="text-lg font-bold" style={{ color: inst.color }}>{inst.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
