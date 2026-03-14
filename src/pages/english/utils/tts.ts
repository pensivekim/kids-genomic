// Compatibility wrapper for english components that call speak(text, rate)
import { speak as globalSpeak } from '../../../utils/tts';

export function speak(text: string, rate = 0.85) {
  globalSpeak(text, 'en-US', rate);
}
