const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Content = require('../models/Content');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await User.deleteMany();
    await Content.deleteMany();
    console.log('✅ Cleared existing data');

    // Create users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@netflix.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=e50914&color=fff'
      },
      {
        name: 'John Doe',
        email: 'user@netflix.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff'
      }
    ]);

    console.log('✅ Created users');

    // Import mock content data
    const { movies, series } = require('./mockContent');

    const content = await Content.create([...movies, ...series]);
    console.log('✅ Created content');

    // Add some favorites and watchlist for demo user
    const demoUser = users[1];
    demoUser.favorites = content.slice(0, 5).map(c => c._id);
    demoUser.watchlist = content.slice(5, 10).map(c => c._id);
    demoUser.watchHistory = content.slice(0, 3).map(c => ({
      contentId: c._id,
      progress: Math.floor(Math.random() * 100)
    }));
    await demoUser.save();

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${users.length} users and ${content.length} content items`);
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@netflix.com / admin123');
    console.log('User: user@netflix.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
