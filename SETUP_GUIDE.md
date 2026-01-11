# 🎬 NetStream - Complete Setup Guide

A full-stack Netflix clone with admin panel, glacier effect UI, smooth animations, and mock data.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Default Login Credentials](#default-login-credentials)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

Check your versions:
```bash
node --version
npm --version
mongod --version
```

---

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# 1. Install all dependencies (root + client)
npm run install-all

# 2. Create environment file
cp .env.example .env

# 3. Make sure MongoDB is running locally
# Windows: Run MongoDB as a service or start mongod
# Mac/Linux: sudo systemctl start mongod

# 4. Seed the database with mock data
npm run seed

# 5. Start the application (backend + frontend)
npm run dev
```

🎉 Open your browser:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 📦 Detailed Setup

### Step 1: Clone or Setup Project

Ensure all project files are in place with the following structure:
```
netflix-clone-fullstack/
├── client/               # React frontend
├── server/              # Express backend
├── package.json         # Root package.json
├── .env.example         # Environment template
└── README.md
```

### Step 2: Install Dependencies

**Option A: Install Everything at Once**
```bash
npm run install-all
```

**Option B: Install Separately**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/netflix-clone
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone

# JWT Secret (Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Client URL
CLIENT_URL=http://localhost:5173
```

### Step 4: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Windows
# Start MongoDB as a Windows Service from Services panel
# OR run: net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 5: Seed Database with Mock Data

```bash
npm run seed
```

This will create:
- ✅ 3 users (1 admin, 2 regular users)
- ✅ 14 content items (8 movies, 6 TV series)
- ✅ Sample favorites, watchlist, and watch history

Expected output:
```
🌱 Starting database seed...
✅ Cleared existing data
✅ Created users
✅ Created content
✅ Database seeded successfully!
📊 Created 3 users and 14 content items
```

---

## 🏃 Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This starts:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

### Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ..
npm start
```

---

## 🔐 Default Login Credentials

After seeding the database, use these credentials:

### Admin Account
```
Email: admin@netflix.com
Password: admin123
```
**Access:** Full admin panel, content management, user management, analytics

### User Account
```
Email: user@netflix.com
Password: user123
```
**Access:** Browse content, watch videos, manage favorites/watchlist

---

## 🎨 Features Overview

### ❄️ Glacier Effect UI
- Frosted glass (backdrop-blur) effects
- Ice-blue gradient themes
- Smooth transitions and hover effects
- Animated shimmer and glow effects

### 👤 User Features
- ✅ User authentication (Register/Login with JWT)
- ✅ Browse movies and TV shows
- ✅ Advanced search with real-time results
- ✅ Filter by type, genre, year
- ✅ Video player with ReactPlayer
- ✅ Add to favorites
- ✅ Manage watchlist
- ✅ Watch history tracking
- ✅ Rate content (1-5 stars)
- ✅ Personalized recommendations
- ✅ User profile management

### 🔧 Admin Features
- ✅ Analytics dashboard with stats
- ✅ Content management (CRUD operations)
- ✅ User management
- ✅ View top-rated content
- ✅ View most-viewed content
- ✅ Genre distribution analytics
- ✅ Recent user activity

### ✨ Animations & Effects
- Framer Motion animations
- Page transitions
- Hover effects on cards
- Loading animations
- Smooth scrolling
- Parallax effects

---

## 📁 Project Structure

```
netflix-clone-fullstack/
│
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Reusable components
│   │   │   │   ├── Card.jsx        # Content card with glacier effects
│   │   │   │   ├── Navbar.jsx      # Navigation with animations
│   │   │   │   ├── Footer.jsx      # Footer component
│   │   │   │   └── Loading.jsx     # Loading spinner
│   │   │   └── layout/             # Layout components
│   │   │       ├── MainLayout.jsx  # User layout
│   │   │       └── AdminLayout.jsx # Admin layout
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Homepage with hero
│   │   │   ├── Browse.jsx          # Browse all content
│   │   │   ├── Search.jsx          # Search page
│   │   │   ├── Watch.jsx           # Video player page
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   └── admin/              # Admin pages
│   │   │       ├── Dashboard.jsx   # Analytics dashboard
│   │   │       ├── Content.jsx     # Content management
│   │   │       ├── Users.jsx       # User management
│   │   │       └── Settings.jsx    # Settings
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── store/
│   │   │   └── authStore.js        # Zustand auth store
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles with Tailwind
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js          # Tailwind with glacier theme
│   └── vite.config.js              # Vite configuration
│
├── server/                          # Express Backend
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── contentController.js    # Content CRUD + recommendations
│   │   ├── userController.js       # User profile, favorites, ratings
│   │   └── adminController.js      # Admin analytics & management
│   ├── models/
│   │   ├── User.js                 # User schema with bcrypt
│   │   └── Content.js              # Content schema
│   ├── routes/
│   │   ├── auth.js                 # Auth routes
│   │   ├── content.js              # Content routes
│   │   ├── users.js                # User routes
│   │   └── admin.js                # Admin routes
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── scripts/
│   │   ├── seedData.js             # Database seeding script
│   │   └── mockContent.js          # Mock content data
│   └── index.js                    # Server entry point
│
├── package.json                     # Root package.json
├── .env.example                     # Environment template
├── .gitignore
└── README.md
```

---

## 🌐 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Content Endpoints

#### Get All Content
```http
GET /api/content?type=movie&genre=Action&featured=true&limit=10
```

Query Parameters:
- `type`: movie | series
- `genre`: Action, Drama, Sci-Fi, etc.
- `search`: Search query
- `featured`: true | false
- `trending`: true | false
- `newRelease`: true | false
- `limit`: Number of results
- `sort`: Sort field (e.g., -views, -rating.average)

#### Get Single Content
```http
GET /api/content/:id
```

#### Create Content (Admin Only)
```http
POST /api/content
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Movie Title",
  "description": "Description",
  "type": "movie",
  "genres": ["Action", "Thriller"],
  "releaseYear": 2023,
  "duration": 120,
  "director": "Director Name",
  "thumbnail": "https://...",
  "banner": "https://...",
  "videoUrl": "https://...",
  "ageRating": "PG-13"
}
```

#### Get Recommendations
```http
GET /api/content/recommendations
Authorization: Bearer <token>
```

### User Endpoints

#### Add to Favorites
```http
POST /api/users/favorites/:contentId
Authorization: Bearer <token>
```

#### Add to Watchlist
```http
POST /api/users/watchlist/:contentId
Authorization: Bearer <token>
```

#### Rate Content
```http
POST /api/users/rate/:contentId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5
}
```

### Admin Endpoints

#### Get Statistics
```http
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

