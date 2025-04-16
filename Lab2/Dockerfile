# Usar Amazon Linux 2023 como base
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# 1. Instalar herramientas base (incluyendo Python 3.12 y Node.js 18)
RUN dnf update -y && \
    dnf remove -y curl-minimal && \  # <--- Remover paquete conflictivo
    dnf install -y \
    shadow-utils \
    sudo \
    git \
    unzip \
    curl \  # <--- Ahora se instalará la versión completa
    wget \
    tar \
    gzip \
    findutils \
    gcc \
    make \
    openssl-devel \
    bzip2-devel \
    libffi-devel \
    zlib-devel \
    sqlite-devel \
    python3.12 \
    python3.12-devel \
    nodejs \
    npm \
    jq && \
    dnf clean all

# 2. Configurar usuario (ec2-user con permisos)
RUN useradd -m -u 1000 -s /bin/bash ec2-user && \
    echo 'ec2-user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 3. Configurar Python 3.12 como predeterminado
RUN alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1 && \
    alternatives --set python3 /usr/bin/python3.12 && \
    python3 -m ensurepip --upgrade && \
    ln -sf /usr/bin/pip3.12 /usr/bin/pip3

# 4. Instalar dependencias globales de Python
RUN python3 -m pip install --upgrade pip setuptools wheel && \
    python3 -m pip install \
    aws_lambda_powertools \
    requests \
    pylint \
    boto3 \
    git-remote-codecommit

# 5. AWS CLI v2 (última versión)
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install --bin-dir /usr/local/bin && \
    rm -rf awscliv2.zip aws

# 6. SAM CLI (última versión)
RUN wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip -O aws-sam-cli.zip && \
    unzip aws-sam-cli.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -rf aws-sam-cli.zip sam-installation

# 7. Configurar Node.js 18.x (LTS)
USER ec2-user
ENV NVM_DIR /home/ec2-user/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install 18 && \
    nvm use 18 && \
    nvm alias default 18

# 8. AWS CDK (última versión)
RUN . "$NVM_DIR/nvm.sh" && \
    npm install -g aws-cdk

# 9. Configurar entorno de trabajo
USER ec2-user
WORKDIR /home/ec2-user/app

# 10. Copiar archivos y configurar permisos
COPY --chown=ec2-user:ec2-user . .

# 11. Configurar variables de entorno
ENV PATH="/home/ec2-user/.local/bin:/home/ec2-user/.nvm/versions/node/v18*/bin:${PATH}"