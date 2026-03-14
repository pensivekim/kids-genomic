import { useState, useEffect, useRef } from 'react';
import { RHYTHM_PATTERNS } from '../data/music';
import { playClick } from '../utils/audio';

export default function RhythmGame() {
  const [patternIdx, setPatternIdx] = useState(0);
  const [step, setStep] = useState(-1);       // 현재 강조 중인 박자
  const [playing, setPlaying] = useState(false);
  const [userTaps, setUserTaps] = useState<number[]>([]);
  const [phase, setPhase] = useState<'watch' | 'tap' | 'result'>('watch');
  const [correct, setCorrect] = useState<boolean | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);

  const pattern = RHYTHM_PATTERNS[patternIdx];
  const BPM = 120;
  const ms = (60 / BPM) * 1000 / 2;

  function startPlay() {
    setPhase('watch');
    setStep(-1);
    setUserTaps([]);
    setCorrect(null);
    setPlaying(true);
    stepRef.current = 0;

    intervalRef.current = setInterval(() => {
      const s = stepRef.current;
      if (s >= pattern.pattern.length) {
        clearInterval(intervalRef.current!);
        setStep(-1);
        setPlaying(false);
        setPhase('tap');
        return;
      }
      setStep(s);
      if (pattern.pattern[s] === 1) playClick(true);
      stepRef.current++;
    }, ms);
  }

  function handleTap() {
    if (phase !== 'tap') return;
    playClick(false);
    setUserTaps(prev => {
      const next = [...prev, 1];
      if (next.length >= pattern.pattern.length) {
        const beats = pattern.pattern.filter(x => x === 1).length;
        const tapBeats = next.filter(x => x === 1).length;
        setCorrect(Math.abs(tapBeats - beats) <= 1);
        setPhase('result');
      }
      return next;
    });
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="flex flex-col items-center px-4 pb-8 max-w-md mx-auto">
      {/* 패턴 선택 */}
      <div className="flex gap-2 mb-6">
        {RHYTHM_PATTERNS.map((p, i) => (
          <button
            key={i}
            onClick={() => { setPatternIdx(i); setPhase('watch'); setPlaying(false); setStep(-1); }}
            className="px-4 py-2 rounded-full font-bold text-sm transition-all"
            style={{
              background: patternIdx === i ? '#8b5cf6' : '#f3f4f6',
              color: patternIdx === i ? 'white' : '#6b7280',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 박자 시각화 */}
      <div className="flex gap-3 mb-8">
        {pattern.pattern.map((beat, i) => (
          <div
            key={i}
            className="rounded-2xl transition-all"
            style={{
              width: 36, height: 36,
              background: step === i ? '#8b5cf6' : beat === 1 ? '#ddd6fe' : '#f3f4f6',
              transform: step === i ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* 안내 */}
      {phase === 'watch' && !playing && (
        <p className="text-gray-500 text-lg mb-4">▶ 버튼을 눌러 리듬을 들어봐요!</p>
      )}
      {phase === 'watch' && playing && (
        <p className="text-purple-500 text-xl font-bold mb-4 animate-pulse">🎵 잘 들어봐요...</p>
      )}
      {phase === 'tap' && (
        <p className="text-green-600 text-xl font-bold mb-4">👇 이제 탭해봐요! ({userTaps.length}/{pattern.pattern.filter(x=>x===1).length})</p>
      )}
      {phase === 'result' && (
        <p className="text-2xl font-bold mb-4" style={{ color: correct ? '#16a34a' : '#dc2626' }}>
          {correct ? '🎉 잘했어요!' : '💪 다시 해볼까요?'}
        </p>
      )}

      {/* 버튼들 */}
      <div className="flex gap-4">
        {(phase === 'watch') && (
          <button
            onClick={startPlay}
            disabled={playing}
            className="px-8 py-4 rounded-2xl text-white text-xl font-bold transition-all active:scale-95 disabled:opacity-50"
            style={{ background: '#8b5cf6' }}
          >
            ▶ 듣기
          </button>
        )}
        {phase === 'tap' && (
          <button
            onPointerDown={handleTap}
            className="px-10 py-6 rounded-3xl text-white text-2xl font-bold active:scale-90 transition-transform select-none"
            style={{ background: '#ec4899', boxShadow: '0 6px 0 #be185d' }}
          >
            👏 탭!
          </button>
        )}
        {phase === 'result' && (
          <button
            onClick={startPlay}
            className="px-8 py-4 rounded-2xl text-white text-xl font-bold active:scale-95"
            style={{ background: '#8b5cf6' }}
          >
            🔄 다시
          </button>
        )}
      </div>
    </div>
  );
}
