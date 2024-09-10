# Connect to an external node

There are many usecases where not all nodes are running on the SettleMint platform. For example, you might want to connect to a node running on a different server, you might want to connect to a node running on a different blockchain platform or just for development purposes. In this guide, we will show you how to connect to an external node.

## Prerequisites

- A running Hyperledger Besu network on the SettleMint platform with at least one node hosted on either Amazon Web Services (AWS) or Microsoft Azure.
- For this guide we will use Docker and Docker Compose, but you can also use your own setup.
  - If you don't have Docker installed, you can find the installation instructions [here](https://docs.docker.com/get-docker/).
  - If you don't have Docker Composer installed, you can find the installation instructions [here](https://docs.docker.com/compose/install/).

## Step 1: Getting the genesis file

The genesis file of a network contains all the information about your network, including a list of bootnodes. This list is automatically updated upon each change you make in the platform. If you add or remove nodes it makes sense to redownload the file.

You can download the genesis file by going to the network details page and clicking on the genesis.json link in the Info box.

Create a folder (e.g. MyNetwork) on your computer and add the file into it:

```
MyNetwork
 |- genesis.json
```

## Step 2: Create the docker compose file

Create a docker-compose.yml file in the same folder:

```
MyNetwork
 |- genesis.json
 |- docker-compose.yml
```

Add the following content to the docker-compose.yml file:

```yaml
services:
  my-besu-node:
    # Not required but recommended to use the same version as your nodes on the platform
    image: hyperledger/besu:23.7.2
    volumes:
      # Mounts the genesis.json file into the container
      - ./genesis.json:/config/genesis.json
      # Mounts the data folder into the container, this will hold your actual blockchain data
      - ./data:/data
    ports:
      # Exposes the port for the JSON-RPC HTTP API on http://localhost:8454
      - 8545:8545
      # Exposes the port for the JSON-RPC WebSocket API on ws://localhost:8546
      - 8546:8546
      # Exposes the port for the GraphQL HTTP API on http://localhost:8547
      - 8547:8547
      # Exposes the port for the P2P connection between nodes
      - 30303:30303
      # Exposes the port for the P2P discovery mechanism between nodes
      - 30303:30303/udp
    entrypoint:
      - /opt/besu/bin/besu
      # More info on these options on https://besu.hyperledger.org/stable/public-networks/reference/cli/options
      - --Xdns-enabled=true
      - --Xdns-update-enabled=true
      - --genesis-file=/config/genesis.json
      - --data-path=/data
      - --tx-pool-retention-hours=999
      - --tx-pool-max-size=1024
      - --min-gas-price=0
      - --random-peer-priority-enabled=true
      - --host-allowlist="*"
      - --rpc-http-enabled=true
      - --rpc-http-host=0.0.0.0
      - --rpc-http-port=8545
      - --rpc-http-api=DEBUG,ETH,ADMIN,WEB3,IBFT,NET,TRACE,EEA,PRIV,QBFT,PERM,TXPOOL,PLUGINS
      - --rpc-http-cors-origins=all
      - --rpc-http-authentication-enabled=false
      - --revert-reason-enabled=true
      - --rpc-http-max-active-connections=1000
      - --graphql-http-enabled=true
      - --graphql-http-host=0.0.0.0
      - --graphql-http-port=8547
      - --graphql-http-cors-origins=all
      - --rpc-ws-enabled=true
      - --rpc-ws-host=0.0.0.0
      - --rpc-ws-port=8546
      - --rpc-ws-api=DEBUG,ETH,ADMIN,WEB3,IBFT,NET,TRACE,EEA,PRIV,QBFT,PERM,TXPOOL,PLUGINS
      - --rpc-ws-authentication-enabled=false
      - --rpc-ws-max-active-connections=1000
      - --logging=INFO
      - --nat-method=DOCKER
```

## Step 3: Start your node

```bash
docker compose up -d
```

Your node will now search for peers and connect to them. You can check the logs to see if it is working correctly:

```
mynetwork-my-besu-node-1  | 2023-09-12 12:07:13.576+00:00 | nioEventLoopGroup-3-2 | INFO  | FullSyncTargetManager | Unable to find sync target. Currently checking 3 peers for usefulness
```

When it connects, it will sync the chain locally and stay up to date from now on

