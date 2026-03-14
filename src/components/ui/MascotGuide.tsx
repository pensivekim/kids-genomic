import { useState, useEffect } from 'react';

interface Props {
  name: string;
}

const MESSAGES = [
  '건물을 눌러봐요! 🏠',
  '화면을 끌면 이동해요! 👆',
  '두 손가락으로 크게 볼 수 있어요! 🔍',
];

export default function MascotGuide({ name }: Props) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    !!localStorage.getItem('kidsTutorialDone')
  );

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setInterval(() => {
      setMsgIdx(i => {
        if (i >= MESSAGES.length - 1) {
          clearInterval(t);
          setTimeout(() => {
            setVisible(false);
            localStorage.setItem('kidsTutorialDone', '1');
            setDismissed(true);
          }, 2500);
          return i;
        }
        return i + 1;
      });
    }, 2800);
    return () => clearInterval(t);
  }, [visible, dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="absolute left-4 bottom-16 flex items-end gap-2 pointer-events-none"
      style={{ animation: 'fadeIn 0.4s ease' }}>
      <span className="text-5xl">🐰</span>
      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-lg max-w-48"
        style={{ border: '2px solid #86efac' }}>
        <p className="text-sm font-bold text-green-700 mb-0.5">{name}야!</p>
        <p className="text-sm text-gray-600">{MESSAGES[msgIdx]}</p>
      </div>
    </div>
  );
}
