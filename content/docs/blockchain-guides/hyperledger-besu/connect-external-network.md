---
title: "Connect to an External Network"
---

The SettleMint platform seamlessly integrates with existing external networks. You can deploy nodes on your external network within the SettleMint platform, enabling you to leverage the platform's robust features, including monitoring, resource scaling, an intuitive JSON-RPC UI, and reliable uptime management.

## Prerequisites

- A Hyperledger Besu or Quorum OBFT network
- The genesis file of the network
- At least one enode URL of an existing running node on the network (required to sync the platform node with the existing network)

## Joining a Network

1. Navigate to the create network form (see [how to do this here](../../using-platform/1_add-a-network-to-an-application.md)).
2. Select **Join permissioned network**.
3. Choose **Hyperledger Besu** or **Quorum** depending on the network you want to join.
4. Enter names for the network and the node.
5. Upload the network's genesis file. Bootnodes specified in the genesis file will be automatically identified and added as external nodes.
6. Add at least one enode URL of an existing running node on the network. Note: If a bootnode is specified in the genesis file, it will be added automatically as an external node, allowing you to skip this step.
7. Choose the deployment plan for the node. For more information about deployment plans, [see here](../../using-platform/21_deployment-plans.md).

This process will create a new non-validator node in your existing network.

## Adding Nodes

To add more nodes to your network:

1. Navigate to the create node form (see [Adding a Node to a Network](../../using-platform/4_add-a-node-to-a-network.md) for detailed instructions).
2. Choose between creating the node as a validator or non-validator.
3. Note: To deploy nodes as validators, a majority (66%) of validators must be running on the SettleMint platform.
4. If you don't have a majority, create the node as a non-validator first, then follow the process in [Add a Validator](#add-a-validator) to make it a validator.

Once a majority of validators are running on the platform, deploying new nodes as validators becomes possible without voting on external validators. We recommend having a majority of validators running on the platform for seamless addition and removal of validators from the network.

## Add a Validator

Unless a majority of validators are running on the platform, you need to send votes on the externally running validators to add the platform node as a validator.

Execute the following on all your validator nodes:

- For Hyperledger Besu: [qbft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#qbft_proposevalidatorvote)
- For Quorum: [istanbul_propose](https://docs.goquorum.consensys.io/reference/api-methods#istanbul_propose)

Find the enode URL of the platform node in the 'Details' tab of the node under the 'Node Identity' section. Once the vote is reflected in the network, restart the node in the platform. The node will be added as a validator and will start proposing blocks.

## Remove a Validator

To make a platform validator a non-validator, execute the following on every validator node:

- For Hyperledger Besu: [qbft_proposeValidatorVote](https://besu.hyperledger.org/stable/private-networks/reference/api#qbft_proposevalidatorvote) with proposal "false"
- For Quorum: [istanbul_propose](https://docs.goquorum.consensys.io/reference/api-methods#istanbul_propose) with proposal "false"

Once the vote is reflected in the network, restart the node in the platform. The node will be removed as a validator and will stop proposing blocks.

## Node Type Conflict Warning

The platform displays a node type conflict warning when there's a discrepancy between the node type in the platform and the node type on the network.

This can occur when:

- The node is added as a non-validator on the platform but runs as a validator on the network.
- The node is added as a validator on the platform but runs as a non-validator on the network.

To resolve this, you can either:

1. Update the node type in the platform to match the node type on the network, or
2. Add or remove the node as a validator on the network using the steps mentioned above.

The platform will automatically resolve the node type conflict warning shortly after the necessary changes are made.
