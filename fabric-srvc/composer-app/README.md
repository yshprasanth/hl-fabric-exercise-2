# Start Scripts

  - Build BNA file
  - Deploy BNA file, for the first time on a new hlf network
  - Redeploy BAN file, if the BNA was previously deployed on the network
  - Start composer-rest-server

  ```sh
    $ cd app-hlfabric/composer-app/scripts
    $ ./start-app.sh
  ```

We can also perform individual steps by using separate scripts, as shown below:

  - Build BNA file

    ```sh
    $ ./build-app.sh
    ```

  - Deploy BNA file, for the first time on a new hlf network

    ```sh
    $ ./deploy-app.sh
    ```
  
  - Redeploy BAN file, if the BNA was previously deployed on the network

    ```sh
    $ ./redeploy-app.sh
    ```

  - Start composer-rest-server
    ```sh
    $ ./rest-server.sh
    ```