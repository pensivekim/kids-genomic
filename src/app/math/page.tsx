'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

const ACTIVITIES = [
  { emoji: '🍂', label: '자연물 수 세기', desc: '솔방울, 조약돌로 수 개념을!', color: '#f97316' },
  { emoji: '📐', label: '모양 탐구',       desc: '나뭇잎에서 도형을 찾아봐요', color: '#3b82f6' },
  { emoji: '⚖️', label: '비교하기',        desc: '크다/작다, 무겁다/가볍다',   color: '#22c55e' },
  { emoji: '🎲', label: '패턴 만들기',     desc: '반복 규칙을 찾아봐요',        color: '#8b5cf6' },
];

const AGES = [
  { age: 3, label: '만 3세', desc: '1~5 수 인식', color: '#fbbf24' },
  { age: 4, label: '만 4세', desc: '1~10 수와 덧셈', color: '#34d399' },
  { age: 5, label: '만 5세', desc: '20까지 수와 뺄셈', color: '#60a5fa' },
];

export default function MathPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff 0%, #dbeafe 100%)', fontFamily: FONT }}>
      <PageHeader emoji="🔢" title="숲의 수학관" color="#3b82f6" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>🔢</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#3b82f6', margin: '0 0 12px' }}>숲의 수학관</h2>
          <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>자연물로 배우는 수학 탐구 · AI 수업카드</p>
        </div>

        {/* 연령 선택 */}
        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#374151', textAlign: 'center', marginBottom: 24 }}>연령 선택</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          {AGES.map(a => (
            <button key={a.age}
              onClick={() => router.push(`/math/lesson/${a.age}/1`)}
              style={{
                background: `linear-gradient(145deg, ${a.color}33, ${a.color}15)`,
                border: `2px solid ${a.color}40`, borderRadius: 24, padding: '32px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: FONT,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
              <p style={{ fontSize: 26, fontWeight: 900, color: '#374151', margin: 0 }}>{a.label}</p>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>{a.desc}</p>
            </button>
          ))}
        </div>

        {/* 활동 소개 */}
        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#374151', textAlign: 'center', marginBottom: 24 }}>어떤 활동을 해요?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {ACTIVITIES.map(a => (
            <div key={a.label} style={{
              background: `linear-gradient(145deg, ${a.color}18, ${a.color}08)`,
              border: `2px solid ${a.color}25`, borderRadius: 24, padding: '28px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 48 }}>{a.emoji}</span>
              <p style={{ fontSize: 18, fontWeight: 900, color: a.color, margin: 0 }}>{a.label}</p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, textAlign: 'center' }}>{a.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => router.push('/login?redirect=/math/teacher')}
            style={{
              padding: '14px 32px', borderRadius: 20, border: 'none',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white', fontSize: 18, fontWeight: 800, fontFamily: FONT,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
            }}>
            선생님 수업 관리 →
          </button>
        </div>
      </div>
    </div>
  );
}
