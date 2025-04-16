FROM node:18

# Instalar dependencias del sistema y AWS CLI
RUN apt-get update && \
    # Instalar Python 3.9 y pip para 3.9
    apt-get install -y curl git unzip python3.9 python3.9-pip && \
    # Configurar python3 y pip3 para usar 3.9
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
    update-alternatives --set python3 /usr/bin/python3.9 && \
    ln -sf /usr/bin/pip3 /usr/local/bin/pip3 && \
    # Instalar AWS CLI
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