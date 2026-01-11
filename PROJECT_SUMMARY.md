# 🎬 NetStream - Full Stack Netflix Clone

## 📊 Project Overview

A comprehensive, production-ready Netflix clone featuring:
- **Full-Stack Architecture**: React + Express + MongoDB
- **Glacier Effect UI**: Beautiful frosted glass design with ice-blue theme
- **Smooth Animations**: Framer Motion for fluid transitions
- **Admin Panel**: Complete content and user management
- **Mock Data**: 14+ pre-seeded movies and TV shows

---

## ✅ Completed Features

### 🎨 Frontend (React + Vite + Tailwind CSS)

#### Pages
- ✅ **Home** - Hero section with featured content, trending, new releases
- ✅ **Browse** - Filter by type (movies/series) and genres
- ✅ **Search** - Real-time search with debouncing
- ✅ **Watch** - Video player with ReactPlayer, ratings, favorites
- ✅ **Profile** - User profile with favorites, watchlist, watch history
- ✅ **Login/Register** - Authentication with JWT
- ✅ **Admin Dashboard** - Analytics, stats, charts
- ✅ **Admin Content** - CRUD operations for movies/series
- ✅ **Admin Users** - User management
- ✅ **Admin Settings** - Platform configuration

#### Components
- ✅ **Navbar** - Responsive navigation with user menu
- ✅ **Footer** - Links and social media
- ✅ **Card** - Content card with hover effects and glacier glow
- ✅ **Loading** - Animated loading spinner
- ✅ **MainLayout** - User-facing layout
- ✅ **AdminLayout** - Admin sidebar layout

#### Features
- ✅ Glacier effect (frosted glass + backdrop blur)
- ✅ Framer Motion animations on all pages
- ✅ Hover transitions and scale effects
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Protected routes for auth and admin
- ✅ Zustand state management
- ✅ Custom Tailwind theme with glacier colors

### 🔧 Backend (Node.js + Express + MongoDB)

#### API Endpoints
- ✅ **Auth**: Register, Login, Get Current User
- ✅ **Content**: CRUD, Search, Filter, Recommendations
- ✅ **User**: Profile, Favorites, Watchlist, Ratings, History
- ✅ **Admin**: Statistics, User Management, Analytics

#### Models
- ✅ **User Model**: Authentication, roles, favorites, watchlist, ratings
- ✅ **Content Model**: Movies/Series, genres, cast, ratings, views

#### Features
- ✅ JWT authentication with bcrypt password hashing
- ✅ Role-based access control (user/admin)
- ✅ MongoDB with Mongoose ODM
- ✅ RESTful API architecture
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Input validation

#### Mock Data
- ✅ 8 Movies (Inception, Dark Knight, Interstellar, Matrix, Parasite, Avengers, Dune, Joker)
- ✅ 6 TV Series (Stranger Things, Breaking Bad, The Crown, Wednesday, The Witcher, Last of Us)
- ✅ 3 Users (1 admin, 2 regular users)
- ✅ Pre-populated favorites, watchlist, and watch history

---

## 🎯 Technical Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom glacier theme
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Video Player**: React Player
- **Icons**: React Icons (Feather Icons)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **Validation**: Express Validator
- **CORS**: CORS middleware

### Development
- **Package Manager**: npm
- **Concurrency**: Concurrently (run backend + frontend)
- **Hot Reload**: Nodemon (backend), Vite HMR (frontend)

---

## 📁 File Structure

