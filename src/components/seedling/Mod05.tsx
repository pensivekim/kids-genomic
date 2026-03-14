'use client';

import { useState, useCallback } from 'react';

type GameState = 'consent' | 'playing' | 'reward';

interface Choice { text: string; prosocial: boolean; emoji: string; }
interface Scenario {
  id: string; situation: string; icon: string; bg: string; accent: string;
  choices: [Choice, Choice]; feedback: Record<string, string>;
}

const SCENARIOS: Scenario[] = [
  { id: 's1', icon: '😢', bg: '#eff6ff', accent: '#6366f1', situation: '친구가 혼자 앉아서 울고 있어요.\n어떻게 할까요?', choices: [{ text: '다가가서 "왜 울어?" 물어봐요', prosocial: true, emoji: '🤗' }, { text: '친구 옆에 조용히 앉아 있어줘요', prosocial: true, emoji: '🪑' }], feedback: { '0': '친구에게 먼저 말을 걸었네요! 따뜻한 마음이에요 🌟', '1': '친구 곁에 있어주는 것만으로도 큰 힘이 돼요 🌟' } },
  { id: 's2', icon: '🧸', bg: '#fff7ed', accent: '#f97316', situation: '친구가 내 장난감을 빌려달라고 해요.\n어떻게 할까요?', choices: [{ text: '잠깐 빌려줘요', prosocial: true, emoji: '😊' }, { text: '"같이 놀자"고 제안해요', prosocial: true, emoji: '🤝' }], feedback: { '0': '나눌 줄 아는 마음이 정말 멋져요 🌟', '1': '함께 노는 아이디어, 정말 좋아요 🌟' } },
  { id: 's3', icon: '🍎', bg: '#f0fdf4', accent: '#16a34a', situation: '친구가 간식을 혼자 다 먹으려고 해요.\n어떻게 말할까요?', choices: [{ text: '"나도 조금만 주면 안 돼?" 부탁해요', prosocial: true, emoji: '🙏' }, { text: '그냥 내 간식을 먹어요', prosocial: true, emoji: '🍪' }], feedback: { '0': '부탁하는 방법을 알고 있네요! 대단해요 🌟', '1': '괜찮아요, 내 것을 즐겁게 먹는 것도 좋아요 🌟' } },
  { id: 's4', icon: '🎮', bg: '#fdf4ff', accent: '#a21caf', situation: '친구들이 게임을 하는데 나를 안 불러줬어요.\n어떻게 할까요?', choices: [{ text: '"나도 같이 해도 돼?" 물어봐요', prosocial: true, emoji: '✋' }, { text: '다른 재미있는 걸 찾아봐요', prosocial: true, emoji: '🔍' }], feedback: { '0': '용기 내서 말한 게 정말 대단해요 🌟', '1': '스스로 즐길 수 있는 방법을 찾다니 멋져요 🌟' } },
  { id: 's5', icon: '🏗️', bg: '#fefce8', accent: '#ca8a04', situation: '친구가 쌓은 블록이 무너졌어요.\n친구가 속상해해요.', choices: [{ text: '같이 다시 쌓아줘요', prosocial: true, emoji: '🤲' }, { text: '"괜찮아, 다시 해봐" 응원해줘요', prosocial: true, emoji: '📣' }], feedback: { '0': '친구를 도와주는 마음이 참 예뻐요 🌟', '1': '응원의 말이 친구에게 큰 힘이 돼요 🌟' } },
  { id: 's6', icon: '🖍️', bg: '#fff1f2', accent: '#e11d48', situation: '친구가 내 색연필을 허락도 없이 가져갔어요.\n어떻게 할까요?', choices: [{ text: '"쓰고 싶으면 먼저 물어봐줘" 말해요', prosocial: true, emoji: '💬' }, { text: '선생님께 말씀드려요', prosocial: true, emoji: '👩‍🏫' }], feedback: { '0': '내 마음을 말로 표현했네요! 정말 잘했어요 🌟', '1': '도움을 요청할 줄 아는 것도 중요해요 🌟' } },
];

