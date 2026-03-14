import { useState } from 'react';
import AnimalBook from './components/AnimalBook';
import Experiments from './components/Experiments';
import StarMap from './components/StarMap';
import PageHeader from '../../components/ui/PageHeader';
import { FONT } from '../../styles/theme';

type Mode = 'home' | 'animal' | 'experiment' | 'star';

const MODES = [
  { id: 'animal',     emoji: '🦁', label: '동물 도감',   sublabel: '24마리 동물을 만나요!', color: '#22c55e', desc: '육지·바다·하늘 동물을 배워요!' },
  { id: 'experiment', emoji: '🌋', label: '신기한 실험', sublabel: '왜 그럴까요?',            color: '#ef4444', desc: '재미있는 과학 원리를 알아봐요!' },
  { id: 'star',       emoji: '🌙', label: '별자리 탐험', sublabel: '밤하늘의 이야기',         color: '#6366f1', desc: '반짝이는 별자리 이야기를 들어요!' },
] as const;

export default function SciencePage() {
  const [mode, setMode] = useState<Mode>('home');
  const current = MODES.find(m => m.id === mode);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0fdf4 0%, #fef2f2 50%, #eef2ff 100%)',
      fontFamily: FONT,
    }}>
      <PageHeader emoji="🔬" title="과학 연구소" color="#16a34a" />

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
              <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>🔬</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, color: '#16a34a', margin: '0 0 10px',
                textShadow: '0 2px 12px rgba(22,163,74,0.2)' }}>과학 연구소</h2>
              <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>
                동물도 만나고, 실험도 하고, 별자리도 찾아봐요!
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

        {mode === 'animal'     && <div style={{ maxWidth: 1200, margin: '0 auto' }}><AnimalBook /></div>}
        {mode === 'experiment' && <div style={{ maxWidth: 1200, margin: '0 auto' }}><Experiments /></div>}
        {mode === 'star'       && <div style={{ maxWidth: 1200, margin: '0 auto' }}><StarMap /></div>}
      </div>
    </div>
  );
}
