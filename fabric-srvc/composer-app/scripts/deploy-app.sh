#!/bin/bash

echo "Install Composer binary on the network"
composer network install --card PeerAdmin@dtlab-network --archiveFile dtlab-hackathon-app@0.0.1.bna -o npmrcFile=/Users/c0252159/.npmrc

if [ "$?" -ne 0 ]; then
  echo "Failed while installing composer binary on the network.."
  exit 1
fi

echo "Install bna file on the network"
mv admin@dtlab-hackathon-app.card admin@dtlab-hackathon-app.card.old
composer network start --networkName dtlab-hackathon-app --networkVersion 0.0.1 --card PeerAdmin@dtlab-network --networkAdmin admin --networkAdminEnrollSecret adminpw --file admin@dtlab-hackathon-app.card

if [ "$?" -ne 0 ]; then
  echo "Failed while installing bna file on the network.."
  mv admin@dtlab-hackathon-app.card.old admin@dtlab-hackathon-app.card
  exit 1
fi
rm admin@dtlab-hackathon-app.card.old

echo "Import the admin card created in above step (one time activity)"
composer card import --file admin@dtlab-hackathon-app.card

if [ "$?" -ne 0 ]; then
  echo "Failed while import admin card into the network.."
  exit 1
fi

echo "Verify the Composer network is up and running"
composer network ping --card admin@dtlab-hackathon-app

if [ "$?" -ne 0 ]; then
  echo "Failed while verifying the composer network with the admin card.."
  exit 1
fi

echo "deploy success !!"