const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Follow user
// @route   POST /api/social/follow/:userId
// @access  Private
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (req.params.userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot follow yourself'
      });
    }

    // Check if already following
    if (currentUser.following.includes(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: 'Already following this user'
      });
    }

    // Add to following/followers
    currentUser.following.push(req.params.userId);
    userToFollow.followers.push(req.user.id);

    await currentUser.save();
    await userToFollow.save();

    // Create notification
    await Notification.create({
      userId: req.params.userId,
      type: 'follow',
      title: 'New Follower',
      message: `${currentUser.name} started following you`,
      fromUser: req.user.id,
      link: `/profile/${req.user.id}`
    });

    res.status(200).json({
      success: true,
      message: 'User followed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Unfollow user
// @route   DELETE /api/social/follow/:userId
// @access  Private
exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove from following/followers
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== req.params.userId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== req.user.id
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user followers
// @route   GET /api/social/followers/:userId
// @access  Public
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('followers', 'name avatar bio');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.followers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user following
// @route   GET /api/social/following/:userId
// @access  Public
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('following', 'name avatar bio');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.following
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get activity feed
// @route   GET /api/social/feed
// @access  Private
exports.getActivityFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get activities from users you follow
    const activities = [];
    
    // This is a simplified version - in production, you'd have a separate Activity model
    // For now, we'll return recent ratings and favorites from followed users
    const followedUsers = await User.find({
      _id: { $in: user.following }
    })
      .populate('favorites')
      .populate('ratings.contentId')
      .limit(20);

    followedUsers.forEach(followedUser => {
      // Add favorite activities
      followedUser.favorites.slice(0, 3).forEach(content => {
        activities.push({
          type: 'favorite',
          user: {
            _id: followedUser._id,
            name: followedUser.name,
            avatar: followedUser.avatar
          },
          content: content,
          timestamp: new Date()
        });
      });

      // Add rating activities
      followedUser.ratings.slice(0, 3).forEach(rating => {
        if (rating.contentId) {
          activities.push({
            type: 'rating',
            user: {
              _id: followedUser._id,
              name: followedUser.name,
              avatar: followedUser.avatar
            },
            content: rating.contentId,
            rating: rating.rating,
            timestamp: rating.ratedAt
          });
        }
      });
    });

    // Sort by timestamp
    activities.sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json({
      success: true,
      data: activities.slice(0, 20)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
