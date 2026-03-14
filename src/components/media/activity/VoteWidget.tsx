"use client";
import { useState, useEffect, useCallback } from "react";
import { VoteWidgetActivity } from "@/data/media/types";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface VoteWidgetProps {
  activity: VoteWidgetActivity;
  age?: number;
  week?: number;
  onComplete: () => void;
}

export default function VoteWidget({ activity, age, week, onComplete }: VoteWidgetProps) {
  const [localVotes, setLocalVotes] = useState<Record<string, number>>(
    Object.fromEntries(activity.options.map((o) => [o.id, 0]))
  );
  const [myVote, setMyVote] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [liveVotes, setLiveVotes] = useState<Record<string, number> | null>(null);
  const [liveTotal, setLiveTotal] = useState(0);
  const [polling, setPolling] = useState(false);

  // D1에서 실시간 집계 가져오기
  const fetchLiveResults = useCallback(async () => {
    if (!age || !week) return;
    try {
      const res = await fetch(`/api/votes?age=${age}&week=${week}`);
      const data = await res.json() as {
        success: boolean;
        results: { option_id: string; count: number }[];
        total: number;
      };
      if (data.success) {
        const map: Record<string, number> = {};
        for (const r of data.results) map[r.option_id] = r.count;
        setLiveVotes(map);
        setLiveTotal(data.total);
      }
    } catch (e) { console.warn('[미디어리터러시 오류]', e); }
  }, [age, week]);

  // 결과 표시 시 폴링 시작
  useEffect(() => {
    if (!showResult || !age || !week) return;
    fetchLiveResults();
    setPolling(true);
    const interval = setInterval(fetchLiveResults, 3000);
    return () => { clearInterval(interval); setPolling(false); };
  }, [showResult, fetchLiveResults, age, week]);

  const handleVote = async (id: string) => {
    if (myVote) return;
    setMyVote(id);
    setLocalVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    playSound("stamp");

    // D1에 투표 저장
    if (age && week) {
      try {
        let sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
          sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          localStorage.setItem("sessionId", sessionId);
        }
        await fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, age, week, optionId: id }),
        });
      } catch (e) { console.warn('[미디어리터러시 오류]', e); }
    }
  };

  const reveal = () => {
    setShowResult(true);
    playSound("complete");
  };

  // 표시할 투표 수: D1 라이브 > 로컬
  const displayVotes = liveVotes ?? localVotes;
  const displayTotal = liveTotal > 0 ? liveTotal : Object.values(localVotes).reduce((a, b) => a + b, 0);
  const maxVotes = Math.max(...Object.values(displayVotes), 1);
  const winner = activity.options.reduce((a, b) =>
    (displayVotes[a.id] || 0) >= (displayVotes[b.id] || 0) ? a : b
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-2">
        {activity.instruction}
      </h3>

      {showResult && age && week && (
        <p className="text-center text-sm text-indigo-500 font-bold mb-4">
          {polling ? "📡 실시간 집계 중..." : "📊 전체 투표 결과"}
          {displayTotal > 0 && ` · 총 ${displayTotal}표`}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        {activity.options.map((opt) => {
          const isSelected = myVote === opt.id;
          const voteCount = displayVotes[opt.id] || 0;
          const pct = displayTotal > 0 ? Math.round((voteCount / displayTotal) * 100) : 0;
          const isWinner = showResult && opt.id === winner.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={!!myVote}
              className={`relative flex flex-col items-center p-4 rounded-3xl border-2 transition-all min-h-[120px] touch-btn overflow-hidden ${
                isWinner
                  ? "border-yellow-400 bg-yellow-50 shadow-lg"
                  : isSelected
                  ? "border-indigo-500 bg-indigo-50 shadow-lg"
                  : myVote
                  ? "border-gray-200 bg-gray-50 opacity-70"
                  : "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 shadow-md"
              }`}
            >
              {showResult && (
                <div
                  className="absolute bottom-0 left-0 w-full bg-indigo-200/50 transition-all duration-700"
                  style={{ height: `${pct}%` }}
                />
              )}
              <span className="text-5xl xl:text-6xl mb-2 relative z-10">{opt.emoji}</span>
              <span className="text-base xl:text-xl font-black text-gray-800 relative z-10">
                {opt.label}
              </span>
              {showResult && (
                <span className="text-2xl font-black text-indigo-600 mt-1 relative z-10">
                  {pct}% <span className="text-sm text-gray-400">({voteCount}표)</span>
                </span>
              )}
              {isSelected && <span className="text-2xl mt-1 relative z-10">✅</span>}
              {isWinner && showResult && <span className="text-2xl mt-1 relative z-10">🏆</span>}
            </button>
          );
        })}
      </div>

      {myVote && !showResult && (
        <Button size="xl" onClick={reveal} className="w-full max-w-xs mx-auto block">
          결과 보기! 📊
        </Button>
      )}

      {showResult && (
        <div className="text-center">
          <div className="text-4xl mb-2">🏆 {winner.emoji} {winner.label}</div>
          <p className="text-xl text-gray-600 mb-4">우리 반 1등이에요!</p>
          <Button size="xl" onClick={onComplete}>
            다음으로 →
          </Button>
        </div>
      )}
    </div>
  );
}
