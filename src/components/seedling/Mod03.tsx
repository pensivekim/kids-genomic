'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type SensoryCategory = 'visual' | 'sound' | 'touch' | 'movement';
type GameState = 'consent' | 'playing' | 'reward';

interface SensoryCard {
  id: string; icon: string; name: string; desc: string;
  category: SensoryCategory; bg: string; accent: string;
}

const CARDS: SensoryCard[] = [
  { id: 'v1', icon: '🌈', name: '무지개 빛깔', desc: '알록달록 예쁜 색깔들이에요', category: 'visual', bg: '#fff7ed', accent: '#fb923c' },
  { id: 'v2', icon: '✨', name: '반짝반짝', desc: '빛나고 반짝이는 것들이에요', category: 'visual', bg: '#fefce8', accent: '#ca8a04' },
  { id: 'v3', icon: '🌊', name: '물결무늬', desc: '흐르는 물처럼 부드러운 무늬예요', category: 'visual', bg: '#eff6ff', accent: '#3b82f6' },
  { id: 'v4', icon: '🌸', name: '꽃 그림', desc: '예쁜 꽃 모양이에요', category: 'visual', bg: '#fdf2f8', accent: '#ec4899' },
  { id: 's1', icon: '🎵', name: '음악 소리', desc: '리듬이 있는 노래예요', category: 'sound', bg: '#f5f3ff', accent: '#8b5cf6' },
  { id: 's2', icon: '🌧️', name: '빗소리', desc: '조용히 내리는 빗소리예요', category: 'sound', bg: '#f0f9ff', accent: '#0ea5e9' },
  { id: 's3', icon: '🐦', name: '새 노래', desc: '새들이 지저귀는 소리예요', category: 'sound', bg: '#f0fdf4', accent: '#16a34a' },
  { id: 's4', icon: '🔔', name: '종소리', desc: '맑고 투명한 종소리예요', category: 'sound', bg: '#fefce8', accent: '#b45309' },
  { id: 't1', icon: '🧸', name: '폭신폭신', desc: '부드럽고 폭신한 느낌이에요', category: 'touch', bg: '#fff7ed', accent: '#f97316' },
  { id: 't2', icon: '🪨', name: '단단해요', desc: '딱딱하고 단단한 느낌이에요', category: 'touch', bg: '#f8fafc', accent: '#64748b' },
  { id: 't3', icon: '🌾', name: '살살 간지러워', desc: '살짝 간지러운 느낌이에요', category: 'touch', bg: '#f0fdf4', accent: '#15803d' },
  { id: 't4', icon: '🫧', name: '보들보들 거품', desc: '가볍고 보들보들한 느낌이에요', category: 'touch', bg: '#eff6ff', accent: '#2563eb' },
  { id: 'm1', icon: '🎠', name: '빙글빙글', desc: '천천히 돌아가는 느낌이에요', category: 'movement', bg: '#fdf4ff', accent: '#a21caf' },
  { id: 'm2', icon: '🛝', name: '쭉 내려가기', desc: '미끄러져 내려가는 느낌이에요', category: 'movement', bg: '#fff1f2', accent: '#e11d48' },
  { id: 'm3', icon: '🌬️', name: '바람 솔솔', desc: '얼굴에 바람이 닿는 느낌이에요', category: 'movement', bg: '#f0f9ff', accent: '#0284c7' },
  { id: 'm4', icon: '🤸', name: '폴짝폴짝', desc: '높이 뛰는 것 같은 느낌이에요', category: 'movement', bg: '#f0fdf4', accent: '#059669' },
];

const CATEGORY_LABELS: Record<SensoryCategory, string> = {
  visual: '👀 보는 것', sound: '👂 듣는 것', touch: '🖐️ 만지는 것', movement: '🏃 움직이는 것',
};

