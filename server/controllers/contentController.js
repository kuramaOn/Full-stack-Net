const Content = require('../models/Content');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
exports.getAllContent = async (req, res) => {
  try {
    const { type, genre, search, featured, trending, newRelease, limit, sort } = req.query;

    let query = { status: 'active' };

    // Filters
    if (type) query.type = type;
    if (genre) query.genres = { $in: [genre] };
    if (featured) query.featured = featured === 'true';
    if (trending) query.trending = trending === 'true';
    if (newRelease) query.newRelease = newRelease === 'true';

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    let contentQuery = Content.find(query);

    // Sort
    if (sort) {
      const sortFields = sort.split(',').join(' ');
      contentQuery = contentQuery.sort(sortFields);
    } else {
      contentQuery = contentQuery.sort('-createdAt');
    }

    // Limit
    if (limit) {
      contentQuery = contentQuery.limit(parseInt(limit));
    }

    const content = await contentQuery;

    res.status(200).json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single content
// @route   GET /api/content/:id
// @access  Public
exports.getContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create content
// @route   POST /api/content
// @access  Private/Admin
exports.createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private/Admin
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get recommended content
// @route   GET /api/content/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    
    const user = await User.findById(userId).populate('favorites watchHistory.contentId');

    // Get user's favorite genres from their watch history and favorites
    const favoriteGenres = [];
    
    if (user.favorites && user.favorites.length > 0) {
      user.favorites.forEach(content => {
        if (content.genres) {
          favoriteGenres.push(...content.genres);
        }
      });
    }

    // Get recommendations based on favorite genres
    const recommendations = await Content.find({
      genres: { $in: favoriteGenres },
      status: 'active',
      _id: { $nin: user.favorites.map(f => f._id) }
    })
    .limit(20)
    .sort('-rating.average -views');

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
