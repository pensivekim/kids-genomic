import { useRef, useState } from 'react';

const STAMPS = ['⭐', '❤️', '🌸', '🌈', '🎈', '🦋', '🌙', '☀️', '🍀', '🐾', '✨', '🎵'];
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

interface Stamp { id: number; x: number; y: number; emoji: string; size: number; }

export default function StampPlay() {
  const [stamp, setStamp] = useState('⭐');
  const [stampSize, setStampSize] = useState(40);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [bgColor, setBgColor] = useState('#fffbf0');
  const idRef = useRef(0);

  function handleCanvas(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStamps(prev => [...prev, { id: idRef.current++, x, y, emoji: stamp, size: stampSize }]);
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      {/* 도장 선택 */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {STAMPS.map(s => (
          <button
            key={s}
            onClick={() => setStamp(s)}
            className="rounded-2xl transition-transform active:scale-90 flex items-center justify-center"
            style={{
              width: 44, height: 44,
              background: stamp === s ? '#fef3c7' : '#f3f4f6',
              border: stamp === s ? '3px solid #f59e0b' : '2px solid #e5e7eb',
              fontSize: 24,
              transform: stamp === s ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 크기 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-400 text-sm">크기</span>
        {[28, 44, 60, 80].map(sz => (
          <button
            key={sz}
            onClick={() => setStampSize(sz)}
            className="rounded-full bg-gray-100 flex items-center justify-center"
            style={{ width: 44, height: 44, border: stampSize === sz ? '3px solid #f59e0b' : '2px solid transparent', fontSize: sz * 0.5 }}
          >
            ⭐
          </button>
        ))}
      </div>

      {/* 배경색 */}
      <div className="flex gap-2 mb-3">
        {COLORS.map(c => (
          <button key={c} onClick={() => setBgColor(c + '33')}
            className="rounded-full" style={{ width: 28, height: 28, background: c, border: bgColor === c + '33' ? '3px solid #000' : '2px solid #e5e7eb' }} />
        ))}
        <button onClick={() => setBgColor('#fffbf0')} className="rounded-full bg-white" style={{ width: 28, height: 28, border: '2px solid #e5e7eb' }} />
      </div>

      {/* 캔버스 */}
      <div
        className="rounded-2xl shadow-lg w-full relative overflow-hidden touch-none select-none"
        style={{ height: 340, background: bgColor, border: '3px solid #e5e7eb', cursor: 'copy' }}
        onPointerDown={handleCanvas}
      >
        {stamps.map(s => (
          <span
            key={s.id}
            className="absolute pointer-events-none select-none"
            style={{ left: s.x - s.size / 2, top: s.y - s.size / 2, fontSize: s.size, lineHeight: 1 }}
          >
            {s.emoji}
          </span>
        ))}
        {stamps.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-gray-300 text-xl">
            여기를 눌러서 도장을 찍어요! 🖐️
          </p>
        )}
      </div>

      <button
        onClick={() => setStamps([])}
        className="mt-4 px-6 py-3 rounded-2xl bg-red-100 text-red-500 font-bold active:scale-95 transition-transform"
      >
        🗑️ 처음부터
      </button>
    </div>
  );
}
