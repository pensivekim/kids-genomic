"use client";
import { useState } from "react";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface EmotionPickerProps {
  instruction?: string;
  onComplete: () => void;
}

const emotions = [
  { id: "happy", emoji: "😊", label: "기뻐요" },
  { id: "excited", emoji: "🤩", label: "신나요" },
  { id: "sad", emoji: "😢", label: "슬퍼요" },
  { id: "scared", emoji: "😨", label: "무서워요" },
  { id: "angry", emoji: "😠", label: "화나요" },
  { id: "surprised", emoji: "😲", label: "놀랐어요" },
  { id: "boring", emoji: "😐", label: "심심해요" },
  { id: "love", emoji: "🥰", label: "좋아요" },
];

export default function EmotionPicker({
  instruction = "지금 어떤 기분인가요? 고르봐요!",
  onComplete,
}: EmotionPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
    playSound("stamp");
  };

  const handleConfirm = () => {
    setConfirmed(true);
    playSound("complete");
    setTimeout(() => onComplete(), 1500);
  };

  const selectedEmotion = emotions.find((e) => e.id === selected);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 text-center">
      <h3 className="text-2xl xl:text-4xl font-black text-gray-800 mb-8">{instruction}</h3>

      {confirmed && selectedEmotion ? (
        <div className="flex flex-col items-center py-8">
          <div className="text-[8rem] mb-4 animate-bounce">{selectedEmotion.emoji}</div>
          <p className="text-3xl font-black text-gray-800">{selectedEmotion.label}!</p>
          <p className="text-xl text-gray-500 mt-2">선생님에게 이야기해봐요 🎤</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-4 mb-8">
            {emotions.map((e) => (
              <button
                key={e.id}
                onClick={() => handleSelect(e.id)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all min-h-[80px] border-2 ${
                  selected === e.id
                    ? "border-indigo-500 bg-indigo-50 scale-110 shadow-lg"
                    : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                <span className="text-4xl xl:text-5xl">{e.emoji}</span>
                <span className="text-sm xl:text-base font-bold text-gray-700 mt-1">{e.label}</span>
              </button>
            ))}
          </div>

          {selected && (
            <Button size="xl" onClick={handleConfirm} className="w-full max-w-xs mx-auto">
              이 기분이에요! ✅
            </Button>
          )}
        </>
      )}
    </div>
  );
}
