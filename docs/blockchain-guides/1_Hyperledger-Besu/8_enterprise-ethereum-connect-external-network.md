# Connect to an external network

The SettleMint platform seamlessly integrates with existing external networks. You can deploy nodes on your external network within the SettleMint platform. This enables you to take advantage of the platform's robust features - monitoring, resource scaling, an intuitive JSON-RPC UI, and reliable uptime management among others.

## Prerequisites

- A Quorum OBFT or Hyperledger Besu Network
- The genesis file of the network
- Atleast one enode URL of an existing running node on the network to connect to

## Join a network

1. Navigate to the create network form, you can see how to do this [here](../../using-platform/1_add-a-network-to-an-application.md).
2. Select **Join permissioned network**
3. Choose **Hyperledger Besu or Quorum**, depending on the network you want to join
4. Enter a name for the network and the node. This is name used for identifying the network in the platform.
5. Upload the genesis file of the network. If there are bootnodes specified in the genesis file, they will automatically be pre-filled in the form.
6. Add an enode URL of atleast one existing running node on the network to connect to.
7. Choose the deployment plan. This deployment plan will be used for the node you are adding. For more information about deployment plans, [see here](../../using-platform/22_deployment-plans.md).

This will create a new node in your existing network, and run it as a non-validator.

TODO: image

## Adding more nodes

You can add more nodes to your network by navigating to the create node form, and selecting the network created in the previous step to create nodes in.

You can choose to add the new nodes as validators or non-validators. However, to successfully add new nodes as validators, we first need to have a majority of validators running on the platform, then adding new nodes as validators will be possible.

## Adding a validator in the platform

Until a majority of validators are running on the platform, you need to vote on the nodes running externally to add the platform node as a validator.

You can do this by executing [ibft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#ibft_proposevalidatorvote) on all your validator nodes. You can find the enode address of the platform node in the details tab of the node:

TODO: image

## Removing a validator in the platform

Similarily you can make a platform validator a regular node by executing [ibft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#ibft_proposevalidatorvote) with proposal "false" on every validator node.

## Node type conflict warning

When we add the node as a non-validator on the platform, but it is running as a validator on the network, or vice-versa, the platform shows a node type conflict warning.

Here you have the option to update the node type in the platform to match the node type on the network.

TODO: image

If you wish to run the node with the type chosen by the platform, you need to add or remove the node as a validator on the network using the steps mentioned above. The platform will then automatically resolve the node type conflict warning soon.
