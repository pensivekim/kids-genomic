import { useRef, useState, useEffect } from 'react';
import { FONT } from '../../../styles/theme';

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
    if (last.current) ctx.moveTo(last.current.x, last.current.y);
    else ctx.moveTo(pos.x, pos.y);
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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      {/* 색상 팔레트 */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
        marginBottom: 16,
        background: 'rgba(255,255,255,0.85)', borderRadius: 20,
        padding: '16px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); setEraser(false); }}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: c,
              border: color === c && !eraser ? '4px solid #6366f1' : '2px solid #e5e7eb',
              transform: color === c && !eraser ? 'scale(1.25)' : 'scale(1)',
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: color === c && !eraser ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
            }}
          />
        ))}
        <button
          onClick={() => setEraser(e => !e)}
          style={{
            padding: '8px 20px', borderRadius: 16, border: 'none',
            background: eraser ? '#6366f1' : '#f3f4f6',
            color: eraser ? 'white' : '#374151',
            fontSize: 15, fontWeight: 800, fontFamily: FONT, cursor: 'pointer',
          }}
        >
          지우개
        </button>
      </div>

      {/* 굵기 선택 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 14, color: '#9ca3af', fontFamily: FONT }}>굵기</span>
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => { setSize(s); setEraser(false); }}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: size === s && !eraser ? '#f0f0ff' : '#f3f4f6',
              border: size === s && !eraser ? '3px solid #6366f1' : '2px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ width: s * 0.7, height: s * 0.7, maxWidth: 32, maxHeight: 32,
              borderRadius: '50%', background: '#374151' }} />
          </button>
        ))}
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={580}
        style={{
          width: '100%',
          cursor: eraser ? 'cell' : 'crosshair',
          border: '3px solid rgba(0,0,0,0.08)',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          display: 'block',
          touchAction: 'none',
        }}
        onPointerDown={e => {
          drawing.current = true;
          last.current = null;
          draw(e);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={draw}
        onPointerUp={() => { drawing.current = false; last.current = null; }}
        onPointerLeave={() => { drawing.current = false; last.current = null; }}
      />

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: 16, marginTop: 16, justifyContent: 'center' }}>
        <button onClick={clear}
          style={{
            padding: '14px 32px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            color: '#dc2626', fontSize: 18, fontWeight: 800,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(239,68,68,0.2)',
          }}>
          🗑️ 지우기
        </button>
        <button onClick={download}
          style={{
            padding: '14px 32px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
            color: '#6366f1', fontSize: 18, fontWeight: 800,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.2)',
          }}>
          💾 저장
        </button>
      </div>
    </div>
  );
}
