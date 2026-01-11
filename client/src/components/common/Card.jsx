import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPlus, FiCheck, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

const Card = ({ content, onUpdate }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await userAPI.toggleWatchlist(content._id);
      setIsInWatchlist(!isInWatchlist);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  const handlePlay = () => {
    navigate(`/watch/${content._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
      className="relative group cursor-pointer"
      onClick={handlePlay}
    >
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden glass-effect">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex gap-1 sm:gap-2">
          {content.featured && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded glass-effect-strong glacier-glow text-glacier-400">
              Featured
            </span>
          )}
          {content.newRelease && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded glass-effect-strong text-green-400">
              New
            </span>
          )}
          {content.trending && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded glass-effect-strong text-yellow-400">
              Trending
            </span>
          )}
        </div>

        {/* Hover Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 space-y-2"
            >
              <h3 className="text-lg font-bold text-glacier-400 text-glow line-clamp-1">
                {content.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span>{content.rating.average.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">{content.releaseYear}</span>
                <span className="px-2 py-0.5 text-xs rounded glass-effect">
                  {content.ageRating}
                </span>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2">
                {content.description}
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glacier-500 hover:bg-glacier-600 text-white font-semibold transition-colors duration-300"
                >
                  <FiPlay />
                  <span>Play</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlist}
                  className="p-2 rounded-lg glass-effect-strong hover:glacier-glow transition-all duration-300"
                >
                  {isInWatchlist ? <FiCheck className="text-glacier-400" /> : <FiPlus className="text-glacier-400" />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Card;
