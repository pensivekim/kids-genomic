import SeedlingPlayClient from './_client';

export function generateStaticParams() {
  return ['mod01', 'mod02', 'mod03', 'mod04', 'mod05', 'mod06', 'mod07'].map((mod) => ({ mod }));
}

export default function Page() {
  return <SeedlingPlayClient />;
}
