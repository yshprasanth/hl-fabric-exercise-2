#!/bin/bash

export FABRIC_VERSION="hlfv12"
echo "FABRIC_VERSION: ${FABRIC_VERSION}"

echo "stopping fabric network"
./stopFabric.sh

if [ "$?" -ne 0 ]; then
  echo "Failed to stop fabric network..."
  exit 1
fi

./teardownFabric.sh

if [ "$?" -ne 0 ]; then
  echo "Failed to teardown fabric network..."
  exit 1
fi


echo "Kill the docker containers, if any."
docker kill $(docker ps -q)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images dev-* -q)

echo "Stopped network successfully !!"
