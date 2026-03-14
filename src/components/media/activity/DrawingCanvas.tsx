"use client";
import { useRef, useState, useEffect } from "react";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface DrawingCanvasProps {
  instruction?: string;
  onComplete: () => void;
}

const COLORS = ["#000000","#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#ffffff"];
const SIZES = [4, 8, 16, 24];

export default function DrawingCanvas({
  instruction = "자유롭게 그림을 그려봐요!",
  onComplete,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [saved, setSaved] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff9f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? "#fff9f0" : color;
    ctx.lineWidth = isEraser ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff9f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    setSaved(true);
    playSound("complete");
    setTimeout(() => onComplete(), 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-4">
        {instruction}
      </h3>

      {/* 툴바 */}
      <div className="flex flex-wrap items-center gap-2 mb-3 p-3 bg-gray-50 rounded-2xl">
        {/* 색상 */}
        <div className="flex gap-1 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); setIsEraser(false); }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${color === c && !isEraser ? "border-gray-800 scale-125" : "border-gray-300"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        {/* 굵기 */}
        <div className="flex gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setIsEraser(false); }}
              className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 ${size === s && !isEraser ? "border-indigo-500" : "border-transparent"}`}
            >
              <div className="rounded-full bg-gray-700" style={{ width: s / 2 + 4, height: s / 2 + 4 }} />
            </button>
          ))}
        </div>
        {/* 지우개 */}
        <button
          onClick={() => setIsEraser(!isEraser)}
          className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${isEraser ? "bg-yellow-200 border-yellow-500" : "bg-white border-gray-300"}`}
        >
          🧹 지우개
        </button>
        <button onClick={clear} className="px-3 py-1 rounded-full text-sm font-bold bg-white border-2 border-red-300 text-red-500">
          🗑️ 전체 지우기
        </button>
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full rounded-3xl border-3 border-gray-200 touch-none cursor-crosshair"
        style={{ touchAction: "none" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />

      {saved ? (
        <div className="text-center mt-4 text-3xl font-black text-green-600">✅ 저장됐어요!</div>
      ) : (
        <div className="flex gap-3 mt-4 justify-center">
          <Button variant="outline" size="lg" onClick={clear}>다시 그리기</Button>
          <Button size="xl" onClick={save}>완성! 저장하기 🖼️</Button>
        </div>
      )}
    </div>
  );
}
