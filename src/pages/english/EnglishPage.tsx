import { useState } from 'react';
import AlphabetGrid from './components/AlphabetGrid';
import WordCards from './components/WordCards';
import Quiz from './components/Quiz';
import { ALPHABET } from './data/english';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'alphabet' | 'word' | 'quiz';

const MODES = [
  { id: 'alphabet', emoji: '🔤', label: 'ABC 배우기',  sublabel: 'A B C D…',      color: '#d97706', desc: '알파벳 26자를 소리로 배워요!' },
  { id: 'word',     emoji: '📝', label: '단어 카드',   sublabel: '그림으로 배워요', color: '#10b981', desc: '귀여운 그림과 함께 단어 학습!' },
  { id: 'quiz',     emoji: '🎯', label: '퀴즈 놀이',   sublabel: '맞춰 봐요!',      color: '#3b82f6', desc: '배운 단어를 퀴즈로 확인해요!' },
] as const;

export default function EnglishPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fffbeb 0%, #d1fae5 50%, #dbeafe 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🌍" title="영어 마을" color="#d97706" />

      <div style={{ paddingTop: 68 }}>
        {mode !== 'home' && (
          <div style={{ padding: '16px 24px 8px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => setMode('home')}
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'white', border: '2px solid #e5e7eb',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  fontSize: 22, cursor: 'pointer', fontFamily: FONT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >←</button>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: current?.color, margin: 0 }}>
                {current?.emoji} {current?.label}
              </h2>
              <div style={{ width: 48 }} />
            </div>
          </div>
        )}

        {mode === 'home' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 48px' }}>
            {/* Hero */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>🌍</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#d97706', margin: '0 0 10px',
                textShadow: '0 2px 12px rgba(217,119,6,0.2)' }}>영어 마을</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>
                알파벳부터 단어까지, 영어랑 친해져요!
              </p>
            </div>

            {/* Alphabet preview strip */}
            <div style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
              gap: 8, marginBottom: 40,
              background: 'rgba(255,255,255,0.6)',
              borderRadius: 20, padding: '16px 24px',
              border: '2px solid rgba(217,119,6,0.12)',
            }}>
              {ALPHABET.map(l => (
                <span key={l.letter} style={{
                  fontSize: 22, fontWeight: 900, color: '#f59e0b',
                  textShadow: '0 1px 4px rgba(245,158,11,0.3)',
                }}>{l.letter}</span>
              ))}
            </div>

            {/* Mode grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  style={{
                    background: `linear-gradient(145deg, ${m.color}22, ${m.color}0d)`,
                    border: `2px solid ${m.color}35`,
                    borderRadius: 28,
                    padding: '40px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    cursor: 'pointer',
                    boxShadow: `0 8px 32px ${m.color}20`,
                    transition: 'all 0.2s',
                    fontFamily: FONT,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${m.color}35`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${m.color}20`;
                  }}
                >
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.color}35, ${m.color}15)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 52,
                    boxShadow: `0 6px 20px ${m.color}25`,
                    border: `3px solid ${m.color}20`,
                  }}>
                    {m.emoji}
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 900, color: m.color, margin: 0 }}>{m.label}</p>
                  <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'alphabet' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px' }}>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 16 }}>글자를 누르면 소리가 나요!</p>
            <AlphabetGrid letters={ALPHABET} />
          </div>
        )}
        {mode === 'word' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><WordCards /></div>}
        {mode === 'quiz' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><Quiz /></div>}
      </div>
    </div>
  );
}
