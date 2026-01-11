# Netflix Clone Deployment Script
# Simple automated deployment

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Netflix Clone - Deployment Tool" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check Vercel CLI
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
} else {
    Write-Host "Vercel CLI found!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "STEP 1: Backend Deployment" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please deploy your backend first:" -ForegroundColor Yellow
Write-Host "1. Go to https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Create new Web Service from GitHub" -ForegroundColor White
Write-Host "3. Use these settings:" -ForegroundColor White
Write-Host "   Name: netflix-clone-backend" -ForegroundColor Gray
Write-Host "   Build: cd server; npm install" -ForegroundColor Gray
Write-Host "   Start: cd server; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Add these environment variables:" -ForegroundColor White
Write-Host "   MONGODB_URI = (your MongoDB Atlas URI)" -ForegroundColor Gray
Write-Host "   JWT_SECRET = (generate random string)" -ForegroundColor Gray
Write-Host "   NODE_ENV = production" -ForegroundColor Gray
Write-Host "   PORT = 5000" -ForegroundColor Gray
Write-Host ""

$backendUrl = Read-Host "Enter your Render backend URL"

if ([string]::IsNullOrWhiteSpace($backendUrl)) {
    Write-Host "Backend URL is required!" -ForegroundColor Red
    exit
}

Write-Host "Backend URL: $backendUrl" -ForegroundColor Green
Write-Host ""

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "STEP 2: Frontend Deployment" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Update environment file
Write-Host "Updating frontend configuration..." -ForegroundColor Yellow
$envContent = "VITE_API_URL=$backendUrl/api"
Set-Content -Path "client/.env.production" -Value $envContent
Write-Host "Configuration updated!" -ForegroundColor Green
Write-Host ""

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
Set-Location client
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
} else {
    Write-Host "Build failed. Check errors above." -ForegroundColor Red
    Set-Location ..
    exit
}

Write-Host ""
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""

vercel --prod

Set-Location ..

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: Update Render Backend" -ForegroundColor Yellow
Write-Host "1. Go to Render dashboard" -ForegroundColor White
Write-Host "2. Add environment variable:" -ForegroundColor White
Write-Host "   CLIENT_URL = (your Vercel URL)" -ForegroundColor Gray
Write-Host ""

Write-Host "Backend: $backendUrl" -ForegroundColor Cyan
Write-Host "Frontend: Check Vercel output above" -ForegroundColor Cyan
Write-Host ""
Write-Host "Done! Test your live site now!" -ForegroundColor Green
