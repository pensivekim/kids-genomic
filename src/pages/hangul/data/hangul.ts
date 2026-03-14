export interface Letter {
  letter: string;
  name: string;
  example: string;
  emoji: string;
}

export interface WordCard {
  word: string;
  emoji: string;
  syllables: string; // 발음 표기
}

export const CONSONANTS: Letter[] = [
  { letter: 'ㄱ', name: '기역', example: '가방', emoji: '👜' },
  { letter: 'ㄴ', name: '니은', example: '나무', emoji: '🌳' },
  { letter: 'ㄷ', name: '디귿', example: '다리', emoji: '🌉' },
  { letter: 'ㄹ', name: '리을', example: '라면', emoji: '🍜' },
  { letter: 'ㅁ', name: '미음', example: '마음', emoji: '💖' },
  { letter: 'ㅂ', name: '비읍', example: '바나나', emoji: '🍌' },
  { letter: 'ㅅ', name: '시옷', example: '사과', emoji: '🍎' },
  { letter: 'ㅇ', name: '이응', example: '아이', emoji: '👧' },
  { letter: 'ㅈ', name: '지읒', example: '자동차', emoji: '🚗' },
  { letter: 'ㅊ', name: '치읓', example: '치즈', emoji: '🧀' },
  { letter: 'ㅋ', name: '키읔', example: '코끼리', emoji: '🐘' },
  { letter: 'ㅌ', name: '티읕', example: '토끼', emoji: '🐰' },
  { letter: 'ㅍ', name: '피읖', example: '포도', emoji: '🍇' },
  { letter: 'ㅎ', name: '히읗', example: '하늘', emoji: '🌤️' },
];

export const VOWELS: Letter[] = [
  { letter: 'ㅏ', name: '아', example: '아빠', emoji: '👨' },
  { letter: 'ㅑ', name: '야', example: '야구', emoji: '⚾' },
  { letter: 'ㅓ', name: '어', example: '어머니', emoji: '👩' },
  { letter: 'ㅕ', name: '여', example: '여우', emoji: '🦊' },
  { letter: 'ㅗ', name: '오', example: '오리', emoji: '🦆' },
  { letter: 'ㅛ', name: '요', example: '요리', emoji: '🍳' },
  { letter: 'ㅜ', name: '우', example: '우유', emoji: '🥛' },
  { letter: 'ㅠ', name: '유', example: '유치원', emoji: '🏫' },
  { letter: 'ㅡ', name: '으', example: '으르렁', emoji: '🦁' },
  { letter: 'ㅣ', name: '이', example: '이빨', emoji: '🦷' },
];

export const WORDS: WordCard[] = [
  { word: '가방', emoji: '👜', syllables: '가-방' },
  { word: '나비', emoji: '🦋', syllables: '나-비' },
  { word: '다람쥐', emoji: '🐿️', syllables: '다-람-쥐' },
  { word: '라면', emoji: '🍜', syllables: '라-면' },
  { word: '마차', emoji: '🪄', syllables: '마-차' },
  { word: '바나나', emoji: '🍌', syllables: '바-나-나' },
  { word: '사과', emoji: '🍎', syllables: '사-과' },
  { word: '아이', emoji: '👧', syllables: '아-이' },
  { word: '자전거', emoji: '🚲', syllables: '자-전-거' },
  { word: '치킨', emoji: '🍗', syllables: '치-킨' },
  { word: '코끼리', emoji: '🐘', syllables: '코-끼-리' },
  { word: '토마토', emoji: '🍅', syllables: '토-마-토' },
  { word: '포도', emoji: '🍇', syllables: '포-도' },
  { word: '하마', emoji: '🦛', syllables: '하-마' },
  { word: '오리', emoji: '🦆', syllables: '오-리' },
  { word: '우산', emoji: '☂️', syllables: '우-산' },
];
