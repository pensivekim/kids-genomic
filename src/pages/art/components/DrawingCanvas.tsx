import { useRef, useState, useEffect } from 'react';

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#ec4899', '#000000',
  '#ffffff', '#a3a3a3', '#92400e', '#065f46',
];
const SIZES = [4, 10, 20, 36];

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#ef4444');
  const [size, setSize] = useState(10);
  const [eraser, setEraser] = useState(false);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#fffbf0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function getPos(e: React.PointerEvent) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function draw(e: React.PointerEvent) {
    if (!drawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = size;
    ctx.strokeStyle = eraser ? '#fffbf0' : color;

    ctx.beginPath();
    if (last.current) {
      ctx.moveTo(last.current.x, last.current.y);
    } else {
      ctx.moveTo(pos.x, pos.y);
    }
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last.current = pos;
  }

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#fffbf0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function download() {
    const canvas = canvasRef.current!;
    const a = document.createElement('a');
    a.download = 'my-art.png';
    a.href = canvas.toDataURL();
    a.click();
  }

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      {/* 색상 팔레트 */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); setEraser(false); }}
            className="rounded-full transition-transform active:scale-90"
            style={{
              width: 36, height: 36,
              background: c,
              border: color === c && !eraser ? '3px solid #6366f1' : '2px solid #e5e7eb',
              transform: color === c && !eraser ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* 굵기 + 지우개 */}
      <div className="flex items-center gap-3 mb-3">
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => { setSize(s); setEraser(false); }}
            className="rounded-full bg-gray-200 flex items-center justify-center transition-all"
            style={{
              width: 44, height: 44,
              border: size === s && !eraser ? '3px solid #6366f1' : '2px solid transparent',
            }}
          >
            <div className="rounded-full bg-gray-700" style={{ width: s * 0.8, height: s * 0.8, maxWidth: 32, maxHeight: 32 }} />
          </button>
        ))}
        <button
          onClick={() => setEraser(e => !e)}
          className="px-4 py-2 rounded-full font-bold text-sm transition-all"
          style={{ background: eraser ? '#6366f1' : '#f3f4f6', color: eraser ? 'white' : '#374151' }}
        >
          지우개
        </button>
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="rounded-2xl shadow-lg w-full touch-none"
        style={{ cursor: eraser ? 'cell' : 'crosshair', border: '3px solid #e5e7eb' }}
        onPointerDown={e => { drawing.current = true; last.current = null; draw(e); (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={draw}
        onPointerUp={() => { drawing.current = false; last.current = null; }}
        onPointerLeave={() => { drawing.current = false; last.current = null; }}
      />

      {/* 버튼 */}
      <div className="flex gap-4 mt-4">
        <button onClick={clear} className="px-6 py-3 rounded-2xl bg-red-100 text-red-500 font-bold active:scale-95 transition-transform">
          🗑️ 지우기
        </button>
        <button onClick={download} className="px-6 py-3 rounded-2xl bg-indigo-100 text-indigo-600 font-bold active:scale-95 transition-transform">
          💾 저장
        </button>
      </div>
    </div>
  );
}
