'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

const MODULES = [
  { id: 'mod01', emoji: '🦋', label: '눈맞춤 나비', desc: '시선 추적 · 주의집중', color: '#22c55e' },
  { id: 'mod02', emoji: '🔍', label: '보물찾기',   desc: '집중력 · 반응속도',   color: '#3b82f6' },
  { id: 'mod03', emoji: '🌈', label: '감각 모험',  desc: '감각통합 · 탐색',     color: '#f97316' },
  { id: 'mod04', emoji: '⛅', label: '감정 날씨',  desc: '감정조절 · 표현',     color: '#8b5cf6' },
  { id: 'mod05', emoji: '🏘️', label: '친구 마을',  desc: '사회성 · 역할극',     color: '#ec4899' },
  { id: 'mod06', emoji: '🥁', label: '손끝 리듬',  desc: '소근육 · 리듬감',     color: '#ca8a04' },
  { id: 'mod07', emoji: '📖', label: '이야기 그림책', desc: '언어발달 · 상상력', color: '#06b6d4' },
];

export default function SeedlingPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%)', fontFamily: FONT }}>
      <PageHeader emoji="🌱" title="새싹 발달관" color="#22c55e" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>🌱</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#22c55e', margin: '0 0 12px' }}>새싹 발달관</h2>
          <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>AI가 함께하는 7가지 발달 놀이 · 아이의 성장을 기록해요</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24, marginBottom: 48 }}>
          {MODULES.map(m => (
            <button key={m.id}
              onClick={() => router.push(`/seedling/play/${m.id}`)}
              style={{
                background: `linear-gradient(145deg, ${m.color}22, ${m.color}0d)`,
                border: `2px solid ${m.color}35`, borderRadius: 28, padding: '36px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: FONT,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: `linear-gradient(135deg, ${m.color}35, ${m.color}15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48,
              }}>{m.emoji}</div>
              <p style={{ fontSize: 20, fontWeight: 900, color: m.color, margin: 0 }}>{m.label}</p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, textAlign: 'center' }}>{m.desc}</p>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '32px', background: 'white', borderRadius: 28, boxShadow: '0 8px 32px rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.1)' }}>
          <p style={{ fontSize: 16, color: '#6b7280', margin: '0 0 16px' }}>교사/원장 전용</p>
          <button onClick={() => router.push('/login?redirect=/seedling/teacher')}
            style={{
              padding: '14px 32px', borderRadius: 20, border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white', fontSize: 18, fontWeight: 800, fontFamily: FONT,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
            }}>
            발달 리포트 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}
