'use client';
import { useState } from 'react';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

const NAMES = ['민준', '서연', '지우', '하은', '준서', '수아', '도윤', '채원', '시우', '지아'];

export default function WelcomeModal({ onDone }: { onDone: (name: string) => void }) {
  const [name, setName] = useState('');

  function submit() {
    const n = name.trim() || '친구';
    localStorage.setItem('kidsName', n);
    onDone(n);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'linear-gradient(180deg, #7dd3fc 0%, #bbf7d0 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: FONT,
    }}>
      <div style={{
        background: 'white', borderRadius: 36, padding: '48px 36px',
        maxWidth: 420, width: '100%', textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
        animation: 'fadeIn 0.5s ease',
      }}>
        <span style={{ fontSize: 80, display: 'block', marginBottom: 16 }}>🐰</span>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', fontFamily: FONT }}>
          어린이 마을에 온 것을 환영해요!
        </h1>
        <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 28px', fontFamily: FONT }}>
          이름을 알려주면 더 즐거운 여행이 될 거예요 ✨
        </p>

        {/* 이름 추천 */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
          {NAMES.map(n => (
            <button key={n} onClick={() => setName(n)} style={{
              padding: '6px 16px', borderRadius: 20, border: 'none',
              background: name === n ? '#bbf7d0' : '#f1f5f9',
              color: name === n ? '#166534' : '#475569',
              fontSize: 15, cursor: 'pointer', fontFamily: FONT,
              fontWeight: name === n ? 800 : 400,
              transition: 'all 0.15s',
            }}>
              {n}
            </button>
          ))}
        </div>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="직접 입력해도 돼요!"
          maxLength={10}
          style={{
            width: '100%', padding: '14px 20px', borderRadius: 20,
            border: '2px solid #e2e8f0', fontSize: 18, fontFamily: FONT,
            outline: 'none', marginBottom: 16, boxSizing: 'border-box',
            textAlign: 'center',
          }}
        />
        <button
          onClick={submit}
          style={{
            width: '100%', padding: '18px', borderRadius: 22, border: 'none',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white', fontSize: 22, fontWeight: 800, fontFamily: FONT,
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
          }}
        >
          마을 입장하기! 🌳
        </button>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}
