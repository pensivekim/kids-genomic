'use client';

import { useState, useCallback } from 'react';

type GameState = 'consent' | 'playing' | 'reward';

interface StoryPage { id: number; illustration: string; text: string; prompt: string; choices: string[]; }

const STORY: StoryPage[] = [
  { id: 1, illustration: '🌅🏠🌳', text: '어느 맑은 아침, 토끼 토토가 집 앞에 있었어요.', prompt: '토토는 지금 어디 있을까요?', choices: ['집 앞이에요!', '나무 옆이에요!', '밖에 있어요!'] },
  { id: 2, illustration: '🐰👀🌸', text: '토토는 예쁜 꽃을 발견했어요. 눈이 동그래졌어요!', prompt: '토토의 기분이 어떨까요?', choices: ['신났어요!', '깜짝 놀랐어요!', '기분이 좋아요!'] },
  { id: 3, illustration: '🐰🤔💭', text: '토토는 꽃에 물을 줘야 할지 고민했어요.', prompt: '토토는 어떻게 하면 좋을까요?', choices: ['물을 줘요!', '친구에게 물어봐요!', '기다려봐요!'] },
  { id: 4, illustration: '🐰💧🌻', text: '토토는 물을 주기로 했어요. 꽃이 기뻐했어요!', prompt: '꽃은 어떤 기분일까요?', choices: ['기뻐요!', '고마워요!', '행복해요!'] },
  { id: 5, illustration: '🐰🐿️🤝', text: '다람쥐 친구가 다가왔어요. 둘이 같이 물을 줬어요!', prompt: '같이 하면 어떤 점이 좋을까요?', choices: ['더 빨라요!', '더 재미있어요!', '힘이 덜 들어요!'] },
  { id: 6, illustration: '🌻🌺🌸', text: '꽃들이 활짝 피어났어요. 정원이 예뻐졌어요!', prompt: '이 정원을 보면 어떤 기분이에요?', choices: ['예뻐요!', '기분 좋아요!', '행복해요!'] },
  { id: 7, illustration: '🐰🐿️🌅', text: '토토와 친구는 손을 흔들며 인사했어요. 끝!', prompt: '토토에게 어떤 말을 해주고 싶어요?', choices: ['잘했어요!', '사랑해요!', '고마워요!'] },
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

export default function Mod07() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [pageIdx, setPageIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [uniqueWords, setUniqueWords] = useState<Set<string>>(new Set());

  const endSession = useCallback(() => { setGameState('reward'); }, []);

  const handleChoice = (word: string) => {
    if (chosen) return;
    playChime(528); setChosen(word);
    setAttempts(a => a + 1);
    const words = word.split(/\s+/);
    setUniqueWords(prev => { const next = new Set(prev); words.forEach(w => next.add(w)); return next; });
    setTimeout(() => {
      setChosen(null);
      const next = pageIdx + 1;
      if (next >= STORY.length) { endSession(); } else { setPageIdx(next); }
    }, 1200);
  };

  const restart = () => { setGameState('consent'); setPageIdx(0); setChosen(null); setAttempts(0); setUniqueWords(new Set()); };

  const page = STORY[pageIdx];
  const progress = (pageIdx / STORY.length) * 100;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pageFlip { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bookFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes choiceGlow { 0%,100%{box-shadow:0 2px 8px rgba(0,0,0,0.06)} 50%{box-shadow:0 4px 16px rgba(192,132,252,0.3)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#fdf4ff 0%,#eff6ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(192,132,252,0.12)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'bookFloat 3s ease-in-out infinite' }}>📖</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#7e22ce', marginBottom: '12px' }}>이야기 그림책</h1>
            <p style={{ fontSize: '18px', color: '#c084fc', marginBottom: '24px' }}>토토의 이야기를 함께 읽어봐요!</p>
            <div style={{ background: '#fdf4ff', borderRadius: '16px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#7e22ce', fontWeight: 700, marginBottom: '6px' }}>📖 활동 방법</p>
              <p style={{ fontSize: '14px', color: '#6b21a8', lineHeight: 1.7 }}>그림을 보고 이야기를 읽어요.<br />질문에 맞는 말풍선을 골라봐요!</p>
            </div>
            <button onClick={() => setGameState('playing')} style={{ width: '100%', background: 'linear-gradient(135deg,#c084fc,#818cf8)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              이야기 시작! 📖
            </button>
          </div>
        )}

        {gameState === 'playing' && page && (
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#c084fc', marginBottom: '6px' }}>
                <span>📖 이야기 중</span><span>{pageIdx + 1} / {STORY.length}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#f3e8ff', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '100px', background: 'linear-gradient(90deg,#c084fc,#818cf8)', width: `${progress}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            <div key={pageIdx} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', marginBottom: '16px', boxShadow: '0 6px 24px rgba(192,132,252,0.15)', animation: 'pageFlip 0.4s ease-out' }}>
              <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#eff6ff)', padding: '32px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '72px', lineHeight: 1.3, letterSpacing: '8px' }}>{page.illustration}</div>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#374151', lineHeight: 1.7, marginBottom: '12px' }}>{page.text}</p>
                <div style={{ background: '#fdf4ff', border: '2px solid #e9d5ff', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🤔</span>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#7e22ce' }}>{page.prompt}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {page.choices.map((choice, i) => {
                const isChosen = chosen === choice;
                return (
                  <button key={i} onClick={() => handleChoice(choice)} disabled={chosen !== null} style={{
                    background: isChosen ? 'linear-gradient(135deg,#c084fc,#818cf8)' : '#fff',
                    border: `2px solid ${isChosen ? '#c084fc' : '#e9d5ff'}`,
                    borderRadius: '16px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px',
                    cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.18s',
                    boxShadow: isChosen ? '0 4px 16px rgba(192,132,252,0.35)' : '0 2px 8px rgba(0,0,0,0.04)',
                    animation: !chosen ? 'choiceGlow 2s ease-in-out infinite' : 'none',
                  }}>
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>💬</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: isChosen ? '#fff' : '#374151' }}>{choice}</span>
                    {isChosen && <span style={{ marginLeft: 'auto', fontSize: '16px' }}>✅</span>}
                  </button>
                );
              })}
            </div>

            <button onClick={() => endSession()} style={{ display: 'block', margin: '20px auto 0', background: 'none', border: 'none', fontSize: '14px', color: '#d8b4fe', cursor: 'pointer' }}>
              이야기 마치기
            </button>
          </div>
        )}

        {gameState === 'reward' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(192,132,252,0.12)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#7e22ce', marginBottom: '12px' }}>이야기 완성!</h2>
            <p style={{ fontSize: '18px', color: '#c084fc', marginBottom: '24px' }}>토토의 이야기를 다 읽었어요</p>
            <div style={{ background: '#fdf4ff', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📖✨</div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#7e22ce' }}>{STORY.length}페이지를 모두 읽었어요!</p>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '4px' }}>언어 표현을 정말 잘 했어요</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#fdf4ff', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#7e22ce' }}>{attempts}</div>
                <div style={{ fontSize: '11px', color: '#c084fc', marginTop: '3px' }}>말풍선 선택</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#16a34a' }}>{uniqueWords.size}</div>
                <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>표현한 단어</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={restart} style={{ width: '100%', background: 'linear-gradient(135deg,#c084fc,#818cf8)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 읽기 📖
            </button>
          </div>
        )}
      </div>
    </>
  );
}
