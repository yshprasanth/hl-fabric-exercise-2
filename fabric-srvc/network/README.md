
# Introduction
  - fabric-scripts folder contains the version and topology for hyperledger fabric
  - This Hackathon network works on hlfv12 (1 org, 1 orderer, 2 peers). There is also a folder hlfv12-1peer (1 org, 1 orderer, 1 peer) which is a backup in case you only want one peer in the network.
  - If using hlfv12-1peer, ensure the start scripts are modified (start-hlf-network.sh)
  - When a new version of hlf is added then ensure the keys and certs are generated using the steps in fabric-scripts/hlfv12/howtobuild.txt
    

# Start Script

  - Start hyperledger fabric network
  - delete existing PeerAdmin card
  - create new PeerAdmin card
  - import PeerAdmin card

    ```sh
    $ cd app-hlfabric/network/scripts
    $ ./start-hlf-network.sh
    ```

# Stop Script

  - Stop hyperledger fabric network
  - delete the docker containers and dev- images of HL Fabric network

    ```sh
    $ cd app-hlfabric/network/scripts
    $ ./stop-hlf-network.sh
    ```