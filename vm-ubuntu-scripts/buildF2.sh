!/bin/bash

BLACK="\033[30m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
PINK="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"
NC='\033[0m' #no colour

clear
echo -e "${PINK}++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Hi, $USER. This script is 2 of 2 of the Fabric installation and installs the following packages:"
echo "> Fabric"
echo "it also starts and run an example in the example folder"
echo -e "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"


echo
echo -e "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "Let's first clone the Fabric Project on your machine"
echo -e "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo -e "${YELLOW}"

cd ~
mkdir gopath
mkdir gopath/src
mkdir gopath/src/github.com
mkdir gopath/src/github.com/hyperledger
cd gopath/src/github.com/hyperledger
git clone https://github.com/hyperledger/fabric.git

echo -e "${PINK}"
echo "we need some functions to be build to ensure our smooth journey towards"
echo " the execution environment. So, we need to build functions, like: configtxgen and cryptogen"
echo -e "${YELLOW}"

cd fabric
make configtxgen cryptogen

echo
echo -e "${PINK}Now, we move to the examples/e2e_cli directory to test the installation"

cd examples/e2e_cli

echo -e "${YELLOW}"

./generateArtifacts.sh

echo "all artifacts created."
echo
echo "Now, that we have the genesis block, we need containers to run our blockchain network"
echo -e "${CYAN}"
cd ~/gopath/src/github.com/hyperledger/fabric
make docker
cd ~/gopath/src/github.com/hyperledger/fabric/examples/e2e_cli
docker images
./network_setup.sh up mychannel








