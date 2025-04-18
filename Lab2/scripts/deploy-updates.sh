#!/bin/bash
cd ../server || exit # stop execution if cd fails
#rm -rf .aws-sam/
sudo rm -rf .aws-sam/

# Reconstruir el proyecto
sam build -t template.yaml
# python3 -m pylint -E -d E0401 $(find . -iname "*.py" -not -path "./.aws-sam/*" -not -path "*site-packages*" -not -path "*dist-packages*")
# #python3 -m pylint -E -d E0401 $(find . -iname "*.py" -not -path "./.aws-sam/*")
#   if [[ $? -ne 0 ]]; then
#     echo "****ERROR: Please fix above code errors and then rerun script!!****"
#     exit 1
#   fi
#Deploying shared services changes
echo "Deploying shared services changes" 
# echo Y | sam deploy --stack-name serverless-saas --code --resource-id LambdaFunctions/CreateUserFunction --resource-id LambdaFunctions/RegisterTenantFunction --resource-id LambdaFunctions/GetTenantFunction -u
echo Y | sam deploy \
    --stack-name serverless-saas \
    --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
    --region us-east-1


cd ../scripts || exit
./geturl.sh