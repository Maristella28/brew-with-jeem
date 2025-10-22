# CSRF Token Fix Guide

## Problem
The application was experiencing a **419 CSRF Token Mismatch** error when trying to log in or make authenticated requests from the React frontend to the Laravel backend.

## Root Causes
1. **Sanctum Stateful Domains**: The frontend domain (`localhost:5173`) was not included in Sanctum's stateful domains configuration
2. **Session Configuration**: Session settings were not properly configured for cross-origin requests
3. **Axios Configuration**: No centralized axios instance with proper credentials and headers
4. **Sessions Table**: Missing sessions table in the database

## Solutions Implemented

### 1. Updated Sanctum Configuration
**File**: `backend/config/sanctum.php`

Added `localhost:5173` and `127.0.0.1:5173` to the stateful domains:
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000,127.0.0.1:5173,::1',
    Sanctum::currentApplicationUrlWithPort(),
))),
```

### 2. Created Sessions Table Migration
**File**: `backend/database/migrations/2025_10_22_081838_create_sessions_table.php`

Created proper sessions table schema with:
- Session ID (primary key)
- User ID (nullable, indexed)
- IP address
- User agent
- Payload (session data)
- Last activity timestamp

### 3. Updated Session Configuration
**File**: `backend/config/session.php`

- Ensured `same_site` is set to `'lax'` for cross-origin cookie support
- Set default for `secure` to `false` for local development

### 4. Created Centralized Axios Instance
**File**: `Brew-With_Jeem/src/utils/axios.js`

Created a configured axios instance with:
- Default base URL (`http://localhost:8000/api`)
- `withCredentials: true` for cookies
- Proper headers (Content-Type, Accept)
- Helper function `getCsrfCookie()` to fetch CSRF token

### 5. Updated React Components
Updated the following files to use the centralized axios instance:
- `Brew-With_Jeem/src/context/AuthContext.jsx`
- `Brew-With_Jeem/src/components/Contact.jsx`

## How It Works

### Authentication Flow
1. **Get CSRF Cookie**: Before any state-changing request (POST, PUT, DELETE), the frontend calls `/sanctum/csrf-cookie`
2. **Set Cookie**: Laravel sets an XSRF-TOKEN cookie that the browser stores
3. **Send Request**: The frontend makes the actual request (login, register, etc.)
4. **Verify Token**: Laravel's `EnsureFrontendRequestsAreStateful` middleware verifies the CSRF token
5. **Process Request**: If the token is valid, the request is processed

### Key Components
- **Backend Middleware**: `EnsureFrontendRequestsAreStateful` (already configured in `bootstrap/app.php`)
- **CORS**: Already configured to allow `localhost:5173` in `config/cors.php`
- **Axios Interceptor**: Automatically includes credentials with every request

## Testing the Fix

### 1. Start Backend Server
```bash
cd backend
php artisan serve
```

### 2. Start Frontend Server
```bash
cd Brew-With_Jeem
npm run dev
```

### 3. Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter valid credentials
3. Submit the form
4. Should successfully log in without 419 error

### 4. Test Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in the registration form
3. Submit the form
4. Should successfully register without 419 error

## Common Issues and Solutions

### Issue: Still getting 419 error
**Solution**: 
- Clear browser cookies for localhost
- Clear Laravel config cache: `php artisan config:clear`
- Restart both frontend and backend servers

### Issue: CORS errors
**Solution**: 
- Verify `backend/config/cors.php` includes `http://localhost:5173`
- Check that `supports_credentials` is `true`

### Issue: Session not persisting
**Solution**: 
- Verify sessions table exists in database
- Check `SESSION_DRIVER=database` in `.env` (or the config default)
- Ensure `withCredentials: true` is set in all axios requests

### Issue: Cookie not being set
**Solution**: 
- Check browser developer tools → Application → Cookies
- Verify XSRF-TOKEN cookie is present after calling `/sanctum/csrf-cookie`
- Ensure `same_site` is set to `'lax'` or `'none'` (with `secure: true` for HTTPS)

## Environment Variables (Optional)

You can override defaults by setting these in your `.env` files:

### Backend (.env)
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DRIVER=database
SESSION_SAME_SITE=lax
SESSION_SECURE_COOKIE=false
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000
```

## References
- [Laravel Sanctum Documentation](https://laravel.com/docs/sanctum)
- [CSRF Protection in Laravel](https://laravel.com/docs/csrf)
- [Axios Credentials](https://axios-http.com/docs/req_config)

