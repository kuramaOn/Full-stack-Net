const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    console.log('👤 Creating admin user...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@netflix.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@netflix.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=e50914&color=fff'
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n🔑 Login Credentials:');
    console.log('Email: admin@netflix.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
