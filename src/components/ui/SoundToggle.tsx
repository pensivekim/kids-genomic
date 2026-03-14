interface Props {
  on: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ on, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-2xl transition-all active:scale-90"
      title={on ? '소리 끄기' : '소리 켜기'}
    >
      {on ? '🔊' : '🔇'}
    </button>
  );
}
