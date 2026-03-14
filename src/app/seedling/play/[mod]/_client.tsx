'use client';

import { useParams } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import Mod01 from '@/components/seedling/Mod01';
import Mod02 from '@/components/seedling/Mod02';
import Mod03 from '@/components/seedling/Mod03';
import Mod04 from '@/components/seedling/Mod04';
import Mod05 from '@/components/seedling/Mod05';
import Mod06 from '@/components/seedling/Mod06';
import Mod07 from '@/components/seedling/Mod07';

const MODULES: Record<string, { title: string; emoji: string; color: string; Component: React.ComponentType }> = {
  mod01: { title: '눈맞춤 나비',   emoji: '🦋', color: '#22c55e', Component: Mod01 },
  mod02: { title: '보물찾기',     emoji: '🔍', color: '#3b82f6', Component: Mod02 },
  mod03: { title: '감각 모험',    emoji: '🌈', color: '#f97316', Component: Mod03 },
  mod04: { title: '감정 날씨',    emoji: '⛅', color: '#8b5cf6', Component: Mod04 },
  mod05: { title: '친구 마을',    emoji: '🏘️', color: '#ec4899', Component: Mod05 },
  mod06: { title: '손끝 리듬',    emoji: '🥁', color: '#ca8a04', Component: Mod06 },
  mod07: { title: '이야기 그림책', emoji: '📖', color: '#06b6d4', Component: Mod07 },
};

export default function SeedlingPlayClient() {
  const params = useParams<{ mod: string }>();
  const mod = params?.mod ?? '';
  const info = MODULES[mod];

  if (!info) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>모듈을 찾을 수 없어요.</p>
      </div>
    );
  }

  const { title, emoji, color, Component } = info;

  return (
    <>
      <PageHeader emoji={emoji} title={title} color={color} backHref="/seedling" />
      <Component />
    </>
  );
}
