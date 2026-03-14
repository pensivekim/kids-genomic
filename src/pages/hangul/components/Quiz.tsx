import { useState, useEffect, useCallback } from 'react';
import { CONSONANTS, VOWELS } from '../data/hangul';
import { speak } from '../utils/tts';
import { FONT } from '../../../styles/theme';

const ALL = [...CONSONANTS, ...VOWELS];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getChoices(correct: typeof ALL[0]) {
  const others = shuffle(ALL.filter(l => l.letter !== correct.letter)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export default function Quiz() {
  const [question, setQuestion] = useState(shuffle(ALL)[0]);
  const [choices, setChoices] = useState(() => getChoices(shuffle(ALL)[0]));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const next = useCallback(() => {
    const q = shuffle(ALL)[0];
    setQuestion(q);
    setChoices(getChoices(q));
    setSelected(null);
  }, []);

  useEffect(() => {
    setTimeout(() => speak(question.name, 0.75), 300);
  }, [question]);

  function handleAnswer(letter: string) {
    if (selected) return;
    setSelected(letter);
    setTotal(t => t + 1);
    if (letter === question.letter) {
      setScore(s => s + 1);
      speak('맞았어요! 정말 잘했어요!', 0.9);
    } else {
      speak(`아쉬워요. 정답은 ${question.name} 이에요.`, 0.85);
    }
    setTimeout(next, 1800);
  }

  const correct = selected === question.letter;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT }}>

      {/* 점수 */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 24,
        background: 'rgba(255,255,255,0.8)', borderRadius: 20,
        padding: '12px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: '#16a34a', fontFamily: FONT }}>맞음 {score}</span>
        <span style={{ color: '#d1d5db', fontSize: 18 }}>/</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#6b7280', fontFamily: FONT }}>총 {total}</span>
      </div>

      {/* 문제 카드 */}
      <div
        onClick={() => speak(question.name, 0.75)}
        style={{
          width: '100%',
          background: 'linear-gradient(145deg, #f5f3ff, #ede9fe)',
          borderRadius: 32,
          padding: '40px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          marginBottom: 28,
          boxShadow: '0 8px 32px rgba(139,92,246,0.15)',
          border: '2px solid rgba(139,92,246,0.15)',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 72 }}>{question.emoji}</span>
        <p style={{ fontSize: 20, color: '#6b7280', margin: 0, fontFamily: FONT }}>이 소리는 어떤 글자일까요?</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 28 }}>🔊</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: '#7c3aed', fontFamily: FONT }}>"{question.name}"</span>
        </div>
        <span style={{ fontSize: 14, color: '#9ca3af', fontFamily: FONT }}>눌러서 다시 들어요</span>
      </div>

      {/* 보기 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16, width: '100%',
      }}>
        {choices.map((c) => {
          let bg = 'rgba(255,255,255,0.9)';
          let border = 'rgba(0,0,0,0.08)';
          let color = '#1f2937';
          if (selected === c.letter) {
            bg = correct ? '#dcfce7' : '#fee2e2';
            border = correct ? '#22c55e' : '#ef4444';
            color = correct ? '#16a34a' : '#dc2626';
          } else if (selected && c.letter === question.letter) {
            bg = '#dcfce7'; border = '#22c55e'; color = '#16a34a';
          }
          return (
            <button
              key={c.letter}
              onClick={() => handleAnswer(c.letter)}
              style={{
                padding: '32px 16px',
                borderRadius: 24, border: `3px solid ${border}`,
                background: bg, color,
                fontSize: 52, fontWeight: 900,
                fontFamily: FONT, cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
            >
              {c.letter}
            </button>
          );
        })}
      </div>

      {selected && (
        <p style={{
          marginTop: 24, fontSize: 22, fontWeight: 900, fontFamily: FONT,
          color: correct ? '#16a34a' : '#dc2626',
        }}>
          {correct ? '🎉 정말 잘했어요!' : `💪 정답은 "${question.letter}" 이에요!`}
        </p>
      )}
    </div>
  );
}
