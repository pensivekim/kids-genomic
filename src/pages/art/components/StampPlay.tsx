import { useRef, useState } from 'react';
import { FONT } from '../../../styles/theme';

const STAMPS = ['⭐', '❤️', '🌸', '🌈', '🎈', '🦋', '🌙', '☀️', '🍀', '🐾', '✨', '🎵'];
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

interface Stamp { id: number; x: number; y: number; emoji: string; size: number; }

export default function StampPlay() {
  const [stamp, setStamp] = useState('⭐');
  const [stampSize, setStampSize] = useState(44);
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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      {/* 도장 선택 */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
        marginBottom: 16,
        background: 'rgba(255,255,255,0.85)', borderRadius: 20,
        padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {STAMPS.map(s => (
          <button
            key={s}
            onClick={() => setStamp(s)}
            style={{
              width: 52, height: 52, borderRadius: 16,
              background: stamp === s ? '#fef3c7' : '#f9fafb',
              border: stamp === s ? '3px solid #f59e0b' : '2px solid #e5e7eb',
              fontSize: 28, cursor: 'pointer',
              transform: stamp === s ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 크기 + 배경 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 15, color: '#9ca3af', fontFamily: FONT }}>크기</span>
        {[28, 44, 60, 80].map(sz => (
          <button key={sz} onClick={() => setStampSize(sz)}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: stampSize === sz ? '#fef3c7' : '#f3f4f6',
              border: stampSize === sz ? '3px solid #f59e0b' : '2px solid transparent',
              fontSize: sz * 0.5, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            ⭐
          </button>
        ))}
        <span style={{ color: '#d1d5db' }}>|</span>
        <span style={{ fontSize: 15, color: '#9ca3af', fontFamily: FONT }}>배경</span>
        {COLORS.map(c => (
          <button key={c} onClick={() => setBgColor(c + '33')}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: c, cursor: 'pointer',
              border: bgColor === c + '33' ? '3px solid #000' : '2px solid #e5e7eb',
            }} />
        ))}
        <button onClick={() => setBgColor('#fffbf0')}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'white',
            border: '2px solid #e5e7eb', cursor: 'pointer' }} />
      </div>

      {/* 캔버스 */}
      <div
        style={{
          width: '100%', height: 480,
          background: bgColor,
          borderRadius: 24, border: '3px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative', overflow: 'hidden',
          cursor: 'copy', userSelect: 'none', touchAction: 'none',
        }}
        onPointerDown={handleCanvas}
      >
        {stamps.map(s => (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              left: s.x - s.size / 2, top: s.y - s.size / 2,
              fontSize: s.size, lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
            }}
          >
            {s.emoji}
          </span>
        ))}
        {stamps.length === 0 && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#d1d5db', fontSize: 22, fontFamily: FONT,
          }}>
            여기를 눌러서 도장을 찍어요! 🖐️
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <button
          onClick={() => setStamps([])}
          style={{
            padding: '14px 32px', borderRadius: 20, border: 'none',
            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            color: '#dc2626', fontSize: 18, fontWeight: 800,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(239,68,68,0.2)',
          }}>
          🗑️ 처음부터
        </button>
      </div>
    </div>
  );
}
