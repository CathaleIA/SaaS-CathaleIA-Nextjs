#!/bin/bash

if [[ "$#" -eq 0 ]]; then
  echo "Invalid parameters"
  echo "Command to deploy client code: deployment.sh -c --email <email address>"
  echo "Command to deploy server code: deployment.sh -s --email <email address>"
  echo "Command to deploy server & client code: deployment.sh -s -c --email <email address>"
  exit 1
fi

while [[ "$#" -gt 0 ]]; do
  case $1 in
  -s) server=1 ;;
  -c) client=1 ;;
  --email)
    email=$2
    shift
    ;;
  *)
    echo "Unknown parameter passed: $1"
    exit 1
    ;;
  esac
  shift
done

# Configuración de pylint para el contenedor
PYLINT_IGNORE_PATHS="six.py,pycparser,pyasn1,ecdsa,jose,cffi,cryptography"
PYLINT_RC_CONTENT="[MASTER]
ignore=$PYLINT_IGNORE_PATHS

[TYPECHECK]
generated-members=types.ClassType,itertools.imap

[FORMAT]
max-line-length=120"

# During AWS hosted events using event engine tool
IS_RUNNING_IN_EVENT_ENGINE=false
PREPROVISIONED_ADMIN_SITE=$(aws cloudformation list-exports --query "Exports[?Name=='Serverless-SaaS-AdminAppSite'].Value" --output text)
if [ ! -z "$PREPROVISIONED_ADMIN_SITE" ]; then
  echo "Workshop is running in WorkshopStudio"
  IS_RUNNING_IN_EVENT_ENGINE=true
  ADMIN_SITE_URL=$(aws cloudformation list-exports --query "Exports[?Name=='Serverless-SaaS-AdminAppSite'].Value" --output text)
  LANDING_APP_SITE_URL=$(aws cloudformation list-exports --query "Exports[?Name=='Serverless-SaaS-LandingApplicationSite'].Value" --output text)
  ADMIN_SITE_BUCKET=$(aws cloudformation list-exports --query "Exports[?Name=='Serverless-SaaS-AdminSiteBucket'].Value" --output text)
  LANDING_APP_SITE_BUCKET=$(aws cloudformation list-exports --query "Exports[?Name=='Serverless-SaaS-LandingApplicationSiteBucket'].Value" --output text)
fi

if [[ $server -eq 1 ]]; then
  echo "Server code is getting deployed"

  cd ../server || exit
  REGION=$(aws configure get region || echo "us-east-1")
  DEFAULT_SAM_S3_BUCKET=$(grep s3_bucket samconfig.toml | cut -d'=' -f2 | cut -d \" -f2)
  
  echo "Validating S3 bucket: $DEFAULT_SAM_S3_BUCKET"
  if ! aws s3 ls "s3://${DEFAULT_SAM_S3_BUCKET}"; then
    echo "Creating new S3 bucket..."
    UUID=$(uuidgen | awk '{print tolower($0)}')
    SAM_S3_BUCKET=sam-bootstrap-bucket-$UUID
    aws s3 mb "s3://${SAM_S3_BUCKET}" --region "$REGION"
    aws s3api put-bucket-encryption \
      --bucket "$SAM_S3_BUCKET" \
      --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
    
    # Actualizar configuraciones SAM
    find ../../ -name "*-samconfig.toml" -exec sed -i "s/s3_bucket = .*/s3_bucket = \"$SAM_S3_BUCKET\"/" {} \;
    sed -i "s/s3_bucket = .*/s3_bucket = \"$SAM_S3_BUCKET\"/" ../../Lab7/samconfig.toml
  fi

  echo "Validating server code using pylint"
  # Configurar pylint para el entorno del contenedor
  echo "$PYLINT_RC_CONTENT" > .pylintrc
  python3 -m pip install --quiet --upgrade six pycparser pyasn1 ecdsa python-jose cffi cryptography
  
  # Ejecutar pylint con configuración mejorada
  python3 -m pylint -E -d E0401 \
    --rcfile=.pylintrc \
    --py3k \
    --disable=no-member,undefined-variable,function-redefined,fatal \
    $(find . -iname "*.py" -not -path "./.aws-sam/*" -not -path "./layers/*" -not -path "./venv/*")

  if [[ $? -ne 0 ]]; then
    echo "****ERROR: Please fix above code errors and then rerun script!!****"
    exit 1
  fi

  sam build -t template.yaml --use-container

  if [ "$IS_RUNNING_IN_EVENT_ENGINE" = true ]; then
    sam deploy --config-file samconfig.toml --region="$REGION" \
      --parameter-overrides EventEngineParameter=$IS_RUNNING_IN_EVENT_ENGINE AdminUserPoolCallbackURLParameter=$ADMIN_SITE_URL
  else
    sam deploy --config-file samconfig.toml --region="$REGION" \
      --parameter-overrides EventEngineParameter=$IS_RUNNING_IN_EVENT_ENGINE
  fi

  cd ../scripts || exit
fi

if [ "$IS_RUNNING_IN_EVENT_ENGINE" = false ]; then
  ADMIN_SITE_URL=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='AdminAppSite'].OutputValue" --output text)
  LANDING_APP_SITE_URL=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='LandingApplicationSite'].OutputValue" --output text)
  ADMIN_SITE_BUCKET=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='AdminSiteBucket'].OutputValue" --output text)
  LANDING_APP_SITE_BUCKET=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='LandingApplicationSiteBucket'].OutputValue" --output text)
