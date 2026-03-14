let ctx: AudioContext | null = null;

function getCtx() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function playTone(freq: number, duration = 0.5) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ac.currentTime);

  gain.gain.setValueAtTime(0.4, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

export function playClick(high = false) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = 'square';
  osc.frequency.value = high ? 880 : 440;
  gain.gain.setValueAtTime(0.3, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.1);
}
