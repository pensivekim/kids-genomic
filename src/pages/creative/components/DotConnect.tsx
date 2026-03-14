import { useState } from 'react';
import { FONT } from '../../../styles/theme';

interface Puzzle {
  name: string;
  emoji: string;
  dots: { x: number; y: number; order: number }[];
}

const PUZZLES: Puzzle[] = [
  {
    name: '별', emoji: '⭐',
    dots: [
      { x: 50, y: 10, order: 1 }, { x: 80, y: 80, order: 2 },
      { x: 10, y: 35, order: 3 }, { x: 90, y: 35, order: 4 }, { x: 20, y: 80, order: 5 },
    ],
  },
  {
    name: '집', emoji: '🏠',
    dots: [
      { x: 50, y: 10, order: 1 }, { x: 90, y: 45, order: 2 },
      { x: 90, y: 90, order: 3 }, { x: 10, y: 90, order: 4 }, { x: 10, y: 45, order: 5 },
    ],
  },
  {
    name: '하트', emoji: '❤️',
    dots: [
      { x: 50, y: 90, order: 1 }, { x: 10, y: 40, order: 2 }, { x: 25, y: 15, order: 3 },
      { x: 50, y: 30, order: 4 }, { x: 75, y: 15, order: 5 }, { x: 90, y: 40, order: 6 },
    ],
  },
];

export default function DotConnect() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [nextOrder, setNextOrder] = useState(1);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [done, setDone] = useState(false);

  const puzzle = PUZZLES[puzzleIdx];
  const sorted = [...puzzle.dots].sort((a, b) => a.order - b.order);

  function handleDot(order: number) {
    if (order !== nextOrder || done) return;
    if (nextOrder > 1) {
      const prev = sorted[nextOrder - 2];
      const curr = sorted[nextOrder - 1];
      setLines(l => [...l, { x1: prev.x, y1: prev.y, x2: curr.x, y2: curr.y }]);
    }
    if (nextOrder === puzzle.dots.length) {
      const first = sorted[0];
      const last = sorted[sorted.length - 1];
      setLines(l => [...l, { x1: last.x, y1: last.y, x2: first.x, y2: first.y }]);
      setDone(true);
    }
    setNextOrder(n => n + 1);
  }

  function reset(idx: number) {
    setPuzzleIdx(idx);
    setNextOrder(1);
    setLines([]);
    setDone(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      {/* 퍼즐 선택 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {PUZZLES.map((p, i) => (
          <button key={i} onClick={() => reset(i)}
            style={{
              padding: '10px 24px', borderRadius: 20, border: 'none',
              background: puzzleIdx === i
                ? 'linear-gradient(135deg, #c026d3, #a21caf)'
                : 'rgba(255,255,255,0.8)',
              color: puzzleIdx === i ? 'white' : '#6b7280',
              fontSize: 16, fontWeight: 800, fontFamily: FONT, cursor: 'pointer',
              boxShadow: puzzleIdx === i ? '0 4px 16px rgba(192,38,211,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
            }}>
            {p.emoji} {p.name}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 16, fontFamily: FONT }}>
        {done ? '🎉 완성!' : `숫자 순서대로 눌러요! (${nextOrder} → ${puzzle.dots.length})`}
      </p>

      {/* SVG 캔버스 */}
      <div style={{
        width: '100%', maxWidth: 520,
        background: 'linear-gradient(145deg, #fdf4ff, #fae8ff)',
        borderRadius: 32, overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(192,38,211,0.15)',
        border: '3px solid rgba(192,38,211,0.15)',
        marginBottom: 20,
      }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', aspectRatio: '1/1', display: 'block' }}>
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="#c026d3" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          {puzzle.dots.map(dot => {
            const tapped = dot.order < nextOrder;
            const isNext = dot.order === nextOrder;
            return (
              <g key={dot.order} onClick={() => handleDot(dot.order)} style={{ cursor: 'pointer' }}>
                <circle cx={dot.x} cy={dot.y} r={isNext ? 8 : 6}
                  fill={tapped ? '#c026d3' : isNext ? '#f0abfc' : 'white'}
                  stroke={isNext ? '#c026d3' : '#d1d5db'}
                  strokeWidth="2" />
                <text x={dot.x} y={dot.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontWeight="bold"
                  fill={tapped ? 'white' : '#6b7280'}>
                  {dot.order}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {done && (
        <button onClick={() => reset(puzzleIdx)}
          style={{
            padding: '16px 48px', borderRadius: 22, border: 'none',
            background: 'linear-gradient(135deg, #c026d3, #a21caf)',
            color: 'white', fontSize: 18, fontWeight: 900, fontFamily: FONT,
            cursor: 'pointer', boxShadow: '0 6px 20px rgba(192,38,211,0.4)',
          }}>
          🔄 다시
        </button>
      )}
    </div>
  );
}
