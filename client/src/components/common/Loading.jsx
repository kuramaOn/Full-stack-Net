import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false }) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/90 z-50'
    : 'flex items-center justify-center py-20';

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full border-4 border-transparent border-t-glacier-500 border-r-glacier-400"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-glacier-300 border-l-glacier-200"
        />
        
        {/* Center Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-4 rounded-full bg-glacier-500/30 blur-xl"
        />
      </div>
      
      {fullScreen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute mt-32 text-glacier-400 text-lg font-medium"
        >
          Loading...
        </motion.p>
      )}
    </div>
  );
};

export default Loading;
