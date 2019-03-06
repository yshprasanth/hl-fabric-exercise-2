docker run -d --name mongo --network composer_default -p 27017:27017 mongo

docker build -f Dockerfile-google-oauth -t dtlab/composer-rest-server-google-oauth .

source env-google-oauth.sh

echo $COMPOSER_CARD
echo $COMPOSER_PROVIDERS

docker run \
-d \
-e COMPOSER_CARD=${COMPOSER_CARD} \
-e COMPOSER_NAMESPACES=${COMPOSER_NAMESPACES} \
-e COMPOSER_AUTHENTICATION=${COMPOSER_AUTHENTICATION} \
-e COMPOSER_MULTIUSER=${COMPOSER_MULTIUSER} \
-e COMPOSER_PROVIDERS="${COMPOSER_PROVIDERS}" \
-e COMPOSER_DATASOURCES="${COMPOSER_DATASOURCES}" \
-v ~/.composer:/home/composer/.composer \
--name rest \
--network composer_default \
-p 3000:3000 \
dtlab/composer-rest-server-google-oauth

docker ps |grep rest