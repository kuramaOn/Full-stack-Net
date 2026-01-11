import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import { iconPresets } from '../../utils/iconAnimations';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers({});
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await adminAPI.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-gray-400 mt-2">Manage platform users</p>
      </div>

      <div className="relative">
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-glacier-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiSearch />
        </motion.div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white placeholder-gray-500"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect-strong rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-glacier-500/20">
              <tr>
                <th className="text-left p-4 text-glacier-400 font-semibold">User</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Role</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Plan</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Status</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Joined</th>
                <th className="text-right p-4 text-glacier-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-glacier-500/10 hover:glass-effect transition-all duration-300"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-glacier-500/20 text-glacier-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 capitalize">{user.subscription?.plan || 'basic'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        {...iconPresets.action}
                        className="p-2 rounded-lg glass-effect text-glacier-400 hover:glacier-glow transition-all duration-300 group"
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ rotate: [0, -15, 15, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <FiEdit className="relative z-10" />
                        </motion.div>
                      </motion.button>
                      <motion.button
                        {...iconPresets.action}
                        onClick={() => handleDelete(user._id)}
                        className="p-2 rounded-lg glass-effect text-red-400 hover:bg-red-500/20 transition-all duration-300 group"
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <FiTrash2 className="relative z-10" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Users;
