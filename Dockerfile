# Usar la imagen oficial de Node.js 18
FROM node:18

# Instalar dependencias globales necesarias (awscli, git, etc.)
RUN apt-get update && \
    apt-get install -y curl git unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws

# Directorio de trabajo
WORKDIR /app

# Copiar el script y el código del Landing
WORKDIR /app
COPY . .