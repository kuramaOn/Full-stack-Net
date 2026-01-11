import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiHeart, FiEdit, FiTrash2, FiMessageCircle } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

const CommentsSection = ({ contentId }) => {
  const { user, isAuthenticated } = useAuthStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [contentId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${contentId}`);
      setComments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      const response = await axios.post(`/api/comments/${contentId}`, {
        text: newComment
      });
      setComments([response.data.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (commentId) => {
    if (!isAuthenticated) return;

    try {
      await axios.post(`/api/comments/${commentId}/like`);
      fetchComments();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleReply = async (commentId) => {
    if (!replyText.trim() || !isAuthenticated) return;

    try {
      await axios.post(`/api/comments/${commentId}/reply`, {
        text: replyText
      });
      setReplyText('');
      setReplyTo(null);
      fetchComments();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-400">Loading comments...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-glacier-400">
        Comments ({comments.length})
      </h3>

      {/* Add Comment */}
      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="glass-effect-strong rounded-xl p-4">
          <div className="flex gap-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none resize-none text-white placeholder-gray-500"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-glacier-500 to-glacier-600 text-white font-semibold disabled:opacity-50"
                >
                  <FiSend />
                  Comment
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-effect-strong rounded-xl p-6 text-center">
          <p className="text-gray-400">Please login to comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect-strong rounded-xl p-4"
            >
              <div className="flex gap-3">
                <img
                  src={comment.userId?.avatar}
                  alt={comment.userId?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{comment.userId?.name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                        {comment.isEdited && ' (edited)'}
                      </p>
                    </div>
                    {user?._id === comment.userId?._id && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 />
                      </motion.button>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mt-2">{comment.text}</p>

                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(comment._id)}
                      className={`flex items-center gap-1 text-sm ${
                        comment.likes?.includes(user?._id) ? 'text-glacier-400' : 'text-gray-400'
                      }`}
                    >
                      <FiHeart className={comment.likes?.includes(user?._id) ? 'fill-current' : ''} />
                      {comment.likes?.length || 0}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-glacier-400"
                    >
                      <FiMessageCircle />
                      Reply
                    </motion.button>
                  </div>

                  {/* Reply Input */}
                  {replyTo === comment._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 flex gap-2"
                    >
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 px-4 py-2 rounded-lg glass-effect border border-glacier-500/30 focus:border-glacier-500 outline-none text-white placeholder-gray-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReply(comment._id)}
                        className="px-4 py-2 rounded-lg bg-glacier-500 text-white"
                      >
                        <FiSend />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Replies */}
                  {comment.replies?.length > 0 && (
                    <div className="mt-4 space-y-3 ml-8 border-l-2 border-glacier-500/20 pl-4">
                      {comment.replies.map((reply, idx) => (
                        <div key={idx} className="flex gap-2">
                          <img
                            src={reply.userId?.avatar}
                            alt={reply.userId?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{reply.userId?.name}</p>
                            <p className="text-sm text-gray-300">{reply.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
