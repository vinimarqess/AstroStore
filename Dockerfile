FROM php:8.2-apache

# instalar extensões PHP necessaria
RUN docker-php-ext-install mysqli pdo pdo_mysql

# habilitar mod_rewrite do apache
RUN a2enmod rewrite

# copiar arquivos do projeto para o container
COPY . /var/www/html/

# definir permissoes corretas
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# expõe porta 80
EXPOSE 80

# inicia Apache
CMD ["apache2-foreground"]
