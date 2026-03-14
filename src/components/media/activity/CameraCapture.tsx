"use client";
import { useRef, useState, useCallback } from "react";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface CameraCaptureProps {
  instruction?: string;
  age?: number;
  week?: number;
  onComplete: () => void;
}

export default function CameraCapture({
  instruction = "사진을 찍어봐요!",
  age,
  week,
  onComplete,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [status, setStatus] = useState<"idle" | "preview" | "captured">("idle");
  const [flash, setFlash] = useState(false);
  const [uploading, setUploading] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setStatus("preview");
    } catch {
      alert("카메라를 사용할 수 없어요. 브라우저에서 카메라 권한을 허용해주세요.");
    }
  }, [facingMode]);

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setStatus("idle");
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setPhotos((prev) => [...prev, dataUrl]);
    setFlash(true);
    playSound("correct");
    setTimeout(() => setFlash(false), 300);
  };

  const flipCamera = async () => {
    stopCamera();
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    // 재시작은 버튼으로
  };

  const uploadPhotosToR2 = async (photoDataUrls: string[]) => {
    if (!age || !week || photoDataUrls.length === 0) return;
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("sessionId", sessionId);
    }
    for (const dataUrl of photoDataUrls) {
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        const fd = new FormData();
        fd.append("photo", file);
        fd.append("sessionId", sessionId);
        fd.append("age", String(age));
        fd.append("week", String(week));
        await fetch("/api/photos", { method: "POST", body: fd });
      } catch (e) { console.warn('[미디어리터러시 오류]', e); }
    }
  };

  const handleComplete = async () => {
    stopCamera();
    playSound("complete");
    if (photos.length > 0) {
      setUploading(true);
      await uploadPhotosToR2(photos);
      setUploading(false);
    }
    onComplete();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-4">{instruction}</h3>

      {status === "idle" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-8xl">📷</div>
          <Button size="xl" onClick={startCamera}>카메라 시작하기</Button>
          {photos.length > 0 && (
            <Button variant="outline" size="lg" onClick={handleComplete}>
              찍은 사진 보기 ({photos.length}장)
            </Button>
          )}
        </div>
      )}

      {status === "preview" && (
        <div className="relative">
          {/* 플래시 효과 */}
          {flash && <div className="absolute inset-0 bg-white z-10 rounded-3xl animate-ping opacity-75" />}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-3xl border-3 border-gray-200"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* 컨트롤 */}
          <div className="flex items-center justify-between mt-4 px-4">
            <button onClick={flipCamera} className="text-4xl">🔄</button>
            <button
              onClick={takePhoto}
              className="w-20 h-20 rounded-full bg-white border-4 border-indigo-500 flex items-center justify-center text-4xl shadow-lg active:scale-90 transition-all"
            >
              📸
            </button>
            <button onClick={stopCamera} className="text-4xl">⏹️</button>
          </div>
        </div>
      )}

      {/* 찍은 사진 갤러리 */}
      {photos.length > 0 && (
        <div className="mt-4">
          <p className="font-bold text-gray-600 mb-2">찍은 사진 ({photos.length}장)</p>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative aspect-video">
                <img src={p} alt={`사진 ${i + 1}`} className="w-full h-full object-cover rounded-xl border-2 border-gray-200" />
                <button
                  onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Button size="xl" onClick={handleComplete} className="w-full mt-4" disabled={uploading}>
            {uploading ? "저장 중... ☁️" : `완성! 🎉 (${photos.length}장 저장)`}
          </Button>
        </div>
      )}
    </div>
  );
}
