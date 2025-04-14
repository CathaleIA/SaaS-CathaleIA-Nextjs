FROM amazonlinux:2

# 1. Instalar herramientas base y paquetes necesarios
RUN yum update -y && \
    yum install -y shadow-utils sudo git unzip curl wget tar gzip findutils amazon-linux-extras && \
    yum clean all

# 2. Crear usuario ec2-user y configurar sudo
RUN useradd -m ec2-user && \
    echo 'ec2-user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 3. Instalar Python 3.8 y pip3
RUN amazon-linux-extras enable python3.8 && \
    yum install -y python3.8 python3-pip && \  # <-- Añadir python3-pip
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1 && \
    alternatives --set python3 /usr/bin/python3.8

# 4. Instalar AWS CLI v2.3.0 (ahora pip3 está disponible)
RUN pip3 uninstall awscli -y && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.3.0.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -f awscliv2.zip && \
    rm -rf aws

# 4. Instalar SAM CLI 1.64.0
RUN wget https://github.com/aws/aws-sam-cli/releases/download/v1.64.0/aws-sam-cli-linux-x86_64.zip && \
    unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -f aws-sam-cli-linux-x86_64.zip && \
    rm -rf sam-installation

# 5. Instalar git-remote-codecommit 1.15.1
USER ec2-user
WORKDIR /home/ec2-user
RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
    python3 get-pip.py --user && \
    rm get-pip.py && \
    python3 -m pip install git-remote-codecommit==1.15.1

# 6. Instalar Node.js 14.18.1 (usando NVM)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    . ~/.nvm/nvm.sh && \
    nvm install v14.18.1 && \
    nvm use v14.18.1 && \
    nvm alias default v14.18.1

# 7. Instalar CDK 2.40.0
RUN . ~/.nvm/nvm.sh && \
    npm install -g aws-cdk@2.40.0

# 8. Instalar paquetes restantes
USER root
RUN yum install -y jq-1.5 && \
    python3 -m pip install pylint==2.11.1 boto3

# Configurar entorno final
USER ec2-user
WORKDIR /home/ec2-user/app
ENV PATH="/home/ec2-user/.local/bin:/home/ec2-user/.nvm/versions/node/v14.18.1/bin:${PATH}"

# Comando de verificación
CMD ["bash", "-c", "aws --version && sam --version && cdk --version && node --version && python3 --version && jq --version"]