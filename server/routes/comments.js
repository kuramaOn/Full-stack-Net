const express = require('express');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  addReply
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/:contentId', getComments);
router.post('/:contentId', protect, addComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, likeComment);
router.post('/:id/reply', protect, addReply);

module.exports = router;
