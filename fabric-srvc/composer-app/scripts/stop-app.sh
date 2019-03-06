#!/bin/bash

echo "Stopping composer-rest-server"
cd docker
./stop-rest-server.sh

if [ "$?" -ne 0 ]; then
  echo "Failed while stopping composer-rest-server"
  exit 1
fi

echo "Completed successfully !!"