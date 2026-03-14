'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTeacherAuthenticated } from '@/lib/auth';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

const MEDIA_PHASES = [
  { label: '1단계 인식', weeks: [1,8], color: '#f97316' },
  { label: '2단계 감수성', weeks: [9,16], color: '#3b82f6' },
  { label: '3단계 제작', weeks: [17,24], color: '#8b5cf6' },
  { label: '4단계 소통', weeks: [25,30], color: '#22c55e' },
  { label: '5단계 선택', weeks: [31,36], color: '#eab308' },
];

const SEEDLING_MODULES = [
  { id: 'mod01', emoji: '🦋', label: '눈맞춤 나비', color: '#22c55e' },
  { id: 'mod02', emoji: '🔍', label: '보물찾기', color: '#3b82f6' },
  { id: 'mod03', emoji: '🌈', label: '감각 모험', color: '#f97316' },
  { id: 'mod04', emoji: '⛅', label: '감정 날씨', color: '#8b5cf6' },
  { id: 'mod05', emoji: '🏘️', label: '친구 마을', color: '#ec4899' },
  { id: 'mod06', emoji: '🥁', label: '손끝 리듬', color: '#ca8a04' },
  { id: 'mod07', emoji: '📖', label: '이야기 그림책', color: '#06b6d4' },
];