fi

if [[ $client -eq 1 ]]; then
  if [[ -z "$email" ]]; then
    echo "Please provide email address to setup an admin user"
    exit 1
  fi
  echo "Client code is getting deployed"

  ADMIN_APIGATEWAYURL=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='AdminApi'].OutputValue" --output text)
  ADMIN_APPCLIENTID=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='CognitoOperationUsersUserPoolClientId'].OutputValue" --output text)
  ADMIN_USERPOOL_ID=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='CognitoOperationUsersUserPoolId'].OutputValue" --output text)
  ADMIN_USER_GROUP_NAME=$(aws cloudformation describe-stacks --stack-name serverless-saas --query "Stacks[0].Outputs[?OutputKey=='CognitoAdminUserGroupName'].OutputValue" --output text)

  # Configurar usuario admin
  aws cognito-idp admin-create-user \
    --user-pool-id "$ADMIN_USERPOOL_ID" \
    --username admin-user \
    --user-attributes Name=email,Value="$email" Name=email_verified,Value="True" \
    Name=phone_number,Value="+11234567890" Name="custom:userRole",Value="SystemAdmin" \
    Name="custom:tenantId",Value="system_admins" \
    --desired-delivery-mediums EMAIL

  aws cognito-idp admin-add-user-to-group \
    --user-pool-id "$ADMIN_USERPOOL_ID" \
    --username admin-user \
    --group-name "$ADMIN_USER_GROUP_NAME"

  # Despliegue Admin UI
  cd ../client/Admin || exit
  cat <<EoF >./src/aws-exports.ts
const awsmobile = {
    "aws_project_region": "$REGION",
    "aws_cognito_region": "$REGION",
    "aws_user_pools_id": "$ADMIN_USERPOOL_ID",
    "aws_user_pools_web_client_id": "$ADMIN_APPCLIENTID",
};
export default awsmobile;
EoF

  npm install --silent && npm run build --silent
  aws s3 sync --delete --cache-control no-store dist "s3://${ADMIN_SITE_BUCKET}"

  # Despliegue Landing UI (Next.js)
  cd ../Landing || exit
  cat <<EoF >.env.production
NEXT_PUBLIC_API_GATEWAY_URL="$ADMIN_APIGATEWAYURL"
NEXT_PUBLIC_AWS_REGION="$REGION"
EoF

  npm install --silent && npm run build --silent && npm run export
  aws s3 sync --delete --cache-control no-store out "s3://${LANDING_APP_SITE_BUCKET}"

  echo "Deployment completed successfully"
fi

echo "Admin site URL: https://$ADMIN_SITE_URL"
echo "Landing site URL: https://$LANDING_APP_SITE_URL"