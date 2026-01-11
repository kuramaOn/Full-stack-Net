import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiPlus, FiCheck, FiStar } from 'react-icons/fi';
import { contentAPI, userAPI } from '../services/api';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../store/authStore';
import AdvancedVideoPlayer from '../components/video/AdvancedVideoPlayer';
import CommentsSection from '../components/content/CommentsSection';
import AnimatedStarRating from '../components/common/AnimatedStarRating';
import { showToast } from '../components/common/Toast';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchContent();
  }, [id, isAuthenticated]);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getById(id);
      const data = response.data.data;
      setContent(data);
      
      // Get user data if authenticated
      if (isAuthenticated) {
        const profileRes = await userAPI.getProfile();
        const profileData = profileRes.data.data;
        
        // Check if in favorites
        setIsFavorite(profileData.favorites?.some(fav => fav._id === id || fav === id) || false);
        
        // Check if in watchlist
        setIsInWatchlist(profileData.watchlist?.some(item => item._id === id || item === id) || false);
        
        // Get user rating
        const userRatingData = profileData.ratings?.find(r => r.contentId === id);
        if (userRatingData) {
          setUserRating(userRatingData.rating);
        }
        
        // Get watch progress
        const history = profileData.watchHistory?.find(
          h => h.contentId?._id === id || h.contentId === id
        );
        if (history) {
          setProgress(history.progress || 0);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const handleProgress = async (progress) => {
    setProgress(progress);
    if (isAuthenticated) {
      try {
        await userAPI.addToHistory(id, progress);
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await userAPI.toggleFavorite(id);
      setIsFavorite(!isFavorite);
      showToast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        'success'
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('Failed to update favorites', 'error');
    }
  };

  const handleWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await userAPI.toggleWatchlist(id);
      setIsInWatchlist(!isInWatchlist);
      showToast(
        isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist',
        'success'
      );
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      showToast('Failed to update watchlist', 'error');
    }
  };

  const handleRate = async (rating) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await userAPI.rateContent(id, rating);
      setUserRating(rating);
      setShowRating(false);
      showToast(`Rated ${rating} stars!`, 'success');
    } catch (error) {
      console.error('Error rating content:', error);
      showToast('Failed to rate content', 'error');
    }
  };

  if (loading) return <Loading fullScreen />;
  if (!content) return <div className="pt-20 text-center">Content not found</div>;

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen bg-black">
        <AdvancedVideoPlayer
          url={content.videoUrl}
          onProgress={handleProgress}
          initialProgress={progress}
        />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 sm:p-3 rounded-full glass-effect-strong glacier-glow z-50"
        >
          <FiArrowLeft className="text-xl sm:text-2xl text-glacier-400" />
        </motion.button>
      </div>

      {/* Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-glow mb-3 sm:mb-4">{content.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  <span className="text-lg font-semibold">{content.rating.average.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">({content.rating.count} ratings)</span>
                </div>
                <span className="text-gray-400">{content.releaseYear}</span>
                <span className="text-gray-400">
                  {content.type === 'movie' ? `${content.duration} min` : `${content.seasons} Seasons`}
                </span>
                <span className="px-3 py-1 rounded glass-effect text-sm">{content.ageRating}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isFavorite
                      ? 'glass-effect-strong glacier-glow text-glacier-400'
                      : 'glass-effect text-gray-400 hover:text-glacier-400'
                  }`}
                >
                  <FiHeart className={isFavorite ? 'fill-current' : ''} />
                  <span>{isFavorite ? 'Liked' : 'Like'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlist}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isInWatchlist
                      ? 'glass-effect-strong glacier-glow text-glacier-400'
                      : 'glass-effect text-gray-400 hover:text-glacier-400'
                  }`}
                >
                  {isInWatchlist ? <FiCheck /> : <FiPlus />}
                  <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </motion.button>

                <div className="flex flex-col">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRating(!showRating)}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg glass-effect text-gray-400 hover:text-glacier-400 transition-all duration-300"
                  >
                    <span>{userRating > 0 ? `Your Rating: ${userRating}★` : 'Rate This'}</span>
                  </motion.button>
                </div>
              </div>

              {/* Animated Rating Options */}
              {showRating && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6"
                >
                  <AnimatedStarRating
                    rating={userRating}
                    onRate={handleRate}
                    size="lg"
                  />
                </motion.div>
              )}

              <p className="text-gray-300 text-lg leading-relaxed">{content.description}</p>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-glacier-400 font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {content.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-2 rounded-full glass-effect text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Cast */}
            {content.cast && content.cast.length > 0 && (
              <div>
                <h3 className="text-glacier-400 font-semibold mb-3">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.cast.slice(0, 6).map((actor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-effect rounded-lg p-3"
                    >
                      <p className="font-semibold text-white">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect-strong rounded-xl p-6"
            >
              <h3 className="text-glacier-400 font-semibold mb-4">Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Director:</span>
                  <p className="text-white mt-1">{content.director}</p>
                </div>
                <div>
                  <span className="text-gray-400">Language:</span>
                  <p className="text-white mt-1">{content.language.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Views:</span>
                  <p className="text-white mt-1">{content.views.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CommentsSection contentId={id} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
