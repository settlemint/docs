# Connect to a node

For a software application to interact with a blockchain (e.g. by sending transactions/data to the network, or even just by reading data), it must connect to a node. This section describes how to connect to your Hyperledger Fabric peer node.

## Using a terminal

Once a peer node has been deployed, it can be accessed using the peer Command Line Interface (CLI). We will use Docker to run commands in an isolated environment.

1. Install Docker.
2. Download the certificates zip file and extract its content.
3. Open a terminal and navigate to the folder where you extracted the zip file’s content. You should have a folder with the unique name of your node (find the unique name at the details' page in the SettleMint’s platform).
4. Run the following command to start a Docker container using the **official hyperledger/fabric-tools** image and mount your credentials' folder as a volume.

`docker run --rm -v [absolute-path-to-downloads-folder]/[unique-name-of-your-node]:/fabric-data -it hyperledger/fabric-tools:2.4.3 sh`

5. Now that you are inside the Docker container, run the following command to export your credentials folder path as an environment variable.

`export DIR_FABRIC_DATA=/fabric-data`

Then navigate to the folder.

`cd $DIR_FABRIC_DATA`

6. Having done that, you could use **peer user** to connect to your node.

Run the following command to export peer user’s credentials as environment variables.

`source ./node/exports.env`

And, run one of the following commands to get data from your node.

`peer channel list`
`peer channel getinfo -c default-channel`
`peer channel fetch newest default-channel_newest.block -c default-channel`
`peer channel fetch 0 default-channel_genesis.block -c default-channel`

In the last step, you could also use the **admin user** to connect to your node, just run the following command to export admin user’s credentials as environment variables.

`source ./admin/exports.env`

If everything went well, your results must look like the ones in the following image.

![HLF connect to a node.png](../../../static/img/document360/Images/HLF%20connect%20to%20a%20node.png)
