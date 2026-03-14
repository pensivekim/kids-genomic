'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const SESSION_MAX_SEC = 15 * 60;
const MAX_ROUNDS      = 20;
const ROUND_SEC       = 8;
const SUCCESS_DELAY   = 700;

const ITEM_POOL = [
  '🍎','🍊','🍋','🍇','🍓','🍑','🍒','🥝','🍍','🥭',
  '🐶','🐱','🐰','🦊','🐻','🐼','🐨','🐯','🐮','🐷',
];

type GameState = 'consent' | 'playing' | 'reward';
type DiffLevel = 'easy' | 'medium' | 'hard';

const ITEM_COUNT: Record<DiffLevel, number> = { easy: 3, medium: 5, hard: 7 };
const DIFF_UP:   Partial<Record<DiffLevel, DiffLevel>> = { easy: 'medium', medium: 'hard' };
const DIFF_DOWN: Partial<Record<DiffLevel, DiffLevel>> = { medium: 'easy', hard: 'medium' };
const DIFF_DOTS: Record<DiffLevel, number> = { easy: 1, medium: 2, hard: 3 };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playChime() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.value = 528;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    osc.start(); osc.stop(ctx.currentTime + 0.7);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

function RoundTimer({ pct }: { pct: number }) {
  const r = 25;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);
  const color = pct > 37.5 ? '#6ee7b7' : '#fcd34d';
  const secs = Math.ceil((pct / 100) * ROUND_SEC);
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="29" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle cx="29" cy="29" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 29 29)" style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.4s ease' }} />
      <text x="29" y="34" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#6b7280">{secs}</text>
    </svg>
  );
}

function ItemButton({ emoji, size, isSuccess, onTouch }: {
  emoji: string; size: number; isSuccess: boolean; onTouch: () => void;
}) {
  return (
    <button onClick={onTouch} style={{
      aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', borderRadius: '24px', border: 'none',
      boxShadow: isSuccess ? '0 0 0 3px #6ee7b7, 0 4px 16px rgba(110,231,183,0.4)' : '0 2px 8px rgba(0,0,0,0.06)',
      animation: isSuccess ? 'successPop 0.55s ease-out forwards' : 'none',
      cursor: 'pointer', padding: '8px',
    }}>
      <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{emoji}</span>
    </button>
  );
}

