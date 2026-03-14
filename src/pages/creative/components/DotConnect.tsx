import { useState } from 'react';

interface Puzzle {
  name: string;
  emoji: string;
  dots: { x: number; y: number; order: number }[];
}

const PUZZLES: Puzzle[] = [
  {
    name: '별',
    emoji: '⭐',
    dots: [
      { x: 50, y: 10, order: 1 },
      { x: 80, y: 80, order: 2 },
      { x: 10, y: 35, order: 3 },
      { x: 90, y: 35, order: 4 },
      { x: 20, y: 80, order: 5 },
    ],
  },
  {
    name: '집',
    emoji: '🏠',
    dots: [
      { x: 50, y: 10, order: 1 },
      { x: 90, y: 45, order: 2 },
      { x: 90, y: 90, order: 3 },
      { x: 10, y: 90, order: 4 },
      { x: 10, y: 45, order: 5 },
    ],
  },
  {
    name: '하트',
    emoji: '❤️',
    dots: [
      { x: 50, y: 90, order: 1 },
      { x: 10, y: 40, order: 2 },
      { x: 25, y: 15, order: 3 },
      { x: 50, y: 30, order: 4 },
      { x: 75, y: 15, order: 5 },
      { x: 90, y: 40, order: 6 },
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
      // 마지막 선 (닫기)
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
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      <div className="flex gap-3 mb-4">
        {PUZZLES.map((p, i) => (
          <button key={i} onClick={() => reset(i)}
            className="px-4 py-2 rounded-full font-bold text-sm"
            style={{ background: puzzleIdx === i ? '#c026d3' : '#f3f4f6', color: puzzleIdx === i ? 'white' : '#6b7280' }}>
            {p.emoji} {p.name}
          </button>
        ))}
      </div>

      <p className="text-gray-500 mb-3">
        {done ? '🎉 완성!' : `숫자 순서대로 눌러요! (${nextOrder} → ${puzzle.dots.length})`}
      </p>

      <div className="w-full rounded-3xl overflow-hidden shadow-lg bg-purple-50 mb-4" style={{ aspectRatio: '1/1' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="#c026d3" strokeWidth="2" strokeLinecap="round" />
          ))}
          {puzzle.dots.map(dot => {
            const tapped = dot.order < nextOrder;
            return (
              <g key={dot.order} onClick={() => handleDot(dot.order)} style={{ cursor: 'pointer' }}>
                <circle cx={dot.x} cy={dot.y} r={6}
                  fill={tapped ? '#c026d3' : dot.order === nextOrder ? '#f0abfc' : 'white'}
                  stroke={dot.order === nextOrder ? '#c026d3' : '#e5e7eb'}
                  strokeWidth="1.5" />
                <text x={dot.x} y={dot.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize="4" fontWeight="bold"
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
          className="px-6 py-3 rounded-2xl text-white font-bold bg-purple-500 active:scale-95">
          🔄 다시
        </button>
      )}
    </div>
  );
}
