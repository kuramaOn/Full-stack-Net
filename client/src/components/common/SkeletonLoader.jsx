import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(0);

  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative rounded-lg overflow-hidden glass-effect"
          >
            <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%]" />
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-shimmer bg-[length:200%_100%]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-4">
              <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-4 pt-4">
                <div className="h-12 w-32 bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-12 w-32 bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect-strong rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-3">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="h-16 glass-effect rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
