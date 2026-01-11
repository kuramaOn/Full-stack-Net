import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileEditModal from '../components/profile/ProfileEditModal';

/**
 * Profile Edit Feature Demo
 * Demonstrates the profile editing modal with sample data
 */
const ProfileEditDemo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-netflix-darkGray to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent mb-8">
          Profile Edit Feature Demo
        </h1>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect-strong rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-glacier-400 mb-4">✨ Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Change profile picture (URL)</li>
              <li>✅ Edit name</li>
              <li>✅ Write bio (500 char limit)</li>
              <li>✅ Select favorite genres (max 5)</li>
              <li>✅ Real-time validation</li>
              <li>✅ Beautiful animations</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect-strong rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-glacier-400 mb-4">🎨 UI Highlights</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Glassmorphism design</li>
              <li>✅ Backdrop blur effect</li>
              <li>✅ Character counter</li>
              <li>✅ Genre selection chips</li>
              <li>✅ Loading states</li>
              <li>✅ Toast notifications</li>
            </ul>
          </motion.div>
        </div>

        {/* Demo Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-bold text-lg glacier-glow-strong"
          >
            Open Profile Edit Modal
          </motion.button>
        </div>

        {/* Sample Avatar URLs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-effect-strong rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-glacier-400 mb-4">📸 Sample Avatar URLs</h3>
          <div className="space-y-2 text-sm text-gray-300 font-mono">
            <p>https://i.pravatar.cc/150?img=1</p>
            <p>https://i.pravatar.cc/150?img=12</p>
            <p>https://ui-avatars.com/api/?name=John+Doe&background=random</p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-effect-strong rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-glacier-400 mb-4">📝 How to Use</h3>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Click "Open Profile Edit Modal" button above</li>
            <li>Try entering a new avatar URL</li>
            <li>Edit your name</li>
            <li>Write a bio (watch the character counter)</li>
            <li>Select up to 5 favorite genres</li>
            <li>Click "Save Changes" to update</li>
          </ol>
        </motion.div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={() => console.log('Profile updated!')}
      />
    </div>
  );
};

export default ProfileEditDemo;
