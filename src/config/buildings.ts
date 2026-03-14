export type BuildingStatus = 'live' | 'coming_soon';

export interface BuildingConfig {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  roofColor: string;
  serviceUrl: string;
  status: BuildingStatus;
}

export const BUILDINGS: BuildingConfig[] = [
  // ── 외부 통합 서비스 ──
  {
    id: 'media',
    name: '미디어 극장',
    subtitle: '미디어 리터러시 36주 커리큘럼',
    icon: '🎬',
    color: '#e9d5ff',
    roofColor: '#9333ea',
    serviceUrl: '/media',
    status: 'live',
  },
  {
    id: 'seedling',
    name: '새싹 발달관',
    subtitle: 'AI 발달 관찰 · 7가지 모듈',
    icon: '🌱',
    color: '#bbf7d0',
    roofColor: '#22c55e',
    serviceUrl: '/seedling',
    status: 'live',
  },
  {
    id: 'math',
    name: '숲의 수학관',
    subtitle: 'AI 수업카드 · 자연물 탐구',
    icon: '🔢',
    color: '#bfdbfe',
    roofColor: '#3b82f6',
    serviceUrl: '/math',
    status: 'live',
  },
  // ── 기존 kids 콘텐츠 ──
  {
    id: 'library',
    name: '독서 도서관',
    subtitle: 'AI 동화 생성',
    icon: '📖',
    color: '#fed7aa',
    roofColor: '#f97316',
    serviceUrl: '/story',
    status: 'live',
  },
  {
    id: 'hangul',
    name: '한글 학교',
    subtitle: '자음·모음·단어·퀴즈',
    icon: '🔤',
    color: '#fecdd3',
    roofColor: '#e11d48',
    serviceUrl: '/hangul',
    status: 'live',
  },
  {
    id: 'english',
    name: '영어 마을',
    subtitle: 'ABC·단어·퀴즈',
    icon: '🌍',
    color: '#fef08a',
    roofColor: '#ca8a04',
    serviceUrl: '/english',
    status: 'live',
  },
  {
    id: 'music',
    name: '음악의 집',
    subtitle: '악기·피아노·리듬',
    icon: '🎵',
    color: '#fbcfe8',
    roofColor: '#db2777',
    serviceUrl: '/music',
    status: 'live',
  },
  {
    id: 'art',
    name: '미술 갤러리',
    subtitle: '그림·도장·색 섞기',
    icon: '🎨',
    color: '#ffedd5',
    roofColor: '#ea580c',
    serviceUrl: '/art',
    status: 'live',
  },
  {
    id: 'science',
    name: '과학 연구소',
    subtitle: '동물·실험·별자리',
    icon: '🔬',
    color: '#d1fae5',
    roofColor: '#059669',
    serviceUrl: '/science',
    status: 'live',
  },
  {
    id: 'creative',
    name: '창의 놀이터',
    subtitle: '패턴·점잇기·모양',
    icon: '🧩',
    color: '#ede9fe',
    roofColor: '#7c3aed',
    serviceUrl: '/creative',
    status: 'live',
  },
  {
    id: 'emotion',
    name: '감정 쉼터',
    subtitle: '감정 카드·기분 체크',
    icon: '😊',
    color: '#ffe4e6',
    roofColor: '#f43f5e',
    serviceUrl: '/emotion',
    status: 'live',
  },
];
