"use client";
import { useState, useEffect } from "react";
import { useTTS } from "@/lib/media-hooks/useTTS";

interface GraduationCertificateProps {
  age: number;
}

export default function GraduationCertificate({ age }: GraduationCertificateProps) {
  const [step, setStep] = useState<"input" | "certificate">("input");
  const [childName, setChildName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [className, setClassName] = useState("");
  const { enabled, toggle, speak } = useTTS();

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  // localStorage에서 기관 정보 자동 로드
  useEffect(() => {
    const stored = localStorage.getItem("parentInstitution");
    if (stored) {
      const info = JSON.parse(stored);
      setInstitutionName(info.name ?? "");
      setClassName(info.class ?? "");
    }
  }, []);

  // 졸업장 단계 전환 시 음성 안내
  useEffect(() => {
    if (step === "certificate") {
      speak("축하해요! 미디어 지킴이가 됐어요! 36주 동안 정말 잘했어요!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handlePrint = () => window.print();

  if (step === "input") {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 border-2 border-yellow-300">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏆</div>
          <h3 className="text-2xl font-black text-gray-800">졸업장 정보 입력</h3>
          <p className="text-gray-500 text-sm mt-1">이름을 입력하면 졸업장이 완성돼요!</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">어린이 이름 *</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="예: 김민준"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-lg font-bold focus:border-yellow-400 focus:outline-none"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">기관명</label>
            <input
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="예: 행복어린이집"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 font-bold focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">반 이름</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="예: 햇살반"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 font-bold focus:border-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => { if (childName.trim()) setStep("certificate"); }}
          disabled={!childName.trim()}
          className="w-full mt-6 bg-yellow-500 text-white py-4 rounded-2xl text-xl font-black shadow-lg hover:bg-yellow-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          졸업장 만들기 🎓
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 버튼 영역 (인쇄 시 숨김) */}
      <div className="no-print flex justify-center gap-3 mb-6">
        <button
          onClick={() => setStep("input")}
          className="bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200"
        >
          ← 다시 입력
        </button>
        {/* 음성 토글 */}
        <button
          onClick={toggle}
          title={enabled ? "음성 끄기" : "음성 켜기"}
          className={`px-5 py-3 rounded-2xl font-bold transition-all ${
            enabled
              ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"
              : "bg-gray-100 hover:bg-gray-200 text-gray-400"
          }`}
        >
          {enabled ? "🔊 음성 켜짐" : "🔇 음성 꺼짐"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-yellow-500 text-white px-8 py-3 rounded-2xl text-lg font-black shadow-lg hover:bg-yellow-600 active:scale-95 transition-all"
        >
          🖨️ 졸업장 인쇄하기
        </button>
      </div>

      {/* 졸업장 본문 */}
      <div
        id="certificate"
        className="max-w-2xl mx-auto bg-white border-8 border-double border-yellow-400 rounded-3xl p-10 text-center shadow-2xl"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        <div className="text-5xl mb-2">🏆 🌟 🏆</div>
        <div className="text-3xl font-black text-yellow-600 mb-1 tracking-widest">졸업증서</div>
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-6" />

        <p className="text-gray-500 text-lg mb-2">
          {institutionName}{className ? ` ${className}` : ""}
        </p>
        <div className="text-5xl font-black text-gray-800 mb-2 border-b-4 border-yellow-300 pb-4 mx-8">
          {childName}
        </div>
        <p className="text-gray-400 text-sm mb-6">어린이</p>

        <div className="bg-yellow-50 rounded-2xl p-6 mb-6 border border-yellow-200">
          <p className="text-xl text-gray-700 leading-relaxed">
            위 어린이는 <span className="font-black text-indigo-600">만 {age}세</span> 미디어리터러시 교육
            <br />
            연간 <span className="font-black text-green-600">36주 전 과정</span>을 성실히 이수하였으므로
            <br />
            이 증서를 드립니다.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { label: "비판적 사고 🧠", color: "bg-orange-100 text-orange-700" },
            { label: "미디어 감수성 💙", color: "bg-blue-100 text-blue-700" },
            { label: "창의 제작 🎨", color: "bg-purple-100 text-purple-700" },
            { label: "소통 능력 💬", color: "bg-green-100 text-green-700" },
            { label: "미디어 선택 ✅", color: "bg-yellow-100 text-yellow-700" },
          ].map((b) => (
            <span key={b.label} className={`px-4 py-2 rounded-full font-bold text-sm ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-lg mb-4">{dateStr}</p>
        <div className="text-center">
          <div className="text-5xl mb-1">📺</div>
          <p className="font-black text-gray-700">미디어리터러시 교육원</p>
          {institutionName && <p className="text-gray-500 text-sm">{institutionName}</p>}
        </div>

        <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-6 mb-2" />
        <div className="text-3xl">⭐ 🎉 ⭐</div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          #certificate, #certificate * { visibility: visible; }
          #certificate {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
