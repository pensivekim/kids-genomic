import { useNavigate } from 'react-router-dom';
import { FONT } from '../../styles/theme';

interface Props {
  emoji: string;
  title: string;
  color: string;
  bg?: string;
}

export default function PageHeader({ emoji, title, color, bg }: Props) {
  const navigate = useNavigate();
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 80px',
      background: bg || 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
      fontFamily: FONT,
    }}>
      {/* Back button — absolute left */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: 16,
          background: color + '15', border: `2px solid ${color}30`,
          fontSize: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color, fontWeight: 900, fontFamily: FONT,
          transition: 'all 0.15s',
        }}
      >
        ←
      </button>

      {/* Centered title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 32 }}>{emoji}</span>
        <h1 style={{
          fontSize: 24, fontWeight: 900, color, margin: 0,
          letterSpacing: '-0.3px',
          textShadow: `0 0 20px ${color}30`,
        }}>
          {title}
        </h1>
      </div>
    </header>
  );
}
