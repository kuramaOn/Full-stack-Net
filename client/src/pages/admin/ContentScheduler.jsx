import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiPlay, FiPause } from 'react-icons/fi';
import { contentAPI } from '../../services/api';

const ContentScheduler = () => {
  const [scheduledContent, setScheduledContent] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    fetchContent();
    loadScheduledContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getAll({});
      setAllContent(response.data.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const loadScheduledContent = () => {
    // Mock scheduled content
    setScheduledContent([
      {
        id: 1,
        title: 'New Movie Release',
        contentId: '1',
        scheduledDate: '2024-01-20',
        scheduledTime: '12:00',
        status: 'pending',
        action: 'publish'
      },
      {
        id: 2,
        title: 'Featured Series',
        contentId: '2',
        scheduledDate: '2024-01-22',
        scheduledTime: '18:00',
        status: 'pending',
        action: 'feature'
      }
    ]);
  };

  const handleSchedule = (contentId, date, time, action) => {
    const newSchedule = {
      id: Date.now(),
      contentId,
      scheduledDate: date,
      scheduledTime: time,
      status: 'pending',
      action
    };
    setScheduledContent([...scheduledContent, newSchedule]);
    setShowScheduleModal(false);
  };

  const handleCancelSchedule = (id) => {
    setScheduledContent(scheduledContent.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
            Content Scheduler
          </h1>
          <p className="text-gray-400 mt-2">Schedule content releases and updates</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowScheduleModal(true)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold glacier-glow-strong"
        >
          <FiCalendar className="inline mr-2" />
          Schedule Content
        </motion.button>
      </div>

      {/* Calendar View */}
      <div className="glass-effect-strong rounded-xl p-6">
        <h2 className="text-xl font-bold text-glacier-400 mb-6">Upcoming Schedules</h2>
        <div className="space-y-4">
          {scheduledContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-xl p-4 hover:glacier-glow transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg glass-effect">
                    <FiCalendar className="text-2xl text-glacier-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="text-xs" />
                        {new Date(item.scheduledDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-xs" />
                        {item.scheduledTime}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.action === 'publish' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-glacier-500/20 text-glacier-400'
                      }`}>
                        {item.action}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    item.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {item.status}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCancelSchedule(item.id)}
                    className="p-2 rounded-lg glass-effect text-red-400 hover:bg-red-500/20"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {scheduledContent.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No scheduled content yet
            </div>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          content={allContent}
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedule}
        />
      )}
    </div>
  );
};

const ScheduleModal = ({ content, onClose, onSchedule }) => {
  const [selectedContent, setSelectedContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [action, setAction] = useState('publish');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(selectedContent, date, time, action);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect-strong rounded-2xl p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-glacier-400 mb-6">Schedule Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Content
            </label>
            <select
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none text-white"
              required
            >
              <option value="">Choose content...</option>
              {content.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none text-white"
            >
              <option value="publish">Publish</option>
              <option value="feature">Make Featured</option>
              <option value="trending">Make Trending</option>
              <option value="unpublish">Unpublish</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold"
            >
              Schedule
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg glass-effect text-gray-400"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContentScheduler;
