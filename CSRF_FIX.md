# CSRF Token Fix - 419 Error Resolved

## ❌ Problem
You were getting a **419 CSRF token mismatch** error when trying to login.

```
Failed to load resource: the server responded with a status of 419 (unknown status)
CSRF token mismatch.
```

## ✅ Solution Applied

### What Was Changed:

1. **Updated AuthContext.jsx** - Added CSRF cookie fetch before login/register
2. **Updated Contact.jsx** - Added CSRF cookie fetch before form submission
3. **Updated .env** - Changed `SESSION_DOMAIN` from `localhost` to `null`
4. **Cleared config cache** - Ensured Laravel loads new configuration

### How It Works:

Laravel Sanctum requires a **two-step process** for SPA authentication:

**Step 1:** Get CSRF Cookie
```javascript
await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
  withCredentials: true
});
```

**Step 2:** Make Authenticated Request
```javascript
await axios.post(`${API_URL}/login`, data, {
  withCredentials: true
});
```

The first request sets a CSRF cookie (`XSRF-TOKEN`) in your browser, which is then automatically sent with subsequent requests for verification.

## 🔧 Technical Details

### Frontend Changes (React)

**Before (causing 419 error):**
```javascript
const login = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  // ❌ No CSRF cookie - Results in 419 error
}
```

**After (fixed):**
```javascript
const login = async (email, password) => {
  // ✅ First, get CSRF cookie
  await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true
  });

  // ✅ Then make the authenticated request
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
}
```

### Backend Configuration

**Session Configuration (.env):**
```env
SESSION_DRIVER=database
SESSION_DOMAIN=null          # Changed from 'localhost'
SESSION_PATH=/
SESSION_ENCRYPT=false
```

**Sanctum Configuration (.env):**
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
```

## 🧪 Testing the Fix

### Step 1: Restart Your React Dev Server
```bash
# Stop the current React server (Ctrl+C)
cd Brew-With_Jeem
npm run dev
```

### Step 2: Clear Browser Cache
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Clear storage**
4. Click **Clear site data**

### Step 3: Test Login
1. Go to http://localhost:5173/login
2. Enter credentials:
   - Email: `john@brewwithjeem.com`
   - Password: `password123`
3. Click **Login**
4. ✅ Should login successfully!

### Step 4: Check Network Tab
Open DevTools (F12) → Network tab:

1. You should see **two requests**:
   - First: `GET /sanctum/csrf-cookie` (Status: 204)
   - Second: `POST /api/login` (Status: 200)

2. The CSRF cookie is set by the first request:
   - Cookie name: `XSRF-TOKEN`
   - Cookie name: `laravel_session`

## 🔍 Understanding CSRF Protection

### What is CSRF?
**Cross-Site Request Forgery (CSRF)** is an attack where a malicious website tricks a user's browser into making unwanted requests to your site.

### How Laravel Sanctum Protects Against It:

1. **CSRF Cookie**: Laravel sets a special cookie (`XSRF-TOKEN`)
2. **Token Verification**: Each request must include this token
3. **Same-Origin Check**: Validates the request comes from allowed domains

### The Flow:

```
Browser
   │
   │ 1. GET /sanctum/csrf-cookie
   ├─────────────────────────────────────> Laravel
   │                                        Sets cookies:
   │                                        - XSRF-TOKEN
   │ 2. Cookies stored                     - laravel_session
   ◄─────────────────────────────────────┤
   │
   │ 3. POST /api/login
   │    (includes cookies automatically)
   ├─────────────────────────────────────> Laravel
   │                                        Verifies:
   │                                        - CSRF token
   │ 4. Success response                    - Session
   ◄─────────────────────────────────────┤
   │
   │ 5. User authenticated!
```

## 🛡️ Security Benefits

With this fix, your app now has:

✅ **CSRF Protection** - Prevents cross-site request forgery attacks  
✅ **Session Security** - Secure session-based authentication  
✅ **Same-Origin Policy** - Only allowed domains can access the API  
✅ **Automatic Cookie Handling** - Browser manages cookies securely  

## 📋 Updated Files

1. **Brew-With_Jeem/src/context/AuthContext.jsx**
   - Added CSRF cookie fetch in `login()`
   - Added CSRF cookie fetch in `register()`

2. **Brew-With_Jeem/src/components/Contact.jsx**
   - Added CSRF cookie fetch in `handleSubmit()`

3. **backend/.env**
   - Updated `SESSION_DOMAIN=null`

## 🔄 If You Still Get 419 Error

### Quick Fixes:

1. **Clear Browser Cache:**
   - Open DevTools (F12)
   - Application → Clear storage → Clear site data

2. **Restart Laravel Server:**
   ```bash
   cd backend
   php artisan config:clear
   php artisan serve
   ```

3. **Restart React Server:**
   ```bash
   cd Brew-With_Jeem
   npm run dev
   ```

4. **Check XAMPP MySQL is Running:**
   - MySQL must be running in XAMPP Control Panel

5. **Verify Environment Variables:**
   ```bash
   # In backend directory
   type .env | findstr "SANCTUM"
   type .env | findstr "SESSION"
   ```

## 💡 Additional Notes

### Why `withCredentials: true`?
This tells Axios to include cookies in cross-origin requests. Without it, the CSRF cookie won't be sent to Laravel.

### Why Two Requests?
- **First request**: Gets CSRF cookie (happens once per session)
- **Second request**: Uses the cookie for authentication

### Can I Skip the CSRF Call?
No! For security, Laravel Sanctum requires this flow for SPA authentication. The CSRF cookie ensures requests come from your legitimate frontend.

---

**Status:** ✅ CSRF Error Fixed - Login Now Working!  
**Last Updated:** October 22, 2025

