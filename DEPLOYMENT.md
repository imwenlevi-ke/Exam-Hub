# Exam Hub - Deployment Guide

This document provides quick deployment instructions for Railway.app.

## Quick Deploy to Railway.app

### Prerequisites
- GitHub account (repository already pushed)
- Railway.app account (free to create at https://railway.app)

### Deployment Steps

#### 1. Create Railway Account
- Go to https://railway.app
- Click "Start Project"
- Sign up using GitHub (recommended)
- Authorize Railway to access your GitHub

#### 2. Create New Project
1. Click "Create New Project" in Railway dashboard
2. Select "Deploy from GitHub repo"
3. Search for and select: `imwenlevi-ke/exam-hub`
4. Click "Deploy Now"

#### 3. Add PostgreSQL Database
1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. PostgreSQL will be created automatically
4. Railway will auto-link the `DATABASE_URL` environment variable

#### 4. Configure Environment Variables
1. Go to your Backend service in Railway
2. Click "Variables"
3. Add these variables:

```
NODE_ENV=production
JWT_SECRET=your_strong_random_secret_key_here_change_this
JWT_EXPIRE=7d
CORS_ORIGIN=*
MAX_FILE_SIZE=10485760
LOG_LEVEL=info
```

**Note**: `DATABASE_URL` is auto-provided by Railway's PostgreSQL plugin

#### 5. Deploy
- Railway will automatically build and deploy your backend
- Wait for deployment to complete (check the Logs tab)
- Your API will be available at a Railway-provided URL

### Your Live Backend URL

After successful deployment, Railway will provide a URL like:
```
https://exam-hub-production.up.railway.app
```

### Test Your Deployment

```bash
# Health check
curl https://exam-hub-production.up.railway.app/health

# API root
curl https://exam-hub-production.up.railway.app/api
```

### Optional: Deploy Frontend to Vercel

For a complete web application:

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your `exam-hub` repository
4. Set environment variable:
   ```
   REACT_APP_API_URL=https://exam-hub-production.up.railway.app/api
   ```
5. Deploy

Your frontend will be available at a Vercel URL like:
```
https://exam-hub-frontend.vercel.app
```

## Important Notes

- **Database**: Railway provides PostgreSQL automatically
- **Environment**: Production environment is set to `NODE_ENV=production`
- **Port**: Railway dynamically assigns ports (uses `PORT` environment variable)
- **Logs**: Monitor real-time logs in Railway dashboard
- **Monitoring**: Check deployment status and performance in dashboard

## Troubleshooting

See `docs/RAILWAY_DEPLOYMENT.md` for detailed troubleshooting guide.

## Support

- Railway Docs: https://docs.railway.app
- Exam Hub API Docs: See `docs/API.md`
- GitHub Repository: https://github.com/imwenlevi-ke/exam-hub

---

**Happy Coding! 🚀**
