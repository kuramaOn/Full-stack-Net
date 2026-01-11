import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiUser, FiFilm, FiSettings, FiTrash2, FiEdit } from 'react-icons/fi';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLogs();
  }, [filter]);

  const loadLogs = () => {
    // Mock activity logs
    const mockLogs = [
      {
        id: 1,
        type: 'content',
        action: 'create',
        user: 'Admin User',
        description: 'Created new movie "Inception 2"',
        timestamp: new Date(Date.now() - 3600000),
        icon: FiFilm
      },
      {
        id: 2,
        type: 'user',
        action: 'update',
        user: 'Admin User',
        description: 'Updated user "john@example.com" role',
        timestamp: new Date(Date.now() - 7200000),
        icon: FiUser
      },
      {
        id: 3,
        type: 'content',
        action: 'delete',
        user: 'Admin User',
        description: 'Deleted movie "Old Movie"',
        timestamp: new Date(Date.now() - 10800000),
        icon: FiTrash2
      },
      {
        id: 4,
        type: 'content',
        action: 'update',
        user: 'Admin User',
        description: 'Updated movie "The Dark Knight" details',
        timestamp: new Date(Date.now() - 14400000),
        icon: FiEdit
      },
      {
        id: 5,
        type: 'settings',
        action: 'update',
        user: 'Admin User',
        description: 'Changed platform settings',
        timestamp: new Date(Date.now() - 18000000),
        icon: FiSettings
      },
      {
        id: 6,
        type: 'user',
        action: 'create',
        user: 'System',
        description: 'New user registered: jane@example.com',
        timestamp: new Date(Date.now() - 21600000),
        icon: FiUser
      }
    ];

    if (filter !== 'all') {
      setLogs(mockLogs.filter(log => log.type === filter));
    } else {
      setLogs(mockLogs);
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'create':
        return 'bg-green-500/20 text-green-400';
      case 'update':
        return 'bg-glacier-500/20 text-glacier-400';
      case 'delete':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
            Activity Logs
          </h1>
          <p className="text-gray-400 mt-2">Track all platform activities and changes</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'content', 'user', 'settings'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                filter === type
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Activities" value="1,247" color="from-glacier-500 to-glacier-600" />
        <StatCard title="Today" value="42" color="from-green-500 to-green-600" />
        <StatCard title="This Week" value="186" color="from-purple-500 to-purple-600" />
        <StatCard title="This Month" value="758" color="from-blue-500 to-blue-600" />
      </div>

      {/* Activity Timeline */}
      <div className="glass-effect-strong rounded-xl p-6">
        <h2 className="text-xl font-bold text-glacier-400 mb-6 flex items-center gap-2">
          <FiActivity />
          Recent Activity
        </h2>

        <div className="space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl glass-effect hover:glacier-glow transition-all duration-300"
            >
              {/* Icon */}
              <div className="p-3 rounded-lg glass-effect-strong">
                <log.icon className="text-xl text-glacier-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{log.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      by {log.user} • {formatTimestamp(log.timestamp)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {logs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No activity logs found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-effect-strong rounded-xl p-6"
    >
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </p>
    </motion.div>
  );
};

export default ActivityLogs;
