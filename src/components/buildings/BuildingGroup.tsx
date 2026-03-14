import { BUILDINGS, type BuildingConfig } from '../../config/buildings';
import BuildingMesh from './BuildingMesh';

interface Props {
  onSelect: (b: BuildingConfig) => void;
}

export default function BuildingGroup({ onSelect }: Props) {
  return (
    <group>
      {BUILDINGS.map((b) => (
        <BuildingMesh key={b.id} building={b} onClick={onSelect} />
      ))}
    </group>
  );
}
