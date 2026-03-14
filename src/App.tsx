import { Suspense, lazy } from 'react';
import { useIsLowEndDevice } from './hooks/useDeviceType';
import LoadingScreen from './components/ui/LoadingScreen';
import FlatWorldMap from './components/ui/FlatWorldMap';

const WorldScene = lazy(() => import('./components/world/WorldScene'));

export default function App() {
  const isLowEnd = useIsLowEndDevice();

  if (isLowEnd) {
    return <FlatWorldMap />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<LoadingScreen />}>
        <WorldScene />
      </Suspense>
    </div>
  );
}
