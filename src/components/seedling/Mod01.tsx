'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type GameState = 'consent' | 'playing' | 'reward';

const BUTTERFLIES = ['🦋', '🌸', '🌟', '🍀', '🌺', '🐝', '🌻', '🎈'];
const TOTAL_ROUNDS = 15;

function playChime(freq = 528) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.7);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

export default function Mod01() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [bfPos, setBfPos] = useState({ x: 50, y: 50 });
  const [bfIdx, setBfIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [showBf, setShowBf] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextRound = useCallback((currentRound: number, currentHits: number) => {
    if (currentRound >= TOTAL_ROUNDS) {
      setGameState('reward');
      return;
    }
    const x = 15 + Math.random() * 70;
    const y = 20 + Math.random() * 60;
    setBfPos({ x, y });
    setBfIdx(Math.floor(Math.random() * BUTTERFLIES.length));
    setAnimKey(k => k + 1);
    setShowBf(true);
    setRound(currentRound + 1);

    // 나비가 5초 후 사라짐
    timerRef.current = setTimeout(() => {
      setShowBf(false);
      timerRef.current = setTimeout(() => nextRound(currentRound + 1, currentHits), 800);
    }, 4500);
  }, []);

  const handleTap = useCallback(() => {
    if (!showBf) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    playChime();
    setShowBf(false);
    const newHits = hits + 1;
    setHits(newHits);
    timerRef.current = setTimeout(() => nextRound(round, newHits), 600);
  }, [showBf, hits, round, nextRound]);

  const startGame = () => {
    setRound(0); setHits(0);
    setGameState('playing');
    setTimeout(() => nextRound(0, 0), 300);
  };

  const restart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGameState('consent');
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const stars = Math.min(5, Math.round((hits / TOTAL_ROUNDS) * 5));

  return (
    <>
      <style>{`
        @keyframes bfFloat { 0%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-12px) rotate(5deg)} 100%{transform:translateY(0) rotate(-5deg)} }
        @keyframes bfAppear { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#f0fdf4 0%,#dcfce7 100%)', userSelect: 'none' }}>

        {/* 동의 화면 */}
        {gameState === 'consent' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(34,197,94,0.12)' }}>
              <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'bfFloat 3s ease-in-out infinite' }}>🦋</div>
              <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#15803d', marginBottom: '12px' }}>눈맞춤 나비</h1>
              <p style={{ fontSize: '18px', color: '#4ade80', marginBottom: '24px' }}>나비가 어디에 있는지 찾아서 터치해봐요!</p>
              <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
                <p style={{ fontSize: '14px', color: '#15803d', fontWeight: 700, marginBottom: '6px' }}>🦋 활동 방법</p>
                <p style={{ fontSize: '14px', color: '#166534', lineHeight: 1.7 }}>
                  화면에 나비가 나타나요.<br />
                  나비를 빠르게 터치해보세요!<br />
                  {TOTAL_ROUNDS}번 도전해요.
                </p>
              </div>
              <button onClick={startGame} style={{ width: '100%', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
                시작하기 🦋
              </button>
            </div>
          </div>
        )}

        {/* 게임 화면 */}
        {gameState === 'playing' && (
          <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {/* 진행 바 */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#22c55e', marginBottom: '6px' }}>
                <span>🦋 {round} / {TOTAL_ROUNDS} 라운드</span>
                <span>터치: {hits}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#dcfce7', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '100px', background: 'linear-gradient(90deg,#4ade80,#22c55e)', width: `${(round / TOTAL_ROUNDS) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* 나비 */}
            {showBf && (
              <button key={animKey} onClick={handleTap} style={{
                position: 'absolute',
                left: `${bfPos.x}%`,
                top: `${bfPos.y}%`,
                transform: 'translate(-50%,-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(60px,12vw,90px)',
                animation: 'bfAppear 0.3s ease-out, bfFloat 2s ease-in-out infinite 0.3s',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              }}>
                {BUTTERFLIES[bfIdx]}
              </button>
            )}

            {!showBf && round < TOTAL_ROUNDS && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '48px', opacity: 0.3 }}>
                🔍
              </div>
            )}
          </div>
        )}

        {/* 보상 화면 */}
        {gameState === 'reward' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(34,197,94,0.12)', animation: 'fadeUp 0.5s ease-out' }}>
              <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
              <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#15803d', marginBottom: '12px' }}>나비를 찾았어요!</h2>
              <p style={{ fontSize: '18px', color: '#4ade80', marginBottom: '24px' }}>눈맞춤 나비 탐험 완료!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ fontSize: '28px', opacity: i < stars ? 1 : 0.2 }}>⭐</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ fontSize: '30px', fontWeight: 800, color: '#15803d' }}>{hits}</div>
                  <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>나비 터치</div>
                </div>
                <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ fontSize: '30px', fontWeight: 800, color: '#15803d' }}>{TOTAL_ROUNDS}</div>
                  <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>전체 라운드</div>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
              <button onClick={restart} style={{ width: '100%', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
                다시 하기 🦋
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
