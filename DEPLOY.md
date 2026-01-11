# 🚀 Deployment Guide - OPTION 1 (CLI)

## Prerequisites

Install the required CLIs:

```powershell
# Install Vercel CLI
npm install -g vercel

# Install Render CLI
npm install -g render
```

---

## 🗄️ STEP 1: Setup MongoDB Atlas (Database)

1. **Login to MongoDB Atlas:** https://cloud.mongodb.com/
2. **Create a cluster** (if not already done)
3. **Get your connection string:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
4. **Whitelist all IPs** (for testing):
   - Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. **Save the URI** - You'll need it for backend deployment

---

## 🖥️ STEP 2: Deploy Backend to Render

### Option A: Using Render CLI

```powershell
# Login to Render
render login

# Create a new web service
render create web

# Follow prompts:
# - Name: netflix-clone-backend
# - Environment: Node
# - Build Command: cd server && npm install
# - Start Command: cd server && npm start

# Add environment variables
render env set MONGODB_URI="your_mongodb_uri_here"
render env set JWT_SECRET="your_random_secret_here"
render env set CLIENT_URL="https://your-app.vercel.app"
render env set NODE_ENV="production"

# Deploy
render deploy
```

### Option B: Using Render Dashboard (Easier)

```powershell
# 1. Go to: https://dashboard.render.com/
# 2. Click "New +" → "Web Service"
# 3. Connect your GitHub repo
# 4. Configure:
#    - Name: netflix-clone-backend
#    - Root Directory: (leave empty)
#    - Build Command: cd server && npm install
#    - Start Command: cd server && npm start
# 5. Add Environment Variables:
```

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
JWT_SECRET=your-super-secret-random-string-here
JWT_EXPIRE=30d
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
PORT=5000
```

6. Click "Create Web Service"
7. **Copy the backend URL** (e.g., `https://netflix-clone-backend-xyz.onrender.com`)

---

## 🌐 STEP 3: Deploy Frontend to Vercel

### Update Backend URL

Before deploying, update the backend URL:

```powershell
# Edit client/.env.production
# Replace with your actual Render backend URL
```

Edit `client/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Deploy with Vercel CLI

```powershell
# Login to Vercel
vercel login

# Navigate to project root
cd path/to/your/project

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N
# - What's your project's name? netflix-clone
# - In which directory is your code located? ./client
# - Want to override settings? Y
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Development Command: npm run dev

# Add environment variable
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com/api
```

**Your frontend will be live at:** `https://your-project-name.vercel.app`

---

## 🔄 STEP 4: Update CORS on Backend

After deploying frontend, update the backend environment variable:

```powershell
# Go to Render dashboard
# Navigate to your web service
# Environment → Add Variable:
# CLIENT_URL = https://your-project-name.vercel.app
```

Or update `render.yaml` and redeploy.

---

## ✅ STEP 5: Test Your Deployment

Visit your Vercel URL and test:

1. ✅ Homepage loads
2. ✅ Can login (use demo credentials)
3. ✅ Browse content works
4. ✅ Video playback works
5. ✅ Profile page loads
6. ✅ Admin dashboard (if admin)

---

## 🔧 Troubleshooting

### Backend not connecting to frontend?
- Check CORS: Make sure `CLIENT_URL` matches your Vercel domain
- Check API URL: Verify `VITE_API_URL` in Vercel environment variables

### Database connection errors?
- Verify MongoDB URI is correct
- Check IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure password doesn't have special characters (or URL encode them)

### Frontend shows blank page?
- Check browser console for errors
- Verify API_URL environment variable
- Check if backend is running (visit backend-url.onrender.com/api/health)

---

## 📊 Deployment URLs

After deployment, save these URLs:

- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **Database:** MongoDB Atlas (connection string)

---

## 🔄 Future Deployments

### Update Frontend:
```powershell
cd client
vercel --prod
```

### Update Backend:
```powershell
# Render auto-deploys on git push
git push origin main

# Or manually redeploy from Render dashboard
```

---

## 💰 Cost Breakdown

- **Vercel:** Free (hobby plan)
- **Render:** Free (with limitations - sleeps after 15 min)
- **MongoDB Atlas:** Free (512MB)

**Total: $0/month**

### Upgrade Options (if needed):

- **Render Starter:** $7/month (no sleep, better performance)
- **Vercel Pro:** $20/month (more bandwidth, analytics)
- **MongoDB:** $9/month (shared cluster, better performance)

---

## 🎉 Congratulations!

Your Netflix clone is now live in production!

Share your links:
- **Live Site:** [Your Vercel URL]
- **GitHub:** [Your Repo URL]
- **Portfolio:** Add to your portfolio/resume

---

## 🔒 Security Notes (Important!)

Before sharing publicly:

1. ✅ Change all default passwords
2. ✅ Generate strong JWT_SECRET
3. ✅ Don't commit .env files
4. ✅ Set up proper CORS
5. ✅ Monitor usage (both platforms have dashboards)

---

**Need help?** Check the logs:
- Vercel: `vercel logs`
- Render: Dashboard → Logs tab
