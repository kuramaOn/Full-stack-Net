import { motion } from 'framer-motion';
import { FiSave } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Configure platform settings</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect-strong rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-glacier-400 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              defaultValue="NetStream"
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              defaultValue="Your ultimate streaming destination"
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white h-24"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold glacier-glow-strong"
        >
          <FiSave />
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings;
