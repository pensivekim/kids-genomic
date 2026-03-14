import { useState, useEffect, useRef } from 'react';
import { speak } from '../../utils/tts';

const FONT = "'Jua', 'system-ui', sans-serif";

interface Props {
  onDone: (name: string) => void;
}

export default function WelcomeModal({ onDone }: Props) {
  const saved = localStorage.getItem('kidsName');
  const [name, setName] = useState('');
  const [phase] = useState<'input' | 'greeting'>(saved ? 'greeting' : 'input');
  const [displayName] = useState(saved || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'input') setTimeout(() => inputRef.current?.focus(), 400);
  }, [phase]);

  useEffect(() => {
    if (phase === 'greeting') {
      speak(`안녕, ${displayName}야! 오늘도 같이 놀자!`);
      const t = setTimeout(() => onDone(displayName), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem('kidsName', trimmed);
    speak(`안녕, ${trimmed}야! 어서 와! 같이 놀자!`);
    onDone(trimmed);
  }

  // 재방문 인사
  if (phase === 'greeting') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(180deg, #7dd3fc 0%, #bbf7d0 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT, gap: 16,
        animation: 'fadeIn 0.4s ease',
      }}>
        <span style={{ fontSize: 80, animation: 'mascotBob 0.8s ease-in-out infinite' }}>🐰</span>
        <h1 style={{ fontSize: 32, color: '#166534', margin: 0, textAlign: 'center' }}>
          안녕, {displayName}야!
        </h1>
        <p style={{ fontSize: 18, color: '#15803d', margin: 0 }}>오늘도 같이 놀자! 🌟</p>
        <style>{`
          @keyframes mascotBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        `}</style>
      </div>
    );
  }

  // 첫 방문 이름 입력
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'linear-gradient(180deg, #7dd3fc 0%, #bbf7d0 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT, padding: 24,
      animation: 'fadeIn 0.5s ease',
    }}>
      {/* 장식 구름 */}
      <div style={{ position: 'absolute', top: 40, left: '10%', opacity: 0.8 }}>
        <CloudShape />
      </div>
      <div style={{ position: 'absolute', top: 60, right: '8%', opacity: 0.6 }}>
        <CloudShape small />
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderRadius: 36,
        padding: '40px 32px',
        maxWidth: 360, width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        border: '2px solid rgba(255,255,255,0.8)',
        animation: 'slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <span style={{ fontSize: 72, display: 'block', marginBottom: 16, animation: 'mascotBob 2s ease-in-out infinite' }}>
          🐰
        </span>
        <h1 style={{ fontSize: 26, color: '#0f172a', margin: '0 0 8px' }}>
          어서 와요! 👋
        </h1>
        <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 28px' }}>
          이름이 뭐예요?
        </p>

        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="이름을 써봐요"
          maxLength={8}
          style={{
            width: '100%', boxSizing: 'border-box',
            textAlign: 'center', fontSize: 24, fontWeight: 700,
            fontFamily: FONT,
            padding: '16px 20px',
            borderRadius: 20,
            border: '3px solid #bbf7d0',
            outline: 'none',
            background: '#f0fdf4',
            color: '#166534',
            marginBottom: 16,
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#22c55e'}
          onBlur={e => e.target.style.borderColor = '#bbf7d0'}
        />

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          style={{
            width: '100%', padding: '18px',
            borderRadius: 22, border: 'none',
            background: name.trim()
              ? 'linear-gradient(135deg, #4ade80, #22c55e)'
              : '#e2e8f0',
            color: name.trim() ? 'white' : '#94a3b8',
            fontSize: 20, fontWeight: 800,
            fontFamily: FONT, cursor: name.trim() ? 'pointer' : 'default',
            boxShadow: name.trim() ? '0 8px 20px #22c55e44' : 'none',
            transition: 'all 0.2s',
          }}
        >
          입장하기! 🌳
        </button>
      </div>

      <style>{`
        @keyframes mascotBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

function CloudShape({ small }: { small?: boolean }) {
  const s = small ? 0.7 : 1;
  return (
    <div style={{ position: 'relative', width: 100 * s, height: 44 * s }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28 * s, background: 'white', borderRadius: 40, opacity: 0.9 }} />
      <div style={{ position: 'absolute', bottom: 14 * s, left: 14 * s, width: 38 * s, height: 38 * s, background: 'white', borderRadius: '50%', opacity: 0.9 }} />
      <div style={{ position: 'absolute', bottom: 18 * s, left: 36 * s, width: 30 * s, height: 30 * s, background: 'white', borderRadius: '50%', opacity: 0.9 }} />
    </div>
  );
}
