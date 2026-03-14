import { useState, useEffect } from 'react';
import { FONT } from '../../../styles/theme';

const ITEMS = ['🔴', '🟡', '🔵', '🟢', '🟠', '🟣'];

function makePattern(len: number) {
  const base = ITEMS.slice(0, 3);
  const pattern: string[] = [];
  for (let i = 0; i < len; i++) pattern.push(base[i % base.length]);
  return pattern;
}

export default function PatternGame() {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<string[]>([]);
  const [blanks, setBlanks] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => { startLevel(level); }, [level]);

  function startLevel(lv: number) {
    const p = makePattern(4 + lv);
    const blankCount = lv + 1;
    const available = p.map((_, i) => i);
    const picked: number[] = [];
    while (picked.length < blankCount) {
      const idx = available[Math.floor(Math.random() * available.length)];
      if (!picked.includes(idx)) picked.push(idx);
    }
    setPattern(p);
    setBlanks(picked.sort((a, b) => a - b));
    setAnswers({});
    setChecked(false);
    setCorrect(false);
  }

  function handleChoice(blank: number, item: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [blank]: item }));
  }

  function check() {
    const ok = blanks.every(i => answers[i] === pattern[i]);
    setCorrect(ok);
    setChecked(true);
  }

  const allFilled = blanks.every(i => answers[i]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      {/* 레벨 선택 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ fontSize: 16, color: '#9ca3af', fontFamily: FONT }}>레벨</span>
        {[1, 2, 3].map(lv => (
          <button key={lv} onClick={() => setLevel(lv)}
            style={{
              width: 52, height: 52, borderRadius: '50%', border: 'none',
              background: level === lv
                ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                : 'rgba(255,255,255,0.8)',
              color: level === lv ? 'white' : '#6b7280',
              fontSize: 18, fontWeight: 900, fontFamily: FONT, cursor: 'pointer',
              boxShadow: level === lv ? '0 4px 16px rgba(139,92,246,0.4)' : '0 2px 8px rgba(0,0,0,0.06)',
            }}>
            {lv}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 24, fontFamily: FONT }}>
        빈칸에 맞는 모양을 골라요!
      </p>

      {/* 패턴 줄 */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
        {pattern.map((item, i) => (
          <div key={i}
            style={{
              width: 72, height: 72, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40,
              background: blanks.includes(i)
                ? (checked ? (answers[i] === pattern[i] ? '#dcfce7' : '#fee2e2') : 'linear-gradient(135deg, #ede9fe, #ddd6fe)')
                : 'rgba(255,255,255,0.85)',
              border: blanks.includes(i) ? '3px dashed #8b5cf6' : '3px solid rgba(0,0,0,0.07)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
            {blanks.includes(i) ? (answers[i] || '?') : item}
          </div>
        ))}
      </div>

      {/* 선택지 */}
      {!checked && (
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          {ITEMS.slice(0, 3).map(item => (
            <button key={item} onClick={() => {
              const unfilled = blanks.find(i => !answers[i]);
              if (unfilled !== undefined) handleChoice(unfilled, item);
            }}
              style={{
                width: 72, height: 72, borderRadius: 20,
                background: 'rgba(255,255,255,0.9)',
                border: '3px solid rgba(0,0,0,0.08)',
                fontSize: 40, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* 결과 / 확인 버튼 */}
      {checked ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, fontFamily: FONT,
            color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? '🎉 완벽해요!' : '💪 다시 해볼까요?'}
          </p>
          {correct && level < 3 ? (
            <button onClick={() => setLevel(l => l + 1)}
              style={{
                padding: '18px 48px', borderRadius: 22, border: 'none',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white', fontSize: 20, fontWeight: 900, fontFamily: FONT,
                cursor: 'pointer', boxShadow: '0 6px 20px rgba(139,92,246,0.4)',
              }}>
              다음 레벨 →
            </button>
          ) : (
            <button onClick={() => startLevel(level)}
              style={{
                padding: '18px 48px', borderRadius: 22, border: 'none',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white', fontSize: 20, fontWeight: 900, fontFamily: FONT,
                cursor: 'pointer', boxShadow: '0 6px 20px rgba(139,92,246,0.4)',
              }}>
              🔄 다시
            </button>
          )}
        </div>
      ) : (
        <button onClick={check} disabled={!allFilled}
          style={{
            padding: '18px 56px', borderRadius: 22, border: 'none',
            background: allFilled ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '#e5e7eb',
            color: allFilled ? 'white' : '#9ca3af',
            fontSize: 20, fontWeight: 900, fontFamily: FONT,
            cursor: allFilled ? 'pointer' : 'not-allowed',
            boxShadow: allFilled ? '0 6px 20px rgba(139,92,246,0.4)' : 'none',
          }}>
          확인하기!
        </button>
      )}
    </div>
  );
}
