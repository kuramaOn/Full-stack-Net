import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiFilm, FiUsers, FiSettings, FiLogOut, FiBarChart2, FiUpload, FiCalendar, FiActivity, FiMenu } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { iconPresets, getGlowAnimation } from '../../utils/iconAnimations';

const AdminLayout = () => {
  const { logout, user } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FiHome },
    { name: 'Content', path: '/admin/content', icon: FiFilm },
    { name: 'Users', path: '/admin/users', icon: FiUsers },
    { name: 'Analytics', path: '/admin/analytics', icon: FiBarChart2 },
    { name: 'Bulk Operations', path: '/admin/bulk', icon: FiUpload },
    { name: 'Scheduler', path: '/admin/scheduler', icon: FiCalendar },
    { name: 'Activity Logs', path: '/admin/logs', icon: FiActivity },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-netflix-darkGray to-black overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative w-64 h-full glass-effect-strong border-r border-glacier-500/20 z-50 transition-transform duration-300 lg:transition-none`}
      >
        <div className="p-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent"
          >
            Admin Panel
          </motion.h1>
          <p className="text-sm text-ice-gray mt-1">Welcome, {user?.name}</p>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'glass-effect-strong glacier-glow text-glacier-400'
                      : 'text-gray-400 hover:text-glacier-400 hover:glass-effect'
                  }`
                }
              >
                <motion.div
                  {...iconPresets.sidebar}
                  className="relative"
                >
                  <item.icon className="text-xl relative z-10" />
                  {/* Animated glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 pointer-events-none"
                    {...getGlowAnimation('glacier')}
                  >
                    <item.icon className="text-xl text-glacier-400" />
                  </motion.div>
                </motion.div>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="absolute bottom-8 left-4 right-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:glass-effect transition-all duration-300 group"
          >
            <motion.div
              whileHover={{ 
                x: [-2, -5, -2],
                rotate: [0, -15, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <FiLogOut className="text-xl relative z-10" />
              {/* Red glow on hover */}
              <motion.div
                className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 pointer-events-none"
                {...getGlowAnimation('red')}
              >
                <FiLogOut className="text-xl text-red-400" />
              </motion.div>
            </motion.div>
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden glass-effect-strong p-4 flex items-center justify-between border-b border-glacier-500/20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg glass-effect"
          >
            <FiMenu className="text-xl text-glacier-400" />
          </motion.button>
          <h1 className="text-xl font-bold text-glacier-400">Admin Panel</h1>
          <div className="w-8" />
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
