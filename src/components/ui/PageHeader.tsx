'use client';
import { useRouter } from 'next/navigation';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

interface Props {
  title: string;
  emoji?: string;
  color?: string;
  backHref?: string;
}

export default function PageHeader({ title, emoji, color = '#0f172a', backHref = '/' }: Props) {
  const router = useRouter();

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      padding: '0 80px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <button
        onClick={() => router.push(backHref)}
        style={{
          position: 'absolute', left: 20,
          width: 44, height: 44, borderRadius: 14,
          background: '#f1f5f9', border: 'none', fontSize: 20,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT, color: '#475569',
          transition: 'all 0.15s',
        }}
      >
        ←
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {emoji && <span style={{ fontSize: 32 }}>{emoji}</span>}
        <h1 style={{ fontSize: 24, fontWeight: 900, color, margin: 0, fontFamily: FONT }}>
          {title}
        </h1>
      </div>
    </header>
  );
}
