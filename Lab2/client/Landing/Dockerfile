FROM node:18

# Instalar dependencias del sistema y AWS CLI
RUN apt-get update && \
    apt-get install -y curl git unzip python3 python3-pip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Dar permisos al script
RUN chmod +x deployment.sh

# Comando para ejecutar el script
CMD ["./deployment.sh", "-c", "--email", "eficiencia.desarrollo@copower.com.co"]