"use client";
import { useState, useEffect } from "react";
import { QuizCardActivity } from "@/data/media/types";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";
import { useTTS } from "@/lib/media-hooks/useTTS";

interface QuizCardProps {
  activity: QuizCardActivity;
  onComplete: () => void;
}

export default function QuizCard({ activity, onComplete }: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const { enabled, toggle, speak } = useTTS();

  const question = activity.questions[currentQ];
  const isAnswered = selected !== null;
  const isCorrect = selected === question.answer;
  const isLast = currentQ === activity.questions.length - 1;
  const score = results.filter(Boolean).length;

  // 활동 지시문 읽기 (최초 1회)
  useEffect(() => {
    speak(activity.instruction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 문제 바뀔 때 질문 읽기
  useEffect(() => {
    speak(question.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ]);

  // 최종 결과 읽기
  useEffect(() => {
    if (results.length === activity.questions.length) {
      const finalScore = results.filter(Boolean).length;
      const msg =
        finalScore === activity.questions.length
          ? "완벽해요! 모두 맞혔어요!"
          : `${finalScore}개 맞았어요! 잘했어요!`;
      speak(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.length]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    const correct = idx === question.answer;
    playSound(correct ? "correct" : "stamp");
    setResults((prev) => [...prev, correct]);
    speak(correct ? "맞았어요!" : "다시 해봐요!");
  };

  const next = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const isAllDone = results.length === activity.questions.length;

  if (isAllDone && isLast && isAnswered) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-8xl mb-4">{score === activity.questions.length ? "🎉" : "😊"}</div>
        <h3 className="text-3xl xl:text-5xl font-black text-gray-800 mb-4">
          {score} / {activity.questions.length} 맞았어요!
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          {score === activity.questions.length ? "완벽해요! 모두 맞혔어요!" : "잘했어요! 다시 해볼까요?"}
        </p>
        <Button size="xl" onClick={onComplete}>
          다음으로 →
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* 진행 표시 + 음성 토글 */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-500 font-medium">
          {currentQ + 1} / {activity.questions.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{question.emoji}</span>
          <button
            onClick={toggle}
            title={enabled ? "음성 끄기" : "음성 켜기"}
            className={`w-10 h-10 rounded-full text-lg transition-all ${
              enabled
                ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-400"
            }`}
          >
            {enabled ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      {/* 질문 */}
      <div className="text-center mb-8">
        <h3 className="text-2xl xl:text-4xl font-black text-gray-800 leading-relaxed">
          {activity.instruction}
        </h3>
        <p className="text-xl xl:text-3xl text-gray-700 mt-4 bg-yellow-50 rounded-2xl p-4">
          {question.question}
        </p>
      </div>

      {/* 선택지 */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {question.options.map((opt, idx) => {
          let style = "border-2 border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50";
          if (isAnswered) {
            if (idx === question.answer) {
              style = "border-2 border-green-500 bg-green-50";
            } else if (idx === selected) {
              style = "border-2 border-red-400 bg-red-50";
            } else {
              style = "border-2 border-gray-200 bg-gray-50 opacity-50";
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl text-left text-xl xl:text-2xl font-bold transition-all min-h-[80px] ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* 결과 설명 */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl mb-6 text-center text-xl font-bold ${
            isCorrect ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
          }`}
        >
          {isCorrect ? "✅ 맞았어요!" : "💡 다시 생각해봐요!"} — {question.explanation}
        </div>
      )}

      {isAnswered && (
        <Button size="xl" onClick={next} className="w-full">
          {isLast ? "결과 보기 🎉" : "다음 문제 →"}
        </Button>
      )}
    </div>
  );
}
