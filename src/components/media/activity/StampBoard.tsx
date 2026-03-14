"use client";
import { useState } from "react";
import { StampBoardActivity } from "@/data/media/types";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface StampBoardProps {
  activity: StampBoardActivity;
  onComplete: () => void;
}

export default function StampBoard({ activity, onComplete }: StampBoardProps) {
  const [stamped, setStamped] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const toggleStamp = (id: string) => {
    if (done) return;
    setStamped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        playSound("stamp");
        if (next.size >= activity.maxStamps) {
          setDone(true);
          playSound("graduation");
        }
      }
      return next;
    });
  };

  const isComplete = stamped.size >= activity.maxStamps;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-6">
        {activity.instruction}
      </h3>

      {done && (
        <div className="text-center p-6 bg-yellow-50 rounded-3xl mb-6 border-2 border-yellow-300">
          <div className="text-6xl mb-2">🎉</div>
          <p className="text-2xl font-black text-yellow-700">{activity.completionMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {activity.items.map((item) => {
          const isStamped = stamped.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleStamp(item.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all min-h-[120px] touch-btn ${
                isStamped
                  ? "border-yellow-400 bg-yellow-50 shadow-inner"
                  : "border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-50 shadow-md"
              }`}
            >
              <span className="text-4xl xl:text-5xl mb-2">{item.emoji}</span>
              <span className="text-sm xl:text-base font-bold text-gray-700 text-center leading-tight">
                {item.label}
              </span>
              {isStamped && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-yellow-100/70">
                  <span className="text-5xl xl:text-6xl rotate-12">{activity.stamp}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 진행 바 */}
      <div className="flex gap-1 justify-center mb-6">
        {Array.from({ length: activity.maxStamps }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
              i < stamped.size
                ? "border-yellow-400 bg-yellow-100"
                : "border-gray-300 bg-white"
            }`}
          >
            {i < stamped.size ? activity.stamp : "○"}
          </div>
        ))}
      </div>

      {isComplete && (
        <Button size="xl" onClick={onComplete} className="w-full">
          다음으로 →
        </Button>
      )}
    </div>
  );
}
