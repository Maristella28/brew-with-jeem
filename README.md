# ☕ Brew with Jeem - Coffee Shop Application

A modern full-stack web application for Brew with Jeem coffee shop, built with Laravel backend and React frontend.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Laravel](https://img.shields.io/badge/Laravel-12.9-red.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.2-purple.svg)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

### User Features
- 👤 User Registration & Authentication
- 🔐 Secure Login/Logout
- 📧 Contact Form (authenticated users only)
- 🌓 Dark Mode Toggle
- 📱 Responsive Design
- 🎨 Modern UI/UX

### Technical Features
- RESTful API Architecture
- Session-based Authentication with Laravel Sanctum
- CORS-enabled Backend
- Request Validation
- Protected Routes
- Secure Password Hashing
- SQLite Database (easily switchable to MySQL)

## 🚀 Tech Stack

### Backend
- **Framework:** Laravel 12.9.0
- **Language:** PHP 8.2.12
- **Authentication:** Laravel Sanctum
- **Database:** SQLite (default)
- **Package Manager:** Composer 2.8.3

### Frontend
- **Library:** React 18
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Routing:** React Router
- **State Management:** Context API

## ⚡ Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CoffeeNiJeem
   ```

2. **Backend Setup**
   ```bash
   cd backend
   composer install
   php artisan migrate
   ```

3. **Frontend Setup**
   ```bash
   cd Brew-With_Jeem
   npm install
   ```

4. **Environment Configuration**
   
   Create `Brew-With_Jeem/.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

### Running the Application

**Option 1: Using PowerShell Script (Windows)**
```bash
.\start.ps1
```

**Option 2: Manual Start**

Terminal 1 - Backend:
```bash
cd backend
php artisan serve
```

Terminal 2 - Frontend:
```bash
cd Brew-With_Jeem
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

## 📁 Project Structure

```
CoffeeNiJeem/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   └── ContactController.php
│   │   └── Models/
│   │       ├── User.php
│   │       └── ContactMessage.php
│   ├── config/
│   │   ├── cors.php
│   │   └── sanctum.php
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   └── .env
│
├── Brew-With_Jeem/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Menu.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
├── start.ps1               # Startup script
├── SETUP.md                # Detailed setup guide
├── QUICKSTART.md           # Quick start guide
├── CONNECTION_SUMMARY.md   # Connection details
└── README.md               # This file
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Comprehensive setup and configuration guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start instructions
- **[CONNECTION_SUMMARY.md](CONNECTION_SUMMARY.md)** - Backend-Frontend connection details

## 🔌 API Endpoints

### Public Endpoints
```
POST   /api/register      - Register new user
POST   /api/login         - User login
GET    /api/check-auth    - Check authentication status
POST   /api/logout        - User logout
```

### Protected Endpoints (Require Authentication)
```
GET    /api/user          - Get current user
POST   /api/contact       - Submit contact message
```

### API Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## 🗄️ Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | bigint | Primary Key |
| first_name | string | Required |
| last_name | string | Required |
| birthdate | date | Required |
| age | integer | Required |
| email | string | Unique, Required |
| password | string | Hashed |
| timestamps | timestamp | Auto |

### Contact Messages Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | bigint | Primary Key |
| user_id | bigint | Foreign Key (nullable) |
| name | string | Required |
| email | string | Required |
| message | text | Required |
| timestamps | timestamp | Auto |

## 🖼️ Screenshots

*(Add screenshots of your application here)*

## 🔧 Configuration

### CORS Configuration
The backend is configured to accept requests from:
- http://localhost:5173
- http://127.0.0.1:5173

### Session Configuration
- Session driver: Database
- Session lifetime: 120 minutes
- Session domain: localhost

### Authentication
- Uses Laravel Sanctum for SPA authentication
- Session-based authentication
- CSRF protection enabled

## 🧪 Testing

### Test User Registration
1. Navigate to http://localhost:5173/register
2. Fill in all fields
3. Submit the form
4. You should be redirected to login

### Test Login
1. Navigate to http://localhost:5173/login
2. Enter your credentials
3. You should be redirected to homepage as authenticated user

### Test Contact Form
1. Login first
2. Navigate to Contact section
3. Fill in the message
4. Submit - message should be saved to database

## 🛠️ Troubleshooting

### Port Already in Use
**Laravel (8000):**
```bash
php artisan serve --port=8001
```
Update `.env` in React: `VITE_API_URL=http://localhost:8001/api`

**Vite (5173):**
Vite will auto-increment to 5174, 5175, etc.

### CORS Errors
1. Ensure Laravel is running on port 8000
2. Check `backend/config/cors.php`
3. Verify `withCredentials: true` in Axios requests

### Session Issues
```bash
cd backend
php artisan cache:clear
php artisan config:clear
php artisan session:table
php artisan migrate:refresh
```

### Database Reset
```bash
cd backend
php artisan migrate:fresh
```

## 🚀 Deployment

### Backend (Laravel)
1. Set `APP_ENV=production`
2. Set `APP_DEBUG=false`
3. Configure production database
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Run `php artisan view:cache`

### Frontend (React)
1. Update `VITE_API_URL` to production URL
2. Run `npm run build`
3. Deploy `dist` folder to web server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Brew with Jeem**
- 📧 Email: Brewthjeem@gmail.com
- 📱 Phone: (+63) 9147852369
- 📍 Address: @street view, MBC, Mamatid Cabuyao Laguna
- ⏰ Hours: Mon-Fri: 6AM - 8PM | Sat-Sun: 7AM - 9PM

---

Made with ☕ and ❤️ by Brew with Jeem Team

**Status:** ✅ Fully Connected and Ready to Use!

