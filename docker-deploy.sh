#!/bin/sh

REMOTE_DEVELOPMENT='ubuntu@ec2-34-229-60-255.compute-1.amazonaws.com'
DOCKER_COMPOSE_DEVELOPMENT='docker-compose.yml'
# DOCKER_COMPOSE='docker-compose.yml'
ENV_FILE='./.env'
NGINX_CONF='./configurations'

if [ "$1" != "" ]; then
	DEFAULT_PEM_PATH=$1
else
	DEFAULT_PEM_PATH='ssh/aws-keypair.pem'
	DEVELOPMENT_PEM_PATH=$DEFAULT_PEM_PATH
fi

# the production deployment script is commented out for now.
# you can remove the comments while pushing this thing on the production servers.

# push the production data first
# echo $DEFAULT_PEM_PATH
# echo "Pushing the docker-compose-production.yml on server"

# # push the single compose file
# scp -i $DEFAULT_PEM_PATH $DOCKER_COMPOSE $REMOTE:~/docker-compose.yml

# echo "Pushing the environment files to server"
# scp -i $DEFAULT_PEM_PATH $ENV_FILE $REMOTE:~/
# # scp -i $DEFAULT_PEM_PATH $ENV_PROD $REMOTE:~/

# echo "Push the nginx configurations"
# scp -r -i $DEFAULT_PEM_PATH $NGINX_CONF $REMOTE:~/

# # run the docker-compose up command to run the docker apps
# ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose pull"
# ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose down"
# ssh -i $DEFAULT_PEM_PATH $REMOTE "sudo docker-compose -f docker-compose.yml up -d --force-recreate --remove-orphans"


# echo "Success pushing the docker compose files to production HAB aws server."

# push the development data on aws server
echo "Pushing the docker-compose.yml on development server"
scp -i $DEVELOPMENT_PEM_PATH $DOCKER_COMPOSE_DEVELOPMENT $REMOTE_DEVELOPMENT:~/docker-compose.yml

echo "Pushing the environment files to server"
scp -i $DEVELOPMENT_PEM_PATH $ENV_FILE $REMOTE_DEVELOPMENT:~/


echo "Push the nginx configurations"
scp -r -i $DEVELOPMENT_PEM_PATH $NGINX_CONF $REMOTE_DEVELOPMENT:~/

# the docker-compose up command to run the docker apps
ssh -i $DEVELOPMENT_PEM_PATH $REMOTE_DEVELOPMENT "sudo docker-compose pull"
ssh -i $DEVELOPMENT_PEM_PATH $REMOTE_DEVELOPMENT "sudo docker-compose down"
ssh -i $DEVELOPMENT_PEM_PATH $REMOTE_DEVELOPMENT "sudo docker-compose -f docker-compose.yml up -d --force-recreate --remove-orphans"