export default function Mod02() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [sessionSec, setSessionSec] = useState(0);
  const [round, setRound] = useState(1);
  const [diffLevel, setDiffLevel] = useState<DiffLevel>('easy');
  const [items, setItems] = useState<string[]>([]);
  const [targetIdx, setTargetIdx] = useState(0);
  const [timerPct, setTimerPct] = useState(100);
  const [successIdx, setSuccessIdx] = useState<number | null>(null);
  const [finalData, setFinalData] = useState<{
    correctTouches: number; impulsiveTouches: number;
    avgReactionMs: number; sessionCompletionRate: number; sessionSec: number;
  } | null>(null);

  const G = useRef({
    round: 1, diff: 'easy' as DiffLevel, targetIdx: 0,
    roundActive: false, roundStartMs: 0, sessionSec: 0,
    correctTouches: 0, impulsiveTouches: 0, reactionTimes: [] as number[],
    consecutiveSuccess: 0, consecutiveMiss: 0,
  });

  const sessionTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const roundTimerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextRoundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRoundRef = useRef<(r: number, d: DiffLevel) => void>(() => {});
  const sessionStartRef = useRef<string>(new Date().toISOString());

  const endSession = useCallback(() => {
    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
    const g = G.current;
    g.roundActive = false;
    const avgReactionMs = g.reactionTimes.length > 0
      ? Math.round(g.reactionTimes.reduce((a, b) => a + b, 0) / g.reactionTimes.length) : 0;
    const completionRate = Math.min(1, (g.round - 1) / MAX_ROUNDS);
    setFinalData({ correctTouches: g.correctTouches, impulsiveTouches: g.impulsiveTouches, avgReactionMs, sessionCompletionRate: completionRate, sessionSec: g.sessionSec });
    setGameState('reward');
  }, []);

  const startRound = useCallback((roundNum: number, diff: DiffLevel) => {
    if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    const count = ITEM_COUNT[diff];
    const picked = shuffle(ITEM_POOL).slice(0, count);
    const tIdx = Math.floor(Math.random() * count);
    G.current.round = roundNum; G.current.diff = diff; G.current.targetIdx = tIdx;
    G.current.roundActive = true; G.current.roundStartMs = Date.now();
    setRound(roundNum); setDiffLevel(diff); setItems(picked); setTargetIdx(tIdx);
    setSuccessIdx(null); setTimerPct(100);
    let elapsed = 0;
    roundTimerRef.current = setInterval(() => {
      elapsed += 0.1;
      const pct = Math.max(0, 100 - (elapsed / ROUND_SEC) * 100);
      setTimerPct(pct);
      if (elapsed >= ROUND_SEC) {
        clearInterval(roundTimerRef.current!); roundTimerRef.current = null;
        G.current.roundActive = false;
        const g = G.current;
        g.consecutiveMiss++; g.consecutiveSuccess = 0;
        let nextDiff = g.diff;
        if (g.consecutiveMiss >= 3) { const down = DIFF_DOWN[g.diff]; if (down) nextDiff = down; g.consecutiveMiss = 0; }
        const nextR = g.round + 1;
        if (nextR > MAX_ROUNDS || g.sessionSec >= SESSION_MAX_SEC) { endSession(); }
        else { nextRoundTimerRef.current = setTimeout(() => startRoundRef.current(nextR, nextDiff), 400); }
      }
    }, 100);
  }, [endSession]);

  useEffect(() => { startRoundRef.current = startRound; }, [startRound]);

  const handleTouch = useCallback((index: number) => {
    const g = G.current;
    if (!g.roundActive) return;
    if (index === g.targetIdx) {
      if (roundTimerRef.current) { clearInterval(roundTimerRef.current); roundTimerRef.current = null; }
      g.roundActive = false;
      const reactionMs = Date.now() - g.roundStartMs;
      g.correctTouches++; g.reactionTimes.push(reactionMs);
      g.consecutiveSuccess++; g.consecutiveMiss = 0;
      playChime(); setSuccessIdx(index);
      let nextDiff = g.diff;
      if (g.consecutiveSuccess >= 3) { const up = DIFF_UP[g.diff]; if (up) nextDiff = up; g.consecutiveSuccess = 0; }
      const nextR = g.round + 1;
      nextRoundTimerRef.current = setTimeout(() => {
        if (nextR > MAX_ROUNDS || g.sessionSec >= SESSION_MAX_SEC) { endSession(); }
        else { startRoundRef.current(nextR, nextDiff); }
      }, SUCCESS_DELAY);
    } else { g.impulsiveTouches++; }
  }, [endSession]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    sessionTimerRef.current = setInterval(() => {
      G.current.sessionSec++;
      setSessionSec(prev => { if (prev + 1 >= SESSION_MAX_SEC) { endSession(); return SESSION_MAX_SEC; } return prev + 1; });
    }, 1000);
    return () => { if (sessionTimerRef.current) clearInterval(sessionTimerRef.current); };
  }, [gameState, endSession]);

  useEffect(() => () => {
    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
  }, []);

  const handleStart = useCallback(() => {
    sessionStartRef.current = new Date().toISOString();
    G.current = { round: 1, diff: 'easy', targetIdx: 0, roundActive: false, roundStartMs: 0, sessionSec: 0, correctTouches: 0, impulsiveTouches: 0, reactionTimes: [], consecutiveSuccess: 0, consecutiveMiss: 0 };
    setSessionSec(0); setFinalData(null); setGameState('playing');
    startRound(1, 'easy');
  }, [startRound]);

  const handleRestart = useCallback(() => { setGameState('consent'); setSessionSec(0); setRound(1); setItems([]); setFinalData(null); setSuccessIdx(null); }, []);

  const sessionProgressPct = (sessionSec / SESSION_MAX_SEC) * 100;
  const targetEmoji = items[targetIdx] ?? '';
  const emojiSize = items.length <= 3 ? 64 : items.length <= 5 ? 56 : 48;
  const gridCols = items.length <= 5 ? 3 : 4;

  return (
    <>
      <style>{`
        @keyframes successPop { 0%{transform:scale(1)} 45%{transform:scale(1.32)} 100%{transform:scale(1)} }
        @keyframes starPop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.2) rotate(3deg);opacity:1} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#ecfdf5 0%,#f0fdfa 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '24px 16px 40px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '40px 36px', maxWidth: '480px', width: '100%', textAlign: 'center', marginTop: '24px' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>🔍</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: '#065f46', marginBottom: '8px' }}>보물찾기 집중왕</h1>
            <p style={{ fontSize: '18px', color: '#6ee7b7', marginBottom: '24px' }}>숨어 있는 보물을 빠르게 찾아보세요!</p>
            <div style={{ background: '#ecfdf5', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>🎯 오늘의 보물을 화면에서 찾아 터치!</p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>⏱ 8초 안에 찾으면 돼요</p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>🌟 잘 찾을수록 더 어려워져요</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>🎮 최대 {MAX_ROUNDS}라운드 또는 15분</p>
            </div>
            <button onClick={handleStart} style={{ width: '100%', background: 'linear-gradient(135deg,#34d399,#10b981)', border: 'none', color: '#fff', fontWeight: 900, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer', minHeight: '80px' }}>
              시작하기 🔍
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10b981', marginBottom: '6px' }}>
                <span>🎯 {round} / {MAX_ROUNDS} 라운드</span>
                <span>{Math.floor((SESSION_MAX_SEC - sessionSec) / 60)}분 남음</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#d1fae5', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#10b981', borderRadius: '100px', width: `${sessionProgressPct}%`, transition: 'width 1s ease' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: '#fff', borderRadius: '20px', padding: '12px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>오늘의 보물</span>
                <span style={{ fontSize: '48px', lineHeight: 1, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}>{targetEmoji}</span>
              </div>
              <RoundTimer pct={timerPct} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '12px', width: '100%' }}>
              {items.map((emoji, i) => (
                <ItemButton key={`${round}-${i}`} emoji={emoji} size={emojiSize} isSuccess={successIdx === i} onTouch={() => handleTouch(i)} />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '16px', padding: '8px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>난이도</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3].map(n => (
                    <div key={n} style={{ width: '10px', height: '10px', borderRadius: '50%', background: n <= DIFF_DOTS[diffLevel] ? '#34d399' : '#e5e7eb', transition: 'background 0.3s' }} />
                  ))}
                </div>
              </div>
              <button onClick={endSession} style={{ background: '#fff', border: 'none', borderRadius: '16px', padding: '8px 16px', fontSize: '13px', color: '#9ca3af', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                놀이 마치기
              </button>
            </div>
          </div>
        )}

        {gameState === 'reward' && finalData && (
          <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '40px 36px', maxWidth: '480px', width: '100%', textAlign: 'center', marginTop: '24px', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '8px', animation: 'float 2s ease-in-out infinite' }}>🏆</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: '#065f46', marginBottom: '4px' }}>집중왕!</h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '16px' }}>멋지게 보물을 찾았어요</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {Array.from({ length: 5 }, (_, i) => {
                const starCount = Math.min(5, Math.max(1, Math.round(finalData.correctTouches / 3)));
                return <span key={i} style={{ fontSize: '28px', opacity: i < starCount ? 1 : 0.2, animation: i < starCount ? `starPop 0.4s ${i * 0.1}s ease-out both` : 'none', display: 'inline-block' }}>⭐</span>;
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#ecfdf5', borderRadius: '16px', padding: '14px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#059669' }}>{finalData.correctTouches}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>보물 발견</div>
              </div>
              <div style={{ background: '#f0fdfa', borderRadius: '16px', padding: '14px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0d9488' }}>{finalData.avgReactionMs > 0 ? `${(finalData.avgReactionMs / 1000).toFixed(1)}s` : '-'}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>평균 반응</div>
              </div>
              <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '14px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>{Math.round(finalData.sessionCompletionRate * 100)}%</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>완료율</div>
              </div>
              <div style={{ background: '#fdf4ff', borderRadius: '16px', padding: '14px' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#9333ea' }}>{Math.floor(finalData.sessionSec / 60)}분</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>놀이 시간</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={handleRestart} style={{ width: '100%', background: 'linear-gradient(135deg,#34d399,#10b981)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '20px', padding: '18px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 하기 🔍
            </button>
          </div>
        )}
      </div>
    </>
  );
}
