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
      height: 64,
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      background: bg || 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.5)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      fontFamily: FONT,
      gap: 12,
    }}>
      <button
        onClick={() => navigate('/')}
        style={{
          width: 44, height: 44, borderRadius: 14,
          background: color + '22', border: 'none',
          fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: color, fontWeight: 800, fontFamily: FONT,
          transition: 'all 0.15s',
        }}
      >
        ←
      </button>
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <h1 style={{ fontSize: 22, fontWeight: 800, color, margin: 0, letterSpacing: '-0.3px' }}>
        {title}
      </h1>
    </header>
  );
}
