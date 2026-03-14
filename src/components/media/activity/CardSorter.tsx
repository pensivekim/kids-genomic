"use client";
import { useState } from "react";
import { CardSorterActivity } from "@/data/media/types";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface CardSorterProps {
  activity: CardSorterActivity;
  onComplete: () => void;
}

interface CardState {
  id: string;
  emoji: string;
  label: string;
  answer: number;
  placed?: number;
  correct?: boolean;
}

export default function CardSorter({ activity, onComplete }: CardSorterProps) {
  const [cards, setCards] = useState<CardState[]>(
    activity.cards.map((c) => ({ ...c }))
  );
  const [dragId, setDragId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const unplaced = cards.filter((c) => c.placed === undefined);
  const allPlaced = unplaced.length === 0;
  const score = cards.filter((c) => c.correct === true).length;

  const handleDrop = (categoryIndex: number) => {
    if (!dragId) return;
    setCards((prev) =>
      prev.map((c) => (c.id === dragId ? { ...c, placed: categoryIndex } : c))
    );
    setDragId(null);
  };

  const handleCardClick = (cardId: string, categoryIndex: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, placed: categoryIndex } : c))
    );
    playSound("stamp");
  };

  const checkAnswers = () => {
    setCards((prev) =>
      prev.map((c) => ({ ...c, correct: c.placed === c.answer }))
    );
    setChecked(true);
    const allCorrect = cards.every((c) => c.placed === c.answer);
    playSound(allCorrect ? "complete" : "correct");
  };

  const reset = () => {
    setCards(activity.cards.map((c) => ({ ...c })));
    setChecked(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-6">
        {activity.instruction}
      </h3>

      {/* 미배치 카드들 */}
      {unplaced.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[100px] p-4 bg-gray-50 rounded-3xl">
          {unplaced.map((card) => (
            <div
              key={card.id}
              draggable
              onDragStart={() => setDragId(card.id)}
              onDragEnd={() => setDragId(null)}
              className="flex flex-col items-center justify-center w-24 h-24 xl:w-32 xl:h-32 bg-white rounded-2xl shadow-md cursor-grab active:cursor-grabbing select-none touch-btn border-2 border-gray-200 hover:border-indigo-400 transition-all"
            >
              <span className="text-4xl xl:text-5xl">{card.emoji}</span>
              <span className="text-sm xl:text-base font-bold mt-1 text-gray-700">{card.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* 분류 박스 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {activity.categories.map((cat, idx) => {
          const placed = cards.filter((c) => c.placed === idx);
          return (
            <div
              key={idx}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              className={`min-h-[140px] rounded-3xl border-3 border-dashed p-3 transition-all ${
                idx === 0
                  ? "border-orange-400 bg-orange-50"
                  : "border-blue-400 bg-blue-50"
              }`}
            >
              <p className="text-center font-black text-lg xl:text-2xl mb-3">
                {cat}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {placed.map((card) => (
                  <div
                    key={card.id}
                    className={`flex flex-col items-center w-20 h-20 xl:w-28 xl:h-28 rounded-xl shadow-sm border-2 p-1 ${
                      checked
                        ? card.correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-3xl xl:text-4xl">{card.emoji}</span>
                    <span className="text-xs xl:text-sm font-bold text-gray-700 mt-1">{card.label}</span>
                    {checked && (
                      <span className="text-lg">{card.correct ? "✅" : "❌"}</span>
                    )}
                  </div>
                ))}
                {/* 탭으로 배치 버튼 (태블릿/모바일) */}
                {unplaced.length > 0 && (
                  <button
                    onClick={() => {
                      const next = unplaced[0];
                      if (next) handleCardClick(next.id, idx);
                    }}
                    className="w-20 h-20 xl:w-28 xl:h-28 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-400 transition-all text-3xl"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 justify-center">
        {!checked && allPlaced && (
          <Button size="xl" onClick={checkAnswers} className="min-w-[160px]">
            확인해봐요! ✅
          </Button>
        )}
        {checked && (
          <>
            <div className="text-2xl font-black text-center text-gray-800">
              {score} / {cards.length} 맞았어요! {score === cards.length ? "🎉" : "😊"}
            </div>
            <Button variant="outline" size="lg" onClick={reset}>
              다시 해봐요
            </Button>
            {score >= Math.ceil(cards.length * 0.5) && (
              <Button size="lg" onClick={onComplete}>
                다음으로 →
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
