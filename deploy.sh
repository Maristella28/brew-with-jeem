#!/bin/bash

# Exit on any error
set -e

echo "Starting Laravel deployment setup..."

# Create .env file if it doesn't exist
if [ ! -f "/var/www/html/.env" ]; then
    echo "Creating .env file from environment variables..."
    
    # Create a minimal .env file with environment variables from Render
    cat > /var/www/html/.env <<EOF
APP_NAME="${APP_NAME:-Laravel}"
APP_ENV="${APP_ENV:-production}"
APP_KEY=
APP_DEBUG="${APP_DEBUG:-false}"
APP_URL="${APP_URL:-http://localhost}"

LOG_CHANNEL="${LOG_CHANNEL:-stack}"
LOG_LEVEL="${LOG_LEVEL:-error}"

DB_CONNECTION="${DB_CONNECTION:-sqlite}"
DB_HOST="${DB_HOST:-}"
DB_PORT="${DB_PORT:-}"
DB_DATABASE="${DB_DATABASE:-}"
DB_USERNAME="${DB_USERNAME:-}"
DB_PASSWORD="${DB_PASSWORD:-}"

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION="${QUEUE_CONNECTION:-database}"

SESSION_DRIVER="${SESSION_DRIVER:-database}"
SESSION_LIFETIME=120

CACHE_STORE="${CACHE_STORE:-database}"

MAIL_MAILER="${MAIL_MAILER:-log}"
MAIL_HOST="${MAIL_HOST:-}"
MAIL_PORT="${MAIL_PORT:-}"
MAIL_USERNAME="${MAIL_USERNAME:-}"
MAIL_PASSWORD="${MAIL_PASSWORD:-}"
MAIL_ENCRYPTION="${MAIL_ENCRYPTION:-}"
MAIL_FROM_ADDRESS="${MAIL_FROM_ADDRESS:-hello@example.com}"
MAIL_FROM_NAME="\${APP_NAME}"

SANCTUM_STATEFUL_DOMAINS="${SANCTUM_STATEFUL_DOMAINS:-localhost}"
EOF
    
    echo ".env file created successfully"
fi

# Generate application key
echo "Generating application key..."
php artisan key:generate --force

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Clear and cache configuration
echo "Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

echo "Laravel deployment setup completed!"
