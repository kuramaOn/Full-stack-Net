import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { contentAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await contentAPI.getAll({ search: query });
      setResults(response.data.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent mb-8">
            Search
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-glacier-400" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows..."
              className="w-full pl-14 pr-6 py-4 rounded-xl glass-effect-strong border border-glacier-500/30 focus:border-glacier-500 focus:glacier-glow outline-none transition-all duration-300 text-white text-lg placeholder-gray-500"
            />
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <Loading />
        ) : searched ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-glacier-400 mb-6">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {results.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card content={item} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full glass-effect flex items-center justify-center">
                  <FiSearch className="text-6xl text-glacier-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No results found</h3>
                <p className="text-gray-400">Try searching with different keywords</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full glass-effect flex items-center justify-center animate-float">
              <FiSearch className="text-6xl text-glacier-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Start searching</h3>
            <p className="text-gray-400">Enter a title, genre, or keyword to find content</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
