import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const WorldScene   = lazy(() => import('./components/world/WorldScene'));
const HangulPage   = lazy(() => import('./pages/hangul/HangulPage'));
const StoryPage    = lazy(() => import('./pages/story/StoryPage'));
const EnglishPage  = lazy(() => import('./pages/english/EnglishPage'));
const MusicPage    = lazy(() => import('./pages/music/MusicPage'));
const ArtPage      = lazy(() => import('./pages/art/ArtPage'));
const SciencePage  = lazy(() => import('./pages/science/SciencePage'));
const CreativePage = lazy(() => import('./pages/creative/CreativePage'));
const EmotionPage  = lazy(() => import('./pages/emotion/EmotionPage'));

function Loading() {
  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #7dd3fc 0%, #bbf7d0 100%)',
      fontFamily: "'Jua', sans-serif",
      gap: 16,
    }}>
      <span style={{ fontSize: 64, animation: 'bounce 1s infinite' }}>🌳</span>
      <p style={{ fontSize: 20, color: '#166534', fontWeight: 700 }}>잠깐만요...</p>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/"        element={<WorldScene />} />
          <Route path="/hangul"  element={<HangulPage />} />
          <Route path="/story"   element={<StoryPage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/music"   element={<MusicPage />} />
          <Route path="/art"     element={<ArtPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/creative" element={<CreativePage />} />
          <Route path="/emotion" element={<EmotionPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
