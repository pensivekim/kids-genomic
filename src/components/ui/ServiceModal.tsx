import { type BuildingConfig } from '../../config/buildings';

interface Props {
  building: BuildingConfig | null;
  onClose: () => void;
}

export default function ServiceModal({ building, onClose }: Props) {
  if (!building) return null;

  function handleGo() {
    if (building?.serviceUrl) {
      window.open(building.serviceUrl, '_blank');
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-3">{building.icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{building.name}</h2>
        <p className="text-gray-500 mb-6">{building.subtitle}</p>

        {building.status === 'live' ? (
          <button
            onClick={handleGo}
            className="w-full py-3 px-6 rounded-2xl text-white font-bold text-lg transition-transform active:scale-95"
            style={{ backgroundColor: building.roofColor }}
          >
            입장하기!
          </button>
        ) : (
          <div className="py-3 px-6 rounded-2xl bg-gray-100 text-gray-400 font-bold text-lg">
            곧 열려요! 기대해 주세요 🎉
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 text-sm underline"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
