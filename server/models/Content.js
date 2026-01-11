const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true
  },
  genres: [{
    type: String,
    required: true
  }],
  releaseYear: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes for movies
    required: function() {
      return this.type === 'movie';
    }
  },
  seasons: {
    type: Number,
    required: function() {
      return this.type === 'series';
    }
  },
  episodes: {
    type: Number,
    required: function() {
      return this.type === 'series';
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  ageRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'],
    default: 'PG-13'
  },
  cast: [{
    name: String,
    character: String,
    image: String
  }],
  director: {
    type: String
  },
  writers: [String],
  language: {
    type: String,
    default: 'en'
  },
  subtitles: [String],
  thumbnail: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  trailer: {
    type: String
  },
  videoUrl: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  newRelease: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming-soon'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search
contentSchema.index({ title: 'text', description: 'text', genres: 'text' });

module.exports = mongoose.model('Content', contentSchema);
