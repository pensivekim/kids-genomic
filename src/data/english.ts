export interface Letter {
  letter: string;
  name: string;      // 발음 이름 (TTS용)
  word: string;      // 예시 단어
  emoji: string;
}

export interface Word {
  word: string;
  meaning: string;   // 한국어 뜻
  emoji: string;
}

export const ALPHABET: Letter[] = [
  { letter: 'A', name: 'Ay', word: 'Apple', emoji: '🍎' },
  { letter: 'B', name: 'Bee', word: 'Ball', emoji: '⚽' },
  { letter: 'C', name: 'See', word: 'Cat', emoji: '🐱' },
  { letter: 'D', name: 'Dee', word: 'Dog', emoji: '🐶' },
  { letter: 'E', name: 'Ee', word: 'Egg', emoji: '🥚' },
  { letter: 'F', name: 'Ef', word: 'Fish', emoji: '🐟' },
  { letter: 'G', name: 'Jee', word: 'Grape', emoji: '🍇' },
  { letter: 'H', name: 'Aych', word: 'Hat', emoji: '🎩' },
  { letter: 'I', name: 'Eye', word: 'Ice cream', emoji: '🍦' },
  { letter: 'J', name: 'Jay', word: 'Juice', emoji: '🧃' },
  { letter: 'K', name: 'Kay', word: 'Kite', emoji: '🪁' },
  { letter: 'L', name: 'El', word: 'Lion', emoji: '🦁' },
  { letter: 'M', name: 'Em', word: 'Moon', emoji: '🌙' },
  { letter: 'N', name: 'En', word: 'Nest', emoji: '🪹' },
  { letter: 'O', name: 'Oh', word: 'Orange', emoji: '🍊' },
  { letter: 'P', name: 'Pee', word: 'Pig', emoji: '🐷' },
  { letter: 'Q', name: 'Cue', word: 'Queen', emoji: '👑' },
  { letter: 'R', name: 'Ar', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', name: 'Es', word: 'Sun', emoji: '☀️' },
  { letter: 'T', name: 'Tee', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', name: 'You', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', name: 'Vee', word: 'Violin', emoji: '🎻' },
  { letter: 'W', name: 'Double-you', word: 'Whale', emoji: '🐋' },
  { letter: 'X', name: 'Ex', word: 'X-ray', emoji: '🩻' },
  { letter: 'Y', name: 'Why', word: 'Yarn', emoji: '🧶' },
  { letter: 'Z', name: 'Zee', word: 'Zebra', emoji: '🦓' },
];

export const WORDS: Word[] = [
  { word: 'Apple', meaning: '사과', emoji: '🍎' },
  { word: 'Bear', meaning: '곰', emoji: '🐻' },
  { word: 'Cat', meaning: '고양이', emoji: '🐱' },
  { word: 'Dog', meaning: '강아지', emoji: '🐶' },
  { word: 'Elephant', meaning: '코끼리', emoji: '🐘' },
  { word: 'Flower', meaning: '꽃', emoji: '🌸' },
  { word: 'Giraffe', meaning: '기린', emoji: '🦒' },
  { word: 'Horse', meaning: '말', emoji: '🐴' },
  { word: 'Ice cream', meaning: '아이스크림', emoji: '🍦' },
  { word: 'Jellyfish', meaning: '해파리', emoji: '🪼' },
  { word: 'Kite', meaning: '연', emoji: '🪁' },
  { word: 'Lion', meaning: '사자', emoji: '🦁' },
  { word: 'Monkey', meaning: '원숭이', emoji: '🐒' },
  { word: 'Night', meaning: '밤', emoji: '🌙' },
  { word: 'Owl', meaning: '부엉이', emoji: '🦉' },
  { word: 'Penguin', meaning: '펭귄', emoji: '🐧' },
  { word: 'Rainbow', meaning: '무지개', emoji: '🌈' },
  { word: 'Star', meaning: '별', emoji: '⭐' },
  { word: 'Train', meaning: '기차', emoji: '🚂' },
  { word: 'Umbrella', meaning: '우산', emoji: '☂️' },
];
