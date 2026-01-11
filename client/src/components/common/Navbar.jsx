import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiLogOut, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'Search', path: '/search' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-effect-strong shadow-xl shadow-glacier-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 via-glacier-500 to-glacier-600 bg-clip-text text-transparent">
                NetStream
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-glacier-400 text-glow'
                      : 'text-gray-300 hover:text-glacier-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:glass-effect transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <FiX className="text-xl text-glacier-400" />
              ) : (
                <FiMenu className="text-xl text-glacier-400" />
              )}
            </motion.button>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/search')}
              className="hidden sm:block p-2 rounded-full hover:glass-effect transition-all duration-300"
            >
              <FiSearch className="text-xl text-glacier-400" />
            </motion.button>

            {isAuthenticated && <div className="hidden sm:block"><NotificationDropdown /></div>}

            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden glass-effect glacier-glow"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 glass-effect-strong rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-glacier-500/20">
                        <p className="font-medium text-glacier-400">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>

                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:glass-effect transition-all duration-300"
                        >
                          <FiUser />
                          <span>Profile</span>
                        </Link>

                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2 hover:glass-effect transition-all duration-300"
                          >
                            <FiSettings />
                            <span>Admin Panel</span>
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:glass-effect transition-all duration-300"
                        >
                          <FiLogOut />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-full glass-effect-strong glacier-glow text-glacier-400 font-medium hover:bg-glacier-500/20 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-glacier-500/20"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Nav Links */}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'glass-effect-strong glacier-glow text-glacier-400'
                          : 'text-gray-300 hover:glass-effect'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Mobile User Info */}
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-glacier-500/20 space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-glacier-400">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:glass-effect transition-all duration-300"
                    >
                      <FiUser />
                      <span>Profile</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:glass-effect transition-all duration-300"
                      >
                        <FiSettings />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-400 hover:glass-effect transition-all duration-300"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 rounded-lg glass-effect-strong glacier-glow text-center text-glacier-400 font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