```
netflix-clone-fullstack/
│
├── client/                              # Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Card.jsx            # Content card with glacier effects
│   │   │   │   ├── Footer.jsx          # Footer component
│   │   │   │   ├── Loading.jsx         # Loading spinner
│   │   │   │   └── Navbar.jsx          # Navigation bar
│   │   │   └── layout/
│   │   │       ├── AdminLayout.jsx     # Admin panel layout
│   │   │       └── MainLayout.jsx      # Main user layout
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Content.jsx         # Content management
│   │   │   │   ├── Dashboard.jsx       # Analytics dashboard
│   │   │   │   ├── Settings.jsx        # Settings page
│   │   │   │   └── Users.jsx           # User management
│   │   │   ├── Browse.jsx              # Browse content page
│   │   │   ├── Home.jsx                # Homepage
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── Profile.jsx             # User profile
│   │   │   ├── Register.jsx            # Registration page
│   │   │   ├── Search.jsx              # Search page
│   │   │   └── Watch.jsx               # Video player page
│   │   ├── services/
│   │   │   └── api.js                  # API service layer
│   │   ├── store/
│   │   │   └── authStore.js            # Authentication store
│   │   ├── App.jsx                     # Main app component
│   │   ├── index.css                   # Global styles
│   │   └── main.jsx                    # Entry point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js              # Tailwind with glacier theme
│   └── vite.config.js
│
├── server/                              # Backend Application
│   ├── controllers/
│   │   ├── adminController.js          # Admin logic
│   │   ├── authController.js           # Auth logic
│   │   ├── contentController.js        # Content logic
│   │   └── userController.js           # User logic
│   ├── middleware/
│   │   └── auth.js                     # JWT middleware
│   ├── models/
│   │   ├── Content.js                  # Content schema
│   │   └── User.js                     # User schema
│   ├── routes/
│   │   ├── admin.js                    # Admin routes
│   │   ├── auth.js                     # Auth routes
│   │   ├── content.js                  # Content routes
│   │   └── users.js                    # User routes
│   ├── scripts/
│   │   ├── mockContent.js              # Mock data
│   │   └── seedData.js                 # Seed script
│   └── index.js                        # Server entry
│
├── .env.example                         # Environment template
├── .gitignore
├── package.json                         # Root package.json
├── PROJECT_SUMMARY.md                   # This file
├── QUICK_START.md                       # Quick start guide
├── README.md                            # Main readme
└── SETUP_GUIDE.md                       # Detailed setup guide
```

---

## 🎨 Glacier Effect Details

### Color Palette
```css
glacier-100: #E0F2FE  (Lightest ice blue)
glacier-200: #BAE6FD
glacier-300: #7DD3FC
glacier-400: #38BDF8  (Primary accent)
glacier-500: #0EA5E9  (Primary)
glacier-600: #0284C7
glacier-700: #0369A1
glacier-800: #075985
glacier-900: #0C4A6E  (Darkest)
```

### CSS Effects
- **Glass Effect**: `backdrop-filter: blur(10px)` with semi-transparent background
- **Glow Effect**: Box shadow with glacier-500 color
- **Text Glow**: Text shadow with glacier-400
- **Animations**: Shimmer, float, fade-in, scale-in, slide transitions

### Usage Examples
```jsx
// Glass effect
<div className="glass-effect">Content</div>
<div className="glass-effect-strong">Stronger blur</div>

// Glow effects
<div className="glacier-glow">Subtle glow</div>
<div className="glacier-glow-strong">Strong glow</div>

// Text effects
<h1 className="text-glow">Glowing text</h1>

// Animations
<div className="animate-shimmer">Shimmer effect</div>
<div className="animate-float">Floating animation</div>
```

---

## 🔐 Authentication Flow

1. User registers/logs in
2. Server generates JWT token
3. Token stored in Zustand store
4. Token sent in Authorization header for protected routes
5. Middleware validates token and attaches user to request
6. Admin routes check for admin role

