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
echo "Hi, $USER. This script stops the examples/e2e_cli network in Fabric"
echo -e "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo -e "${YELLOW}"

cd ~
cd gopath/src/github.com/hyperledger/fabric/examples/e2e_cli
./network_setup.sh down
