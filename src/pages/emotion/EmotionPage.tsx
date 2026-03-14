import { useState } from 'react';
import EmotionCards from './components/EmotionCards';
import MoodCheck from './components/MoodCheck';
import EmotionQuiz from './components/EmotionQuiz';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'cards' | 'mood' | 'quiz';

const MODES = [
  { id: 'cards', emoji: '😊', label: '감정 카드',    sublabel: '8가지 감정을 배워요!',  color: '#f59e0b', desc: '기쁨, 슬픔, 화남… 감정을 알아봐요!' },
  { id: 'mood',  emoji: '🌈', label: '오늘 기분은?', sublabel: '지금 기분을 말해봐요!', color: '#ec4899', desc: '지금 나의 기분은 어떤가요?' },
  { id: 'quiz',  emoji: '🎯', label: '감정 퀴즈',    sublabel: '어떤 기분일까요?',       color: '#8b5cf6', desc: '표정을 보고 어떤 감정인지 맞춰봐요!' },
] as const;

export default function EmotionPage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fffbeb 0%, #fdf2f8 50%, #f5f3ff 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="😊" title="감정 쉼터" color="#db2777" />

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
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>😊</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#db2777', margin: '0 0 10px',
                textShadow: '0 2px 12px rgba(219,39,119,0.2)' }}>감정 쉼터</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>
                내 마음을 알고, 친구의 마음도 이해해봐요!
              </p>
            </div>

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

        {mode === 'cards' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><EmotionCards /></div>}
        {mode === 'mood'  && <div style={{ maxWidth: 1200, margin: '0 auto' }}><MoodCheck /></div>}
        {mode === 'quiz'  && <div style={{ maxWidth: 1200, margin: '0 auto' }}><EmotionQuiz /></div>}
      </div>
    </div>
  );
}
