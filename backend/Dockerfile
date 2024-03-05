FROM bref/php-82-fpm-dev:2

# add required mongdb driver for application
COPY --from=bref/extra-mongodb-php-82:1 /opt /opt

# copy application codebase
COPY . /var/task

ENV HANDLER public/index.php
ENV DOCUMENT_ROOT public