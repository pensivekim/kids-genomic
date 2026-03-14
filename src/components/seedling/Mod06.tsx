'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type GameState = 'consent' | 'playing' | 'reward';

interface RhythmPattern { id: string; name: string; emoji: string; bpm: number; beats: number[]; color: string; bg: string; }

const PATTERNS: RhythmPattern[] = [
  { id: 'p1', name: '쿵쿵쿵', emoji: '🥁', bpm: 60, beats: [1,0,1,0,1,0,1,0], color: '#f97316', bg: '#fff7ed' },
  { id: 'p2', name: '쿵따쿵', emoji: '🎵', bpm: 70, beats: [1,0,0,1,0,1,0,0], color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'p3', name: '따따쿵', emoji: '🎶', bpm: 80, beats: [1,1,0,1,1,0,1,0], color: '#0ea5e9', bg: '#f0f9ff' },
  { id: 'p4', name: '빠라밤', emoji: '🎺', bpm: 90, beats: [1,0,1,1,0,1,0,1], color: '#16a34a', bg: '#f0fdf4' },
  { id: 'p5', name: '느린 쿵', emoji: '🪘', bpm: 50, beats: [1,0,0,0,1,0,0,0], color: '#e11d48', bg: '#fff1f2' },
];

const BEAT_MS = 500;
const TOTAL_ROUNDS = 5;
const TOLERANCE_MS = 280;

