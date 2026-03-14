export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-sky-100 flex flex-col items-center justify-center z-50">
      <div className="text-6xl animate-bounce mb-4">🌳</div>
      <p className="text-xl font-bold text-green-700">마을을 불러오는 중...</p>
      <p className="text-sm text-green-500 mt-2">잠깐만 기다려 주세요!</p>
    </div>
  );
}
