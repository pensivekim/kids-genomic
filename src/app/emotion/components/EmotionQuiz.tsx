'use client';
import { useState } from 'react';
import { FONT } from '@/styles/theme';

interface Question {
  situation: string;
  emoji: string;
  answer: string;
  answerEmoji: string;
  options: { label: string; emoji: string }[];
}

const QUESTIONS: Question[] = [
  { situation: '생일 케이크에 촛불을 불었어요!', emoji: '🎂', answer: '기쁨',   answerEmoji: '😊',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '화남', emoji: '😠' }, { label: '무서움', emoji: '😨' }] },
  { situation: '좋아하는 장난감이 망가졌어요.', emoji: '🧸', answer: '슬픔',   answerEmoji: '😢',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '편안함', emoji: '😌' }, { label: '놀람', emoji: '😮' }] },
  { situation: '어두운 방에 갑자기 들어갔어요.', emoji: '🌑', answer: '무서움', answerEmoji: '😨',
    options: [{ label: '기쁨', emoji: '😊' }, { label: '화남', emoji: '😠' }, { label: '무서움', emoji: '😨' }, { label: '편안함', emoji: '😌' }] },
  { situation: '친구가 내 블록을 부쉈어요.',     emoji: '🧱', answer: '화남',   answerEmoji: '😠',
    options: [{ label: '화남', emoji: '😠' }, { label: '기쁨', emoji: '😊' }, { label: '슬픔', emoji: '😢' }, { label: '놀람', emoji: '😮' }] },
  { situation: '선물 상자를 열어봤더니 원하던 거예요!', emoji: '🎁', answer: '놀람', answerEmoji: '😮',
    options: [{ label: '슬픔', emoji: '😢' }, { label: '놀람', emoji: '😮' }, { label: '무서움', emoji: '😨' }, { label: '화남', emoji: '😠' }] },
  { situation: '엄마 품에 안겨서 잠들었어요.',   emoji: '🛌', answer: '편안함', answerEmoji: '😌',
    options: [{ label: '화남', emoji: '😠' }, { label: '슬픔', emoji: '😢' }, { label: '편안함', emoji: '😌' }, { label: '무서움', emoji: '😨' }] },
];

export default function EmotionQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = QUESTIONS[idx];
  const correct = selected === q.answer;

  function handleAnswer(label: string) {
    if (selected) return;
    setSelected(label);
    if (label === q.answer) setScore(s => s + 1);
  }

  function next() {
    if (idx < QUESTIONS.length - 1) { setIdx(i => i + 1); setSelected(null); }
  }

  const finished = idx === QUESTIONS.length - 1 && selected;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      <div style={{
        display: 'flex', gap: 16, marginBottom: 24,
        background: 'rgba(255,255,255,0.8)', borderRadius: 20,
        padding: '12px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: '#db2777', fontFamily: FONT }}>맞음 {score}</span>
        <span style={{ color: '#d1d5db', fontSize: 18 }}>/</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#6b7280', fontFamily: FONT }}>총 {QUESTIONS.length}</span>
      </div>

      <div style={{
        width: '100%',
        background: 'linear-gradient(145deg, #fdf2f8, #fce7f3)',
        borderRadius: 32, padding: '36px 32px',
        border: '2px solid rgba(236,72,153,0.12)',
        boxShadow: '0 8px 32px rgba(236,72,153,0.1)',
        textAlign: 'center', marginBottom: 24,
      }}>
        <span style={{ fontSize: 80, display: 'block', marginBottom: 16 }}>{q.emoji}</span>
        <p style={{ fontSize: 22, color: '#374151', fontWeight: 700, margin: 0, fontFamily: FONT }}>{q.situation}</p>
        <p style={{ fontSize: 15, color: '#9ca3af', marginTop: 8, fontFamily: FONT }}>이 상황에서 기분이 어떨까요?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, width: '100%', marginBottom: 20 }}>
        {q.options.map(opt => {
          let bg = 'rgba(255,255,255,0.9)', border = 'rgba(0,0,0,0.08)';
          if (selected) {
            if (opt.label === q.answer) { bg = '#dcfce7'; border = '#22c55e'; }
            else if (opt.label === selected) { bg = '#fee2e2'; border = '#ef4444'; }
          }
          return (
            <button key={opt.label} onClick={() => handleAnswer(opt.label)}
              style={{
                padding: '28px 16px',
                borderRadius: 24, border: `3px solid ${border}`,
                background: bg, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                fontFamily: FONT, transition: 'all 0.15s',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
              <span style={{ fontSize: 40 }}>{opt.emoji}</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#374151', fontFamily: FONT }}>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, fontFamily: FONT,
            color: correct ? '#16a34a' : '#dc2626' }}>
            {correct ? `🎉 맞아요! ${q.answerEmoji}` : `💪 정답은 "${q.answer}" ${q.answerEmoji} 이에요!`}
          </p>
          {!finished ? (
            <button onClick={next}
              style={{
                padding: '18px 48px', borderRadius: 22, border: 'none',
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                color: 'white', fontSize: 20, fontWeight: 900,
                fontFamily: FONT, cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(236,72,153,0.35)',
              }}>
              다음 →
            </button>
          ) : (
            <div>
              <p style={{ fontSize: 26, fontWeight: 900, color: '#db2777', marginBottom: 20, fontFamily: FONT }}>
                {score}점 / {QUESTIONS.length}점 🌟
              </p>
              <button onClick={() => { setIdx(0); setSelected(null); setScore(0); }}
                style={{
                  padding: '18px 48px', borderRadius: 22, border: 'none',
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  color: 'white', fontSize: 20, fontWeight: 900,
                  fontFamily: FONT, cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(236,72,153,0.35)',
                }}>
                🔄 다시
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
