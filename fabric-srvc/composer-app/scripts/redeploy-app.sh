#!/bin/bash

echo "Import the admin card created in above step (one time activity)"
composer card import --file admin@dtlab-hackathon-app.card

if [ "$?" -ne 0 ]; then
  echo "Failed while import admin card into the network.."
fi

echo "Redeploy the bna file"
composer network upgrade --networkName dtlab-hackathon-app --networkVersion 0.0.2 --card PeerAdmin@dtlab-network

if [ "$?" -ne 0 ]; then
  echo "Failed while redeploying bna file on the network.."
  exit 1
fi

echo "re-deploy success !!"