"use client";
import { useState } from "react";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface ContentOption {
  id: string;
  emoji: string;
  label: string;
  description?: string;
}

interface ContentPickerProps {
  instruction?: string;
  options?: ContentOption[];
  maxSelect?: number;
  onComplete: () => void;
}

const defaultOptions: ContentOption[] = [
  { id: "1", emoji: "📚", label: "그림책", description: "그림과 이야기가 있어요" },
  { id: "2", emoji: "🎬", label: "만화 영상", description: "움직이는 그림이에요" },
  { id: "3", emoji: "🎵", label: "음악", description: "귀로 듣는 미디어예요" },
  { id: "4", emoji: "🎮", label: "게임", description: "직접 참여하는 미디어예요" },
];

export default function ContentPicker({
  instruction = "좋은 미디어를 골라봐요!",
  options = defaultOptions,
  maxSelect = 1,
  onComplete,
}: ContentPickerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < maxSelect) {
        next.add(id);
        playSound("stamp");
      }
      return next;
    });
  };

  const confirm = () => {
    setConfirmed(true);
    playSound("complete");
    setTimeout(() => onComplete(), 1500);
  };

  const selectedItems = options.filter((o) => selected.has(o.id));

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-8xl mb-4 animate-bounce">{selectedItems[0]?.emoji}</div>
        <h3 className="text-3xl font-black text-gray-800">{selectedItems[0]?.label}</h3>
        <p className="text-xl text-gray-500 mt-2">좋은 선택이에요! 🌟</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-2">
        {instruction}
      </h3>
      {maxSelect > 1 && (
        <p className="text-center text-gray-500 mb-4">최대 {maxSelect}개 선택할 수 있어요</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((opt) => {
          const isSelected = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`flex flex-col items-center p-5 rounded-3xl border-2 transition-all min-h-[140px] ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white hover:border-indigo-300 shadow-md"
              }`}
            >
              <span className="text-5xl xl:text-6xl mb-2">{opt.emoji}</span>
              <span className="font-black text-gray-800 xl:text-lg">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-gray-500 mt-1 text-center">{opt.description}</span>
              )}
              {isSelected && <span className="text-xl mt-2">✅</span>}
            </button>
          );
        })}
      </div>

      {selected.size > 0 && (
        <Button size="xl" onClick={confirm} className="w-full">
          이걸로 할게요! ✅
        </Button>
      )}
    </div>
  );
}
