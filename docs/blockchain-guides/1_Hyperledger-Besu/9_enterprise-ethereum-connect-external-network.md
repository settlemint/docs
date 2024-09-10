# Connect to an external network

The SettleMint platform seamlessly integrates with existing external networks. You can deploy nodes on your external network within the SettleMint platform. This enables you to take advantage of the platform's robust features - monitoring, resource scaling, an intuitive JSON-RPC UI, reliable uptime management among others.

## Prerequisites

- A Hyperledger Besu or Quorum OBFT network
- The genesis file of the network
- At least one enode URL of an existing running node on the network. This is needed to sync the existing network with the platform node.

## Join a network

1. Navigate to the create network form, you can [see how to do this here](../../using-platform/1_add-a-network-to-an-application.md).
2. Select **Join permissioned network**
3. Choose **Hyperledger Besu** or **Quorum** depending on the network you want to join
4. Enter a name for the network and the node. These names are used for identifying the network and node in the platform.
5. Upload the genesis file of the network. If there are bootnodes specified in the genesis file, they will automatically be identified and added as external nodes.
6. Add at least one enode URL of an existing running node on the network to connect with. Note that if a bootnode is specified in the genesis file, it will be added as an external node automatically, so you can skip this step.
7. Choose the deployment plan. This deployment plan will be used for the node. For more information about deployment plans, [see here](../../using-platform/22_deployment-plans.md).

This will create a new node in your existing network, and run it as a non-validator.

## Adding nodes

You can add more nodes to your network by navigating to the create node form (for more details on creating a node, [refer to this guide](../../using-platform/2_add-a-node-to-a-network.md)). Here, you can choose to create the nodes as validators or non-validators. However, to successfully deploy nodes as validators, you first need to have a majority of validators running on the platform. A majority of validators is defined as 66% of the total validators on the network.

You can have a majority of validators running on the platform by first, creating the nodes as non-validators, and then sending votes on the externally running validator nodes to add the platform node as a validator. For more details, see [adding a validator in the platform](#adding-a-validator-in-the-platform).

Deploying a new node as a validator will fail if a majority of validators are not running on the platform.

Once there is a majority of validators running on the platform, deploying new nodes as validators is possible without having to vote on externally running nodes. We recommend you to have a majority of validators running on the platform to be able to seamlessly add and remove validators from the network.

## Adding a validator in the platform

Unless there are a majority of validators running on the platform, you need to send votes on the externally running validator nodes to add the platform node as a validator.

You can do this by executing:

- For Hyperledger Besu: [qbft_proposeValidatorVote](https://besu.hyperledger.org/development/private-networks/reference/api#qbft_proposevalidatorvote) on all your validator nodes.
- For Quorum: [istanbul_propose](https://docs.goquorum.consensys.io/reference/api-methods#istanbul_propose) on all your validator nodes.

You can find the enode URL of the platform node in the 'Details' tab of the node under the 'Node Identity' section. Once the vote is reflected in the network, restart the node in the platform. The node will be added as a validator and will start proposing blocks.

## Removing a validator in the platform

Similarily you can make a platform validator a non-validator by executing:

- For Hyperledger Besu: [qbft_proposeValidatorVote](https://besu.hyperledger.org/development/private-networks/reference/api#qbft_proposevalidatorvote) with proposal "false" on every validator node.
- For Quorum: [istanbul_propose](https://docs.goquorum.consensys.io/reference/api-methods#istanbul_propose) with proposal "false" on every validator node.

Once the vote is reflected in the network, restart the node in the platform. The node will be removed as a validator and will stop proposing blocks.

## Node type conflict warning

When there is a difference between the node type in the platform and the node type on the network, the platform shows a node type conflict warning.

This can happen when:

- The node is added as a non-validator on the platform, but it is running as a validator on the network.
- The node is added as a validator on the platform, but it is running as a non-validator on the network.

Here you can choose to update the node type in the platform to match the node type on the network. Alternatively, you can add or remove the node as a validator on the network using the steps mentioned above. The platform will then automatically resolve the node type conflict warning soon.
