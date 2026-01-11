import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiList, FiClock, FiEdit } from 'react-icons/fi';
import { userAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import ProfileEditModal from '../components/profile/ProfileEditModal';

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('favorites');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const tabs = [
    { id: 'favorites', label: 'Favorites', icon: FiHeart },
    { id: 'watchlist', label: 'Watchlist', icon: FiList },
    { id: 'history', label: 'Watch History', icon: FiClock },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect-strong rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-full overflow-hidden glass-effect glacier-glow"
              >
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-glow mb-2">{user?.name}</h1>
                <p className="text-gray-400">{user?.email}</p>
                {user?.bio && (
                  <p className="text-gray-300 mt-2 max-w-md">{user.bio}</p>
                )}
                <div className="flex items-center gap-4 mt-3">
                  <span className="px-3 py-1 rounded-full glass-effect text-sm text-glacier-400">
                    {user?.role === 'admin' ? 'Admin' : 'Member'}
                  </span>
                  <span className="px-3 py-1 rounded-full glass-effect text-sm text-glacier-400">
                    {profile?.subscription?.plan || 'Basic'} Plan
                  </span>
                </div>
                {user?.preferences?.favoriteGenres && user.preferences.favoriteGenres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.preferences.favoriteGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 rounded-full glass-effect text-xs text-glacier-400"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg glass-effect-strong hover:glacier-glow text-glacier-400 transition-all duration-300 font-semibold"
            >
              <FiEdit />
              <span>Edit Profile</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === 'favorites' && (
            <ContentGrid
              items={profile?.favorites || []}
              emptyMessage="No favorites yet"
              onUpdate={fetchProfile}
            />
          )}
          {activeTab === 'watchlist' && (
            <ContentGrid
              items={profile?.watchlist || []}
              emptyMessage="Your watchlist is empty"
              onUpdate={fetchProfile}
            />
          )}
          {activeTab === 'history' && (
            <ContentGrid
              items={profile?.watchHistory?.map(h => h.contentId) || []}
              emptyMessage="No watch history"
              onUpdate={fetchProfile}
            />
          )}
        </motion.div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={fetchProfile}
      />
    </div>
  );
};

const ContentGrid = ({ items, emptyMessage, onUpdate }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card content={item} onUpdate={onUpdate} />
        </motion.div>
      ))}
    </div>
  );
};

export default Profile;
