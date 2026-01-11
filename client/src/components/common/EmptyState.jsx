import { motion } from 'framer-motion';
import { FiFilm, FiHeart, FiList, FiSearch, FiInbox } from 'react-icons/fi';

const EmptyState = ({ type = 'default', title, message, action }) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return FiSearch;
      case 'favorites':
        return FiHeart;
      case 'watchlist':
        return FiList;
      case 'content':
        return FiFilm;
      case 'inbox':
        return FiInbox;
      default:
        return FiInbox;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
        transition={{
          scale: { duration: 0.5, type: 'spring' },
          rotate: { duration: 1, delay: 0.5 },
        }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full glass-effect-strong flex items-center justify-center glacier-glow">
          <Icon className="text-5xl text-glacier-400" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-white mb-2"
      >
        {title || 'Nothing here yet'}
      </motion.h3>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 max-w-md mb-6"
      >
        {message || "It looks empty here. Let's change that!"}
      </motion.p>

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-glacier-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-glacier-500/10 blur-3xl"
        />
      </div>
    </motion.div>
  );
};

export default EmptyState;
