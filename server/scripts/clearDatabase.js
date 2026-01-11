const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Content = require('../models/Content');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clearDatabase = async () => {
  try {
    console.log('🗑️  Starting database cleanup...');

    // Clear all collections
    await User.deleteMany({});
    console.log('✅ Deleted all users');

    await Content.deleteMany({});
    console.log('✅ Deleted all content');

    await Comment.deleteMany({});
    console.log('✅ Deleted all comments');

    await Notification.deleteMany({});
    console.log('✅ Deleted all notifications');

    console.log('\n🎉 Database cleared successfully!');
    console.log('📊 All data has been removed from the database.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
