'use client';
"use client";
import dynamic from "next/dynamic";

const WorldScene = dynamic(() => import("@/components/world/WorldScene"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, #7dd3fc 0%, #bbf7d0 100%)",
      fontFamily: "var(--font-jua), system-ui, sans-serif",
      gap: 16,
    }}>
      <span style={{ fontSize: 64 }}>🌳</span>
      <p style={{ fontSize: 20, color: "#166534", fontWeight: 700 }}>잠깐만요...</p>
    </div>
  ),
});

export default function Home() {
  return <WorldScene />;
}
