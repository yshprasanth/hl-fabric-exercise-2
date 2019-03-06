#!/bin/bash

echo "Installing HL Fabric Composer Development Environment"

echo "Installing composer-cli@0.20"
npm install -g composer-cli@0.20

echo "Installing composer-rest-server@0.20"
npm install -g composer-rest-server@0.20

echo "Installing generator-hyperledger-composer@0.20"
npm install -g generator-hyperledger-composer@0.20

echo "Installing yo"
npm install -g yo

echo "Installing composer-playground@0.20"
npm install -g composer-playground@0.20

echo "Finished installation !!"