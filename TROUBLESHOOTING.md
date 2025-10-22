# 🔧 Troubleshooting Guide

Common issues and their solutions for the Brew with Jeem application.

## 🚨 Common Issues

### 1. CORS Errors

**Problem:** Browser console shows CORS errors when making API requests.

**Symptoms:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

✅ **Check Backend is Running**
```bash
# Make sure Laravel is running on port 8000
cd backend
php artisan serve
```

✅ **Verify CORS Configuration**
Check `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
'supports_credentials' => true,
```

✅ **Clear Laravel Cache**
```bash
cd backend
php artisan config:clear
php artisan cache:clear
```

✅ **Check Axios Configuration**
Ensure all Axios requests include:
```javascript
axios.post(url, data, { withCredentials: true })
```

---

### 2. Authentication Not Persisting

**Problem:** User gets logged out on page refresh.

**Symptoms:**
- Login works but refreshing page logs user out
- `checkAuth` API call returns `authenticated: false`

**Solutions:**

✅ **Check Session Configuration**
In `backend/.env`:
```env
SESSION_DRIVER=database
SESSION_DOMAIN=localhost
```

✅ **Verify Sanctum Configuration**
In `backend/.env`:
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
```

✅ **Clear Browser Cookies**
1. Open Developer Tools (F12)
2. Go to Application > Cookies
3. Clear all cookies for localhost
4. Restart both servers

✅ **Check Axios withCredentials**
All requests should have:
```javascript
{ withCredentials: true }
```

---

### 3. Port Already in Use

**Problem:** Can't start server because port is occupied.

**Laravel (Port 8000):**
```bash
# Use different port
php artisan serve --port=8001

# Update React .env
VITE_API_URL=http://localhost:8001/api
```

**Vite (Port 5173):**
```bash
# Vite will auto-increment to 5174, 5175, etc.
# Update backend .env accordingly
SANCTUM_STATEFUL_DOMAINS=localhost:5174,127.0.0.1:5174
```

**Find and Kill Process (Windows PowerShell):**
```powershell
# Find process using port 8000
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess

# Kill the process
Stop-Process -Id <ProcessId>
```

---

### 4. Database Errors

**Problem:** Migration or database connection errors.

**Error: "Database not found"**
```bash
cd backend
php artisan migrate:fresh
```

**Error: "SQLSTATE connection refused"**
```bash
# Check .env database configuration
DB_CONNECTION=sqlite

# Ensure database file exists
ls database/database.sqlite

# If not exists, create it
touch database/database.sqlite  # Linux/Mac
New-Item database/database.sqlite  # Windows PowerShell
```

**Reset Database:**
```bash
cd backend
php artisan migrate:fresh
```

---

### 5. 404 on API Routes

**Problem:** API routes return 404 Not Found.

**Solutions:**

✅ **Verify Routes are Registered**
```bash
cd backend
php artisan route:list --path=api
```

✅ **Clear Route Cache**
```bash
php artisan route:clear
```

✅ **Check API Middleware**
Ensure `bootstrap/app.php` includes:
```php
->withRouting(
    api: __DIR__.'/../routes/api.php',
    // ...
)
```

---

### 6. Validation Errors

**Problem:** Registration or login fails with validation errors.

**Registration Issues:**
```javascript
// Ensure all required fields are sent
{
  firstName: "John",        // Required
  lastName: "Doe",          // Required
  birthdate: "1990-01-01",  // Required, valid date
  age: 34,                  // Required, integer
  email: "john@example.com", // Required, valid email, unique
  password: "password123"   // Required, min 6 characters
}
```

**Login Issues:**
```javascript
// Ensure correct format
{
  email: "john@example.com",  // Required, valid email
  password: "password123"      // Required
}
```

---

### 7. React App Won't Start

**Problem:** `npm run dev` fails or shows errors.

**Solutions:**

✅ **Install Dependencies**
```bash
cd Brew-With_Jeem
npm install
```

✅ **Clear Node Modules**
```bash
rm -rf node_modules package-lock.json  # Linux/Mac
Remove-Item node_modules -Recurse; Remove-Item package-lock.json  # Windows
npm install
```

✅ **Check Node Version**
```bash
node --version  # Should be 18+
npm --version
```

---

### 8. Laravel Server Won't Start

**Problem:** `php artisan serve` fails.

**Solutions:**

✅ **Check PHP Version**
```bash
php --version  # Should be 8.2+
```

✅ **Install Composer Dependencies**
```bash
cd backend
composer install
```

✅ **Generate App Key**
```bash
php artisan key:generate
```

✅ **Check File Permissions**
```bash
# Linux/Mac
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

### 9. Sanctum Token Issues

**Problem:** API returns "Unauthenticated" for protected routes.

**Solutions:**

✅ **Check Sanctum Middleware**
In `bootstrap/app.php`:
```php
$middleware->api(prepend: [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
]);
```

✅ **Verify Route Protection**
In `routes/api.php`:
```php
Route::middleware('auth:sanctum')->group(function () {
    // Protected routes here
});
```

---

### 10. Environment Variables Not Working

**Problem:** `.env` variables not being recognized.

**React (Vite):**
```bash
# Variables must start with VITE_
VITE_API_URL=http://localhost:8000/api

# Restart dev server after changes
npm run dev
```

**Laravel:**
```bash
# Clear config cache
php artisan config:clear

# Verify variable
php artisan tinker
>>> env('SANCTUM_STATEFUL_DOMAINS')
```

---

## 🔍 Debugging Tools

### Laravel Debug

**Enable Debug Mode**
```env
APP_DEBUG=true
```

**Check Logs**
```bash
tail -f storage/logs/laravel.log
```

**Test API with curl**
```bash
# Test register
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"password123","birthdate":"1990-01-01","age":34}'

# Test login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"john@test.com","password":"password123"}'

# Test check-auth
curl -X GET http://localhost:8000/api/check-auth \
  -b cookies.txt
```

### React Debug

**Check Network Requests**
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "XHR"
4. Check request/response

**Check Console for Errors**
```javascript
// Add to AuthContext.jsx for debugging
console.log('API_URL:', API_URL);
console.log('Response:', response.data);
```

---

## 🆘 Still Having Issues?

### Complete Reset

**Backend:**
```bash
cd backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan migrate:fresh
```

**Frontend:**
```bash
cd Brew-With_Jeem
rm -rf node_modules package-lock.json
npm install
```

**Both:**
1. Close all terminals
2. Clear browser cache and cookies
3. Restart both servers
4. Try in incognito/private window

### Get Help

If you're still experiencing issues:

1. Check the error message carefully
2. Look in Laravel logs: `backend/storage/logs/laravel.log`
3. Check browser console (F12)
4. Review the documentation files:
   - [SETUP.md](SETUP.md)
   - [QUICKSTART.md](QUICKSTART.md)
   - [CONNECTION_SUMMARY.md](CONNECTION_SUMMARY.md)

---

**Last Updated:** October 22, 2025