#### Get All Users
```http
GET /api/admin/users?role=user&limit=20&page=1
Authorization: Bearer <admin_token>
```

---

## 🎨 Glacier Effect Customization

The glacier theme is fully customizable in `client/tailwind.config.js`:

```javascript
colors: {
  glacier: {
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',  // Primary glacier color
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  }
}
```

Use glacier effects in your components:
```jsx
// Glass effect with backdrop blur
<div className="glass-effect">Content</div>
<div className="glass-effect-strong">Stronger effect</div>

// Glacier glow
<div className="glacier-glow">Subtle glow</div>
<div className="glacier-glow-strong">Strong glow</div>

// Text glow
<h1 className="text-glow">Glowing text</h1>
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: `MongoNetworkError: connect ECONNREFUSED`**
- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux) or check Services (Windows)
- Check if port 27017 is available
- Verify `MONGODB_URI` in `.env`

**Fix:**
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Port Already in Use

**Error: `Port 5000 is already in use`**
- Change port in `.env`: `PORT=5001`
- OR kill the process using port 5000

**Fix:**
```bash
# Find process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend Can't Connect to Backend

- Ensure both servers are running (`npm run dev`)
- Check proxy settings in `client/vite.config.js`
- Verify CORS is enabled in `server/index.js`

### Seeding Fails

**Error: `Validation Error` or `Duplicate Key Error`**
- Drop the database and reseed:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use netflix-clone

# Drop database
db.dropDatabase()

# Exit and reseed
exit
npm run seed
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules client/node_modules
npm run install-all
```

---

## 🚀 Deployment

### Deploy to Production

1. **Build Frontend:**
```bash
cd client
npm run build
```

2. **Configure Environment:**
- Update `MONGODB_URI` with production database
- Change `JWT_SECRET` to a secure random string
- Set `NODE_ENV=production`

3. **Deploy to Hosting:**
- **Backend**: Deploy to Heroku, Railway, Render, or DigitalOcean
- **Frontend**: Deploy to Vercel, Netlify, or serve from Express

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<secure_random_string>
CLIENT_URL=<production_frontend_url>
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 💡 Tips & Best Practices

1. **Development:**
   - Use `npm run dev` for hot-reloading
   - Install React DevTools and Redux DevTools
   - Use MongoDB Compass for database visualization

2. **Security:**
   - Never commit `.env` file
   - Change JWT_SECRET in production
   - Use HTTPS in production
   - Implement rate limiting for APIs

3. **Performance:**
   - Implement lazy loading for images
   - Add pagination for large datasets
   - Use CDN for video content in production
   - Enable compression middleware

---

## 📝 License

MIT License - Feel free to use this project for learning and development!

---

## 🙏 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the error logs
3. Ensure all dependencies are installed
4. Verify MongoDB is running

**Happy Streaming! 🎬✨**
