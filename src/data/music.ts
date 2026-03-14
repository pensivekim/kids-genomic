export interface Instrument {
  id: string;
  name: string;
  emoji: string;
  sound: string;   // TTS로 읽을 설명
  color: string;
}

export const INSTRUMENTS: Instrument[] = [
  { id: 'piano',   name: '피아노',   emoji: '🎹', sound: '피아노. 건반을 눌러 소리를 내요.',     color: '#6366f1' },
  { id: 'violin',  name: '바이올린', emoji: '🎻', sound: '바이올린. 활로 줄을 켜서 소리를 내요.', color: '#ec4899' },
  { id: 'guitar',  name: '기타',     emoji: '🎸', sound: '기타. 줄을 튕겨서 소리를 내요.',       color: '#f59e0b' },
  { id: 'drum',    name: '드럼',     emoji: '🥁', sound: '드럼. 채로 두드려서 소리를 내요.',     color: '#ef4444' },
  { id: 'trumpet', name: '트럼펫',   emoji: '🎺', sound: '트럼펫. 입으로 불어서 소리를 내요.',   color: '#10b981' },
  { id: 'flute',   name: '플루트',   emoji: '🪈', sound: '플루트. 바람으로 소리를 내는 악기예요.', color: '#3b82f6' },
  { id: 'maracas', name: '마라카스', emoji: '🪇', sound: '마라카스. 흔들어서 소리를 내요.',       color: '#8b5cf6' },
  { id: 'accordion',name: '아코디언',emoji: '🪗', sound: '아코디언. 당겼다 밀면서 소리를 내요.',  color: '#f97316' },
];

// 도레미 피아노 건반
export const PIANO_KEYS = [
  { note: '도', freq: 261.63, color: '#fbbf24', label: '도' },
  { note: '레', freq: 293.66, color: '#f97316', label: '레' },
  { note: '미', freq: 329.63, color: '#ef4444', label: '미' },
  { note: '파', freq: 349.23, color: '#ec4899', label: '파' },
  { note: '솔', freq: 392.00, color: '#8b5cf6', label: '솔' },
  { note: '라', freq: 440.00, color: '#3b82f6', label: '라' },
  { note: '시', freq: 493.88, color: '#10b981', label: '시' },
  { note: '도', freq: 523.25, color: '#fbbf24', label: '도↑' },
];

// 리듬 게임 패턴
export const RHYTHM_PATTERNS = [
  { name: '쿵짝', pattern: [1, 0, 1, 0, 1, 0, 1, 0] },
  { name: '쿵쿵짝', pattern: [1, 1, 0, 1, 1, 0, 1, 1] },
  { name: '쿵짝짝', pattern: [1, 0, 0, 1, 0, 0, 1, 0] },
];