function playChime() {
  try {
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'; osc.frequency.value = 528;
    gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.7);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

export default function Mod03() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [cardIndex, setCardIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [notLiked, setNotLiked] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'like' | 'pass' | null>(null);

  const handleSessionComplete = useCallback((likedIds: string[], notLikedIds: string[]) => {
    void likedIds; void notLikedIds;
    setGameState('reward');
  }, []);

  const handleChoice = useCallback((choice: 'like' | 'pass') => {
    if (feedback !== null) return;
    const card = CARDS[cardIndex];
    setFeedback(choice);
    const newLiked = choice === 'like' ? [...liked, card.id] : liked;
    const newNotLiked = choice === 'pass' ? [...notLiked, card.id] : notLiked;
    if (choice === 'like') playChime();
    setLiked(newLiked); setNotLiked(newNotLiked);
    setTimeout(() => {
      setFeedback(null);
      const next = cardIndex + 1;
      if (next >= CARDS.length) { handleSessionComplete(newLiked, newNotLiked); }
      else { setCardIndex(next); }
    }, 500);
  }, [feedback, cardIndex, liked, notLiked, handleSessionComplete]);

  const handleRestart = () => { setGameState('consent'); setCardIndex(0); setLiked([]); setNotLiked([]); setFeedback(null); };

  const card = CARDS[cardIndex];
  const progress = (cardIndex / CARDS.length) * 100;
  const likedCategories = [...new Set(liked.map(id => CARDS.find(c => c.id === id)?.category).filter(Boolean) as SensoryCategory[])];

  return (
    <>
      <style>{`
        @keyframes cardEnter { from{opacity:0;transform:scale(0.92) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes popIn { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.15) rotate(3deg);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#f5f3ff 0%,#fdf2f8 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(139,92,246,0.12)' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'cardEnter 0.5s ease-out' }}>🌈</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#7c3aed', marginBottom: '12px' }}>감각 모험 탐험대</h1>
            <p style={{ fontSize: '18px', color: '#a78bfa', marginBottom: '24px' }}>어떤 느낌이 좋은지 함께 탐험해봐요!</p>
            <div style={{ background: '#f5f3ff', borderRadius: '16px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#6d28d9', fontWeight: 700, marginBottom: '6px' }}>🌈 탐험 방법</p>
              <p style={{ fontSize: '14px', color: '#7c3aed', lineHeight: 1.7 }}>카드를 보고 <strong>좋아요</strong> 또는 <strong>다음</strong>을 눌러주세요.<br />틀린 답은 없어요!</p>
            </div>
            <button onClick={() => setGameState('playing')} style={{ width: '100%', background: 'linear-gradient(135deg,#a78bfa,#c084fc)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              탐험 시작! 🌈
            </button>
          </div>
        )}

        {gameState === 'playing' && card && (
          <div style={{ width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#a78bfa', marginBottom: '6px' }}>
                <span>🌈 탐험 중</span><span>{cardIndex + 1} / {CARDS.length}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#ede9fe', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '100px', background: 'linear-gradient(90deg,#a78bfa,#c084fc)', width: `${progress}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div key={cardIndex} style={{
              background: card.bg, border: `2px solid ${card.accent}30`, borderRadius: '28px',
              width: '100%', padding: '40px 24px', textAlign: 'center', marginBottom: '20px',
              animation: feedback ? 'bounce 0.35s ease-out' : 'cardEnter 0.35s ease-out',
              boxShadow: `0 8px 32px ${card.accent}18`,
            }}>
              <div style={{ fontSize: '100px', lineHeight: 1, marginBottom: '16px' }}>{card.icon}</div>
              <h2 style={{ fontSize: '30px', fontWeight: 800, color: card.accent, marginBottom: '8px' }}>{card.name}</h2>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>{card.desc}</p>
              <div style={{ display: 'inline-block', marginTop: '12px', background: `${card.accent}15`, borderRadius: '100px', padding: '4px 14px', fontSize: '11px', color: card.accent, fontWeight: 600 }}>
                {CATEGORY_LABELS[card.category]}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button onClick={() => handleChoice('pass')} disabled={feedback !== null} style={{
                flex: 1, background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '18px',
                padding: '16px 8px', cursor: 'pointer', opacity: feedback ? 0.5 : 1,
              }}>
                <div style={{ fontSize: '26px', marginBottom: '4px' }}>💙</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>다음</div>
              </button>
              <button onClick={() => handleChoice('like')} disabled={feedback !== null} style={{
                flex: 1.6, background: 'linear-gradient(135deg,#a78bfa,#c084fc)', border: 'none',
                borderRadius: '18px', padding: '16px 8px', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(167,139,250,0.4)',
                transform: feedback === 'like' ? 'scale(1.05)' : 'scale(1)',
              }}>
                <div style={{ fontSize: '26px', marginBottom: '4px' }}>💛</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>좋아요!</div>
              </button>
            </div>

            <button onClick={() => handleSessionComplete(liked, notLiked)} style={{ marginTop: '20px', background: 'none', border: 'none', fontSize: '14px', color: '#c4b5fd', cursor: 'pointer' }}>
              탐험 마치기
            </button>
          </div>
        )}

        {gameState === 'reward' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(139,92,246,0.12)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#7c3aed', marginBottom: '12px' }}>탐험 완료!</h2>
            <p style={{ fontSize: '18px', color: '#a78bfa', marginBottom: '24px' }}>오늘 발견한 감각 특성이에요</p>
            <div style={{ background: '#f5f3ff', borderRadius: '16px', padding: '16px', marginBottom: '16px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#6d28d9', marginBottom: '10px' }}>
                {likedCategories.length > 0 ? '💛 좋아하는 감각' : '🌈 다양한 감각을 탐험했어요!'}
              </p>
              {likedCategories.map((cat, i) => (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', animation: `popIn 0.4s ${i * 0.1}s ease-out both` }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#7c3aed', fontWeight: 500 }}>{CATEGORY_LABELS[cat]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#f5f3ff', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#7c3aed' }}>{liked.length}</div>
                <div style={{ fontSize: '11px', color: '#a78bfa', marginTop: '3px' }}>좋아요 카드</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#16a34a' }}>{CARDS.length}</div>
                <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>탐험한 카드</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={handleRestart} style={{ width: '100%', background: 'linear-gradient(135deg,#a78bfa,#c084fc)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 탐험하기 🌈
            </button>
          </div>
        )}
      </div>
    </>
  );
}
