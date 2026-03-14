export function speak(text: string) {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('kidsSoundOff') === '1') return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.9;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}
