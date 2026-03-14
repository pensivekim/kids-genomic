'use client';
import { useEffect, useRef, useState } from 'react';
import { type StoryResult } from '../types';
import { FONT } from '@/styles/theme';

interface Props {
  result: StoryResult;
  onReset: () => void;
}

export default function StoryDisplay({ result, onReset }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const paragraphs = result.story.split(/\n\n+/).filter(p => p.trim());

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  function handleTTS() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(result.story);
    utter.lang = 'ko-KR';
    utter.rate = 0.85;
    utter.pitch = 1.1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 40px 48px', fontFamily: FONT }}>
      {/* 동화 카드 */}
      <div style={{
        background: 'linear-gradient(145deg, #fdf4ff, #fce7f3)',
        borderRadius: 36, padding: '48px 48px',
        boxShadow: '0 16px 56px rgba(168,85,247,0.15)',
        border: '2px solid rgba(168,85,247,0.12)',
        marginBottom: 28,
      }}>
        {/* 동화 메타 태그 */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {[result.character, result.setting, result.theme].map((tag, i) => (
            <span key={i} style={{
              padding: '6px 16px', borderRadius: 20,
              background: 'rgba(168,85,247,0.12)',
              color: '#7c3aed', fontSize: 14, fontWeight: 800,
              fontFamily: FONT,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* 문단 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{
              fontSize: 20, lineHeight: 1.9, color: '#1f2937', margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button
          onClick={handleTTS}
          style={{
            width: '100%', padding: '22px',
            borderRadius: 28, border: 'none',
            background: speaking
              ? 'linear-gradient(135deg, #ef4444, #f97316)'
              : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            color: 'white', fontSize: 24, fontWeight: 900,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: speaking
              ? '0 8px 28px rgba(239,68,68,0.35)'
              : '0 8px 28px rgba(59,130,246,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {speaking ? '⏹ 그만 읽기' : '🔊 읽어줘!'}
        </button>

        <button
          onClick={() => { window.speechSynthesis.cancel(); onReset(); }}
          style={{
            width: '100%', padding: '22px',
            borderRadius: 28, border: 'none',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            color: 'white', fontSize: 24, fontWeight: 900,
            fontFamily: FONT, cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(168,85,247,0.35)',
            transition: 'all 0.2s',
          }}
        >
          ✨ 새 동화 만들기
        </button>
      </div>
    </div>
  );
}
