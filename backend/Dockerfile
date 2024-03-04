FROM php:8.3-cli

# Install system dependencies
RUN apt-get update \
    && apt-get install -y \
    libssl-dev \
    libcurl4-openssl-dev \
    pkg-config \
    unzip \
    && rm -rf /var/lib/apt/lists/*


# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Clean up
RUN apt-get clean && rm -rf /tmp/* /var/tmp/*

# Set the working directory
WORKDIR /var/www/html

# copy application codebase
COPY . .

# expose PORT 80 to receive nginx proxy
EXPOSE 8000

# run application on startup contianer command
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]