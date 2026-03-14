import { useState, useEffect, useRef } from 'react';
import { RHYTHM_PATTERNS } from '../data/music';
import { playClick } from '../utils/audio';
import { FONT } from '../../../styles/theme';

export default function RhythmGame() {
  const [patternIdx, setPatternIdx] = useState(0);
  const [step, setStep] = useState(-1);
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
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      {/* 패턴 선택 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {RHYTHM_PATTERNS.map((p, i) => (
          <button
            key={i}
            onClick={() => { setPatternIdx(i); setPhase('watch'); setPlaying(false); setStep(-1); }}
            style={{
              padding: '10px 24px', borderRadius: 20, border: 'none',
              background: patternIdx === i
                ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                : 'rgba(255,255,255,0.8)',
              color: patternIdx === i ? 'white' : '#6b7280',
              fontSize: 16, fontWeight: 800, fontFamily: FONT, cursor: 'pointer',
              boxShadow: patternIdx === i ? '0 4px 16px rgba(139,92,246,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 박자 시각화 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
        {pattern.pattern.map((beat, i) => (
          <div
            key={i}
            style={{
              width: 52, height: 52,
              borderRadius: 16,
              background: step === i ? '#8b5cf6' : beat === 1 ? '#ddd6fe' : '#f3f4f6',
              transform: step === i ? 'scale(1.4)' : 'scale(1)',
              transition: 'all 0.1s',
              boxShadow: step === i ? '0 4px 16px rgba(139,92,246,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* 안내 텍스트 */}
      {phase === 'watch' && !playing && (
        <p style={{ fontSize: 20, color: '#6b7280', marginBottom: 24, fontFamily: FONT }}>▶ 버튼을 눌러 리듬을 들어봐요!</p>
      )}
      {phase === 'watch' && playing && (
        <p style={{ fontSize: 22, fontWeight: 900, color: '#8b5cf6', marginBottom: 24, fontFamily: FONT }}>🎵 잘 들어봐요...</p>
      )}
      {phase === 'tap' && (
        <p style={{ fontSize: 22, fontWeight: 900, color: '#16a34a', marginBottom: 24, fontFamily: FONT }}>
          👇 이제 탭해봐요! ({userTaps.length}/{pattern.pattern.filter(x => x === 1).length})
        </p>
      )}
      {phase === 'result' && (
        <p style={{ fontSize: 26, fontWeight: 900, marginBottom: 24, fontFamily: FONT,
          color: correct ? '#16a34a' : '#dc2626' }}>
          {correct ? '🎉 잘했어요!' : '💪 다시 해볼까요?'}
        </p>
      )}

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: 20 }}>
        {phase === 'watch' && (
          <button
            onClick={startPlay}
            disabled={playing}
            style={{
              padding: '20px 48px', borderRadius: 24, border: 'none',
              background: playing
                ? '#e5e7eb'
                : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: playing ? '#9ca3af' : 'white',
              fontSize: 22, fontWeight: 900, fontFamily: FONT, cursor: playing ? 'not-allowed' : 'pointer',
              boxShadow: playing ? 'none' : '0 8px 24px rgba(139,92,246,0.4)',
            }}
          >
            ▶ 듣기
          </button>
        )}
        {phase === 'tap' && (
          <button
            onPointerDown={handleTap}
            style={{
              padding: '28px 72px', borderRadius: 32, border: 'none',
              background: 'linear-gradient(135deg, #ec4899, #db2777)',
              color: 'white', fontSize: 28, fontWeight: 900, fontFamily: FONT,
              cursor: 'pointer', userSelect: 'none',
              boxShadow: '0 10px 0 #9d174d, 0 12px 20px rgba(236,72,153,0.4)',
              transition: 'all 0.1s',
            }}
          >
            👏 탭!
          </button>
        )}
        {phase === 'result' && (
          <button
            onClick={startPlay}
            style={{
              padding: '20px 48px', borderRadius: 24, border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white', fontSize: 22, fontWeight: 900, fontFamily: FONT, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
            }}
          >
            🔄 다시
          </button>
        )}
      </div>
    </div>
  );
}
