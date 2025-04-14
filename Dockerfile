FROM amazonlinux:2023

# 1. Herramientas base (compatible con el script original)
RUN dnf update -y && \
    dnf install -y \
    git unzip curl wget tar gzip findutils && \
    dnf clean all

# 2. Instalar Python 3.8 (como en el script original)
RUN dnf install -y python3.8 && \
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1 && \
    alternatives --set python3 /usr/bin/python3.8

# 3. AWS CLI v2.3.0 (versión específica del script)
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.3.0.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install --update && \
    rm -f awscliv2.zip && \
    rm -rf aws

# 4. SAM CLI 1.64.0 (método del script original)
RUN wget https://github.com/aws/aws-sam-cli/releases/download/v1.64.0/aws-sam-cli-linux-x86_64.zip && \
    unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && \
    ./sam-installation/install && \
    rm -f aws-sam-cli-linux-x86_64.zip && \
    rm -rf sam-installation

# 5. Instalar Node.js 18.x (para Next.js 14)
RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf install -y nodejs

# 6. Instalar CDK 2.40.0 (versión exacta del script)
RUN npm install -g aws-cdk@2.40.0

# 7. Instalar herramientas adicionales (versiones específicas)
RUN pip3 install \
    git-remote-codecommit==1.15.1 \
    pylint==2.11.1 \
    boto3

# 8. Instalar jq 1.5 (como en el script)
RUN dnf install -y jq-1.5

# 9. Configurar entorno
WORKDIR /app

# Verificación final
CMD ["bash", "-c", "aws --version && sam --version && cdk --version && node --version && python3 --version && jq --version"]