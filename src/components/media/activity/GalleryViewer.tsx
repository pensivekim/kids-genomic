"use client";
import { useState } from "react";
import { playSound } from "@/utils/media/sound";
import Button from "@/components/ui/MediaButton";

interface GalleryItem {
  id: string;
  emoji: string;
  label: string;
  description?: string;
}

interface GalleryViewerProps {
  instruction?: string;
  items?: GalleryItem[];
  onComplete: () => void;
}

const defaultItems: GalleryItem[] = [
  { id: "1", emoji: "🎨", label: "내 그림", description: "오늘 그린 그림이에요" },
  { id: "2", emoji: "📸", label: "우리 반 사진", description: "함께 찍은 사진이에요" },
  { id: "3", emoji: "🎬", label: "우리 영상", description: "함께 만든 영상이에요" },
  { id: "4", emoji: "📝", label: "내 작품", description: "내가 만든 작품이에요" },
];

export default function GalleryViewer({
  instruction = "우리가 만든 작품을 감상해봐요!",
  items = defaultItems,
  onComplete,
}: GalleryViewerProps) {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else { next.add(id); playSound("stamp"); }
      return next;
    });
  };

  const allLiked = items.every((item) => liked.has(item.id));

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl xl:text-3xl font-black text-center text-gray-800 mb-6">{instruction}</h3>

      {selected ? (
        <div className="text-center">
          <div className="text-[8rem] mb-4">{selected.emoji}</div>
          <h4 className="text-2xl font-black text-gray-800 mb-2">{selected.label}</h4>
          <p className="text-gray-600 mb-6">{selected.description}</p>
          <Button variant="outline" onClick={() => setSelected(null)}>목록으로</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-gray-200 p-4 shadow-md"
            >
              <button
                onClick={() => setSelected(item)}
                className="w-full text-center mb-3"
              >
                <div className="text-6xl xl:text-7xl mb-2">{item.emoji}</div>
                <p className="font-black text-gray-800">{item.label}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                )}
              </button>
              <button
                onClick={() => toggleLike(item.id)}
                className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${
                  liked.has(item.id) ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {liked.has(item.id) ? "❤️ 좋아요!" : "🤍 좋아요"}
              </button>
            </div>
          ))}
        </div>
      )}

      {allLiked && !selected && (
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-black text-gray-700 mb-4">모든 작품을 감상했어요!</p>
          <Button size="xl" onClick={() => { playSound("complete"); onComplete(); }}>
            다음으로 →
          </Button>
        </div>
      )}

      {!allLiked && !selected && (
        <p className="text-center text-gray-400 text-sm">작품을 눌러서 자세히 보고, 좋아요를 눌러봐요!</p>
      )}
    </div>
  );
}
