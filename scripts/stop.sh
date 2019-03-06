#!/bin/bash
echo "Starting stop script"

SCRIPTS_CURR_DIR="$( pwd )"
echo "SCRIPTS_CURR_DIR: $SCRIPTS_CURR_DIR"

echo "stopping location service"
cd $SCRIPTS_CURR_DIR/../location-srvc/
kill -9 `ps aux | grep "node src/main" | grep -v grep | cut -f4 -d" "`

echo "stopping client application"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/client-app-with-api/
kill -9 `ps aux | grep "ng serve" | grep -v grep | cut -f4 -d" "`
kill -9 `ps aux | grep "@angular/cli" | grep -v grep | cut -f4 -d" "`


echo "stopping composer smart contract"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/composer-app/scripts/
./stop-app.sh

echo "stopping network"
cd $SCRIPTS_CURR_DIR/../fabric-srvc/network/scripts/
./stop-hlf-network.sh

echo "Completed script execution !!"