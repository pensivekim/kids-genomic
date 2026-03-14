import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILDINGS } from '../../config/buildings';
import WelcomeModal from '../ui/WelcomeModal';

const FONT = "'Jua', 'system-ui', sans-serif";

/* ── 배경 SVG 요소들 ─────────────────────────────── */
function SkyBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      background: 'linear-gradient(180deg, #7dd3fc 0%, #bae6fd 45%, #bbf7d0 70%, #86efac 100%)',
    }}>
      {/* 태양 */}
      <div style={{
        position: 'absolute', top: 28, right: 60,
        width: 72, height: 72,
        background: 'radial-gradient(circle, #fde68a 60%, #fbbf24 100%)',
        borderRadius: '50%',
        boxShadow: '0 0 0 12px #fef08a55, 0 0 0 24px #fef08a22',
        animation: 'spin 40s linear infinite',
      }} />

      {/* 구름 1 */}
      <div style={{ position: 'absolute', top: 48, left: '8%', animation: 'cloudFloat1 18s ease-in-out infinite' }}>
        <Cloud />
      </div>
      {/* 구름 2 */}
      <div style={{ position: 'absolute', top: 80, left: '55%', animation: 'cloudFloat2 22s ease-in-out infinite' }}>
        <Cloud small />
      </div>
      {/* 구름 3 */}
      <div style={{ position: 'absolute', top: 32, left: '32%', animation: 'cloudFloat1 26s ease-in-out infinite reverse' }}>
        <Cloud small />
      </div>

      {/* 언덕 */}
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 160 }}>
        <path d="M0,120 C200,60 400,160 600,100 C800,40 1000,130 1200,80 C1320,50 1400,100 1440,90 L1440,200 L0,200 Z"
          fill="#bbf7d0" />
        <path d="M0,150 C180,100 360,170 540,130 C720,90 900,160 1080,120 C1260,80 1380,140 1440,120 L1440,200 L0,200 Z"
          fill="#86efac" />
      </svg>
    </div>
  );
}

function Cloud({ small }: { small?: boolean }) {
  const s = small ? 0.65 : 1;
  return (
    <div style={{ position: 'relative', width: 100 * s, height: 44 * s, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28 * s, background: 'white', borderRadius: 40 }} />
      <div style={{ position: 'absolute', bottom: 14 * s, left: 14 * s, width: 38 * s, height: 38 * s, background: 'white', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: 18 * s, left: 36 * s, width: 30 * s, height: 30 * s, background: 'white', borderRadius: '50%' }} />
    </div>
  );
}

/* ── 건물 카드 ───────────────────────────────────── */
function BuildingCard({ building, onClick }: {
  building: typeof BUILDINGS[0];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isLive = building.status === 'live';

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '20px 12px 16px',
    borderRadius: 28,
    cursor: isLive ? 'pointer' : 'default',
    userSelect: 'none',
    background: isLive
      ? `linear-gradient(145deg, ${building.color}, ${building.color}cc)`
      : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
    border: `3px solid ${isLive ? building.roofColor + '55' : '#cbd5e1'}`,
    boxShadow: hovered && isLive
      ? `0 20px 40px ${building.roofColor}44, 0 8px 16px rgba(0,0,0,0.1)`
      : '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    transform: pressed
      ? 'scale(0.93) translateY(2px)'
      : hovered && isLive
        ? 'scale(1.08) translateY(-6px)'
        : 'scale(1) translateY(0)',
    transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fontFamily: FONT,
    minHeight: 130,
  };

  return (
    <div
      style={cardStyle}
      onClick={isLive ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onPointerDown={() => isLive && setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      {/* 이모지 */}
      <span style={{
        fontSize: 46,
        lineHeight: 1,
        filter: isLive ? 'none' : 'grayscale(1) opacity(0.5)',
        animation: hovered && isLive ? 'emojiPop 0.4s ease' : 'none',
      }}>
        {building.icon}
      </span>

      {/* 이름 */}
      <span style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: isLive ? building.roofColor : '#94a3b8',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {building.name}
      </span>

      {/* 라이브 배지 */}
      {isLive && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 0 3px #bbf7d055',
          animation: 'pulse 2s infinite',
        }} />
      )}

      {/* 준비중 */}
      {!isLive && (
        <span style={{
          fontSize: 11,
          color: '#94a3b8',
          background: '#f1f5f9',
          padding: '2px 8px',
          borderRadius: 20,
        }}>
          준비중
        </span>
      )}
    </div>
  );
}

