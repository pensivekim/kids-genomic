"use client";
import { useState, useEffect } from "react";
import { Slide } from "@/data/media/types";
import Button from "@/components/ui/MediaButton";
import { useTTS } from "@/lib/media-hooks/useTTS";
import { useFullscreen } from "@/lib/media-hooks/useFullscreen";

interface SlideViewerProps {
  slides: Slide[];
  onComplete: () => void;
}

export default function SlideViewer({ slides, onComplete }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const { enabled, toggle, speak, loading } = useTTS();
  const { isFullscreen, enter: enterFullscreen, toggle: toggleFullscreen } = useFullscreen();

  const isLast = current === slides.length - 1;
  const slide = slides[current];

  // 수업 진입 시 자동 전체화면 요청
  useEffect(() => {
    enterFullscreen();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 슬라이드 전환 시 자동 읽기
  useEffect(() => {
    speak(`${slide.title}. ${slide.description}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const next = () => {
    if (isLast) onComplete();
    else setCurrent((c) => c + 1);
  };
  const prev = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <div className="flex flex-col items-center justify-between min-h-[60vh] p-4 xl:p-12">
      {/* 슬라이드 카운터 + 음성 토글 */}
      <div className="flex gap-2 mb-6 items-center relative w-full justify-center">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-8 h-3 bg-indigo-500" : "w-3 h-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
        {/* 우상단 버튼 그룹 */}
        <div className="absolute right-0 flex gap-2">
          {/* 전체화면 토글 */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "전체화면 해제" : "전체화면"}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg transition-all flex items-center justify-center"
          >
            {isFullscreen ? "⊡" : "⛶"}
          </button>
          {/* 음성 켜기/끄기 */}
          <button
            onClick={toggle}
            title={enabled ? "음성 끄기" : "음성 켜기"}
            className={`w-11 h-11 rounded-full text-xl transition-all ${
              enabled
                ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-400"
            } ${loading ? "animate-pulse" : ""}`}
          >
            {enabled ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      {/* 슬라이드 내용 */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl xl:max-w-4xl w-full">
        <div className="text-8xl xl:text-[12rem] mb-6 animate-bounce-slow">{slide.emoji}</div>
        <h2 className="text-3xl xl:text-5xl font-black text-gray-800 mb-4">{slide.title}</h2>
        <p className="text-xl xl:text-3xl text-gray-600 leading-relaxed">{slide.description}</p>
      </div>

      {/* 네비게이션 */}
      <div className="flex gap-4 mt-8 w-full max-w-lg">
        {current > 0 && (
          <Button variant="outline" size="xl" onClick={prev} className="flex-1">
            이전
          </Button>
        )}
        <Button size="xl" onClick={next} className="flex-1">
          {isLast ? "활동 시작! 🎯" : "다음 →"}
        </Button>
      </div>
    </div>
  );
}
