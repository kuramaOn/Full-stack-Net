import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiEdit2, FiImage, FiCheck } from 'react-icons/fi';
import { userAPI } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../common/Toast';

const ProfileEditModal = ({ isOpen, onClose, onUpdate }) => {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    bio: '',
    favoriteGenres: []
  });
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [bioCharCount, setBioCharCount] = useState(0);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 
    'Crime', 'Documentary', 'Drama', 'Fantasy', 'History', 
    'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 
    'Sport', 'Thriller', 'War', 'Western'
  ];

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        avatar: user.avatar || '',
        bio: user.bio || '',
        favoriteGenres: user.preferences?.favoriteGenres || []
      });
      setAvatarPreview(user.avatar || '');
      setBioCharCount((user.bio || '').length);
    }
  }, [isOpen, user]);

  const handleAvatarChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, avatar: url });
    setAvatarPreview(url);
  };

  const handleBioChange = (e) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setFormData({ ...formData, bio: text });
      setBioCharCount(text.length);
    }
  };

  const toggleGenre = (genre) => {
    const currentGenres = formData.favoriteGenres;
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    setFormData({ ...formData, favoriteGenres: newGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        avatar: formData.avatar || user.avatar,
        bio: formData.bio,
        preferences: {
          favoriteGenres: formData.favoriteGenres
        }
      };

      const response = await userAPI.updateProfile(updateData);
      
      // Update local user state
      setUser({ ...user, ...response.data.data });
      
      showToast('Profile updated successfully!', 'success');
      onUpdate?.();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect-strong rounded-2xl shadow-2xl glacier-glow"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 glass-effect-strong border-b border-glacier-500/20 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass-effect">
                <FiEdit2 className="text-2xl text-glacier-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
                  Edit Profile
                </h2>
                <p className="text-sm text-gray-400">Update your personal information</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg glass-effect hover:glacier-glow transition-all duration-300"
            >
              <FiX className="text-xl text-glacier-400" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-glacier-400 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-6">
                {/* Avatar Preview */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-24 h-24 rounded-full overflow-hidden glass-effect glacier-glow"
                >
                  <img
                    src={avatarPreview || 'https://ui-avatars.com/api/?name=User&background=random'}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=User&background=random';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FiImage className="text-2xl text-white" />
                  </div>
                </motion.div>

                {/* Avatar URL Input */}
                <div className="flex-1">
                  <div className="relative">
                    <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-glacier-400" />
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={handleAvatarChange}
                      placeholder="Enter avatar URL"
                      className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white placeholder-gray-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Or use a URL like: https://i.pravatar.cc/150?img=1
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-glacier-400 mb-2">
                Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-glacier-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white placeholder-gray-500"
                />
              </div>
            </motion.div>

            {/* Bio Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-glacier-400 mb-2">
                Bio
                <span className="text-gray-500 text-xs ml-2">
                  ({bioCharCount}/500 characters)
                </span>
              </label>
              <textarea
                value={formData.bio}
                onChange={handleBioChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white placeholder-gray-500 resize-none"
              />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">Share your interests, favorite genres, etc.</p>
                <div className={`text-xs font-medium ${bioCharCount > 450 ? 'text-yellow-400' : 'text-gray-500'}`}>
                  {500 - bioCharCount} remaining
                </div>
              </div>
            </motion.div>

            {/* Favorite Genres */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-glacier-400 mb-3">
                Favorite Genres
                <span className="text-gray-500 text-xs ml-2">
                  (Select up to 5)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => {
                  const isSelected = formData.favoriteGenres.includes(genre);
                  const isDisabled = !isSelected && formData.favoriteGenres.length >= 5;

                  return (
                    <motion.button
                      key={genre}
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.02 }}
                      whileHover={!isDisabled ? { scale: 1.05 } : {}}
                      whileTap={!isDisabled ? { scale: 0.95 } : {}}
                      onClick={() => !isDisabled && toggleGenre(genre)}
                      disabled={isDisabled}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? 'glass-effect-strong glacier-glow text-glacier-400'
                          : isDisabled
                          ? 'glass-effect text-gray-600 cursor-not-allowed'
                          : 'glass-effect text-gray-400 hover:text-glacier-400 hover:glacier-glow'
                      }`}
                    >
                      {isSelected && <FiCheck className="text-sm" />}
                      <span className="text-sm">{genre}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 pt-4 border-t border-glacier-500/20"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-lg glass-effect text-gray-400 hover:text-white hover:glacier-glow transition-all duration-300 font-semibold"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 hover:from-glacier-600 hover:to-glacier-700 text-white font-semibold glacier-glow-strong disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiCheck />
                    Save Changes
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileEditModal;
