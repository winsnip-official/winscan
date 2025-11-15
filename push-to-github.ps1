# Quick GitHub Push Script
# Run this after creating GitHub repository

# Configuration - GANTI DENGAN USERNAME GITHUB ANDA
$GITHUB_USERNAME = "YOUR_USERNAME"
$REPO_NAME = "winscan"

Write-Host "🚀 WinScan GitHub Setup" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "✅ Remote already configured: $remote" -ForegroundColor Green
} else {
    Write-Host "🔗 Adding remote..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
}

Write-Host ""
Write-Host "📝 Checking status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "⚠️  Important Checks:" -ForegroundColor Yellow
Write-Host "   - Make sure .env files are NOT listed above" -ForegroundColor Gray
Write-Host "   - Make sure node_modules is NOT listed above" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Continue with git add? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ Aborted" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "➕ Adding files..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💬 Committing..." -ForegroundColor Yellow
git commit -m "Initial commit: WinScan Multi-Chain Explorer

- Multi-chain blockchain explorer
- Real-time consensus monitoring
- Validator tracking
- Transaction explorer
- Multi-language support (7 languages)
- Modern responsive UI
- Complete documentation"

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  You will need to authenticate with:" -ForegroundColor Yellow
Write-Host "   Username: $GITHUB_USERNAME" -ForegroundColor Gray
Write-Host "   Password: Personal Access Token (NOT your GitHub password)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "✅ Done! Repository pushed to GitHub" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Go to https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Gray
Write-Host "   2. Enable branch protection (see GITHUB-SETUP.md)" -ForegroundColor Gray
Write-Host "   3. Share your repository with the community!" -ForegroundColor Gray
Write-Host ""
