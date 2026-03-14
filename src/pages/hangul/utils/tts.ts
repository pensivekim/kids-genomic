// Compatibility wrapper for hangul components that call speak(text, rate)
import { speak as globalSpeak } from '../../../utils/tts';

export function speak(text: string, rate = 0.85) {
  globalSpeak(text, 'ko-KR', rate);
}
