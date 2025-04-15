# Usar la imagen oficial de Node.js 18
FROM node:18

# Instalar dependencias del sistema y AWS CLI
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    unzip && \
    # Instalar AWS CLI
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    # Limpiar
    rm -rf awscliv2.zip aws /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el resto del código
COPY . .

# Comando para ejecutar el proyecto (ajusta según tu caso)
CMD ["npm", "run", "build"]