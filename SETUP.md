# CoffeeNiJeem - Laravel + React Setup Guide

This project consists of a Laravel backend and a React (Vite) frontend for the Brew with Jeem coffee shop application.

## Project Structure

```
CoffeeNiJeem/
├── backend/          # Laravel API
├── Brew-With_Jeem/  # React Frontend
└── SETUP.md         # This file
```

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- XAMPP (for Apache and MySQL, if needed)

## Backend Setup (Laravel)

### 1. Navigate to the backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
composer install
```

### 3. Environment Configuration
The `.env` file should already exist. Key configurations:
- `APP_URL=http://localhost`
- `DB_CONNECTION=sqlite` (default)
- `SESSION_DOMAIN=localhost`
- `SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173`
- `FRONTEND_URL=http://localhost:5173`

### 4. Generate application key (if not done)
```bash
php artisan key:generate
```

### 5. Run migrations
```bash
php artisan migrate
```

### 6. Start the Laravel development server
```bash
php artisan serve
```

The API will be available at: `http://localhost:8000`

## Frontend Setup (React)

### 1. Navigate to the frontend directory
```bash
cd Brew-With_Jeem
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file (or copy from `.env.example`):
```
VITE_API_URL=http://localhost:8000/api
```

### 4. Start the development server
```bash
npm run dev
```

The React app will be available at: `http://localhost:5173`

## Running Both Servers

You need to run both servers simultaneously:

**Terminal 1 (Laravel):**
```bash
cd backend
php artisan serve
```

**Terminal 2 (React):**
```bash
cd Brew-With_Jeem
npm run dev
```

## API Endpoints

The Laravel backend provides the following API endpoints:

### Public Routes
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/check-auth` - Check authentication status
- `POST /api/logout` - User logout

### Protected Routes (require authentication)
- `GET /api/user` - Get current user
- `POST /api/contact` - Send contact message

## Features

### Backend (Laravel)
- RESTful API with Laravel 12
- Authentication using Laravel Sanctum
- Session-based authentication
- CORS configured for React frontend
- SQLite database (can be changed to MySQL)
- Request validation
- Eloquent ORM models

### Frontend (React)
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Context API for state management
- Session-based authentication
- Responsive design

## Database Schema

### Users Table
- id
- first_name
- last_name
- birthdate
- age
- email (unique)
- password (hashed)
- timestamps

### Contact Messages Table
- id
- user_id (foreign key)
- name
- email
- message
- timestamps

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Make sure the Laravel server is running on `http://localhost:8000`
2. Check that `config/cors.php` includes `http://localhost:5173` in allowed origins
3. Verify `withCredentials: true` is set in Axios requests

### Session Issues
If authentication isn't persisting:
1. Clear browser cookies
2. Check `SESSION_DOMAIN` in Laravel `.env`
3. Verify `SANCTUM_STATEFUL_DOMAINS` includes your frontend URL

### Database Issues
To reset the database:
```bash
cd backend
php artisan migrate:fresh
```

## Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure your production database
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`

### Frontend
1. Update `VITE_API_URL` to your production API URL
2. Run `npm run build`
3. Deploy the `dist` folder to your web server

## Support

For issues or questions, contact: Brewthjeem@gmail.com

