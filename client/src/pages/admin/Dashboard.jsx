import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFilm, FiTrendingUp, FiEye, FiHeart, FiStar } from 'react-icons/fi';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import { iconPresets, getLoopAnimation, getAnimationDuration, getGlowAnimation } from '../../utils/iconAnimations';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;
  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.overview.totalUsers,
      icon: FiUsers,
      color: 'from-glacier-500 to-glacier-600',
      bgColor: 'bg-glacier-500/10',
      animation: 'bounce',
    },
    {
      title: 'Total Content',
      value: stats.overview.totalContent,
      icon: FiFilm,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      animation: 'rotate',
    },
    {
      title: 'Total Views',
      value: stats.contentStats.totalViews?.toLocaleString() || 0,
      icon: FiEye,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      animation: 'pulse',
    },
    {
      title: 'Total Likes',
      value: stats.contentStats.totalLikes?.toLocaleString() || 0,
      icon: FiHeart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      animation: 'beat',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Overview of your platform analytics</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          // Get the color name from the gradient classes for glow
          const glowColorMap = {
            'from-glacier-500': 'glacier',
            'from-purple-500': 'purple',
            'from-green-500': 'green',
            'from-red-500': 'red'
          };
          const glowColor = glowColorMap[stat.color.split(' ')[0]] || 'glacier';

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect-strong rounded-xl p-6 hover:glacier-glow transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`p-3 rounded-lg ${stat.bgColor} relative overflow-hidden`}
                  {...iconPresets.statCard}
                >
                  {/* Animated icon with loop animation */}
                  <motion.div
                    animate={getLoopAnimation(stat.animation)}
                    transition={{
                      duration: getAnimationDuration(stat.animation),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`} />
                  </motion.div>
                  {/* Enhanced glow effect with color-matched animation */}
                  <motion.div
                    className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 pointer-events-none"
                    {...getGlowAnimation(glowColor)}
                  >
                    <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </motion.div>
                </motion.div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              {/* Animated value with spring effect */}
              <motion.p
                className="text-3xl font-bold text-white"
                key={stat.value}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect-strong rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-glacier-400 mb-4 flex items-center gap-2">
            <FiStar />
            Top Rated Content
          </h2>
          <div className="space-y-3">
            {stats.topRated?.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg glass-effect hover:glacier-glow transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-glacier-400">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400 capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span className="font-semibold">{item.rating.average.toFixed(1)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Most Viewed Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect-strong rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-glacier-400 mb-4 flex items-center gap-2">
            <FiTrendingUp />
            Most Viewed Content
          </h2>
          <div className="space-y-3">
            {stats.mostViewed?.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg glass-effect hover:glacier-glow transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-glacier-400">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400 capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FiEye className="text-glacier-400" />
                  <span className="font-semibold">{item.views.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Genre Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect-strong rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-glacier-400 mb-4">Genre Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.genreStats?.map((genre, index) => (
            <motion.div
              key={genre._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="p-4 rounded-lg glass-effect text-center hover:glacier-glow transition-all duration-300"
            >
              <p className="font-semibold text-white mb-1">{genre._id}</p>
              <p className="text-2xl font-bold text-glacier-400">{genre.count}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-effect-strong rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-glacier-400 mb-4">Recent Users</h2>
        <div className="space-y-3">
          {stats.recentUsers?.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg glass-effect hover:glacier-glow transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  user.role === 'admin' ? 'bg-glacier-500/20 text-glacier-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {user.role}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
