'use client';

import { useState, useRef, useCallback } from 'react';

type GameState = 'consent' | 'pick_emotion' | 'activity' | 'reward';

interface Emotion {
  id: string; icon: string; name: string; weather: string; desc: string;
  bg: string; accent: string; activityPrompt: string; activityIcons: string[];
}

const EMOTIONS: Emotion[] = [
  { id: 'happy', icon: '☀️', name: '신나요!', weather: '맑음', desc: '기분이 정말 좋아요', bg: '#fefce8', accent: '#f59e0b', activityPrompt: '신날 때 하고 싶은 것은?', activityIcons: ['🎉','🏃','🎵','🍦','🎨','🤸'] },
  { id: 'good', icon: '🌤️', name: '좋아요', weather: '구름 조금', desc: '평화롭고 좋은 기분이에요', bg: '#f0f9ff', accent: '#38bdf8', activityPrompt: '좋은 기분일 때 하고 싶은 것은?', activityIcons: ['📚','🧩','🎮','🌸','🍎','🐾'] },
  { id: 'okay', icon: '⛅', name: '그냥그냥', weather: '흐림', desc: '딱히 좋지도 나쁘지도 않아요', bg: '#f8fafc', accent: '#94a3b8', activityPrompt: '지금 하고 싶은 것은?', activityIcons: ['😴','🍪','🐱','🎈','🌈','🧸'] },
  { id: 'sad', icon: '🌧️', name: '슬퍼요', weather: '비', desc: '마음이 좀 무거워요', bg: '#eff6ff', accent: '#6366f1', activityPrompt: '슬플 때 도움이 되는 것은?', activityIcons: ['🤗','🧸','🍫','🐶','🌟','💬'] },
  { id: 'angry', icon: '⛈️', name: '화났어요', weather: '천둥', desc: '화가 난 기분이에요', bg: '#fff7ed', accent: '#f97316', activityPrompt: '화날 때 기분이 나아지는 것은?', activityIcons: ['🏃','🥊','💨','🧊','🫂','😤'] },
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

export default function Mod04() {
  const [gameState, setGameState] = useState<GameState>('consent');
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const handleFinish = useCallback(() => { setGameState('reward'); }, []);

  const pickEmotion = (e: Emotion) => {
    playChime(440); setEmotion(e); setAnimKey(k => k + 1); setGameState('activity');
  };

  const toggleActivity = (icon: string) => {
    playChime(528);
    setSelected(prev => prev.includes(icon) ? prev.filter(i => i !== icon) : [...prev, icon]);
  };

  const restart = () => { setGameState('consent'); setEmotion(null); setSelected([]); };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes weatherFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes popIn { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1);opacity:1} 100%{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#fefce8 0%,#f0f9ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', userSelect: 'none' }}>

        {gameState === 'consent' && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(245,158,11,0.12)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: 'clamp(80px,15vw,120px)', lineHeight: 1, marginBottom: '20px', animation: 'weatherFloat 3s ease-in-out infinite' }}>🌤️</div>
            <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#b45309', marginBottom: '12px' }}>감정 날씨 보고서</h1>
            <p style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '24px' }}>오늘 내 마음 날씨는 어떤가요?</p>
            <div style={{ background: '#fefce8', borderRadius: '16px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#b45309', fontWeight: 700, marginBottom: '6px' }}>☀️ 활동 방법</p>
              <p style={{ fontSize: '14px', color: '#92400e', lineHeight: 1.7 }}>지금 내 기분과 가장 비슷한<br />날씨를 골라보세요!</p>
            </div>
            <button onClick={() => setGameState('pick_emotion')} style={{ width: '100%', background: 'linear-gradient(135deg,#fcd34d,#fb923c)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              오늘의 날씨 알아보기 🌤️
            </button>
          </div>
        )}

        {gameState === 'pick_emotion' && (
          <div style={{ width: '100%', maxWidth: '400px', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', color: '#92400e', fontWeight: 600 }}>오늘 내 마음은 어떤 날씨예요?</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {EMOTIONS.map((e, i) => (
                <button key={e.id} onClick={() => pickEmotion(e)} style={{
                  background: e.bg, border: `2px solid ${e.accent}30`, borderRadius: '20px',
                  padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
                  animation: `popIn 0.4s ${i * 0.07}s ease-out both`,
                  boxShadow: `0 2px 12px ${e.accent}15`,
                }}>
                  <span style={{ fontSize: '40px', lineHeight: 1 }}>{e.icon}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: e.accent }}>{e.name}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>{e.desc}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '18px', color: `${e.accent}80` }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'activity' && emotion && (
          <div key={animKey} style={{ width: '100%', maxWidth: '560px', animation: 'fadeUp 0.4s ease-out' }}>
            <div style={{ background: emotion.bg, border: `2px solid ${emotion.accent}30`, borderRadius: '24px', padding: '24px', textAlign: 'center', marginBottom: '20px', boxShadow: `0 6px 24px ${emotion.accent}20` }}>
              <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '10px', animation: 'weatherFloat 3s ease-in-out infinite' }}>{emotion.icon}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: emotion.accent }}>{emotion.name}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{emotion.weather} · {emotion.desc}</div>
            </div>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#374151', marginBottom: '16px', textAlign: 'center' }}>{emotion.activityPrompt}</p>
              <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginBottom: '14px' }}>여러 개 골라도 돼요!</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {emotion.activityIcons.map((icon, i) => {
                  const isSelected = selected.includes(icon);
                  return (
                    <button key={i} onClick={() => toggleActivity(icon)} style={{
                      background: isSelected ? `${emotion.accent}20` : '#f8fafc',
                      border: `2px solid ${isSelected ? emotion.accent : '#e2e8f0'}`,
                      borderRadius: '16px', padding: '16px 8px', cursor: 'pointer',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.18s',
                    }}>
                      <div style={{ fontSize: '32px', lineHeight: 1, marginBottom: '4px' }}>{icon}</div>
                    </button>
                  );
                })}
              </div>
              <button onClick={handleFinish} style={{ width: '100%', background: `linear-gradient(135deg,${emotion.accent},${emotion.accent}cc)`, border: 'none', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '16px', cursor: 'pointer' }}>
                완성! {emotion.icon}
              </button>
            </div>
          </div>
        )}

        {gameState === 'reward' && emotion && (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', maxWidth: '560px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', animation: 'fadeUp 0.5s ease-out' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#b45309', marginBottom: '12px' }}>잘했어요!</h2>
            <p style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '24px' }}>오늘의 감정 날씨를 발견했어요</p>
            <div style={{ background: emotion.bg, border: `2px solid ${emotion.accent}30`, borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '40px', lineHeight: 1, marginBottom: '8px' }}>{emotion.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: emotion.accent }}>{emotion.name}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{emotion.desc}</div>
            </div>
            {selected.length > 0 && (
              <div style={{ background: '#f9fafb', borderRadius: '14px', padding: '14px', marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px', fontWeight: 600 }}>선택한 활동들</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {selected.map((icon, i) => <span key={i} style={{ fontSize: '28px' }}>{icon}</span>)}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: emotion.bg, borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: emotion.accent }}>1</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px' }}>감정 날씨</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: '#16a34a' }}>{selected.length}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px' }}>활동 선택</div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '20px', lineHeight: 1.6 }}>* 이 결과는 관찰 참고용입니다.<br />진단·처방이 아닙니다.</p>
            <button onClick={restart} style={{ width: '100%', background: 'linear-gradient(135deg,#fcd34d,#fb923c)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '22px', padding: '20px', borderRadius: '20px', cursor: 'pointer' }}>
              다시 하기 🌤️
            </button>
          </div>
        )}
      </div>
    </>
  );
}
