const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  getRecommendations
} = require('../controllers/contentController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getAllContent);
router.get('/recommendations', protect, getRecommendations);
router.get('/:id', getContent);
router.post('/', protect, authorize('admin'), createContent);
router.put('/:id', protect, authorize('admin'), updateContent);
router.delete('/:id', protect, authorize('admin'), deleteContent);

module.exports = router;
