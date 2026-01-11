import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { contentAPI, userAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import ContinueWatching from '../components/home/ContinueWatching';
import SkeletonLoader from '../components/common/SkeletonLoader';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
    if (isAuthenticated) {
      fetchWatchHistory();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    try {
      const [featuredRes, trendingRes, newRes, moviesRes, seriesRes] = await Promise.all([
        contentAPI.getAll({ featured: true, limit: 1 }),
        contentAPI.getAll({ trending: true, limit: 10 }),
        contentAPI.getAll({ newRelease: true, limit: 10 }),
        contentAPI.getAll({ type: 'movie', limit: 10 }),
        contentAPI.getAll({ type: 'series', limit: 10 }),
      ]);

      setFeatured(featuredRes.data.data[0]);
      setTrending(trendingRes.data.data);
      setNewReleases(newRes.data.data);
      setMovies(moviesRes.data.data);
      setSeries(seriesRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const fetchWatchHistory = async () => {
    try {
      const response = await userAPI.getProfile();
      setWatchHistory(response.data.data.watchHistory || []);
    } catch (error) {
      console.error('Error fetching watch history:', error);
    }
  };

  if (loading) {
    return (
      <div className="pt-16">
        <SkeletonLoader type="hero" />
        <div className="relative -mt-20 sm:-mt-32 z-10 space-y-8 sm:space-y-12 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse" />
            <SkeletonLoader type="card" count={5} />
          </div>
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse" />
            <SkeletonLoader type="card" count={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      {featured && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[60vh] sm:h-[70vh] md:h-screen"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={featured.banner}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-full sm:max-w-2xl"
              >
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-glow"
                >
                  {featured.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
                >
                  <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded glass-effect-strong glacier-glow text-glacier-400 font-semibold">
                    Featured
                  </span>
                  <span className="text-gray-300 text-xs sm:text-sm">{featured.releaseYear}</span>
                  <span className="text-gray-300 text-xs sm:text-sm hidden sm:inline">{featured.type === 'movie' ? `${featured.duration} min` : `${featured.seasons} Seasons`}</span>
                  <span className="px-2 py-1 rounded glass-effect text-xs">{featured.ageRating}</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3"
                >
                  {featured.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/watch/${featured._id}`)}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg bg-glacier-500 hover:bg-glacier-600 text-white font-semibold glacier-glow-strong transition-colors duration-300 text-sm sm:text-base"
                  >
                    <FiPlay className="text-lg sm:text-xl" />
                    <span>Play Now</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg glass-effect-strong hover:glacier-glow transition-all duration-300"
                  >
                    <FiInfo className="text-xl" />
                    <span>More Info</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Content Sections */}
      <div className="relative -mt-20 sm:-mt-32 z-10 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
        {isAuthenticated && watchHistory.length > 0 && (
          <ContinueWatching watchHistory={watchHistory} />
        )}
        <ContentRow title="Trending Now" items={trending} />
        <ContentRow title="New Releases" items={newReleases} />
        <ContentRow title="Popular Movies" items={movies} />
        <ContentRow title="TV Series" items={series} />
      </div>
    </div>
  );
};

const ContentRow = ({ title, items }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-glacier-400 text-glow">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card content={item} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Home;
