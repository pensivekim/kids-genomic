'use client';
import { useState } from 'react';
import { FONT } from '@/styles/theme';

interface Puzzle {
  question: string;
  emoji: string;
  options: string[];
  answer: string;
}

const PUZZLES: Puzzle[] = [
  { question: '피자 한 조각은 어떤 모양일까요?', emoji: '🍕', options: ['삼각형', '사각형', '원', '별'],    answer: '삼각형' },
  { question: '시계는 어떤 모양일까요?',         emoji: '🕐', options: ['삼각형', '원', '별', '하트'],      answer: '원' },
  { question: '책은 어떤 모양일까요?',           emoji: '📚', options: ['원', '삼각형', '사각형', '별'],     answer: '사각형' },
  { question: '당근 단면은 어떤 모양일까요?',    emoji: '🥕', options: ['원', '삼각형', '사각형', '별'],     answer: '원' },
  { question: '수박 씨는 어떤 모양일까요?',      emoji: '🍉', options: ['삼각형', '원', '사각형', '타원'], answer: '타원' },
  { question: '별사탕은 어떤 모양일까요?',       emoji: '🍬', options: ['원', '삼각형', '별', '사각형'],    answer: '별' },
];

const SHAPE_EMOJI: Record<string, string> = {
  '삼각형': '🔺', '사각형': '🟦', '원': '🔵', '별': '⭐', '하트': '❤️', '타원': '🥚',
};

export default function ShapeMatch() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const puzzle = PUZZLES[idx];
  const correct = selected === puzzle.answer;

  function next() { setIdx(i => (i + 1) % PUZZLES.length); setSelected(null); }

  const opts = puzzle.options.includes(puzzle.answer)
    ? puzzle.options
    : [...puzzle.options.slice(0, 3), puzzle.answer].sort(() => Math.random() - 0.5);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      {/* 진행 표시 */}
      <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 16, fontFamily: FONT }}>
        {idx + 1} / {PUZZLES.length}
      </p>

      {/* 문제 카드 */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(145deg, #fffbeb, #fef9c3)',
        borderRadius: 32, padding: '40px 32px',
        textAlign: 'center', marginBottom: 24,
        boxShadow: '0 8px 32px rgba(245,158,11,0.12)',
        border: '2px solid rgba(245,158,11,0.15)',
      }}>
        <span style={{ fontSize: 88, display: 'block', marginBottom: 16 }}>{puzzle.emoji}</span>
        <p style={{ fontSize: 22, color: '#374151', fontWeight: 700, margin: 0, fontFamily: FONT }}>
          {puzzle.question}
        </p>
      </div>

      {/* 선택지 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, width: '100%', marginBottom: 20 }}>
        {opts.map(opt => {
          let bg = 'rgba(255,255,255,0.9)', border = 'rgba(0,0,0,0.08)', color = '#374151';
          if (selected) {
            if (opt === puzzle.answer) { bg = '#dcfce7'; border = '#22c55e'; color = '#16a34a'; }
            else if (opt === selected) { bg = '#fee2e2'; border = '#ef4444'; color = '#dc2626'; }
          }
          return (
            <button key={opt} onClick={() => !selected && setSelected(opt)}
              style={{
                padding: '28px 20px',
                borderRadius: 24, border: `3px solid ${border}`,
                background: bg, color, cursor: selected ? 'default' : 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                fontFamily: FONT, transition: 'all 0.15s',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
              <span style={{ fontSize: 44 }}>{SHAPE_EMOJI[opt] || '❓'}</span>
              <span style={{ fontSize: 20, fontWeight: 900, fontFamily: FONT }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, fontFamily: FONT,
            color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? '🎉 맞았어요!' : `💪 정답은 "${puzzle.answer}"예요!`}
          </p>
          <button onClick={next}
            style={{
              padding: '18px 56px', borderRadius: 22, border: 'none',
              background: 'linear-gradient(135deg, #c026d3, #a21caf)',
              color: 'white', fontSize: 20, fontWeight: 900, fontFamily: FONT,
              cursor: 'pointer', boxShadow: '0 6px 20px rgba(192,38,211,0.4)',
            }}>
            다음 문제 →
          </button>
        </div>
      )}
    </div>
  );
}
