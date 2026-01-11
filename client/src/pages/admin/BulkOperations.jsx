import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiDownload, FiTrash2, FiCheck } from 'react-icons/fi';
import { contentAPI } from '../../services/api';
import { getLoopAnimation, getAnimationDuration } from '../../utils/iconAnimations';

const BulkOperations = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedItems.length} items?`)) return;
    
    try {
      await Promise.all(selectedItems.map(id => contentAPI.delete(id)));
      alert('Items deleted successfully');
      setSelectedItems([]);
    } catch (error) {
      console.error('Bulk delete error:', error);
    }
  };

  const handleExport = () => {
    // Mock CSV export
    const csvContent = "data:text/csv;charset=utf-8,ID,Title,Type,Year\n" +
      "1,Movie 1,movie,2023\n2,Movie 2,movie,2023";
    const link = document.createElement('a');
    link.href = csvContent;
    link.download = 'content_export.csv';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      // Process CSV file here
      alert(`File ${file.name} ready to import`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-glacier-400 to-glacier-600 bg-clip-text text-transparent">
        Bulk Operations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-effect-strong rounded-xl p-6 cursor-pointer hover:glacier-glow transition-all duration-300 group"
          onClick={handleExport}
        >
          <motion.div
            animate={getLoopAnimation('bounce')}
            transition={{
              duration: getAnimationDuration('bounce'),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiDownload className="text-4xl text-glacier-400 mb-4" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Export Data</h3>
          <p className="text-gray-400">Download all content as CSV</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-effect-strong rounded-xl p-6 cursor-pointer hover:glacier-glow transition-all duration-300 relative group"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <motion.div
            animate={getLoopAnimation('float')}
            transition={{
              duration: getAnimationDuration('float'),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiUpload className="text-4xl text-glacier-400 mb-4" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Import Data</h3>
          <p className="text-gray-400">Upload CSV to add content</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-effect-strong rounded-xl p-6 cursor-pointer hover:bg-red-500/10 transition-all duration-300 group"
          onClick={handleBulkDelete}
        >
          <motion.div
            whileHover={{
              x: [0, -5, 5, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <FiTrash2 className="text-4xl text-red-400 mb-4" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Bulk Delete</h3>
          <p className="text-gray-400">Remove multiple items</p>
        </motion.div>
      </div>

      {uploadFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect-strong rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">{uploadFile.name}</p>
              <p className="text-sm text-gray-400">Ready to import</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FiCheck />
              </motion.div>
              Import
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BulkOperations;
