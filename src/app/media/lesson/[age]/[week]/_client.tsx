'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isTeacherAuthenticated } from '@/lib/auth';
import SlideViewer from '@/components/media/lesson/SlideViewer';
import type { WeekData } from '@/data/media/types';

// Activity components
import CardSorter from '@/components/media/activity/CardSorter';
import QuizCard from '@/components/media/activity/QuizCard';
import EmotionPicker from '@/components/media/activity/EmotionPicker';
import StampBoard from '@/components/media/activity/StampBoard';
import VoteWidget from '@/components/media/activity/VoteWidget';
import DrawingCanvas from '@/components/media/activity/DrawingCanvas';
import CameraCapture from '@/components/media/activity/CameraCapture';
import GalleryViewer from '@/components/media/activity/GalleryViewer';
import ContentPicker from '@/components/media/activity/ContentPicker';
import GraduationCertificate from '@/components/media/lesson/GraduationCertificate';

const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

type Stage = 'slides' | 'activity' | 'complete';

export default function MediaLessonPage() {
  const router = useRouter();
  const params = useParams();
  const age = Number(params.age);
  const week = Number(params.week);

  const [data, setData] = useState<WeekData | null>(null);
  const [stage, setStage] = useState<Stage>('slides');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isTeacherAuthenticated()) {
      router.replace('/login?redirect=/media');
      return;
    }
    const load = async () => {
      try {
        const mod = await import(`@/data/media/age${age}/week${week}.json`);
        setData(mod.default);
      } catch {
        setData(null);
      }
      setLoading(false);
    };
    load();
  }, [age, week, router]);

  function handleActivityComplete() {
    const stored = Number(localStorage.getItem(`week_age${age}`) || 1);
    if (week >= stored) localStorage.setItem(`week_age${age}`, String(week + 1));
    setStage('complete');
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64 }}>📚</div>
          <p style={{ color: '#6b7280', marginTop: 16 }}>수업 준비 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 64 }}>😅</div>
        <p style={{ fontSize: 20, color: '#374151', margin: '16px 0' }}>아직 준비되지 않은 수업이에요</p>
        <button onClick={() => router.push('/media')}
          style={{ padding: '12px 28px', borderRadius: 16, border: 'none', background: '#9333ea', color: 'white', fontSize: 16, cursor: 'pointer', fontFamily: FONT }}>
          돌아가기
        </button>
      </div>
    );
  }

  if (stage === 'complete') {
    if (week >= 36) {
      return <GraduationCertificate age={age} />;
    }
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, gap: 20 }}>
        <div style={{ fontSize: 80 }}>🎉</div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#374151', margin: 0 }}>수업 완료!</h2>
        <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>{age}세 {week}주차 학습을 마쳤어요!</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button onClick={() => router.push(`/media/lesson/${age}/${week + 1}`)}
            style={{ padding: '14px 28px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: 'white', fontSize: 18, fontWeight: 800, cursor: 'pointer', fontFamily: FONT }}>
            다음 수업 →
          </button>
          <button onClick={() => router.push('/media')}
            style={{ padding: '14px 28px', borderRadius: 20, border: '2px solid #e5e7eb', background: 'white', fontSize: 18, cursor: 'pointer', fontFamily: FONT }}>
            목록으로
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'slides') {
    return <SlideViewer slides={data.slides} onComplete={() => setStage('activity')} />;
  }

  // Activity stage
  const activity = data.activity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activityProps = {
    activity: activity as any,
    onComplete: handleActivityComplete,
  };

  const ACTIVITY_MAP: Record<string, React.ReactNode> = {
    card_sort:     <CardSorter {...activityProps} />,
    quiz:          <QuizCard {...activityProps} />,
    emotion:       <EmotionPicker {...activityProps} />,
    stamp:         <StampBoard {...activityProps} />,
    vote:          <VoteWidget {...activityProps} />,
    drawing:       <DrawingCanvas {...activityProps} />,
    camera:        <CameraCapture {...activityProps} />,
    gallery:       <GalleryViewer {...activityProps} />,
    content_pick:  <ContentPicker {...activityProps} />,
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: FONT }}>
      {ACTIVITY_MAP[activity.type] ?? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 16 }}>
          <p style={{ fontSize: 20, color: '#374151' }}>활동을 불러오는 중...</p>
          <button onClick={handleActivityComplete}
            style={{ padding: '12px 24px', borderRadius: 16, border: 'none', background: '#9333ea', color: 'white', fontSize: 16, cursor: 'pointer', fontFamily: FONT }}>
            건너뛰기
          </button>
        </div>
      )}
    </div>
  );
}
