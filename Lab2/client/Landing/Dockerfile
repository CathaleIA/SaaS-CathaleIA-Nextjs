FROM node:18

# 1. Instalar dependencias del sistema y compilación de Python
RUN apt-get update && \
    apt-get install -y \
    curl git unzip \
    build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev \
    libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget && \
    # Limpiar caché de apt
    rm -rf /var/lib/apt/lists/*

# 2. Compilar e instalar Python 3.9 manualmente
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.9.18/Python-3.9.18.tgz && \
    tar -xzf Python-3.9.18.tgz && \
    cd Python-3.9.18 && \
    ./configure --enable-optimizations --with-openssl=/usr && \
    make altinstall && \
    # Crear enlaces simbólicos
    ln -sf /usr/local/bin/python3.9 /usr/local/bin/python3 && \
    ln -sf /usr/local/bin/pip3.9 /usr/local/bin/pip3 && \
    # Configurar alternativas
    update-alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.9 1 && \
    update-alternatives --set python3 /usr/local/bin/python3.9 && \
    # Limpiar archivos temporales
    rm -rf /tmp/Python-3.9*

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Dar permisos al script
RUN chmod +x deployment.sh

# Comando para ejecutar el script
CMD ["./deployment.sh", "-c", "--email", "eficiencia.desarrollo@copower.com.co"]