function playBeat(isStrong = true) {
  try {
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'; osc.frequency.value = isStrong ? 440 : 330;
    gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.18); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

export default function Mod06() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<'watch' | 'tap' | 'result'>('watch');
  const [activeBeat, setActiveBeat] = useState(-1);
  const [tapResults, setTapResults] = useState<boolean[]>([]);
  const [totalAcc, setTotalAcc] = useState<number[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [handSide, setHandSide] = useState<'left' | 'right' | null>(null);

  const beatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tapWindowRef = useRef(false);
  const roundResultsRef = useRef<boolean[]>([]);

  const pattern = PATTERNS[round % PATTERNS.length];

  const endSession = useCallback(() => {
    if (beatTimerRef.current) clearInterval(beatTimerRef.current);
    setGameState('reward');
  }, []);

  const startTap = useCallback((pat: RhythmPattern) => {
    setPhase('tap'); roundResultsRef.current = []; setTapCount(0);
    let idx = 0;
    beatTimerRef.current = setInterval(() => {
      const isBeat = pat.beats[idx] === 1;
      setActiveBeat(isBeat ? idx : -1);
      if (isBeat) { tapWindowRef.current = true; setTimeout(() => { tapWindowRef.current = false; }, TOLERANCE_MS); }
      idx++;
      if (idx >= pat.beats.length) {
        clearInterval(beatTimerRef.current!);
        setTimeout(() => {
          setActiveBeat(-1);
          const results = roundResultsRef.current;
          const beatCount = pat.beats.filter(b => b === 1).length;
          const acc = Math.round((results.filter(Boolean).length / beatCount) * 100);
          setTapResults(results);
          setTotalAcc(prev => [...prev, acc]);
          setPhase('result');
        }, 500);
      }
    }, BEAT_MS);
  }, []);

  const startWatch = useCallback((pat: RhythmPattern) => {
    setPhase('watch'); setActiveBeat(-1);
    let idx = 0;
    beatTimerRef.current = setInterval(() => {
      setActiveBeat(idx);
      if (pat.beats[idx] === 1) playBeat(idx % 2 === 0);
      idx++;
      if (idx >= pat.beats.length) {
        clearInterval(beatTimerRef.current!);
        setTimeout(() => { setActiveBeat(-1); startTap(pat); }, 400);
      }
    }, BEAT_MS);
  }, [startTap]);

  const handleTap = useCallback(() => {
    if (phase !== 'tap') return;
    setTapCount(c => c + 1);
    const hit = tapWindowRef.current;
    roundResultsRef.current.push(hit);
    if (hit) playBeat(true);
  }, [phase]);

  const nextRound = useCallback(() => {
    const next = round + 1;
    if (next >= TOTAL_ROUNDS) { endSession(); }
    else { setRound(next); setTapResults([]); setTimeout(() => startWatch(PATTERNS[next % PATTERNS.length]), 300); }
  }, [round, endSession, startWatch]);

  const startGame = (side: 'left' | 'right') => {
    setHandSide(side); setGameState('playing');
    setTimeout(() => startWatch(PATTERNS[0]), 500);
  };

  const restart = () => {
    if (beatTimerRef.current) clearInterval(beatTimerRef.current);
    setGameState('consent'); setRound(0); setPhase('watch');
    setActiveBeat(-1); setTapResults([]); setTotalAcc([]); setTapCount(0); setHandSide(null);
  };

  useEffect(() => () => { if (beatTimerRef.current) clearInterval(beatTimerRef.current); }, []);

  const roundAcc = tapResults.length > 0 ? Math.round(tapResults.filter(Boolean).length / Math.max(pattern.beats.filter(b => b === 1).length, 1) * 100) : 0;
  const avgAcc = totalAcc.length > 0 ? Math.round(totalAcc.reduce((a, b) => a + b, 0) / totalAcc.length) : 0;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes beatPulse { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${pattern.bg} 0%,#fff 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(249,115,22,0.1)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>🎵</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#c2410c', marginBottom: '12px' }}>손끝 리듬 놀이</h1>
            <p style={{ fontSize: '18px', color: '#fb923c', marginBottom: '24px' }}>리듬을 듣고 손으로 따라 쳐봐요!</p>
            <div style={{ background: '#fff7ed', borderRadius: '16px', padding: '14px', marginBottom: '20px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#c2410c', fontWeight: 700, marginBottom: '6px' }}>🎵 활동 방법</p>
              <p style={{ fontSize: '14px', color: '#9a3412', lineHeight: 1.7 }}>1. 먼저 리듬을 들어요<br />2. 리듬에 맞춰 화면을 탭해요!</p>
            </div>
            <p style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginBottom: '12px' }}>어느 손으로 할까요?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startGame('left')} style={{ flex: 1, background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '20px', padding: '24px', cursor: 'pointer', fontSize: '40px' }}>
                👈<div style={{ fontSize: '14px', color: '#0369a1', marginTop: '4px', fontWeight: 600 }}>왼손</div>
              </button>
              <button onClick={() => startGame('right')} style={{ flex: 1, background: '#fff7ed', border: '2px solid #fed7aa', borderRadius: '20px', padding: '24px', cursor: 'pointer', fontSize: '40px' }}>
                👉<div style={{ fontSize: '14px', color: '#c2410c', marginTop: '4px', fontWeight: 600 }}>오른손</div>
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div style={{ width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: pattern.color, marginBottom: '6px' }}>
                <span>{pattern.emoji} {phase === 'watch' ? '리듬 들어봐요' : phase === 'tap' ? '탭해봐요!' : '잘했어요!'}</span>
                <span>{round + 1} / {TOTAL_ROUNDS}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: `${pattern.color}20`, borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '100px', background: pattern.color, width: `${(round / TOTAL_ROUNDS) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div style={{ background: pattern.bg, border: `2px solid ${pattern.color}30`, borderRadius: '20px', padding: '16px 24px', marginBottom: '20px', textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: '36px', marginBottom: '6px' }}>{pattern.emoji}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: pattern.color }}>{pattern.name}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>BPM {pattern.bpm}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              {pattern.beats.map((beat, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: activeBeat === i && beat === 1 ? pattern.color : beat === 1 ? `${pattern.color}30` : '#f1f5f9',
                  border: `2px solid ${beat === 1 ? pattern.color + '50' : '#e2e8f0'}`,
                  transition: 'background 0.08s ease',
                  animation: activeBeat === i && beat === 1 ? 'beatPulse 0.2s ease-out' : 'none',
                }} />
              ))}
            </div>

            {phase !== 'result' ? (
              <button onClick={handleTap} disabled={phase === 'watch'} style={{
                width: '180px', height: '180px', borderRadius: '50%',
                background: phase === 'tap' ? `linear-gradient(135deg,${pattern.color},${pattern.color}cc)` : '#f1f5f9',
                border: 'none', cursor: phase === 'tap' ? 'pointer' : 'default',
                fontSize: '48px', lineHeight: 1,
                boxShadow: phase === 'tap' ? `0 8px 32px ${pattern.color}40` : 'none',
                transition: 'all 0.15s', opacity: phase === 'watch' ? 0.5 : 1,
              }}>
                {phase === 'tap' ? '👋' : '👂'}
              </button>
            ) : (
              <div style={{ width: '100%', animation: 'fadeUp 0.3s ease-out' }}>
                <div style={{ background: '#fff', border: `2px solid ${pattern.color}30`, borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>{roundAcc >= 70 ? '🌟' : roundAcc >= 40 ? '⭐' : '💫'}</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: pattern.color }}>{roundAcc}%</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{roundAcc >= 70 ? '리듬감이 훌륭해요!' : roundAcc >= 40 ? '잘 따라했어요!' : '조금 더 해봐요!'}</div>
                </div>
                <button onClick={nextRound} style={{ width: '100%', background: `linear-gradient(135deg,${pattern.color},${pattern.color}cc)`, border: 'none', color: '#fff', fontWeight: 700, fontSize: '18px', padding: '18px', borderRadius: '18px', cursor: 'pointer' }}>
                  {round + 1 < TOTAL_ROUNDS ? '다음 리듬! →' : '완료! 🎉'}
                </button>
              </div>
            )}

            {phase === 'tap' && <div style={{ marginTop: '16px', fontSize: '13px', color: pattern.color, fontWeight: 600 }}>탭 횟수: {tapCount}</div>}

            <button onClick={() => endSession()} style={{ marginTop: '20px', background: 'none', border: 'none', fontSize: '14px', color: '#d1d5db', cursor: 'pointer' }}>놀이 마치기</button>
          </div>
        )}

        {gameState === 'reward' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(249,115,22,0.1)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#c2410c', marginBottom: '12px' }}>리듬 놀이 완료!</h2>
            <p style={{ fontSize: '18px', color: '#fb923c', marginBottom: '24px' }}>손끝 리듬 탐험을 마쳤어요</p>
            <div style={{ background: '#fff7ed', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{avgAcc >= 70 ? '🌟🌟🌟' : avgAcc >= 40 ? '🌟🌟' : '🌟'}</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#c2410c' }}>{avgAcc}%</div>
              <div style={{ fontSize: '13px', color: '#9a3412', marginTop: '4px' }}>평균 정확도</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#fff7ed', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#c2410c' }}>{TOTAL_ROUNDS}</div>
                <div style={{ fontSize: '11px', color: '#fb923c', marginTop: '3px' }}>완료한 리듬</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '22px' }}>{handSide === 'right' ? '👉' : '👈'}</div>
                <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>{handSide === 'right' ? '오른손' : '왼손'}</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={restart} style={{ width: '100%', background: 'linear-gradient(135deg,#fb923c,#f97316)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 하기 🎵
            </button>
          </div>
        )}
      </div>
    </>
  );
}
