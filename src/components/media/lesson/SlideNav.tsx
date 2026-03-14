interface SlideNavProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function SlideNav({ total, current, onChange }: SlideNavProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`rounded-full transition-all duration-300 ${
            i === current ? "w-8 h-3 bg-indigo-500" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
