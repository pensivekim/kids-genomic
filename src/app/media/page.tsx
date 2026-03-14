'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

const AGES = [
  { age: 3, emoji: '🌱', label: '만 3세', desc: '미디어 처음 만나기', color: '#22c55e' },
  { age: 4, emoji: '🌿', label: '만 4세', desc: '미디어 탐구하기',   color: '#3b82f6' },
  { age: 5, emoji: '🌳', label: '만 5세', desc: '미디어 만들기',      color: '#8b5cf6' },
];

export default function MediaPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)', fontFamily: FONT }}>
      <PageHeader emoji="🎬" title="미디어 극장" color="#9333ea" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>🎬</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#9333ea', margin: '0 0 12px' }}>미디어 리터러시</h2>
          <p style={{ fontSize: 18, color: '#6b7280', margin: '0 0 8px' }}>
            만 3~5세 어린이를 위한 36주 미디어 교육
          </p>
          <p style={{ fontSize: 15, color: '#9ca3af', margin: 0 }}>
            5C 역량 · 비판적 사고 · 창의적 제작 · 소통 · 연결 · 선택
          </p>
        </div>

        {/* 연령 선택 */}
        <h3 style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: '#374151', marginBottom: 28 }}>
          몇 살인가요?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {AGES.map(a => (
            <button key={a.age} onClick={() => router.push(`/media/lesson/${a.age}/1`)}
              style={{
                background: `linear-gradient(145deg, ${a.color}22, ${a.color}0d)`,
                border: `2px solid ${a.color}35`, borderRadius: 28, padding: '40px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: FONT,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
              <div style={{
                width: 96, height: 96, borderRadius: '50%',
                background: `linear-gradient(135deg, ${a.color}35, ${a.color}15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52,
              }}>{a.emoji}</div>
              <p style={{ fontSize: 24, fontWeight: 900, color: a.color, margin: 0 }}>{a.label}</p>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>{a.desc}</p>
            </button>
          ))}
        </div>

        {/* 교사 로그인 */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => router.push('/login?redirect=/media/teacher')}
            style={{
              padding: '14px 32px', borderRadius: 20, border: 'none',
              background: 'linear-gradient(135deg, #9333ea, #7c3aed)',
              color: 'white', fontSize: 18, fontWeight: 800, fontFamily: FONT,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(147,51,234,0.35)',
            }}>
            선생님 로그인 → 수업 관리
          </button>
        </div>
      </div>
    </div>
  );
}
