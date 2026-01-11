import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ContinueWatching = ({ watchHistory }) => {
  const navigate = useNavigate();

  if (!watchHistory || watchHistory.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-glacier-400 text-glow">Continue Watching</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {watchHistory.slice(0, 5).map((item, index) => {
          const content = item.contentId;
          if (!content) return null;

          return (
            <motion.div
              key={content._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/watch/${content._id}`)}
              className="cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden glass-effect group">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.progress || 0) * 100}%` }}
                    className="h-full bg-glacier-500"
                  />
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 rounded-full glass-effect-strong flex items-center justify-center"
                  >
                    <FiPlay className="text-3xl text-glacier-400 ml-1" />
                  </motion.div>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-0 right-0 px-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">
                    {content.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {Math.round((item.progress || 0) * 100)}% watched
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ContinueWatching;
