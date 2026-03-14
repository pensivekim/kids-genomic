import MathLessonClient from './_client';

export function generateStaticParams() {
  const params: { age: string; week: string }[] = [];
  for (const age of [3, 4, 5]) {
    for (let week = 1; week <= 48; week++) {
      params.push({ age: String(age), week: String(week) });
    }
  }
  return params;
}

export default function Page() {
  return <MathLessonClient />;
}
