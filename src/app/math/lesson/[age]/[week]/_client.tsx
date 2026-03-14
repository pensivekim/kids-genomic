'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLessonByWeek, type Age } from '@/data/math/curriculum';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

// ── 연령별 최대 터치 개수 ──────────────────────
const MAX_COUNT: Record<Age, number> = { 3: 3, 4: 5, 5: 10 };

// ── 준비물 이모지 매핑 ────────────────────────
const EMOJI_MAP: [string, string][] = [
  ['씨앗', '🌱'], ['꽃잎', '🌸'], ['꽃', '🌼'], ['나뭇잎', '🍃'],
  ['잎', '🍃'], ['벌레', '🐛'], ['빗방울', '💧'], ['물방울', '💧'],
  ['돌', '🪨'], ['도토리', '🌰'], ['낙엽', '🍂'], ['열매', '🍎'],
  ['과일', '🍇'], ['솜공', '⛄'], ['솜', '❄️'], ['눈송이', '❄️'],
  ['얼음', '🧊'], ['나뭇가지', '🌿'], ['새', '🐦'], ['벌', '🐝'],
  ['조개', '🐚'], ['나비', '🦋'], ['모이', '🌾'], ['씨', '🌱'],
];

function parseMaterial(materials: string[], age: Age, fallback: string) {
  const max = MAX_COUNT[age];
  const m0 = materials[0] ?? '';
  const numMatch = m0.match(/(\d+)\s*(?:개|장|마리|조각)/);
  const count = numMatch ? Math.min(parseInt(numMatch[1], 10), max) : max;
  const joined = materials.join(' ');
  let emoji = fallback;
  for (const [key, val] of EMOJI_MAP) {
    if (joined.includes(key)) { emoji = val; break; }
  }
  return { emoji, count: Math.max(count, 1) };
}

function scatter(i: number, seed: number) {
  const tx = ((seed * 17 + i * 37) % 20) - 10;
  const ty = ((seed * 13 + i * 29) % 16) - 8;
  const rot = ((seed * 7 + i * 19) % 24) - 12;
  return { tx, ty, rot };
}

// ── 간단한 Web Audio 효과음 ────────────────────
function playBeep(type: 'tap' | 'correct' | 'complete' | 'graduation') {
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    const freqs: Record<string, number[]> = {
      tap:        [440],
      correct:    [523, 659],
      complete:   [523, 659, 784],
      graduation: [523, 659, 784, 1047],
    };
    const times = freqs[type] ?? [440];
    let t = ctx.currentTime;
    times.forEach(f => {
      o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      t += 0.18;
    });
    o.start(ctx.currentTime);
    o.stop(t);
    o.onended = () => ctx.close();
  } catch { /* silent */ }
}

