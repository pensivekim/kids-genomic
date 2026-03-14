// Robust TTS that works immediately after user interaction
export function speak(text: string, lang = 'ko-KR', rate = 0.85) {
  const synth = window.speechSynthesis;
  synth.cancel();

  function doSpeak() {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = 1.1;
    const voices = synth.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (match) u.voice = match;
    synth.speak(u);
  }

  if (synth.getVoices().length > 0) {
    doSpeak();
  } else {
    synth.addEventListener('voiceschanged', doSpeak, { once: true });
  }
}

export function speakEN(text: string, rate = 0.85) {
  speak(text, 'en-US', rate);
}
