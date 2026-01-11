import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiStar, FiEdit, FiTrash2, FiDownload, FiUpload } from 'react-icons/fi';
import { iconPresets, getLoopAnimation, getAnimationDuration, getGlowAnimation } from '../utils/iconAnimations';

/**
 * Animation Showcase Component
 * Demonstrates all the icon animations implemented in the admin interface
 * This is a demo component to visualize the animation library
 */
const AnimationShowcase = () => {
  return (
    <div className="p-8 space-y-12 bg-gradient-to-br from-black via-netflix-darkGray to-black min-h-screen">
      <h1 className="text-4xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
        Icon Animation Showcase
      </h1>

      {/* Loop Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-glacier-400">Loop Animations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {['bounce', 'rotate', 'pulse', 'beat', 'breathe', 'swing', 'float'].map((animType) => (
            <div key={animType} className="glass-effect-strong rounded-xl p-6 text-center">
              <motion.div
                animate={getLoopAnimation(animType)}
                transition={{
                  duration: getAnimationDuration(animType),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-3"
              >
                <FiHeart className="text-4xl text-glacier-400 mx-auto" />
              </motion.div>
              <p className="text-sm text-gray-400 capitalize">{animType}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preset Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-glacier-400">Preset Animations (Hover Me)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <motion.div
            {...iconPresets.sidebar}
            className="glass-effect-strong rounded-xl p-6 text-center cursor-pointer"
          >
            <FiUser className="text-4xl text-glacier-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Sidebar</p>
          </motion.div>

          <motion.div
            {...iconPresets.action}
            className="glass-effect-strong rounded-xl p-6 text-center cursor-pointer"
          >
            <FiEdit className="text-4xl text-glacier-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Action</p>
          </motion.div>

          <motion.div
            {...iconPresets.statCard}
            className="glass-effect-strong rounded-xl p-6 text-center cursor-pointer"
          >
            <FiStar className="text-4xl text-glacier-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Stat Card</p>
          </motion.div>

          <motion.div
            {...iconPresets.tableIcon}
            className="glass-effect-strong rounded-xl p-6 text-center cursor-pointer"
          >
            <FiTrash2 className="text-4xl text-red-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Table Icon</p>
          </motion.div>
        </div>
      </section>

      {/* Glow Effects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-glacier-400">Glow Effects (Hover Me)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { color: 'glacier', label: 'Glacier', className: 'text-glacier-400' },
            { color: 'purple', label: 'Purple', className: 'text-purple-400' },
            { color: 'green', label: 'Green', className: 'text-green-400' },
            { color: 'red', label: 'Red', className: 'text-red-400' },
            { color: 'yellow', label: 'Yellow', className: 'text-yellow-400' },
            { color: 'blue', label: 'Blue', className: 'text-blue-400' }
          ].map((item) => (
            <div key={item.color} className="glass-effect-strong rounded-xl p-6 text-center group cursor-pointer">
              <div className="relative">
                <FiStar className={`text-4xl ${item.className} mx-auto mb-3 relative z-10`} />
                <motion.div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 pointer-events-none"
                  {...getGlowAnimation(item.color)}
                >
                  <FiStar className={`text-4xl ${item.className} mx-auto`} />
                </motion.div>
              </div>
              <p className="text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Combined Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-glacier-400">Real-World Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card Example */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-effect-strong rounded-xl p-6 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="p-3 rounded-lg bg-glacier-500/10 relative overflow-hidden"
                {...iconPresets.statCard}
              >
                <motion.div
                  animate={getLoopAnimation('pulse')}
                  transition={{
                    duration: getAnimationDuration('pulse'),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiUser className="text-2xl text-glacier-400 relative z-10" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 pointer-events-none"
                  {...getGlowAnimation('glacier')}
                >
                  <FiUser className="text-2xl text-glacier-400" />
                </motion.div>
              </motion.div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-white">1,234</p>
          </motion.div>

          {/* Action Button Example */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-effect-strong rounded-xl p-6 cursor-pointer hover:glacier-glow transition-all duration-300 group"
          >
            <motion.div
              animate={getLoopAnimation('float')}
              transition={{
                duration: getAnimationDuration('float'),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiUpload className="text-4xl text-glacier-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Import Data</h3>
            <p className="text-gray-400">Upload CSV to add content</p>
          </motion.div>

          {/* Table Actions Example */}
          <div className="glass-effect-strong rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Table Actions</h3>
            <div className="flex items-center justify-center gap-3">
              <motion.button
                {...iconPresets.action}
                className="p-3 rounded-lg glass-effect text-glacier-400 hover:glacier-glow transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <FiEdit className="text-xl" />
                </motion.div>
              </motion.button>
              <motion.button
                {...iconPresets.action}
                className="p-3 rounded-lg glass-effect text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <FiTrash2 className="text-xl" />
                </motion.div>
              </motion.button>
              <motion.button
                {...iconPresets.action}
                className="p-3 rounded-lg glass-effect text-green-400 hover:bg-green-500/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <FiDownload className="text-xl" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-gray-500 pt-8 pb-4">
        <p>All animations are powered by Framer Motion and the custom iconAnimations library</p>
        <p className="text-sm mt-2">✨ Hover over elements to see interactions</p>
      </div>
    </div>
  );
};

export default AnimationShowcase;
