FROM amazonlinux:2023

# 1. Actualizar e instalar herramientas básicas
RUN dnf update -y && \
    dnf install -y --allowerasing git unzip curl wget tar gzip jq findutils && \
    dnf clean all

# 2. Instalar Node.js 18
RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf install -y nodejs

# 3. Configurar Python 3.9 (sin tocar pip del sistema)
RUN dnf install -y python3.9 python3-pip && \
    alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
    alternatives --set python3 /usr/bin/python3.9

# 4. Instalar AWS CLI v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install --update && \
    rm -f awscliv2.zip && \
    rm -rf aws

# 5. Instalar dependencias de la capa en espacio de usuario
RUN mkdir -p /app/layers/python && \
    python3 -m pip install --user \
    "aws-lambda-powertools[Tracer,Logger,Metrics]" \
    simplejson \
    jsonpickle \
    aws_requests_auth && \
    cp -r /root/.local/lib/python3.9/site-packages/* /app/layers/python/

# 6. Instalar SAM CLI en espacio de usuario
RUN python3 -m pip install --user aws-sam-cli==1.118.0

# 7. Instalar CDK y herramientas adicionales
RUN npm install -g aws-cdk@2.40.0 && \
    python3 -m pip install --user git-remote-codecommit pylint boto3

# 8. Configurar variables de entorno
ENV PATH="/root/.local/bin:/usr/local/bin:${PATH}"

WORKDIR /app

# 9. Comando de verificación
CMD ["bash", "-c", "aws --version && sam --version && cdk --version && node --version && python3 --version && jq --version"]