function playChime(freq = 528) {
  try {
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.7);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

export default function Mod05() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [scIndex, setScIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [totalChoices, setTotal] = useState(0);

  const endSession = useCallback((total: number) => {
    void total;
    setGameState('reward');
  }, []);

  const handleChoice = (idx: number) => {
    if (chosen !== null) return;
    playChime(440); setChosen(idx);
    const newTotal = totalChoices + 1;
    setTotal(newTotal);
    setTimeout(() => {
      setChosen(null);
      const next = scIndex + 1;
      if (next >= SCENARIOS.length) { endSession(newTotal); }
      else { setScIndex(next); }
    }, 1800);
  };

  const restart = () => { setGameState('consent'); setScIndex(0); setChosen(null); setTotal(0); };

  const sc = SCENARIOS[scIndex];
  const progress = (scIndex / SCENARIOS.length) * 100;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sceneEnter { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        @keyframes starFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#eff6ff 0%,#fdf4ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(99,102,241,0.1)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'starFloat 3s ease-in-out infinite' }}>🏘️</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#4338ca', marginBottom: '12px' }}>친구 마을 역할극</h1>
            <p style={{ fontSize: '18px', color: '#818cf8', marginBottom: '24px' }}>친구들과의 상황을 함께 연습해봐요!</p>
            <div style={{ background: '#eef2ff', borderRadius: '16px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#4338ca', fontWeight: 700, marginBottom: '6px' }}>🏘️ 활동 방법</p>
              <p style={{ fontSize: '14px', color: '#4f46e5', lineHeight: 1.7 }}>그림 속 상황을 보고<br />내가 어떻게 할지 골라봐요.<br />틀린 답은 없어요!</p>
            </div>
            <button onClick={() => setGameState('playing')} style={{ width: '100%', background: 'linear-gradient(135deg,#818cf8,#6366f1)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              역할극 시작! 🏘️
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#818cf8', marginBottom: '6px' }}>
                <span>🏘️ 역할극 중</span><span>{scIndex + 1} / {SCENARIOS.length}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#e0e7ff', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '100px', background: 'linear-gradient(90deg,#818cf8,#6366f1)', width: `${progress}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div key={scIndex} style={{ background: sc.bg, border: `2px solid ${sc.accent}25`, borderRadius: '24px', padding: '28px 20px', textAlign: 'center', marginBottom: '16px', boxShadow: `0 6px 24px ${sc.accent}15`, animation: 'sceneEnter 0.35s ease-out' }}>
              <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '14px' }}>{sc.icon}</div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: sc.accent, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{sc.situation}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sc.choices.map((choice, idx) => {
                const isChosen = chosen === idx;
                return (
                  <button key={idx} onClick={() => handleChoice(idx)} disabled={chosen !== null} style={{
                    background: isChosen ? `${sc.accent}18` : '#fff', border: `2px solid ${isChosen ? sc.accent : '#e2e8f0'}`,
                    borderRadius: '18px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px',
                    cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    boxShadow: isChosen ? `0 4px 16px ${sc.accent}25` : '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                    <span style={{ fontSize: '28px', flexShrink: 0 }}>{choice.emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: isChosen ? sc.accent : '#374151', lineHeight: 1.4 }}>{choice.text}</span>
                    {isChosen && <span style={{ marginLeft: 'auto', fontSize: '18px' }}>✅</span>}
                  </button>
                );
              })}
            </div>

            {chosen !== null && (
              <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '16px', padding: '14px', marginTop: '14px', textAlign: 'center', animation: 'fadeUp 0.3s ease-out' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#15803d' }}>{sc.feedback[String(chosen)]}</p>
              </div>
            )}

            <button onClick={() => endSession(totalChoices)} style={{ display: 'block', margin: '20px auto 0', background: 'none', border: 'none', fontSize: '14px', color: '#a5b4fc', cursor: 'pointer' }}>
              역할극 마치기
            </button>
          </div>
        )}

        {gameState === 'reward' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(99,102,241,0.1)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#4338ca', marginBottom: '12px' }}>역할극 완료!</h2>
            <p style={{ fontSize: '18px', color: '#818cf8', marginBottom: '24px' }}>오늘 친구 마을 탐험을 마쳤어요</p>
            <div style={{ background: '#eef2ff', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#4338ca', fontWeight: 700, marginBottom: '10px' }}>🌟 오늘의 역할극 결과</p>
              <p style={{ fontSize: '13px', color: '#6366f1', lineHeight: 1.6 }}>{totalChoices}개의 상황을<br />모두 훌륭하게 해결했어요!</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#eef2ff', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#4338ca' }}>{totalChoices}</div>
                <div style={{ fontSize: '11px', color: '#818cf8', marginTop: '3px' }}>완료한 상황</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#16a34a' }}>⭐</div>
                <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>훌륭한 친구</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={restart} style={{ width: '100%', background: 'linear-gradient(135deg,#818cf8,#6366f1)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 하기 🏘️
            </button>
          </div>
        )}
      </div>
    </>
  );
}
