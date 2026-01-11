import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const AnimatedStarRating = ({ rating, onRate, readOnly = false, size = 'md' }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const handleClick = (star) => {
    if (!readOnly && onRate) {
      onRate(star);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const isActive = hoveredStar ? star <= hoveredStar : star <= rating;

        return (
          <motion.button
            key={star}
            disabled={readOnly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHoveredStar(star)}
            onMouseLeave={() => !readOnly && setHoveredStar(0)}
            whileHover={!readOnly ? { scale: 1.3, rotate: 15 } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
            className={`${
              readOnly ? 'cursor-default' : 'cursor-pointer'
            } transition-all duration-200`}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.9,
                rotate: isActive ? [0, -10, 10, -10, 0] : 0,
              }}
              transition={{
                rotate: { duration: 0.5 },
                scale: { duration: 0.2 },
              }}
            >
              <FiStar
                className={`${sizeClasses[size]} transition-all duration-200 ${
                  isActive
                    ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                    : 'text-gray-600'
                }`}
              />
            </motion.div>
          </motion.button>
        );
      })}
      {!readOnly && hoveredStar > 0 && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-2 text-sm text-glacier-400 font-medium"
        >
          {hoveredStar} {hoveredStar === 1 ? 'star' : 'stars'}
        </motion.span>
      )}
    </div>
  );
};

export default AnimatedStarRating;
