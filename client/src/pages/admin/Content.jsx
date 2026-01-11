import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import { contentAPI } from '../../services/api';
import Loading from '../../components/common/Loading';
import { iconPresets } from '../../utils/iconAnimations';

const Content = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContentList();
  }, [searchQuery, filterType, content]);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getAll({});
      setContent(response.data.data);
      setFilteredContent(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const filterContentList = () => {
    let filtered = [...content];

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await contentAPI.delete(id);
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingContent(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingContent(null);
    setShowModal(true);
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
            Content Management
          </h1>
          <p className="text-gray-400 mt-2">Manage movies and TV series</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold glacier-glow-strong"
        >
          <motion.div
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiPlus />
          </motion.div>
          Add Content
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
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
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white placeholder-gray-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'movie', 'series'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize ${
                filterType === type
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect-strong rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-glacier-500/20">
              <tr>
                <th className="text-left p-4 text-glacier-400 font-semibold">Title</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Type</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Year</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Rating</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Views</th>
                <th className="text-left p-4 text-glacier-400 font-semibold">Status</th>
                <th className="text-right p-4 text-glacier-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-glacier-500/10 hover:glass-effect transition-all duration-300"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.genres.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full glass-effect text-sm capitalize">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{item.releaseYear}</td>
                  <td className="p-4 text-gray-300">{item.rating.average.toFixed(1)} ⭐</td>
                  <td className="p-4 text-gray-300">{item.views.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        {...iconPresets.action}
                        onClick={() => handleEdit(item)}
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
                        onClick={() => handleDelete(item._id)}
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

        {filteredContent.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No content found
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <ContentModal
            content={editingContent}
            onClose={() => setShowModal(false)}
            onSave={() => {
              setShowModal(false);
              fetchContent();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentModal = ({ content, onClose, onSave }) => {
  const [formData, setFormData] = useState(content || {
    title: '',
    description: '',
    type: 'movie',
    genres: [],
    releaseYear: new Date().getFullYear(),
    duration: 0,
    seasons: 0,
    episodes: 0,
    ageRating: 'PG-13',
    director: '',
    language: 'en',
    thumbnail: '',
    banner: '',
    videoUrl: '',
    featured: false,
    trending: false,
    newRelease: false,
    status: 'active',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (content) {
        await contentAPI.update(content._id, formData);
      } else {
        await contentAPI.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect-strong rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glacier-400">
            {content ? 'Edit Content' : 'Add New Content'}
          </h2>
          <button onClick={onClose} className="p-2 hover:glass-effect rounded-lg">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
            
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white"
            >
              <option value="movie">Movie</option>
              <option value="series">TV Series</option>
            </select>
          </div>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500 h-24"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Release Year"
              value={formData.releaseYear}
              onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
              className="px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Director"
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              className="px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="col-span-3 px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Banner URL"
              value={formData.banner}
              onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
              className="col-span-3 px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Video URL"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="col-span-3 px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold glacier-glow-strong"
            >
              {content ? 'Update' : 'Create'}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg glass-effect text-gray-400 hover:text-white"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Content;