/* ── 서비스 모달 ─────────────────────────────────── */
function ServiceModal({ building, onClose }: {
  building: typeof BUILDINGS[0] | null;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (building) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [building]);

  if (!building) return null;

  function handleGo() {
    if (!building?.serviceUrl) return;
    if (building.serviceUrl.startsWith('/')) {
      navigate(building.serviceUrl);
    } else {
      window.open(building.serviceUrl, '_blank');
    }
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 16px 24px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420,
          background: 'white',
          borderRadius: 32,
          padding: '32px 28px 28px',
          textAlign: 'center',
          fontFamily: FONT,
          boxShadow: '0 -4px 60px rgba(0,0,0,0.15)',
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* 아이콘 배경 */}
        <div style={{
          width: 96, height: 96, borderRadius: 28,
          background: `linear-gradient(145deg, ${building.color}, ${building.color}aa)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 52,
          boxShadow: `0 8px 24px ${building.roofColor}33`,
        }}>
          {building.icon}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
          {building.name}
        </h2>
        <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 28px' }}>
          {building.subtitle}
        </p>

        <button
          onClick={handleGo}
          style={{
            width: '100%', padding: '16px',
            borderRadius: 20, border: 'none',
            background: `linear-gradient(135deg, ${building.roofColor}, ${building.roofColor}cc)`,
            color: 'white', fontSize: 20, fontWeight: 800,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: `0 8px 20px ${building.roofColor}55`,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          입장하기! ✨
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: 12, background: 'none', border: 'none',
            color: '#94a3b8', fontSize: 15, cursor: 'pointer',
            fontFamily: FONT, padding: '8px 16px',
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

/* ── 메인 WorldScene ─────────────────────────────── */
export default function WorldScene() {
  const [kidName, setKidName] = useState<string | null>(
    localStorage.getItem('kidsName')
  );
  const [soundOn, setSoundOn] = useState(
    localStorage.getItem('kidsSoundOff') !== '1'
  );
  const [selected, setSelected] = useState<typeof BUILDINGS[0] | null>(null);
  const [showTip, setShowTip] = useState(false);
  const tipShown = useRef(false);

  useEffect(() => {
    if (kidName && !tipShown.current && !localStorage.getItem('kidsTipDone')) {
      tipShown.current = true;
      setTimeout(() => setShowTip(true), 1200);
      setTimeout(() => {
        setShowTip(false);
        localStorage.setItem('kidsTipDone', '1');
      }, 4500);
    }
  }, [kidName]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem('kidsSoundOff', next ? '0' : '1');
    if (!next) window.speechSynthesis.cancel();
  }

  if (!kidName) {
    return <WelcomeModal onDone={name => setKidName(name)} />;
  }

  return (
    <div style={{ width: '100vw', minHeight: '100vh', fontFamily: FONT, overflowX: 'hidden' }}>
      <SkyBackground />

      {/* ── 헤더 ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 20px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🌳</span>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1 }}>어서 와요,</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              {kidName}의 어린이 마을
            </div>
          </div>
        </div>

        <button
          onClick={toggleSound}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: soundOn ? '#dbeafe' : '#f1f5f9',
            border: 'none', fontSize: 20, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </header>

      {/* ── 메인 컨텐츠 ── */}
      <main style={{ position: 'relative', zIndex: 10, paddingTop: 80, paddingBottom: 48 }}>
        {/* 마스코트 + 인사 */}
        <div style={{
          textAlign: 'center', padding: '24px 20px 8px',
          position: 'relative', display: 'inline-block', width: '100%',
        }}>
          <span style={{ fontSize: 52, display: 'block', animation: 'mascotBob 2s ease-in-out infinite' }}>
            🐰
          </span>
          <h1 style={{
            fontSize: 22, fontWeight: 800, color: '#0f172a',
            margin: '8px 0 4px', letterSpacing: '-0.3px',
          }}>
            오늘 어디 갈까요?
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
            건물을 눌러서 입장해요! ✨
          </p>
        </div>

        {/* 마스코트 말풍선 (처음 방문 팁) */}
        {showTip && (
          <div style={{
            display: 'flex', justifyContent: 'center', padding: '0 24px 8px',
            animation: 'fadeIn 0.4s ease',
          }}>
            <div style={{
              background: 'white', borderRadius: 16,
              padding: '10px 18px', fontSize: 14,
              color: '#334155', fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '2px solid #bbf7d0',
              maxWidth: 280, textAlign: 'center',
            }}>
              🐰 {kidName}야, 카드를 눌러봐! 신나는 게 기다려~
            </div>
          </div>
        )}

        {/* 건물 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          padding: '16px 16px 32px',
          maxWidth: 480,
          margin: '0 auto',
        }}>
          {BUILDINGS.map(b => (
            <BuildingCard key={b.id} building={b} onClick={() => setSelected(b)} />
          ))}
        </div>
      </main>

      {/* ── 모달 ── */}
      <ServiceModal building={selected} onClose={() => setSelected(null)} />

      {/* ── CSS 애니메이션 ── */}
      <style>{`
        @keyframes mascotBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes cloudFloat1 {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(18px); }
        }
        @keyframes cloudFloat2 {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(-14px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px #bbf7d055; }
          50%       { box-shadow: 0 0 0 6px #bbf7d022; }
        }
        @keyframes emojiPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.3) rotate(-8deg); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
