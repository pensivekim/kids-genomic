import { useState, useEffect } from 'react';

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
    <div className="flex flex-col items-center px-4 pb-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-500 text-sm">레벨 {level}</span>
        {[1, 2, 3].map(lv => (
          <button key={lv} onClick={() => setLevel(lv)}
            className="w-8 h-8 rounded-full font-bold text-sm transition-all"
            style={{ background: level === lv ? '#8b5cf6' : '#f3f4f6', color: level === lv ? 'white' : '#6b7280' }}>
            {lv}
          </button>
        ))}
      </div>

      <p className="text-gray-500 mb-4">빈칸에 맞는 모양을 골라요!</p>

      {/* 패턴 줄 */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {pattern.map((item, i) => (
          <div key={i} className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow"
            style={{
              background: blanks.includes(i)
                ? (checked ? (answers[i] === pattern[i] ? '#dcfce7' : '#fee2e2') : '#ede9fe')
                : '#f9fafb',
              border: blanks.includes(i) ? '2px dashed #8b5cf6' : '2px solid #e5e7eb',
            }}>
            {blanks.includes(i) ? (answers[i] || '?') : item}
          </div>
        ))}
      </div>

      {/* 선택지 */}
      {!checked && (
        <div className="flex gap-3 mb-6">
          {ITEMS.slice(0, 3).map(item => (
            <button key={item} onClick={() => {
              const unfilled = blanks.find(i => !answers[i]);
              if (unfilled !== undefined) handleChoice(unfilled, item);
            }}
              className="w-14 h-14 rounded-2xl text-3xl shadow-md active:scale-90 transition-transform bg-white"
              style={{ border: '2px solid #e5e7eb' }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* 결과 / 버튼 */}
      {checked ? (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4" style={{ color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? '🎉 완벽해요!' : '💪 다시 해볼까요?'}
          </p>
          {correct && level < 3
            ? <button onClick={() => setLevel(l => l + 1)} className="px-6 py-3 rounded-2xl text-white font-bold bg-purple-500 active:scale-95">다음 레벨 →</button>
            : <button onClick={() => startLevel(level)} className="px-6 py-3 rounded-2xl text-white font-bold bg-purple-500 active:scale-95">🔄 다시</button>
          }
        </div>
      ) : (
        <button onClick={check} disabled={!allFilled}
          className="px-8 py-4 rounded-2xl text-white font-bold text-xl transition-all active:scale-95 disabled:opacity-40"
          style={{ background: '#8b5cf6' }}>
          확인하기!
        </button>
      )}
    </div>
  );
}