---

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  avatar: String,
  favorites: [ContentId],
  watchlist: [ContentId],
  watchHistory: [{ contentId, watchedAt, progress }],
  ratings: [{ contentId, rating, ratedAt }],
  subscription: { plan, startDate, endDate },
  isActive: Boolean
}
```

### Content Schema
```javascript
{
  title: String,
  description: String,
  type: 'movie' | 'series',
  genres: [String],
  releaseYear: Number,
  duration: Number,  // for movies
  seasons: Number,   // for series
  episodes: Number,  // for series
  rating: { average, count },
  ageRating: String,
  cast: [{ name, character, image }],
  director: String,
  language: String,
  thumbnail: String,
  banner: String,
  videoUrl: String,
  featured: Boolean,
  trending: Boolean,
  newRelease: Boolean,
  views: Number,
  status: 'active' | 'inactive' | 'coming-soon'
}
```

---

## 🚀 Getting Started

### Quick Start (5 minutes)
```bash
npm run install-all
cp .env.example .env
npm run seed
npm run dev
```

### Access
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api

### Login
- Admin: admin@netflix.com / admin123
- User: user@netflix.com / user123

---

## 📈 Features by User Role

### Regular User Can:
- ✅ Browse all content
- ✅ Search and filter
- ✅ Watch videos
- ✅ Add to favorites
- ✅ Manage watchlist
- ✅ Rate content (1-5 stars)
- ✅ View watch history
- ✅ Get personalized recommendations
- ✅ Update profile

### Admin Can:
- ✅ Everything a regular user can do
- ✅ View analytics dashboard
- ✅ See platform statistics
- ✅ View top-rated content
- ✅ View most-viewed content
- ✅ Genre distribution analytics
- ✅ Create new content
- ✅ Edit existing content
- ✅ Delete content
- ✅ Manage users
- ✅ View recent user activity

---

## 🎯 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Content
- `GET /api/content` - Get all content (with filters)
- `GET /api/content/:id` - Get single content
- `POST /api/content` - Create content (admin)
- `PUT /api/content/:id` - Update content (admin)
- `DELETE /api/content/:id` - Delete content (admin)
- `GET /api/content/recommendations` - Get recommendations

### User
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/favorites/:contentId` - Toggle favorite
- `POST /api/users/watchlist/:contentId` - Toggle watchlist
- `POST /api/users/rate/:contentId` - Rate content
- `POST /api/users/history/:contentId` - Update watch history

### Admin
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

---

## 🎬 Mock Content Included

### Movies (8)
1. Inception (2010) - Action, Sci-Fi, Thriller
2. The Dark Knight (2008) - Action, Crime, Drama
3. Interstellar (2014) - Adventure, Drama, Sci-Fi
4. The Matrix (1999) - Action, Sci-Fi
5. Parasite (2019) - Drama, Thriller
6. Avengers: Endgame (2019) - Action, Adventure, Sci-Fi
7. Dune (2021) - Adventure, Drama, Sci-Fi
8. Joker (2019) - Crime, Drama, Thriller

### TV Series (6)
1. Stranger Things (2016) - Drama, Fantasy, Horror
2. Breaking Bad (2008) - Crime, Drama, Thriller
3. The Crown (2016) - Biography, Drama, History
4. Wednesday (2022) - Comedy, Crime, Fantasy
5. The Witcher (2019) - Action, Adventure, Fantasy
6. The Last of Us (2023) - Action, Adventure, Drama

---

## 🛠️ Development Commands

```bash
# Install all dependencies
npm run install-all

# Seed database
npm run seed

# Development (both servers)
npm run dev

# Backend only
npm run server

# Frontend only
npm run client

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Customization Guide

### Change Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  glacier: {
    500: '#YOUR_COLOR',  // Change primary color
  }
}
```

### Add New Content
Use the admin panel or API:
```javascript
POST /api/content
{
  "title": "Your Movie",
  "type": "movie",
  // ... other fields
}
```

### Modify Animations
Edit `client/tailwind.config.js` animation section or use Framer Motion props.

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (optional)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🐛 Common Issues & Solutions

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`

2. **Port Already in Use**
   - Change `PORT` in `.env`
   - Or kill the process using the port

3. **Dependencies Error**
   - Run `npm cache clean --force`
   - Delete `node_modules` and reinstall

4. **Videos Not Playing**
   - Check video URL in content data
   - Ensure CORS is enabled

---

## 🎓 Learning Resources

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- JWT authentication
- MongoDB/Mongoose usage
- React hooks and context
- State management with Zustand
- Modern CSS with Tailwind
- Animation with Framer Motion
- Protected routes
- Role-based access control

---

## 📄 License

MIT License - Free to use for learning and development!

---

## 🙏 Acknowledgments

- Mock video URLs from Google's sample videos
- Images from Unsplash
- Icons from Feather Icons (via react-icons)
- Inspired by Netflix's design

---

## 📞 Support

For questions or issues:
1. Check `SETUP_GUIDE.md`
2. Review `QUICK_START.md`
3. Check console/terminal for errors
4. Verify all services are running

---

**Built with ❤️ using React, Express, MongoDB, and lots of glacier effects! ❄️**
