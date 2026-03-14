import { useEffect, useRef, useState } from 'react';
import { type StoryResult } from '../StoryPage';

interface Props {
  result: StoryResult;
  onReset: () => void;
}

export default function StoryDisplay({ result, onReset }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 문단으로 분리 (빈 줄 기준)
  const paragraphs = result.story.split(/\n\n+/).filter(p => p.trim());

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
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
    <div className="max-w-2xl mx-auto px-4 pb-16">

      {/* 동화 카드 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        style={{ boxShadow: '0 8px 40px rgba(168,85,247,0.15)' }}>

        {/* 문단 */}
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-xl leading-relaxed text-gray-800"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-4">
        {/* 읽어주기 버튼 */}
        <button
          onClick={handleTTS}
          className="w-full py-5 rounded-3xl text-2xl font-bold text-white transition-all active:scale-95"
          style={{
            background: speaking
              ? 'linear-gradient(135deg, #ef4444, #f97316)'
              : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            boxShadow: '0 6px 24px rgba(59,130,246,0.3)',
          }}
        >
          {speaking ? '⏹ 그만 읽기' : '🔊 읽어줘!'}
        </button>

        {/* 새 동화 버튼 */}
        <button
          onClick={() => {
            window.speechSynthesis.cancel();
            onReset();
          }}
          className="w-full py-5 rounded-3xl text-2xl font-bold text-white transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            boxShadow: '0 6px 24px rgba(168,85,247,0.3)',
          }}
        >
          ✨ 새 동화 만들기
        </button>
      </div>
    </div>
  );
}
