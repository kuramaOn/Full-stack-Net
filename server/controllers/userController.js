const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites')
      .populate('watchlist')
      .populate('watchHistory.contentId');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      avatar: req.body.avatar,
      preferences: req.body.preferences
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to favorites
// @route   POST /api/users/favorites/:contentId
// @access  Private
exports.addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const contentId = req.params.contentId;

    // Check if already in favorites
    if (user.favorites.includes(contentId)) {
      // Remove from favorites
      user.favorites = user.favorites.filter(id => id.toString() !== contentId);
    } else {
      // Add to favorites
      user.favorites.push(contentId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to watchlist
// @route   POST /api/users/watchlist/:contentId
// @access  Private
exports.addToWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const contentId = req.params.contentId;

    // Check if already in watchlist
    if (user.watchlist.includes(contentId)) {
      // Remove from watchlist
      user.watchlist = user.watchlist.filter(id => id.toString() !== contentId);
    } else {
      // Add to watchlist
      user.watchlist.push(contentId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.watchlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Rate content
// @route   POST /api/users/rate/:contentId
// @access  Private
exports.rateContent = async (req, res) => {
  try {
    const { rating } = req.body;
    const contentId = req.params.contentId;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const user = await User.findById(req.user.id);
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Check if user already rated this content
    const existingRating = user.ratings.find(
      r => r.contentId.toString() === contentId
    );

    if (existingRating) {
      // Update existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;
      existingRating.ratedAt = Date.now();

      // Update content average rating
      content.rating.average = 
        ((content.rating.average * content.rating.count) - oldRating + rating) / content.rating.count;
    } else {
      // Add new rating
      user.ratings.push({
        contentId,
        rating
      });

      // Update content average rating
      content.rating.count += 1;
      content.rating.average = 
        ((content.rating.average * (content.rating.count - 1)) + rating) / content.rating.count;
    }

    await user.save();
    await content.save();

    res.status(200).json({
      success: true,
      data: {
        userRating: rating,
        contentRating: content.rating
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to watch history
// @route   POST /api/users/history/:contentId
// @access  Private
exports.addToHistory = async (req, res) => {
  try {
    const { progress } = req.body;
    const contentId = req.params.contentId;

    const user = await User.findById(req.user.id);

    // Check if already in history
    const existingHistory = user.watchHistory.find(
      h => h.contentId.toString() === contentId
    );

    if (existingHistory) {
      // Update progress
      existingHistory.progress = progress || 0;
      existingHistory.watchedAt = Date.now();
    } else {
      // Add to history
      user.watchHistory.push({
        contentId,
        progress: progress || 0
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.watchHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
