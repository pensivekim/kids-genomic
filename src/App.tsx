import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useIsLowEndDevice } from './hooks/useDeviceType';
import LoadingScreen from './components/ui/LoadingScreen';
import FlatWorldMap from './components/ui/FlatWorldMap';

const WorldScene = lazy(() => import('./components/world/WorldScene'));
const HangulPage = lazy(() => import('./pages/hangul/HangulPage'));
const StoryPage = lazy(() => import('./pages/story/StoryPage'));
const EnglishPage = lazy(() => import('./pages/english/EnglishPage'));
const MusicPage = lazy(() => import('./pages/music/MusicPage'));
const ArtPage = lazy(() => import('./pages/art/ArtPage'));
const SciencePage = lazy(() => import('./pages/science/SciencePage'));
const CreativePage = lazy(() => import('./pages/creative/CreativePage'));
const EmotionPage = lazy(() => import('./pages/emotion/EmotionPage'));

function World() {
  const isLowEnd = useIsLowEndDevice();
  if (isLowEnd) return <FlatWorldMap />;
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<LoadingScreen />}>
        <WorldScene />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<World />} />
          <Route path="/hangul" element={<HangulPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/creative" element={<CreativePage />} />
          <Route path="/emotion" element={<EmotionPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
