FROM public.ecr.aws/sam/build-python3.9:latest

# 1. Instalar herramientas base incluyendo shadow-utils
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
    amazon-linux-extras && \
    yum clean all

# 2. Ahora podrás crear el usuario
RUN useradd -m -u 1000 -s /bin/bash ec2-user && \
    echo 'ec2-user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 3. Instalar Python 3.8 y herramientas
RUN amazon-linux-extras enable python3.8 && \
    yum install -y python3.8 python3-pip && \
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1 && \
    alternatives --set python3 /usr/bin/python3.8 && \
    python3 -m pip install --upgrade pip setuptools wheel

# 4. AWS CLI v2.3.0
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.3.0.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install --bin-dir /usr/local/bin --update && \
    rm -rf awscliv2.zip aws

# 5. SAM CLI 1.64.0
RUN wget https://github.com/aws/aws-sam-cli/releases/download/v1.64.0/aws-sam-cli-linux-x86_64.zip && \
    unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -rf aws-sam-cli-linux-x86_64.zip sam-installation

# 6. Node.js 14.18.1 con NVM
USER ec2-user
ENV NVM_DIR /home/ec2-user/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install v14.18.1 && \
    nvm use v14.18.1 && \
    nvm alias default v14.18.1

# 7. Instalar CDK 2.40.0
RUN . $NVM_DIR/nvm.sh && \
    npm install -g aws-cdk@2.40.0

# 8. Instalar dependencias adicionales
USER root
RUN yum install -y jq-1.5 && \
    python3 -m pip install \
    pylint==2.11.1 \
    boto3==1.28.62 \
    git-remote-codecommit==1.15.1

# 9. Configurar entorno de trabajo
USER ec2-user
WORKDIR /home/ec2-user/app

# Copiar TODOS los archivos del contexto de construcción
COPY . .

# 10. Permisos y limpieza final
RUN sudo chmod +x deployment.sh && \
    sudo chown -R ec2-user:ec2-user /home/ec2-user/app

# Variables de entorno
ENV PATH="/home/ec2-user/.local/bin:/home/ec2-user/.nvm/versions/node/v14.18.1/bin:${PATH}"

CMD ["./deployment.sh"]