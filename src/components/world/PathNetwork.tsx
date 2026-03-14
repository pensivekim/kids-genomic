import { BUILDINGS } from '../../config/buildings';

// 두 점 사이 경로 세그먼트 계산
function PathSegment({ from, to }: {
  from: [number, number, number];
  to: [number, number, number];
}) {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const midX = (from[0] + to[0]) / 2;
  const midZ = (from[2] + to[2]) / 2;

  return (
    <mesh position={[midX, 0.01, midZ]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.22, 0.04, length]} />
      <meshToonMaterial color="#e5d4b0" />
    </mesh>
  );
}

const CENTER: [number, number, number] = [0, 0, 0];

export default function PathNetwork() {
  return (
    <group>
      {BUILDINGS.map((b) => (
        <PathSegment key={b.id} from={CENTER} to={b.position} />
      ))}
    </group>
  );
}
