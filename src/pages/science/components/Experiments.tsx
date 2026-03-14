import { useState } from 'react';
import { EXPERIMENTS, type Experiment } from '../data/science';
import { FONT } from '../../../styles/theme';

export default function Experiments() {
  const [selected, setSelected] = useState<Experiment | null>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function startExp(exp: Experiment) { setSelected(exp); setStep(0); setDone(false); }
  function next() {
    if (!selected) return;
    if (step < selected.steps.length - 1) setStep(s => s + 1);
    else setDone(true);
  }
  function reset() { setSelected(null); setStep(0); setDone(false); }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 32px', fontFamily: FONT }}>
      {!selected ? (
        <>
          <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 20, fontSize: 16 }}>
            실험을 선택해봐요! 🔬
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}>
            {EXPERIMENTS.map(exp => (
              <button key={exp.title} onClick={() => startExp(exp)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  padding: '32px 20px',
                  borderRadius: 28,
                  background: `linear-gradient(145deg, ${exp.color}18, ${exp.color}0a)`,
                  border: `2px solid ${exp.color}30`,
                  boxShadow: `0 6px 24px ${exp.color}18`,
                  cursor: 'pointer', fontFamily: FONT,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.03) translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${exp.color}30`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${exp.color}18`;
                }}
              >
                <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${exp.color}25, ${exp.color}12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 52, border: `2px solid ${exp.color}20`,
                }}>
                  {exp.emoji}
                </div>
                <span style={{ fontSize: 20, fontWeight: 900, color: exp.color, fontFamily: FONT }}>
                  {exp.title}
                </span>
                <span style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', fontFamily: FONT }}>
                  {exp.question}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            background: `linear-gradient(145deg, ${selected.color}12, ${selected.color}06)`,
            borderRadius: 32, padding: '36px 32px',
            border: `2px solid ${selected.color}25`,
            boxShadow: `0 8px 32px ${selected.color}15`,
            marginBottom: 20,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <span style={{ fontSize: 72, display: 'block', marginBottom: 12 }}>{selected.emoji}</span>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: selected.color, margin: '0 0 8px', fontFamily: FONT }}>
                {selected.title}
              </h2>
              <p style={{ fontSize: 16, color: '#6b7280', margin: 0, fontFamily: FONT }}>{selected.question}</p>
            </div>

            {!done ? (
              <>
                {/* 진행 바 */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                  {selected.steps.map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: 8, borderRadius: 4, transition: 'all 0.3s',
                      background: i <= step ? selected.color : '#e5e7eb',
                    }} />
                  ))}
                </div>

                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '20px 24px', borderRadius: 20, marginBottom: 24,
                  background: selected.color + '18',
                }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{step + 1}️⃣</span>
                  <p style={{ fontSize: 20, color: '#374151', fontWeight: 700, lineHeight: 1.6, margin: 0, fontFamily: FONT }}>
                    {selected.steps[step]}
                  </p>
                </div>

                <button onClick={next}
                  style={{
                    width: '100%', padding: '20px', borderRadius: 22, border: 'none',
                    background: `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)`,
                    color: 'white', fontSize: 22, fontWeight: 900, fontFamily: FONT, cursor: 'pointer',
                    boxShadow: `0 6px 20px ${selected.color}40`,
                  }}>
                  {step < selected.steps.length - 1 ? '다음 →' : '결과 보기! ✨'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <p style={{
                  fontSize: 18, color: '#374151', fontWeight: 600, lineHeight: 1.7,
                  background: '#fef9c3', padding: '20px 24px', borderRadius: 20,
                  fontFamily: FONT,
                }}>
                  {selected.result}
                </p>
              </div>
            )}
          </div>

          <button onClick={reset}
            style={{
              background: 'none', border: 'none', color: '#9ca3af',
              fontSize: 16, cursor: 'pointer', textDecoration: 'underline',
              fontFamily: FONT,
            }}>
            ← 다른 실험 보기
          </button>
        </div>
      )}
    </div>
  );
}