export default function MathLessonClient() {
  const router = useRouter();
  const params = useParams<{ age: string; week: string }>();
  const age = (Number(params?.age) as Age) || 5;
  const week = Number(params?.week) || 1;

  const lesson = getLessonByWeek(age, week);

  const { emoji: itemEmoji, count: itemCount } = useMemo(
    () => lesson ? parseMaterial(lesson.materials, age, lesson.emoji) : { emoji: '🌱', count: 3 },
    [lesson, age]
  );

  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [tapped, setTapped] = useState<boolean[]>([]);
  const [celebrated, setCelebrated] = useState(false);

  const tappedCount = tapped.filter(Boolean).length;
  const allTapped = tapped.length > 0 && tapped.every(Boolean);

  useEffect(() => {
    if (slide === 1) {
      setTapped(new Array(itemCount).fill(false));
      setCelebrated(false);
    }
  }, [slide, itemCount]);

  useEffect(() => {
    if (slide === 1 && allTapped && !celebrated) {
      setCelebrated(true);
      playBeep('complete');
      const t = setTimeout(() => {
        setAnimating(true);
        setTimeout(() => { setSlide(2); setAnimating(false); }, 200);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [allTapped, slide, celebrated]);

  useEffect(() => {
    if (slide === 2) playBeep('graduation');
  }, [slide]);

  function goNext() {
    if (animating) return;
    if (slide === 2) {
      // 진행 주차 기록
      const key = `math_week_age${age}`;
      const current = Number(localStorage.getItem(key) || '1');
      if (week >= current) localStorage.setItem(key, String(Math.min(week + 1, 48)));
      router.push('/math');
      return;
    }
    playBeep('tap');
    setAnimating(true);
    setTimeout(() => { setSlide(s => s + 1); setAnimating(false); }, 200);
  }

  function goPrev() {
    if (slide === 0 || animating) return;
    playBeep('tap');
    setAnimating(true);
    setTimeout(() => { setSlide(s => s - 1); setAnimating(false); }, 200);
  }

  function tapItem(i: number) {
    if (tapped[i] || allTapped) return;
    playBeep('correct');
    setTapped(prev => { const n = [...prev]; n[i] = true; return n; });
  }

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <p>수업을 찾을 수 없어요.</p>
      </div>
    );
  }

  const itemSize = itemCount <= 3 ? 96 : itemCount <= 5 ? 64 : 56;
  const itemFontSize = itemCount <= 3 ? 40 : itemCount <= 5 ? 32 : 24;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: FONT }}>

      {/* 헤더 */}
      <header style={{ padding: '24px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 512, margin: '0 auto', width: '100%' }}>
        <button
          onClick={() => router.push('/math')}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, background: '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: 18 }}
        >
          ←
        </button>

        {/* 진행 도트 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                borderRadius: 100,
                transition: 'all 0.3s',
                width: i === slide ? 24 : 12,
                height: 12,
                background: i === slide ? '#fb923c' : i < slide ? '#fdba74' : '#e2e8f0',
              }}
            />
          ))}
        </div>

        <div style={{ width: 40, textAlign: 'right', fontSize: 12, color: '#94a3b8' }}>
          {week}주
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px', gap: 24, maxWidth: 512, margin: '0 auto', width: '100%',
          opacity: animating ? 0 : 1, transition: 'opacity 0.2s',
        }}
      >

        {/* ── 슬라이드 0: 오늘 뭐 배울까? ─────── */}
        {slide === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
            <div style={{ fontSize: 96, userSelect: 'none', animation: 'bounce 1s infinite' }}>{lesson.emoji}</div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#fb923c', margin: 0 }}>오늘 뭐 배울까?</p>
              <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1e293b', margin: 0 }}>{lesson.theme}</h1>
              <span style={{
                display: 'inline-block', background: '#fff7ed', border: '2px solid #fed7aa',
                color: '#c2410c', fontSize: 16, fontWeight: 900, padding: '8px 20px', borderRadius: 100,
              }}>
                {lesson.mathConcept}
              </span>
            </div>
            <div style={{ background: '#fff7ed', borderRadius: 16, padding: '16px 20px', width: '100%', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                오늘은 <strong style={{ color: '#ea580c' }}>{lesson.theme}</strong>을 탐구할 거예요! 🌿
              </p>
            </div>
          </div>
        )}

        {/* ── 슬라이드 1: 터치해서 세기 ──────── */}
        {slide === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: '#fb923c', marginBottom: 4 }}>같이 해봐요! 👆</p>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1e293b', margin: 0 }}>하나씩 터치해서 세어봐요!</h2>
            </div>

            {/* 카운터 표시 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', transform: allTapped ? 'scale(1.25)' : 'scale(1)' }}>
              {allTapped ? (
                <span style={{ fontSize: 64 }}>🎉</span>
              ) : (
                <p style={{ fontSize: 52, fontWeight: 900, color: '#1e293b', margin: 0 }}>
                  {tappedCount}
                  <span style={{ fontSize: 24, color: '#94a3b8', fontWeight: 700 }}> / {itemCount}</span>
                </p>
              )}
            </div>

            {/* 이모지 그리드 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, width: '100%', maxWidth: 320 }}>
              {tapped.map((t, i) => {
                const { tx, ty, rot } = scatter(i, lesson.week);
                return (
                  <button
                    key={i}
                    onClick={() => tapItem(i)}
                    style={{
                      transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) ${t ? 'scale(1.1)' : 'scale(1)'}`,
                      width: itemSize, height: itemSize,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 16, border: 'none', cursor: 'pointer',
                      fontSize: itemFontSize, transition: 'all 0.2s', userSelect: 'none',
                      background: t ? '#fdba74' : '#fff7ed',
                      boxShadow: t ? '0 4px 12px rgba(251,146,60,0.4)' : '0 2px 6px rgba(0,0,0,0.06)',
                    } as React.CSSProperties}
                  >
                    {t ? '✅' : itemEmoji}
                  </button>
                );
              })}
            </div>

            {allTapped && (
              <p style={{ fontSize: 16, fontWeight: 900, color: '#f97316', margin: 0 }}>
                모두 세었어요! 대단해요! 🌟
              </p>
            )}
          </div>
        )}

        {/* ── 슬라이드 2: 잘했어요! ───────────── */}
        {slide === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['⭐', '🌟', '✨', '💫', '🎊'].map((e, i) => (
                <span key={i} style={{ fontSize: 40, animationDelay: `${i * 0.12}s` }}>{e}</span>
              ))}
            </div>

            <div>
              <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1e293b', marginBottom: 8 }}>잘했어요!</h1>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#f97316', margin: '0 0 4px' }}>오늘도 잘했어요!</p>
              <p style={{ fontSize: 16, color: '#94a3b8', margin: 0 }}>내일 또 만나요 🌿</p>
            </div>

            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 16, padding: '16px 24px', width: '100%' }}>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#ea580c', marginBottom: 4 }}>오늘 배운 것</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>{lesson.mathConcept}</p>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{lesson.theme}</p>
            </div>
          </div>
        )}
      </main>

      {/* 하단 버튼 */}
      <footer style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 512, margin: '0 auto', width: '100%' }}>
        <button
          onClick={goNext}
          style={{
            width: '100%', background: '#fb923c', color: '#fff', fontWeight: 900,
            padding: '20px', borderRadius: 16, border: 'none', fontSize: 20,
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(251,146,60,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: FONT,
            minHeight: 80,
          }}
        >
          {slide === 2
            ? '🏠 홈으로 돌아가기'
            : slide === 1 && allTapped
            ? '다음으로 →'
            : slide === 1
            ? `${tappedCount} / ${itemCount}개 세는 중...`
            : '다음 →'}
        </button>

        {slide > 0 && slide < 2 && (
          <button
            onClick={goPrev}
            style={{
              width: '100%', background: '#f1f5f9', color: '#475569', fontWeight: 900,
              padding: '12px', borderRadius: 16, border: 'none', fontSize: 16,
              cursor: 'pointer', fontFamily: FONT,
            }}
          >
            ← 이전
          </button>
        )}
      </footer>
    </div>
  );
}
