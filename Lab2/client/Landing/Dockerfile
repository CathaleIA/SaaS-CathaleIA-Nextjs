# Usar Node.js 18
FROM node:18

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y curl git unzip

# Directorio de trabajo
WORKDIR /app

# Copiar todo el código (incluyendo package.json)
COPY . .

# Instalar dependencias (sin --production para incluir devDependencies)
RUN npm install --force

# Dar permisos al script de despliegue
RUN chmod +x deployment.sh

# Comando para ejecutar el script de despliegue
CMD ["./deployment.sh"]