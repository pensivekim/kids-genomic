'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTeacherAuthenticated } from '@/lib/auth';

// seedling teacher → 통합 대시보드로 리다이렉트
export default function SeedlingTeacherPage() {
  const router = useRouter();
  useEffect(() => {
    if (!isTeacherAuthenticated()) { router.push('/login?redirect=/seedling/teacher'); return; }
    router.replace('/teacher');
  }, [router]);
  return null;
}
