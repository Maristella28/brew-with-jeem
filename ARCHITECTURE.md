# 🏗️ Application Architecture

Visual representation of the Brew with Jeem application architecture.

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:5173                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              │ (with Credentials)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                              │
│                         (Vite + React 18)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐      │
│  │   Components  │  │   Context     │  │    Pages       │      │
│  │               │  │               │  │                │      │
│  │ - Header      │  │ - AuthContext │  │ - Login        │      │
│  │ - Footer      │  │               │  │ - Register     │      │
│  │ - Home        │  └───────────────┘  │ - HomePage     │      │
│  │ - Menu        │                     │ - NotFound     │      │
│  │ - About       │  ┌───────────────┐  └────────────────┘      │
│  │ - Contact     │  │     Axios     │                          │
│  └───────────────┘  │ HTTP Client   │                          │
│                     └───────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              │ /api/* endpoints
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LARAVEL BACKEND                              │
│                     http://localhost:8000                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARE                              │  │
│  │  - CORS                                                    │  │
│  │  - Sanctum (EnsureFrontendRequestsAreStateful)           │  │
│  │  - Authentication                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │                      API ROUTES                          │   │
│  │                                                          │   │
│  │  Public:                Protected (auth:sanctum):       │   │
│  │  - POST /api/register    - GET /api/user               │   │
│  │  - POST /api/login       - POST /api/contact           │   │
│  │  - GET /api/check-auth                                  │   │
│  │  - POST /api/logout                                     │   │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │                     CONTROLLERS                          │   │
│  │                                                          │   │
│  │  ┌────────────────┐       ┌──────────────────┐         │   │
│  │  │ AuthController │       │ ContactController│         │   │
│  │  │                │       │                  │         │   │
│  │  │ - register()   │       │ - store()        │         │   │
│  │  │ - login()      │       │                  │         │   │
│  │  │ - checkAuth()  │       │                  │         │   │
│  │  │ - logout()     │       │                  │         │   │
│  │  └────────────────┘       └──────────────────┘         │   │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │                        MODELS                            │   │
│  │                                                          │   │
│  │  ┌──────────┐            ┌─────────────────┐           │   │
│  │  │   User   │            │ ContactMessage  │           │   │
│  │  │          │            │                 │           │   │
│  │  │ HasApiTokens         │ belongsTo(User) │           │   │
│  │  └──────────┘            └─────────────────┘           │   │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    DATABASE (SQLite)                      │  │
│  │                                                           │  │
│  │  ┌──────────────┐    ┌────────────────────┐            │  │
│  │  │ users        │    │ contact_messages   │            │  │
│  │  │              │    │                    │            │  │
│  │  │ - id         │    │ - id               │            │  │
│  │  │ - first_name │    │ - user_id (FK)     │            │  │
│  │  │ - last_name  │    │ - name             │            │  │
│  │  │ - birthdate  │    │ - email            │            │  │
│  │  │ - age        │    │ - message          │            │  │
│  │  │ - email      │    │ - timestamps       │            │  │
│  │  │ - password   │    └────────────────────┘            │  │
│  │  │ - timestamps │                                       │  │
│  │  └──────────────┘    ┌────────────────────┐            │  │
│  │                      │ sessions           │            │  │
│  │  ┌──────────────┐    │ - id               │            │  │
│  │  │ personal_    │    │ - user_id          │            │  │
│  │  │ access_tokens│    │ - payload          │            │  │
│  │  │              │    │ - last_activity    │            │  │
│  │  │ (Sanctum)    │    └────────────────────┘            │  │
│  │  └──────────────┘                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. User Registration Flow

```
User Browser
     │
     │ 1. Fill registration form
     ▼
React Component (Register.jsx)
     │
     │ 2. Submit form data
     ▼
AuthContext
     │
     │ 3. POST /api/register
     │    { firstName, lastName, birthdate, age, email, password }
     ▼
Laravel API (AuthController)
     │
     │ 4. Validate request
     │ 5. Hash password
     ▼
User Model
     │
     │ 6. Save to database
     ▼
Database (SQLite)
     │
     │ 7. Return user data
     ▼
React App
     │
     │ 8. Redirect to login
     ▼
User sees login page
```

### 2. Authentication Flow

```
User Browser
     │
     │ 1. Enter credentials
     ▼
React Component (Login.jsx)
     │
     │ 2. Submit email & password
     ▼
AuthContext
     │
     │ 3. POST /api/login
     │    { email, password }
     │    withCredentials: true
     ▼
Laravel API
     │
     │ 4. Sanctum Middleware
     │ 5. Validate credentials
     │ 6. Create session
     ▼
Auth::attempt()
     │
     │ 7. Session stored in database
     ▼
Response with Set-Cookie header
     │
     │ 8. Browser saves session cookie
     ▼
React App
     │
     │ 9. Update AuthContext state
     │ 10. Redirect to homepage
     ▼
User logged in!
```

### 3. Protected Route Access

```
User Browser
     │
     │ 1. Request protected page
     ▼
React ProtectedRoute
     │
     │ 2. Check local state
     ▼
AuthContext.checkAuth()
     │
     │ 3. GET /api/check-auth
     │    withCredentials: true (sends cookie)
     ▼
Laravel API
     │
     │ 4. Sanctum validates session
     │ 5. Check database session
     ▼
Auth::check()
     │
     │ 6. Return user data if authenticated
     ▼
React App
     │
     │ 7. Update state
     │ 8. Allow/Deny access
     ▼
Show protected content or redirect to login
```

### 4. Contact Form Submission

```
Authenticated User
     │
     │ 1. Fill contact form
     ▼
Contact Component
     │
     │ 2. Submit message
     ▼
Axios POST
     │
     │ 3. POST /api/contact
     │    { name, email, message }
     │    withCredentials: true
     ▼
Laravel API
     │
     │ 4. Sanctum middleware
     │ 5. Check auth:sanctum
     ▼
ContactController
     │
     │ 6. Validate input
     │ 7. Get user ID from Auth::id()
     ▼
ContactMessage Model
     │
     │ 8. Save to database
     ▼
Database
     │
     │ 9. Return success
     ▼
Contact Component
     │
     │ 10. Show success message
     ▼
Message saved!
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────┐
│          1. CORS Protection                      │
│  - Validates origin (localhost:5173)            │
│  - Credentials support enabled                  │
└─────────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────┐
│          2. Sanctum Middleware                   │
│  - Validates session cookies                    │
│  - CSRF protection                              │
│  - Stateful domain check                        │
└─────────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────┐
│          3. Authentication Guard                 │
│  - Checks session validity                      │
│  - Verifies user exists                         │
└─────────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────┐
│          4. Request Validation                   │
│  - Validates input data                         │
│  - Sanitizes user input                         │
└─────────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────┐
│          5. Password Hashing                     │
│  - bcrypt algorithm                             │
│  - Never stores plain text                      │
└─────────────────────────────────────────────────┘
```

## 📦 Data Flow - User Object

```javascript
// Frontend (React)
const user = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  birthdate: "1990-01-01",
  age: 34,
  email: "john@example.com",
  // password is never returned
  created_at: "2025-10-22T12:00:00.000000Z",
  updated_at: "2025-10-22T12:00:00.000000Z"
}

// Stored in AuthContext state
// Accessible via useAuth() hook
// Used for:
// - Displaying user info
// - Pre-filling contact form
// - Conditional rendering
```

## 🎯 Component Hierarchy

```
App.jsx
├── Router
│   ├── HomePage
│   │   ├── Header (with user state)
│   │   ├── Home
│   │   ├── Menu
│   │   ├── About
│   │   ├── Contact (protected)
│   │   └── Footer
│   │
│   ├── Login (public only)
│   ├── Register (public only)
│   └── NotFound
│
└── AuthProvider (wraps all routes)
    └── Provides:
        - user state
        - loading state
        - login()
        - register()
        - logout()
        - checkAuth()
        - isAuthenticated
```

## 🌐 Environment Configuration

```
┌─────────────────────────────────────────────────┐
│         Frontend (.env)                          │
│  VITE_API_URL=http://localhost:8000/api         │
└─────────────────────────────────────────────────┘
                    │
                    │ Used by Axios
                    ▼
┌─────────────────────────────────────────────────┐
│         Backend (.env)                           │
│  APP_URL=http://localhost                       │
│  FRONTEND_URL=http://localhost:5173             │
│  SANCTUM_STATEFUL_DOMAINS=localhost:5173        │
│  SESSION_DOMAIN=localhost                       │
│  SESSION_DRIVER=database                        │
│  DB_CONNECTION=sqlite                           │
└─────────────────────────────────────────────────┘
```

## 📈 Scalability Considerations

### Current Setup (Development)
- SQLite database
- Single server
- Session-based auth
- File-based cache

### Production Ready (Optional Upgrades)
- MySQL/PostgreSQL database
- Redis for sessions/cache
- Token-based auth (API tokens)
- Load balancer
- CDN for static assets
- Queue workers for emails
- File storage (S3/DigitalOcean Spaces)

---

**Last Updated:** October 22, 2025

