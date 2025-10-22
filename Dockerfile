# Use the official PHP image with extensions needed for Laravel
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev zip unzip nginx \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copy all files first to see what's available
COPY . /tmp/source/

# Check if backend folder exists, if not copy from root
RUN if [ -d "/tmp/source/backend" ]; then \
        cp -r /tmp/source/backend/* /var/www/html/; \
    else \
        cp -r /tmp/source/* /var/www/html/; \
        rm -rf /var/www/html/Brew-With_Jeem; \
    fi

# Clean up temp directory
RUN rm -rf /tmp/source

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy deployment script and make it executable
COPY deploy.sh /usr/local/bin/deploy.sh
RUN chmod +x /usr/local/bin/deploy.sh

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start deployment script, then Nginx and PHP-FPM
CMD /usr/local/bin/deploy.sh && service nginx start && php-fpm