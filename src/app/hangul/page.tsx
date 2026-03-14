'use client';
import { useState } from 'react';
import LetterGrid from './components/LetterGrid';
import WordCards from './components/WordCards';
import Quiz from './components/Quiz';
import { CONSONANTS, VOWELS } from '@/data/hangul';
import PageHeader from '@/components/ui/PageHeader';
import { FONT } from '@/styles/theme';

type Mode = 'home' | 'consonant' | 'vowel' | 'word' | 'quiz';

const MODES = [
  { id: 'consonant', emoji: '🔤', label: '자음 배우기', sublabel: 'ㄱ ㄴ ㄷ ㄹ…', color: '#3b82f6', desc: '자음 14개를 소리와 함께 배워요!' },
  { id: 'vowel',     emoji: '🅰️', label: '모음 배우기', sublabel: 'ㅏ ㅑ ㅓ ㅕ…', color: '#8b5cf6', desc: '모음 10개를 따라 읽어봐요!' },
  { id: 'word',      emoji: '📝', label: '단어 카드',   sublabel: '낱말 익히기',   color: '#f97316', desc: '그림과 함께 낱말을 익혀요!' },
  { id: 'quiz',      emoji: '🎯', label: '퀴즈 놀이',   sublabel: '맞춰 봐요!',    color: '#10b981', desc: '배운 글자를 맞춰볼까요?' },
] as const;

export default function HangulPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #eff6ff 0%, #f0fdf4 40%, #fef9c3 100%)', fontFamily: FONT }}>
      <PageHeader emoji="🔤" title="한글 나라" color="#3b82f6" />

      <div style={{ paddingTop: 8 }}>
        {mode !== 'home' && (
          <div style={{ padding: '16px 24px 8px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => setMode('home')} style={{
                width: 48, height: 48, borderRadius: '50%', background: 'white',
                border: '2px solid #e5e7eb', fontSize: 22, cursor: 'pointer', fontFamily: FONT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>←</button>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: current?.color, margin: 0 }}>
                {current?.emoji} {current?.label}
              </h2>
              <div style={{ width: 48 }} />
            </div>
          </div>
        )}

        {mode === 'home' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 48px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>🔤</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#3b82f6', margin: '0 0 10px' }}>한글 나라</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>자음·모음부터 낱말까지, 소리로 배우는 한글!</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {MODES.map((m) => (
                <button key={m.id} onClick={() => setMode(m.id as Mode)} style={{
                  background: `linear-gradient(145deg, ${m.color}22, ${m.color}0d)`,
                  border: `2px solid ${m.color}35`, borderRadius: 28, padding: '40px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                  cursor: 'pointer', boxShadow: `0 8px 32px ${m.color}20`, transition: 'all 0.2s', fontFamily: FONT,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.color}35, ${m.color}15)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52,
                  }}>{m.emoji}</div>
                  <p style={{ fontSize: 22, fontWeight: 900, color: m.color, margin: 0 }}>{m.label}</p>
                  <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, textAlign: 'center' }}>{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'consonant' && <LetterGrid letters={CONSONANTS} color="#3b82f6" />}
        {mode === 'vowel' && <LetterGrid letters={VOWELS} color="#8b5cf6" />}
        {mode === 'word' && <WordCards />}
        {mode === 'quiz' && <Quiz />}
      </div>
    </div>
  );
}
