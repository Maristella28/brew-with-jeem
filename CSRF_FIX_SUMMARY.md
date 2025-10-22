# CSRF Token Mismatch - Fix Summary

## Issue
**Error**: `POST http://localhost:8000/api/login 419 (unknown status)` - CSRF token mismatch

## Changes Made

### Backend Changes

#### 1. ✅ Created Sessions Table Migration
- **File**: `backend/database/migrations/2025_10_22_081838_create_sessions_table.php`
- Created proper sessions table schema for database session storage

#### 2. ✅ Updated Sanctum Configuration
- **File**: `backend/config/sanctum.php`
- Added `localhost:5173` and `127.0.0.1:5173` to stateful domains
- This allows the React frontend to make authenticated requests

#### 3. ✅ Updated Session Configuration
- **File**: `backend/config/session.php`
- Set `secure` default to `false` for local development
- Ensured `same_site` is `lax` for cross-origin cookie support

#### 4. ✅ Cleared Configuration Cache
```bash
php artisan config:clear
php artisan route:clear
```

### Frontend Changes

#### 1. ✅ Created Centralized Axios Instance
- **File**: `Brew-With_Jeem/src/utils/axios.js` (NEW)
- Configured default baseURL, withCredentials, and headers
- Created `getCsrfCookie()` helper function

#### 2. ✅ Updated AuthContext
- **File**: `Brew-With_Jeem/src/context/AuthContext.jsx`
- Replaced direct axios imports with centralized instance
- All authentication methods now use `axiosInstance` and `getCsrfCookie()`

#### 3. ✅ Updated Contact Component
- **File**: `Brew-With_Jeem/src/components/Contact.jsx`
- Replaced direct axios imports with centralized instance
- Contact form now uses proper CSRF token handling

## Files Created
1. `Brew-With_Jeem/src/utils/axios.js` - Centralized axios configuration
2. `backend/database/migrations/2025_10_22_081838_create_sessions_table.php` - Sessions table
3. `CSRF_TOKEN_FIX_GUIDE.md` - Comprehensive guide for the fix
4. `CSRF_FIX_SUMMARY.md` - This summary document

## Files Modified
1. `backend/config/sanctum.php` - Added frontend domains
2. `backend/config/session.php` - Updated session security settings
3. `Brew-With_Jeem/src/context/AuthContext.jsx` - Use centralized axios
4. `Brew-With_Jeem/src/components/Contact.jsx` - Use centralized axios

## How to Test

### 1. Start Backend
```bash
cd backend
php artisan serve
```
Backend will run on `http://localhost:8000`

### 2. Start Frontend
```bash
cd Brew-With_Jeem
npm run dev
```
Frontend will run on `http://localhost:5173`

### 3. Test Login
1. Go to `http://localhost:5173/login`
2. Enter credentials
3. Click "Login"
4. ✅ Should successfully log in without 419 error

### 4. Test Registration
1. Go to `http://localhost:5173/register`
2. Fill in the form
3. Click "Register"
4. ✅ Should successfully register without 419 error

## Why It Works Now

### Before
- Frontend was sending requests without proper CSRF token
- Sanctum didn't recognize `localhost:5173` as a stateful domain
- No centralized axios configuration meant inconsistent credential handling

### After
1. **CSRF Cookie Request**: Frontend calls `/sanctum/csrf-cookie` before each state-changing request
2. **Cookie Storage**: Browser receives and stores XSRF-TOKEN cookie
3. **Authenticated Request**: Axios automatically includes credentials with request
4. **Token Verification**: Sanctum's `EnsureFrontendRequestsAreStateful` middleware validates the token
5. **Success**: Request is processed successfully

## Key Takeaways

✅ Always include frontend domain in `SANCTUM_STATEFUL_DOMAINS`  
✅ Use `withCredentials: true` for all axios requests  
✅ Call `/sanctum/csrf-cookie` before POST/PUT/DELETE requests  
✅ Centralize axios configuration for consistency  
✅ Ensure sessions table exists for session-based auth  
✅ Clear config cache after configuration changes  

## Troubleshooting

If you still encounter issues:

1. **Clear browser cookies** for localhost
2. **Clear Laravel cache**:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```
3. **Check CORS configuration** in `backend/config/cors.php`
4. **Verify sessions table exists** in your database
5. **Restart both servers**

## Additional Resources
- See `CSRF_TOKEN_FIX_GUIDE.md` for detailed explanation
- Laravel Sanctum Docs: https://laravel.com/docs/sanctum
- Axios Credentials: https://axios-http.com/docs/req_config

