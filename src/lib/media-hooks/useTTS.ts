"use client";
import { useState, useCallback, useRef, useEffect } from "react";

const TTS_ENABLED_KEY = "tts_enabled";

export function useTTS() {
  // SSR 안전: 초기값 true, 클라이언트 hydration 후 localStorage에서 동기화
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);

  // hydration 후 localStorage 읽기 (SSR 충돌 방지)
  useEffect(() => {
    const stored = localStorage.getItem(TTS_ENABLED_KEY);
    if (stored !== null) {
      const val = stored === "true";
      setEnabled(val);
      enabledRef.current = val;
    }
  }, []);

  // enabled 변경 시 ref 동기화
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(TTS_ENABLED_KEY, String(next));
      // 재생 중인 오디오 즉시 중지
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return next;
    });
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!enabledRef.current || !text.trim()) return;

    // 이전 재생 중지
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      await audio.play();
    } catch {
      // TTS 실패 시 조용히 무시 (수업 진행에 영향 없음)
    } finally {
      setLoading(false);
    }
  }, []); // enabledRef로 최신 enabled 읽음 → 재생성 불필요

  return { enabled, toggle, speak, loading };
}
