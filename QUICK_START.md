# ⚡ Quick Start Guide - NetStream

Get your Netflix clone running in **5 minutes**!

## 🎯 Prerequisites Check

Make sure you have:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed and running

## 🚀 Installation Steps

### 1️⃣ Install Dependencies
```bash
npm run install-all
```

### 2️⃣ Setup Environment
```bash
cp .env.example .env
```

### 3️⃣ Start MongoDB
```bash
# Windows (Run as Administrator)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4️⃣ Seed Database with Mock Data
```bash
npm run seed
```

### 5️⃣ Start Development Server
```bash
npm run dev
```

## 🎉 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🔑 Login Credentials

### Admin Account
- **Email**: admin@netflix.com
- **Password**: admin123

### User Account
- **Email**: user@netflix.com
- **Password**: user123

## ✨ What You Get

### User Features
- Browse 14+ movies and TV shows
- Search and filter content
- Watch videos with custom player
- Add to favorites and watchlist
- Rate content
- View personalized recommendations

### Admin Features
- Analytics dashboard
- Content management (Add/Edit/Delete)
- User management
- Real-time statistics

### UI Features
- ❄️ Beautiful glacier effect design
- ✨ Smooth Framer Motion animations
- 🎨 Frosted glass components
- 🌊 Hover transitions and effects

## 🐛 Troubleshooting

**MongoDB not starting?**
```bash
# Check if MongoDB is installed
mongod --version

# Check if port 27017 is available
netstat -ano | findstr :27017  # Windows
lsof -i :27017                  # Mac/Linux
```

**Port 5000 already in use?**
- Change `PORT=5001` in `.env` file

**Dependencies failing?**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules client/node_modules
npm run install-all
```

## 📚 Next Steps

- Read full documentation in `SETUP_GUIDE.md`
- Explore the codebase
- Customize the glacier theme colors
- Add your own content

## 🎬 Project Structure

```
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # All page components
│   │   ├── components/  # Reusable components
│   │   └── store/       # State management
│
├── server/          # Express backend
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API routes
│   └── controllers/ # Business logic
```

## 💡 Tips

1. Use React DevTools for debugging
2. Check MongoDB Compass to view database
3. Review `SETUP_GUIDE.md` for detailed info
4. Admin panel is at `/admin` route

---

**Ready to stream! 🍿**
