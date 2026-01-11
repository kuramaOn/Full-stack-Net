import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const NotificationDropdown = () => {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`);
      setNotifications(response.data.data);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`${API_URL}/notifications/read-all`);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    await handleMarkAsRead(notification._id);
    if (notification.link) {
      navigate(notification.link);
    }
    setShow(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_release': return '🎬';
      case 'comment': return '💬';
      case 'like': return '❤️';
      case 'follow': return '👤';
      case 'reply': return '↩️';
      case 'recommendation': return '⭐';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShow(!show)}
        className="relative p-2 rounded-full hover:glass-effect transition-all duration-300"
      >
        <FiBell className="text-xl text-glacier-400" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-96 glass-effect-strong rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-glacier-500/20 flex items-center justify-between">
              <h3 className="font-bold text-glacier-400">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-glacier-400 hover:text-glacier-300"
                  >
                    Mark all read
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShow(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX />
                </motion.button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <motion.div
                    key={notif._id}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-4 border-b border-glacier-500/10 cursor-pointer transition-colors ${
                      !notif.read ? 'bg-glacier-500/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="text-2xl">{getNotificationIcon(notif.type)}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-glacier-400 mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  No notifications
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
