# Use the official PHP image with extensions needed for Laravel
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev zip unzip nginx libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copy Laravel app files (we're already in backend directory)
COPY . /var/www/html/

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy deployment script and make it executable
COPY deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port for Render
EXPOSE 10000

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Set PORT for Render (default 10000)\n\
export PORT="${PORT:-10000}"\n\
\n\
echo "Running deployment setup..."\n\
/usr/local/bin/deploy.sh\n\
\n\
echo "Configuring Nginx to listen on port $PORT..."\n\
sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/conf.d/default.conf\n\
\n\
echo "Starting PHP-FPM in background..."\n\
php-fpm -D\n\
\n\
echo "Starting Nginx on port $PORT..."\n\
exec nginx -g "daemon off;"\n\
' > /start.sh && chmod +x /start.sh

# Start services
CMD ["/start.sh"]