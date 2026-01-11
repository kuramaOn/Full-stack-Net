const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  addToFavorites,
  addToWatchlist,
  rateContent,
  addToHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes are protected

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/favorites/:contentId', addToFavorites);
router.post('/watchlist/:contentId', addToWatchlist);
router.post('/rate/:contentId', rateContent);
router.post('/history/:contentId', addToHistory);

module.exports = router;
