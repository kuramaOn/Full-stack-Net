import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contentAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

const Browse = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeGenre, setActiveGenre] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'movie', label: 'Movies' },
    { id: 'series', label: 'TV Series' },
  ];

  const genres = [
    'all', 'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 
    'Fantasy', 'Horror', 'Sci-Fi', 'Thriller', 'Biography', 'History'
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [activeFilter, activeGenre, content]);

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

  const filterContent = () => {
    let filtered = [...content];

    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === activeFilter);
    }

    if (activeGenre !== 'all') {
      filtered = filtered.filter(item => item.genres.includes(activeGenre));
    }

    setFilteredContent(filtered);
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent mb-2">
            Browse Content
          </h1>
          <p className="text-gray-400">Explore our entire collection of movies and TV shows</p>
        </motion.div>

        {/* Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Genre Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {genres.map((genre) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeGenre === genre
                  ? 'glass-effect-strong glacier-glow text-glacier-400'
                  : 'glass-effect text-gray-400 hover:text-glacier-400'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card content={item} onUpdate={fetchContent} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">No content found matching your filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
