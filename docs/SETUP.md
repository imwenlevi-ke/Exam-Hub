# Exam Hub Setup Guide

## Prerequisites

- Node.js v14.0.0 or higher
- PostgreSQL 12.0 or higher
- npm or yarn package manager
- Git for version control

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/imwenlevi-ke/exam-hub.git
cd exam-hub
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE exam_hub;

# Create user (optional but recommended)
CREATE USER exam_user WITH PASSWORD 'secure_password';
ALTER ROLE exam_user SET client_encoding TO 'utf8';
ALTER ROLE exam_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE exam_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE exam_hub TO exam_user;

# Exit psql
\q
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Linux/Mac:
nano .env
# Windows:
type .env
```

#### Update .env file with:
```
DATABASE_URL=postgresql://exam_user:secure_password@localhost:5432/exam_hub
JWT_SECRET=your_super_secret_key_here_change_this_in_production
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Run Database Migrations

```bash
npm run migrate
```

#### Seed Sample Data (Optional)

```bash
npm run seed
```

#### Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Server should start on: `http://localhost:5000`

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should start on: `http://localhost:3000`

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## Configuration Details

### Database Configuration

The database can be configured via `.env` file:

```
DATABASE_URL=postgresql://user:password@host:port/database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exam_hub
DB_USER=postgres
DB_PASSWORD=your_password
```

### JWT Configuration

```
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### CORS Configuration

```
CORS_ORIGIN=http://localhost:3000
```

For production, update this to your domain:
```
CORS_ORIGIN=https://yourdomain.com
```

## Verification

### Check Backend Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-04-30T10:30:00Z",
  "environment": "development"
}
```

### Check Frontend

Visit http://localhost:3000 in your browser. You should see the Exam Hub login page.

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database name and credentials

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
- Change PORT in .env file
- Or kill the process using the port:
  ```bash
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Dependencies Installation Error

```
Error: npm ERR! ...
```

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

## Development Tools

### Code Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
npm run test:coverage
```

## Production Deployment

For production deployment, refer to the deployment guide (to be created).

### Environment Variables for Production

```
NODE_ENV=production
JWT_SECRET=<use strong random secret>
DATABASE_URL=<production database url>
CORS_ORIGIN=https://yourdomain.com
```

## Support

For issues or questions:
1. Check the documentation in `/docs` folder
2. Review API documentation in `docs/API.md`
3. Open an issue on GitHub repository

## Next Steps

1. Review API documentation in `docs/API.md`
2. Review database schema in `docs/DATABASE.md`
3. Start implementing features in backend routes
4. Build frontend pages using React components
5. Connect frontend to backend API
