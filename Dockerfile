FROM php:8.2-apache

# Instalar extensões PHP necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Habilitar mod_rewrite do Apache
RUN a2enmod rewrite

# Copiar arquivos do projeto para o container
COPY . /var/www/html/

# Definir permissões corretas
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expor porta 80
EXPOSE 80

# Iniciar Apache
CMD ["apache2-foreground"]
