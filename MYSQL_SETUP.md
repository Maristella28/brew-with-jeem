# MySQL Database Configuration with XAMPP

Your Laravel backend is now configured to use MySQL with XAMPP.

## ✅ Database Configuration

### Database Details
- **Database Name:** `brew_with_jeem`
- **Host:** `127.0.0.1`
- **Port:** `3306`
- **Username:** `root`
- **Password:** *(empty)*
- **Connection:** `mysql`
- **Charset:** `utf8mb4`
- **Collation:** `utf8mb4_unicode_ci`

### Laravel .env Configuration
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=brew_with_jeem
DB_USERNAME=root
DB_PASSWORD=
```

## 📊 Database Tables Created

All tables have been successfully migrated to your MySQL database:

### 1. **users** Table
```
+-------------------+---------------------+------+-----+---------+----------------+
| Field             | Type                | Null | Key | Default | Extra          |
+-------------------+---------------------+------+-----+---------+----------------+
| id                | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| first_name        | varchar(255)        | NO   |     | NULL    |                |
| last_name         | varchar(255)        | NO   |     | NULL    |                |
| birthdate         | date                | NO   |     | NULL    |                |
| age               | int(11)             | NO   |     | NULL    |                |
| email             | varchar(255)        | NO   | UNI | NULL    |                |
| email_verified_at | timestamp           | YES  |     | NULL    |                |
| password          | varchar(255)        | NO   |     | NULL    |                |
| remember_token    | varchar(100)        | YES  |     | NULL    |                |
| created_at        | timestamp           | YES  |     | NULL    |                |
| updated_at        | timestamp           | YES  |     | NULL    |                |
+-------------------+---------------------+------+-----+---------+----------------+
```

### 2. **contact_messages** Table
```
+------------+---------------------+------+-----+---------+----------------+
| Field      | Type                | Null | Key | Default | Extra          |
+------------+---------------------+------+-----+---------+----------------+
| id         | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| user_id    | bigint(20) unsigned | YES  | MUL | NULL    |                |
| name       | varchar(255)        | NO   |     | NULL    |                |
| email      | varchar(255)        | NO   |     | NULL    |                |
| message    | text                | NO   |     | NULL    |                |
| created_at | timestamp           | YES  |     | NULL    |                |
| updated_at | timestamp           | YES  |     | NULL    |                |
+------------+---------------------+------+-----+---------+----------------+
```

### Other Tables
- **cache** - Application cache storage
- **cache_locks** - Cache lock mechanisms
- **sessions** - User session data
- **personal_access_tokens** - Laravel Sanctum tokens
- **jobs** - Queue jobs
- **job_batches** - Batch job tracking
- **failed_jobs** - Failed queue jobs
- **password_reset_tokens** - Password reset tokens
- **migrations** - Migration history

## 🔧 Accessing Your Database

### Using phpMyAdmin
1. Open your browser
2. Go to: `http://localhost/phpmyadmin`
3. Click on `brew_with_jeem` database on the left sidebar
4. You can now view and manage your tables

### Using MySQL Command Line
```bash
# Access MySQL
C:\xampp\mysql\bin\mysql.exe -u root

# Select database
USE brew_with_jeem;

# Show tables
SHOW TABLES;

# View users
SELECT * FROM users;

# View contact messages
SELECT * FROM contact_messages;
```

## 🚀 Starting the Application

### Important: Start XAMPP First!

1. **Start XAMPP Control Panel**
   - Open XAMPP Control Panel
   - Click "Start" on Apache
   - Click "Start" on MySQL
   - Wait until both show green "Running" status

2. **Start Laravel Backend**
   ```bash
   cd backend
   php artisan serve
   ```
   Running at: http://localhost:8000

3. **Start React Frontend**
   ```bash
   cd Brew-With_Jeem
   npm run dev
   ```
   Running at: http://localhost:5173

## 🛠️ Common MySQL Commands

### View All Tables
```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "USE brew_with_jeem; SHOW TABLES;"
```

### View Users
```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "USE brew_with_jeem; SELECT id, first_name, last_name, email FROM users;"
```

### View Contact Messages
```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "USE brew_with_jeem; SELECT * FROM contact_messages;"
```

### Count Records
```bash
# Count users
C:\xampp\mysql\bin\mysql.exe -u root -e "USE brew_with_jeem; SELECT COUNT(*) as total_users FROM users;"

# Count contact messages
C:\xampp\mysql\bin\mysql.exe -u root -e "USE brew_with_jeem; SELECT COUNT(*) as total_messages FROM contact_messages;"
```

### Reset Database (Clear all data)
```bash
cd backend
php artisan migrate:fresh
```
⚠️ Warning: This will delete ALL data!

## 🔍 Troubleshooting

### MySQL Not Starting in XAMPP
1. Open XAMPP Control Panel
2. Check if port 3306 is already in use
3. Click "Config" next to MySQL → my.ini
4. Change port if needed (default is 3306)

### "SQLSTATE[HY000] [1045] Access denied"
- Check your username and password in `.env`
- Default XAMPP MySQL: username=`root`, password=`empty`

### "Database 'brew_with_jeem' doesn't exist"
```bash
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE brew_with_jeem CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Can't Connect to MySQL
1. Make sure MySQL is running in XAMPP
2. Check if `3306` port is open
3. Verify credentials in `.env`
4. Run: `php artisan config:clear`

## 📊 Database Backup

### Backup Database
```bash
C:\xampp\mysql\bin\mysqldump.exe -u root brew_with_jeem > backup.sql
```

### Restore Database
```bash
C:\xampp\mysql\bin\mysql.exe -u root brew_with_jeem < backup.sql
```

## 🎯 Quick Reference

### phpMyAdmin URL
```
http://localhost/phpmyadmin
```

### Database Connection String
```
mysql://root@127.0.0.1:3306/brew_with_jeem
```

### Laravel Database Commands
```bash
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Reset and re-run all migrations
php artisan migrate:fresh

# Show database info
php artisan db:show

# Show table info
php artisan db:table users
```

---

## ✅ Current Status

- ✅ MySQL database `brew_with_jeem` created
- ✅ All tables migrated successfully
- ✅ Laravel configured to use MySQL
- ✅ Ready to accept user registrations and contact messages

**Database Location:** XAMPP MySQL Server (localhost:3306)

**Last Updated:** October 22, 2025

