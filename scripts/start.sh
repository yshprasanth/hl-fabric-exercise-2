#!/bin/bash
echo "Starting start script"

SCRIPTS_CURR_DIR="$( pwd )"
echo "SCRIPTS_CURR_DIR: $SCRIPTS_CURR_DIR"

echo "starting network"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/network/scripts/
./start-hlf-network.sh

echo "build and deploy composer smart contract"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/composer-app/scripts/
./start-app.sh

echo "starting client application"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/client-app-with-api/
nohup npm run client 2>&1 >> $SCRIPTS_CURR_DIR/../fabric-srvc/client-app-with-api/log/ng.log &

echo "starting location service"
cd $SCRIPTS_CURR_DIR/../location-srvc/
nohup npm run start 2>&1 >> $SCRIPTS_CURR_DIR/../location-srvc/log/location-srvc.log &

echo "Completed script execution !!"