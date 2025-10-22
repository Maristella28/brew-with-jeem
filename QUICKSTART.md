# Quick Start Guide

## Start the Application

### Option 1: Using Two Terminals

**Terminal 1 - Start Laravel Backend:**
```bash
cd backend
php artisan serve
```
✅ Backend running at: http://localhost:8000

**Terminal 2 - Start React Frontend:**
```bash
cd Brew-With_Jeem
npm run dev
```
✅ Frontend running at: http://localhost:5173

### Option 2: Using PowerShell (Windows)

Create a `start.ps1` file in the project root:
```powershell
# Start Laravel backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; php artisan serve"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start React frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Brew-With_Jeem; npm run dev"
```

Then run:
```bash
.\start.ps1
```

## First Time Setup

If this is your first time running the application:

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   composer install
   php artisan migrate
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd Brew-With_Jeem
   npm install
   ```

3. **Create Frontend .env file:**
   Copy `.env.example` to `.env` or create with:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

## Test the Application

1. Open browser to http://localhost:5173
2. Click "Register" to create a new account
3. Fill in the registration form
4. Login with your new account
5. Try sending a contact message

## Troubleshooting

### Port Already in Use

**Laravel (port 8000):**
```bash
php artisan serve --port=8001
```
Update React .env: `VITE_API_URL=http://localhost:8001/api`

**React (port 5173):**
Vite will automatically try the next available port (5174, 5175, etc.)
Update Laravel .env: `SANCTUM_STATEFUL_DOMAINS=localhost:5174`

### Clear Cache

**Laravel:**
```bash
cd backend
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

**React:**
```bash
cd Brew-With_Jeem
npm run build
```

## Features to Test

- ✅ User Registration
- ✅ User Login/Logout
- ✅ Authentication Check
- ✅ Contact Form (requires login)
- ✅ Dark Mode Toggle
- ✅ Responsive Navigation

Enjoy Brew with Jeem! ☕

