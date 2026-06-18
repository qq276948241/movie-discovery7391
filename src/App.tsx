import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CurtainTransition from '@/components/common/CurtainTransition';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import PlaylistsPage from '@/pages/PlaylistsPage';
import DiscoverPage from '@/pages/DiscoverPage';
import RankingPage from '@/pages/RankingPage';
import ProfilePage from '@/pages/ProfilePage';

function App() {
  return (
    <div className="min-h-screen bg-cinema-charcoal-900 text-cinema-cream font-body relative">
      <div className="grain-overlay" />
      <Navbar />
      <CurtainTransition />
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/mood/:moodId" element={<DiscoverPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