const MATH_AGES = [
  { age: 3, label: '만 3세', color: '#fbbf24' },
  { age: 4, label: '만 4세', color: '#34d399' },
  { age: 5, label: '만 5세', color: '#60a5fa' },
];

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [mediaWeeks, setMediaWeeks] = useState<Record<number, number>>({ 3: 1, 4: 1, 5: 1 });
  const [seedlingPlays, setSeedlingPlays] = useState<Record<string, string>>({});
  const [mathWeeks, setMathWeeks] = useState<Record<number, number>>({ 3: 1, 4: 1, 5: 1 });

  useEffect(() => {
    if (!isTeacherAuthenticated()) { router.push('/login?redirect=/teacher'); return; }
    // 미디어 진행도
    const mw: Record<number, number> = { 3: 1, 4: 1, 5: 1 };
    [3, 4, 5].forEach(age => {
      const v = localStorage.getItem(`week_age${age}`);
      if (v) mw[age] = Number(v);
    });
    setMediaWeeks(mw);
    // 새싹 플레이 기록
    const sp: Record<string, string> = {};
    SEEDLING_MODULES.forEach(m => {
      const v = localStorage.getItem(`seedling_played_${m.id}`);
      if (v) sp[m.id] = v;
    });
    setSeedlingPlays(sp);
    // 수학 진행도
    const mmath: Record<number, number> = { 3: 1, 4: 1, 5: 1 };
    [3, 4, 5].forEach(age => {
      const v = localStorage.getItem(`math_week_age${age}`);
      if (v) mmath[age] = Number(v);
    });
    setMathWeeks(mmath);
  }, [router]);

  const logout = () => {
    localStorage.removeItem('teacherAuth');
    localStorage.removeItem('teacherAuthTime');
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: FONT }}>
      {/* 헤더 */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 22, fontWeight: 900, color: '#334155', cursor: 'pointer', fontFamily: FONT }}>
            🌍 kids.genomic.cc
          </button>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>선생님 대시보드</span>
            <button onClick={logout} style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, padding: '6px 14px', fontSize: 13, color: '#64748b', cursor: 'pointer', fontFamily: FONT }}>
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1e293b', marginBottom: 8 }}>통합 교사 대시보드</h1>
        <p style={{ fontSize: 16, color: '#64748b', marginBottom: 40 }}>미디어 · 새싹 발달 · 수학 진행 현황을 한눈에 확인하세요</p>

        {/* ── 미디어 리터러시 섹션 ── */}
        <section style={{ background: '#fff', borderRadius: 24, padding: '32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>📺</span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', margin: 0 }}>미디어 리터러시</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>연령별 36주 커리큘럼</p>
              </div>
            </div>
            <button onClick={() => router.push('/media')} style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', border: 'none', borderRadius: 14, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
              수업 시작 →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[3, 4, 5].map(age => {
              const week = mediaWeeks[age] || 1;
              const pct = Math.round(((week - 1) / 36) * 100);
              const phase = MEDIA_PHASES.find(p => week >= p.weeks[0] && week <= p.weeks[1]) || MEDIA_PHASES[0];
              return (
                <div key={age} style={{ background: '#f8fafc', borderRadius: 16, padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 900, color: '#334155' }}>만 {age}세</span>
                    <span style={{ background: `${phase.color}15`, color: phase.color, fontSize: 11, fontWeight: 700, borderRadius: 8, padding: '3px 10px' }}>{phase.label}</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#1e293b', marginBottom: 4 }}>{week}주</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>/ 36주 완료</div>
                  <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: phase.color, borderRadius: 100, width: `${pct}%`, transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{pct}% 달성</div>
                  <button onClick={() => router.push(`/media/lesson/${age}/${week}`)} style={{ marginTop: 12, width: '100%', background: `${phase.color}15`, border: `1px solid ${phase.color}30`, borderRadius: 10, padding: '8px', fontSize: 13, color: phase.color, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                    {week}주차 수업 →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 새싹 발달관 섹션 ── */}
        <section style={{ background: '#fff', borderRadius: 24, padding: '32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>🌱</span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', margin: 0 }}>새싹 발달관</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>7가지 발달 놀이 모듈</p>
              </div>
            </div>
            <button onClick={() => router.push('/seedling')} style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', border: 'none', borderRadius: 14, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
              발달 놀이 →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {SEEDLING_MODULES.map(m => {
              const played = seedlingPlays[m.id];
              return (
                <button key={m.id} onClick={() => router.push(`/seedling/play/${m.id}`)} style={{
                  background: played ? `${m.color}15` : '#f8fafc',
                  border: `2px solid ${played ? m.color + '40' : '#e2e8f0'}`,
                  borderRadius: 16, padding: '16px 12px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: FONT,
                }}>
                  <span style={{ fontSize: 32 }}>{m.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: played ? m.color : '#64748b' }}>{m.label}</span>
                  {played ? (
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>✅ 플레이됨</span>
                  ) : (
                    <span style={{ fontSize: 10, color: '#cbd5e1' }}>미진행</span>
                  )}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 16, textAlign: 'center' }}>* 플레이 기록은 이 기기 브라우저에 저장됩니다</p>
        </section>

        {/* ── 숲의 수학관 섹션 ── */}
        <section style={{ background: '#fff', borderRadius: 24, padding: '32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>🔢</span>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', margin: 0 }}>숲의 수학관</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>연령별 48주 수학 커리큘럼</p>
              </div>
            </div>
            <button onClick={() => router.push('/math')} style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', border: 'none', borderRadius: 14, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
              수학 시작 →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {MATH_AGES.map(({ age, label, color }) => {
              const week = mathWeeks[age] || 1;
              const pct = Math.round(((week - 1) / 48) * 100);
              return (
                <div key={age} style={{ background: '#f8fafc', borderRadius: 16, padding: '20px' }}>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 900, color: '#334155' }}>{label}</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#1e293b', marginBottom: 4 }}>{week}주</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>/ 48주 완료</div>
                  <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: color, borderRadius: 100, width: `${pct}%`, transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{pct}% 달성</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 빠른 이동 ── */}
        <section style={{ background: '#fff', borderRadius: 24, padding: '24px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#334155', marginBottom: 16 }}>빠른 이동</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: '🌍 월드맵', href: '/' },
              { label: '📺 미디어', href: '/media' },
              { label: '🌱 새싹', href: '/seedling' },
              { label: '🔢 수학', href: '/math' },
              { label: '🇰🇷 한글', href: '/hangul' },
              { label: '🌏 영어', href: '/english' },
            ].map(({ label, href }) => (
              <button key={href} onClick={() => router.push(href)} style={{
                background: '#f1f5f9', border: 'none', borderRadius: 12, padding: '8px 16px',
                fontSize: 14, color: '#475569', fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
              }}>{label}</button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
