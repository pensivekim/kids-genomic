import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Picker from './components/Picker';
import StoryDisplay from './components/StoryDisplay';

const API = 'https://genomic-ai-backend.pensive-kim.workers.dev/api/story/generate';

export type Step = 'pick' | 'loading' | 'story';

export interface StoryResult {
  story: string;
  character: string;
  setting: string;
  theme: string;
}

export default function StoryPage() {
  const [step, setStep] = useState<Step>('pick');
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleGenerate(character: string, setting: string, theme: string) {
    setStep('loading');
    setError('');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character, setting, theme }),
      });
      const data = await res.json() as StoryResult & { error?: string };
      if (data.error) throw new Error(data.error);
      setResult(data);
      setStep('story');
    } catch {
      setError('동화를 만들지 못했어요. 다시 해볼까요?');
      setStep('pick');
    }
  }

  function handleReset() {
    setResult(null);
    setStep('pick');
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #fce7f3 50%, #dbeafe 100%)' }}>
      <div className="text-center pt-8 pb-4 px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-2 text-purple-400 text-base underline block mx-auto"
        >
          ← 세계지도로 돌아가기
        </button>
        <h1 className="text-4xl font-bold text-purple-700 mb-1">📖 동화 나라</h1>
        <p className="text-lg text-purple-400">나만의 동화를 만들어 봐요!</p>
      </div>

      {step === 'pick' && <Picker onGenerate={handleGenerate} error={error} />}

      {step === 'loading' && (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="text-7xl animate-bounce">✨</div>
          <p className="text-2xl font-bold text-purple-600">동화를 만들고 있어요...</p>
          <p className="text-lg text-purple-400">잠깐만 기다려 주세요!</p>
        </div>
      )}

      {step === 'story' && result && (
        <StoryDisplay result={result} onReset={handleReset} />
      )}
    </div>
  );
}
