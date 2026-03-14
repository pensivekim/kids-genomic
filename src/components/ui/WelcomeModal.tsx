import { useState, useEffect, useRef } from 'react';

interface Props {
  onDone: (name: string) => void;
}

export default function WelcomeModal({ onDone }: Props) {
  const [name, setName] = useState('');
  const [step] = useState<'input' | 'hi'>(
    localStorage.getItem('kidsName') ? 'hi' : 'input'
  );
  const [displayName] = useState(localStorage.getItem('kidsName') || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'input') setTimeout(() => inputRef.current?.focus(), 300);
  }, [step]);

  // 재방문: 바로 hi 단계 → 1.5초 후 자동 닫기
  useEffect(() => {
    if (step === 'hi') {
      speak(`안녕, ${displayName}야! 오늘도 같이 놀자!`);
      const t = setTimeout(() => onDone(displayName), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  function speak(text: string) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = 0.85; u.pitch = 1.2;
    window.speechSynthesis.speak(u);
  }

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem('kidsName', trimmed);
    speak(`안녕, ${trimmed}야! 어서 와! 같이 놀자!`);
    onDone(trimmed);
  }

  if (step === 'hi') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #dbeafe 50%, #f0fdf4 100%)' }}>
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">🐰</div>
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            안녕, {displayName}야!
          </h1>
          <p className="text-xl text-green-500">오늘도 같이 놀자! 🌟</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #dbeafe 50%, #f0fdf4 100%)' }}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
        {/* 마스코트 */}
        <div className="text-8xl mb-4 animate-bounce">🐰</div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">어서 와요!</h1>
        <p className="text-lg text-gray-500 mb-6">이름이 뭐예요?</p>

        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="이름을 써봐요"
          maxLength={8}
          className="w-full text-center text-2xl font-bold rounded-2xl border-3 border-green-300 p-4 mb-4 outline-none focus:border-green-500 transition-colors"
          style={{ border: '3px solid #86efac', fontSize: '1.5rem' }}
        />

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full py-4 rounded-2xl text-white text-2xl font-bold transition-all active:scale-95 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #4ade80, #22c55e)' }}
        >
          입장! 🌳
        </button>
      </div>
    </div>
  );
}
