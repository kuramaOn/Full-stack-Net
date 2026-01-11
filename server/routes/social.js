const express = require('express');
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getActivityFeed
} = require('../controllers/socialController');
const { protect } = require('../middleware/auth');

router.post('/follow/:userId', protect, followUser);
router.delete('/follow/:userId', protect, unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);
router.get('/feed', protect, getActivityFeed);

module.exports = router;
