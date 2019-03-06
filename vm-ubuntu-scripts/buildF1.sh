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
echo "Hi, $USER. This script installs the following packages:"
echo "> go 1.11"
echo "> Docker"
echo "> Docker-compose"
echo "> Python "
echo "it also creates a the user dtlab and assign sudo role"
echo "finally installs Fabric1.1.  Search for fabric using whereis fabric"
echo -e "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo -e "${YELLOW}"

sudo apt-get update
sudo apt-get -y upgrade

echo
echo -e "${PINK}Let's install go1.11 following https://tecadmin.net/install-go-on-ubuntu/"
echo
echo -e "downloading version 1.11 of go"
echo -e "${YELLOW}"

wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz

echo -e "${PINK}muntar the go installation file"
echo -e "${YELLOW}"

sudo tar -xvf go1.11.linux-amd64.tar.gz

echo
echo -e "${PINK}mmove file to /usr/local"
echo

sudo mv go /usr/local
sudo rm go1.11.linux-amd64.tar.gz

echo
echo "Set up .bashrc and .profile env config"
echo

cd ~

echo "#GO VARIABLES" >> .bashrc
echo ' export GOROOT=/usr/local/go' >> .bashrc
echo ' export GOPATH=$HOME/gopath' >> .bashrc
echo ' export PATH=$GOPATH/bin:$GOROOT/bin:$PATH' >> .bashrc
echo "#END OF GO VARIABLES" >> .bashrc

echo
echo "now restart config with the new .bashrc"
echo

source ~/.bashrc

echo
echo "set up the variables for GO in .profile too"

echo "#GO VARIABLES" >> .profile
echo ' export GOROOT=/usr/local/go' >> .profile
echo ' export GOPATH=$HOME/gopath' >> .profile
echo ' export PATH=$GOPATH/bin:$GOROOT/bin:$PATH' >> .profile
echo "#END OF GO VARIABLES" >> .profile

echo
echo "verifiy installation of go"
echo -e "${YELLOW}"

go version

echo

go env

echo -e "${PINK}go installation complete."
echo
echo "installation of Docker"
echo
echo " keys and repository prerequisites"
echo

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

echo -e "${YELLOW}"

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y docker-ce

echo
echo -e "${PINK}start the docker service"

sudo service docker start

echo
echo "enable docker on start up"
echo

sudo systemctl enable docker

echo

docker

echo "all seems fine"
echo
echo "let's install python"
echo -e "${YELLOW}"

sudo apt-get install -y python-pip
sudo pip install --upgrade pip

echo -e "${PINK}"
echo "Python installation complete"
echo
echo "let's instal docker-compose using pip"
echo -e "${YELLOW}"

sudo pip install docker-compose

echo -e "${PINK}"
echo "you now have go, python, docker and docker-compose installed"
echo "let's add user ubuntu to the docker group"

sudo usermod -aG docker ubuntu

echo -e "please type: ${YELLOW}sudo reboot${PINK}"
echo -e "come back, make sure ubuntu is in docker group and the run ${YELLOW}./buildF2.sh"
