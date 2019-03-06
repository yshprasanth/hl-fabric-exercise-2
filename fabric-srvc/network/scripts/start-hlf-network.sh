#!/bin/bash

echo "starting fabric network"
export FABRIC_VERSION="hlfv12"
echo "before: ${FABRIC_VERSION}"
./startFabric.sh

if [ "$?" -ne 0 ]; then
  echo "Failed to start Fabric network..."
  exit 1
fi

echo "Delete existing cards, if any"
composer card list
composer card delete -c PeerAdmin@dtlab-network
composer card delete -c admin@dtlab-hackathon-app

echo "Create new card for PeerAdmin"
echo "after: ${FABRIC_VERSION}"
PRIVATE_KEY=./../fabric-scripts/"${FABRIC_VERSION}"/composer/crypto-config/peerOrganizations/org1.dtlab.com/users/Admin@org1.dtlab.com/msp/keystore/381b12e983df1d5d4a7660f6cc0dc1ee331f2a89049f8e6713f9cc68c2deaaa9_sk
CERT=./../fabric-scripts/"${FABRIC_VERSION}"/composer/crypto-config/peerOrganizations/org1.dtlab.com/users/Admin@org1.dtlab.com/msp/signcerts/Admin@org1.dtlab.com-cert.pem
CONN=./../fabric-scripts/"${FABRIC_VERSION}"/connection.json
echo "${CONN}"
composer card create -p "${CONN}" -u PeerAdmin -c "${CERT}" -k "${PRIVATE_KEY}" -r PeerAdmin -r ChannelAdmin

if [ "$?" -ne 0 ]; then
  echo "Failed to create PeerAdmin card..."
  exit 1
fi

echo "Import the card"
composer card import -f PeerAdmin@dtlab-network.card

if [ "$?" -ne 0 ]; then
  echo "Failed to import PeerAdmin@dtlab-network.card into fabric network..."
  exit 1
fi

echo "Started network successfully !!"
