FROM public.ecr.aws/amazonlinux/amazon-linux:2023

# 1. Instalar herramientas base
RUN yum update -y && \
    yum install -y \
    shadow-utils \
    sudo \
    git \
    unzip \
    curl \
    wget \
    tar \
    gzip \
    findutils \
    aws_lambda_powertools \
    python38-requests && \
    yum clean all

# 2. Configurar usuario
RUN useradd -m -u 1000 -s /bin/bash ec2-user && \
    echo 'ec2-user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 3. Instalar Python 3.8
RUN amazon-linux-extras enable python3.8 && \
    yum install -y python3.8 python3-pip && \
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1 && \
    alternatives --set python3 /usr/bin/python3.8 && \
    python3 -m pip install --upgrade pip setuptools wheel

# 4. AWS CLI v2.3.0
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.3.0.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install --bin-dir /usr/local/bin && \
    rm -rf awscliv2.zip aws

# 5. SAM CLI 1.64.0
RUN wget https://github.com/aws/aws-sam-cli/releases/download/v1.64.0/aws-sam-cli-linux-x86_64.zip && \
    unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -rf aws-sam-cli-linux-x86_64.zip sam-installation

# 6. Instalar Node.js 18.x (manualmente)
USER root
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    yum install -y nodejs && \
    npm install -g npm@latest  # Asegurar la última versión de npm

USER ec2-user

# 7. CDK 2.40.0 (ahora usa Node.js 18)
RUN npm install -g aws-cdk@2.40.0

# 8. Dependencias adicionales
USER root
RUN yum install -y jq && \
    python3 -m pip install \
    pylint==2.11.1 \
    boto3==1.28.62 \
    git-remote-codecommit==1.15.1

# 9. Configurar entorno de trabajo
USER ec2-user
WORKDIR /home/ec2-user/app

# Copiar estructura específica
COPY . .

# 10. Permisos finales
RUN sudo chown -R ec2-user:ec2-user /home/ec2-user/app