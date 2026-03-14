import { useState } from 'react';
import { EXPERIMENTS, type Experiment } from '../data/science';

export default function Experiments() {
  const [selected, setSelected] = useState<Experiment | null>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function startExp(exp: Experiment) {
    setSelected(exp);
    setStep(0);
    setDone(false);
  }

  function next() {
    if (!selected) return;
    if (step < selected.steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setDone(true);
    }
  }

  function reset() { setSelected(null); setStep(0); setDone(false); }

  return (
    <div className="px-4 pb-8 max-w-lg mx-auto">
      {!selected ? (
        <>
          <p className="text-center text-gray-500 mb-4">실험을 선택해봐요!</p>
          <div className="grid grid-cols-2 gap-4">
            {EXPERIMENTS.map(exp => (
              <button key={exp.title} onClick={() => startExp(exp)}
                className="flex flex-col items-center gap-2 p-5 rounded-3xl bg-white shadow-md active:scale-95 transition-all"
                style={{ border: `3px solid ${exp.color}33` }}>
                <span className="text-5xl">{exp.emoji}</span>
                <span className="text-base font-bold" style={{ color: exp.color }}>{exp.title}</span>
                <span className="text-xs text-gray-400">{exp.question}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-3xl p-6 shadow-lg mb-4"
            style={{ border: `3px solid ${selected.color}33` }}>
            <div className="text-center mb-4">
              <span className="text-6xl">{selected.emoji}</span>
              <h2 className="text-2xl font-bold mt-2" style={{ color: selected.color }}>{selected.title}</h2>
              <p className="text-gray-500 mt-1">{selected.question}</p>
            </div>

            {!done ? (
              <>
                {/* 진행 바 */}
                <div className="flex gap-2 mb-4">
                  {selected.steps.map((_, i) => (
                    <div key={i} className="flex-1 h-2 rounded-full transition-all"
                      style={{ background: i <= step ? selected.color : '#e5e7eb' }} />
                  ))}
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl mb-4"
                  style={{ background: selected.color + '15' }}>
                  <span className="text-2xl">{step + 1}️⃣</span>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    {selected.steps[step]}
                  </p>
                </div>

                <button onClick={next}
                  className="w-full py-4 rounded-2xl text-white font-bold text-xl active:scale-95 transition-transform"
                  style={{ background: selected.color }}>
                  {step < selected.steps.length - 1 ? '다음 →' : '결과 보기! ✨'}
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-3 animate-bounce">🎉</div>
                <p className="text-lg text-gray-700 font-medium leading-relaxed bg-yellow-50 p-4 rounded-2xl">
                  {selected.result}
                </p>
              </div>
            )}
          </div>

          <button onClick={reset} className="text-gray-400 underline text-base">
            ← 다른 실험 보기
          </button>
        </div>
      )}
    </div>
  );
}
