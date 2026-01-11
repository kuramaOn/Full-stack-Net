# Netflix Clone - Full Stack Project

A comprehensive Netflix-like streaming platform with an admin panel, featuring glacier effect UI, smooth animations, and transitions.

## 🚀 Features

### User Features
- 🔐 User authentication (Register/Login)
- 🎬 Browse movies and TV shows
- 🔍 Search and filter content
- ⭐ Rate content
- ❤️ Add to favorites
- 📋 Manage watchlist
- 👤 User profiles
- 🎯 Personalized recommendations
- 🎥 Video player interface

### Admin Features
- 📊 Analytics dashboard
- ➕ Add new content (movies/shows)
- ✏️ Edit existing content
- 🗑️ Delete content
- 👥 User management
- 📈 View statistics and metrics

### UI/UX Features
- ❄️ Glacier effect design
- ✨ Smooth animations with Framer Motion
- 🎨 Beautiful transitions
- 📱 Responsive design
- 🌙 Modern, sleek interface

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- React Query

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone-fullstack
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

4. **Seed the database with mock data**
   ```bash
   npm run seed
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📝 Default Credentials

After seeding, use these credentials:

**Admin Account:**
- Email: admin@netflix.com
- Password: admin123

**User Account:**
- Email: user@netflix.com
- Password: user123

## 🗂️ Project Structure

```
netflix-clone-fullstack/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Utility scripts
│   └── config/            # Configuration files
└── package.json           # Root package.json

```

## 🎯 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Content
- GET `/api/content` - Get all content
- GET `/api/content/:id` - Get single content
- POST `/api/content` - Create content (Admin)
- PUT `/api/content/:id` - Update content (Admin)
- DELETE `/api/content/:id` - Delete content (Admin)

### User
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- POST `/api/users/favorites` - Add to favorites
- GET `/api/users/watchlist` - Get watchlist
- POST `/api/users/rate` - Rate content

### Admin
- GET `/api/admin/stats` - Get platform statistics
- GET `/api/admin/users` - Get all users

## 🎨 Glacier Effect UI

The glacier effect is achieved through:
- Frosted glass (backdrop-blur) effects
- Gradient overlays with ice-blue tones
- Smooth hover transitions
- Subtle shadow and glow effects
- Animated shimmer effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
