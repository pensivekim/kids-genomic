export interface Animal {
  emoji: string;
  name: string;
  fact: string;   // TTS + 화면 표시
  category: 'land' | 'sea' | 'sky';
}

export const ANIMALS: Animal[] = [
  // 육지
  { emoji: '🦁', name: '사자',   fact: '사자는 고양이과 동물이에요. 무리 지어 살아요.',         category: 'land' },
  { emoji: '🐘', name: '코끼리', fact: '코끼리는 지구에서 가장 큰 육지 동물이에요.',             category: 'land' },
  { emoji: '🦒', name: '기린',   fact: '기린은 목이 아주 길어서 높은 나뭇잎을 먹어요.',         category: 'land' },
  { emoji: '🐼', name: '판다',   fact: '판다는 하루에 대나무를 12킬로그램이나 먹어요.',          category: 'land' },
  { emoji: '🦓', name: '얼룩말', fact: '얼룩말의 줄무늬는 모두 달라요. 사람 지문처럼요!',       category: 'land' },
  { emoji: '🐨', name: '코알라', fact: '코알라는 하루에 22시간을 자요. 잠꾸러기예요!',          category: 'land' },
  { emoji: '🦊', name: '여우',   fact: '여우는 냄새를 맡아서 땅속 먹이를 찾아요.',              category: 'land' },
  { emoji: '🐆', name: '치타',   fact: '치타는 세상에서 가장 빠른 동물이에요. 시속 110킬로!',   category: 'land' },
  // 바다
  { emoji: '🐋', name: '고래',   fact: '고래는 물고기가 아니라 포유류예요. 숨을 쉬어요.',       category: 'sea' },
  { emoji: '🐬', name: '돌고래', fact: '돌고래는 이름을 부르면 반응해요. 아주 똑똑해요!',       category: 'sea' },
  { emoji: '🦈', name: '상어',   fact: '상어는 이빨이 평생 새로 자라나요.',                     category: 'sea' },
  { emoji: '🐙', name: '문어',   fact: '문어는 팔이 8개예요. 그리고 피가 파란색이에요!',        category: 'sea' },
  { emoji: '🦭', name: '물범',   fact: '물범은 물속에서 눈을 뜨고 잠을 자요.',                  category: 'sea' },
  { emoji: '🐠', name: '열대어', fact: '열대어의 화려한 색은 친구를 찾기 위한 신호예요.',       category: 'sea' },
  { emoji: '🦑', name: '오징어', fact: '오징어는 먹물로 적에게서 도망쳐요.',                    category: 'sea' },
  { emoji: '🐡', name: '복어',   fact: '복어는 위험하면 몸을 공처럼 부풀려요.',                 category: 'sea' },
  // 하늘
  { emoji: '🦅', name: '독수리', fact: '독수리는 3킬로미터 위에서도 먹이를 볼 수 있어요.',     category: 'sky' },
  { emoji: '🦜', name: '앵무새', fact: '앵무새는 사람 말을 따라 할 수 있어요.',                 category: 'sky' },
  { emoji: '🦩', name: '홍학',   fact: '홍학은 새우를 먹어서 분홍색이 돼요.',                   category: 'sky' },
  { emoji: '🦉', name: '부엉이', fact: '부엉이는 머리를 270도나 돌릴 수 있어요.',               category: 'sky' },
  { emoji: '🐧', name: '펭귄',   fact: '펭귄은 날지 못하지만 수영을 아주 잘해요.',              category: 'sky' },
  { emoji: '🦢', name: '백조',   fact: '백조는 한번 짝을 정하면 평생 함께 살아요.',             category: 'sky' },
  { emoji: '🦚', name: '공작새', fact: '공작새의 화려한 꼬리는 수컷만 있어요.',                 category: 'sky' },
  { emoji: '🐦', name: '참새',   fact: '참새는 1초에 13번 날개를 퍼덕여요.',                   category: 'sky' },
];

export interface Experiment {
  title: string;
  emoji: string;
  question: string;
  steps: string[];
  result: string;
  color: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    title: '화산 폭발',
    emoji: '🌋',
    question: '왜 화산이 폭발할까요?',
    steps: ['땅속 깊은 곳은 아주 뜨거워요', '돌이 녹아서 마그마가 돼요', '마그마가 위로 밀려 올라와요'],
    result: '펑! 용암이 흘러나와요! 식으면 새로운 땅이 생겨요.',
    color: '#ef4444',
  },
  {
    title: '무지개 만들기',
    emoji: '🌈',
    question: '무지개는 왜 생길까요?',
    steps: ['햇빛 안에는 여러 색이 섞여 있어요', '빗방울이 작은 프리즘 역할을 해요', '빛이 꺾이면서 색이 나뉘어요'],
    result: '빨주노초파남보! 7가지 색이 나타나요.',
    color: '#8b5cf6',
  },
  {
    title: '씨앗의 여행',
    emoji: '🌱',
    question: '씨앗은 어떻게 자랄까요?',
    steps: ['씨앗에 물과 햇빛이 필요해요', '뿌리가 먼저 아래로 자라요', '싹이 위로 쑥쑥 올라와요'],
    result: '꽃이 피고, 열매가 열리고, 다시 씨앗이 생겨요!',
    color: '#22c55e',
  },
  {
    title: '달의 변화',
    emoji: '🌙',
    question: '달은 왜 모양이 바뀔까요?',
    steps: ['달은 스스로 빛나지 않아요', '햇빛이 달에 반사돼요', '지구에서 보는 각도가 달라져요'],
    result: '초승달 → 반달 → 보름달 → 반달 → 그믐달, 한 달 동안 변해요!',
    color: '#6366f1',
  },
];

export interface Star {
  name: string;
  emoji: string;
  story: string;
  stars: { x: number; y: number }[];
}

export const CONSTELLATIONS: Star[] = [
  {
    name: '큰곰자리',
    emoji: '🐻',
    story: '국자 모양처럼 생긴 별자리예요. 북쪽 방향을 가리켜요.',
    stars: [{ x: 20, y: 40 }, { x: 35, y: 30 }, { x: 50, y: 25 }, { x: 65, y: 30 }, { x: 75, y: 45 }, { x: 65, y: 60 }, { x: 50, y: 65 }],
  },
  {
    name: '오리온자리',
    emoji: '🏹',
    story: '사냥꾼 오리온의 별자리예요. 겨울 밤하늘의 길잡이예요.',
    stars: [{ x: 30, y: 20 }, { x: 70, y: 20 }, { x: 25, y: 45 }, { x: 50, y: 50 }, { x: 75, y: 45 }, { x: 35, y: 70 }, { x: 65, y: 70 }],
  },
  {
    name: '북두칠성',
    emoji: '⭐',
    story: '7개의 별로 이루어진 국자 모양이에요. 일년 내내 볼 수 있어요.',
    stars: [{ x: 15, y: 60 }, { x: 30, y: 55 }, { x: 45, y: 52 }, { x: 58, y: 50 }, { x: 68, y: 35 }, { x: 78, y: 28 }, { x: 82, y: 42 }],
  },
];
