export type BuildingStatus = 'live' | 'coming_soon';
export type BuildingComponent = 'library' | 'school' | 'lab' | 'home' | 'theater';

export interface BuildingConfig {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  position: [number, number, number];
  color: string;
  roofColor: string;
  serviceUrl: string;
  status: BuildingStatus;
  component: BuildingComponent;
}

export const BUILDINGS: BuildingConfig[] = [
  // ── LIVE (3개) ────────────────────────────────────────
  {
    id: 'seedling',
    name: '새싹 발달관',
    subtitle: 'AI 발달 관찰',
    icon: '🌱',
    position: [0, 0, 8],
    color: '#4ade80',
    roofColor: '#16a34a',
    serviceUrl: 'https://seedling.genomic.cc',
    status: 'live',
    component: 'home',
  },
  {
    id: 'math',
    name: '숲의 수학관',
    subtitle: '수/논리 놀이',
    icon: '🔢',
    position: [0, 0, 4],
    color: '#60a5fa',
    roofColor: '#2563eb',
    serviceUrl: 'https://math.genomic.cc',
    status: 'live',
    component: 'lab',
  },
  {
    id: 'media',
    name: '미디어 극장',
    subtitle: '미디어 리터러시',
    icon: '🎬',
    position: [-6, 0, 0],
    color: '#c084fc',
    roofColor: '#7c3aed',
    serviceUrl: 'https://media.genomic.cc',
    status: 'live',
    component: 'theater',
  },

  // ── COMING SOON (8개) ─────────────────────────────────
  {
    id: 'library',
    name: '독서 도서관',
    subtitle: 'AI 동화 생성',
    icon: '📖',
    position: [-7, 0, 5],
    color: '#a78bfa',
    roofColor: '#6d28d9',
    serviceUrl: '/story',
    status: 'live',
    component: 'library',
  },
  {
    id: 'hangul',
    name: '한글 학교',
    subtitle: '자음·모음 학습',
    icon: '🔤',
    position: [-5, 0, 3],
    color: '#f9a8d4',
    roofColor: '#db2777',
    serviceUrl: '/hangul',
    status: 'live',
    component: 'school',
  },
  {
    id: 'english',
    name: '영어 마을',
    subtitle: '파닉스·영어 동요',
    icon: '🌍',
    position: [5, 0, 3],
    color: '#7dd3fc',
    roofColor: '#0284c7',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'school',
  },
  {
    id: 'music',
    name: '음악의 집',
    subtitle: '악기·리듬 놀이',
    icon: '🎵',
    position: [-5, 0, -3],
    color: '#fde68a',
    roofColor: '#d97706',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'home',
  },
  {
    id: 'art',
    name: '미술 갤러리',
    subtitle: '색칠·AI 그림',
    icon: '🎨',
    position: [5, 0, -3],
    color: '#fdba74',
    roofColor: '#ea580c',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'library',
  },
  {
    id: 'science',
    name: '과학 연구소',
    subtitle: '동물·식물 탐구',
    icon: '🔬',
    position: [-7, 0, -1],
    color: '#6ee7b7',
    roofColor: '#059669',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'lab',
  },
  {
    id: 'creative',
    name: '창의 놀이터',
    subtitle: '블록·패턴 맞추기',
    icon: '🧩',
    position: [7, 0, 0],
    color: '#c4b5fd',
    roofColor: '#7c3aed',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'lab',
  },
  {
    id: 'emotion',
    name: '감정 쉼터',
    subtitle: '감정 카드·공감',
    icon: '😊',
    position: [7, 0, 5],
    color: '#fca5a5',
    roofColor: '#dc2626',
    serviceUrl: '',
    status: 'coming_soon',
    component: 'home',
  },
];