```
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.023+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 200 (0x654418ab6edb96d7cf25f2e4a5955810b09dbb59b0e1cf018f0673b824356b31), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.215+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 400 (0xa9e9c3c0a085fb1afb3bbf178a2f5dd8ed0bcee0600e50c31bda41ba4d0cab98), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.360+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 600 (0xbf6353b60120d11fe964f233fd1b0c9d383c550cd038b70c3f6d60fb7704e528), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.499+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 800 (0x1915c4a8ca9a7bbf8058459156cbd8232c59fb119fae535e64782fc9c6e0c453), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.626+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 1000 (0x9fbecae6acfb202d45d60e970ff3a10136b2dadca7888f0caffdb4f8406b99a6), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.754+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 1200 (0x13603e5902fa92f08d27d28a5d3e194099b770eb5f3cea070853a7e6a2dcd88c), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.873+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 1400 (0x31d888a5f6b4fc2deb9f519e3c596d5eb89656e408d448692e073e9efcebc390), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:19.985+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 1600 (0x55a27a108fa2b6eeb7b8a2b74b3736f051955e20f0aefa1938827bfd860e3e7a), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.093+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 1800 (0x151cec20ab87e2ab54752464128cefbbbc295e1817b3f2ed663a4091b2434df6), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.195+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 2000 (0x1ee6a31c0e6d79ea9bb4e616214671951c73846e6e2b1a5e2e4fa1b51ac11144), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.308+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 2200 (0xddf8d8e64c38892206a527bc32302401b52642a777524c65d5d558018fee3ea6), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.420+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 2400 (0x7ef25e58acc437a6a7472b5fe7423b0b966e4ac4dc7cc843366603dae84c4765), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.539+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 2600 (0x86358a90b88cebafb88f9a1725218c42eac66fe0675c42d0387c0cf0cda31db1), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.659+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 2800 (0x5734a0cac8304fc157c8a4fafb55073094f036c9b8ac6ca3eb6fbd73428e12e8), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.774+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 3000 (0xd32ba1c77e7f3850b75cab37b561831bcf57d59e67f0873ed75f8f3b63c3946c), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:20.892+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 3200 (0x29391cee08c1c04323f9fd66cbd3d6475b54ecad246ab1f53e0d693327d2bb56), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:21.021+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 3400 (0xb6ed5326cc98bbdf43cdbf62ce766df13f8b8120d9506346b55c20739cc3288b), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:21.126+00:00 | EthScheduler-Services-5 (importBlock) | INFO  | FullImportBlockStep | Import reached block 3600 (0xeda0eb9d0853d3f9bff2da577772914c72b38c29bd9cfc9b90a9b92a0e6f9f8f), - Mg/s, Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:32.042+00:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #3,729 / 0 tx / 0 om / 0 (0.0%) gas / (0xb5c7eeea2ad6b7c7cd32f7af950f3651e0063007349346213cf441b144dff5ac) in 0.008s. Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:07:47.219+00:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #3,730 / 0 tx / 0 om / 0 (0.0%) gas / (0x555663fe3f7a47ea06e4d9f510d1d7c9c34da68659853a170c9fcd817d268e9b) in 0.001s. Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:08:02.068+00:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #3,731 / 0 tx / 0 om / 0 (0.0%) gas / (0xae4e049605e4fa1de5f15f3e48cd99de7c0b319c9f1d7bd20a613de06d5a129a) in 0.003s. Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:08:17.069+00:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #3,732 / 0 tx / 0 om / 0 (0.0%) gas / (0x085ba2ebec981dd69230a13e8e2301a9f0d4318bdf376850e51b1f9e79e51c11) in 0.001s. Peers: 3
mynetwork-my-besu-node-1  | 2023-09-12 12:08:32.009+00:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #3,733 / 0 tx / 0 om / 0 (0.0%) gas / (0xf4b63cfcdca4a83e8810361e03de158b827e4d2850ccc65fc70310d4f6963fcc) in 0.005s. Peers: 3
```

## Step 4: Validators

This is a dangerous step that can break your network without a way to recover. You can assign this new node as a validator in the platform. This will make it sign blocks and transactions. Note that more than 66% of your validators need to be online for the network to keep functioning.

Execute [ibft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#ibft_proposevalidatorvote) on all your validator nodes. You can find the enode address of your new node in the logs of the container or by executing [admin_nodeInfo](https://besu.hyperledger.org/stable/public-networks/reference/api#admin_nodeinfo).

Similarily you can make a platform validator a regular node by executing [ibft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#ibft_proposevalidatorvote) with proposal "false" on every validator node. Note however that the platform will not reflect this change.
