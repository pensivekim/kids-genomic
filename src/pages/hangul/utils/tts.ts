export function speak(text: string, rate = 0.8) {
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = rate;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}
