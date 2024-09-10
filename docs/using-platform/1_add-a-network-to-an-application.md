---
title: Add a Blockchain Network
description: Guide to adding a Blockchain Network to your application
sidebar_position: 2
---

# Add a network to an application

Before setting up a blockchain network, make sure you have an application in place. You will always need to [create an application](0_create-an-application.md) first, as this is the context in which you organize networks, nodes, smart contract sets, etc.

## Permissioned and public blockchain networks

![Add A Blockchain Network](../../static/img/about-settlemint/add-network.png)

You can choose to **create a permissioned blockchain network** or **join a public blockchain network**, **join a permissioned blockchain network**, or an existing network in SettleMint **with an invitation code**.

In a public blockchain network, anyone is free to join and participate in the activities of the network. In a permissioned blockchain network (often called a consortium network), participants need to obtain permission to become part of the network. The owner of the network dictates who can or cannot join, and allocates a set of permissions to participants.

SettleMint supports **multiple protocols** for both types of networks. You can learn more about these protocols in the blockchain guides included in this documentation.

Permissioned networks:

- [Hyperledger Besu](../blockchain-guides/1_Hyperledger-Besu/1_enterprise-ethereum-the-basics.md)
- [Hyperledger Fabric](../blockchain-guides/5_Hyperledger-Fabric/1_hyperledger-fabric-the-basics.md)
- [Polygon Edge](../blockchain-guides/6_Polygon-Edge/1_polygon-edge-the-basics.md)

Public networks (Mainnets & Testnets):

- [Ethereum](../blockchain-guides/0_Ethereum/1_ethereum-the-basics.md)
- [Avalanche](../blockchain-guides/2_Avalanche/1_avalanche-the-basics.md)
- [Binance Smart Chain](../blockchain-guides/3_Binance-Smart-Chain/1_binance-smart-chain-the-basics.md)
- [Polygon](../blockchain-guides/4_Polygon/1_polygon-the-basics.md)

Joining a permissioned network:
TODO: link to connect to external network

Joining a network with an invitation code:

- [How to join an existing network in SettleMint with an invitation code](./4_join-a-network-by-invitation.md). For more information on how to invite network participants, see [how to invite network participants](./3_invite-network-participants.md).

## How to add a blockchain network

This section describes the general flow for setting up a blockchain network. For protocol-specific information, we refer to the relevant sections in the blockchain guides.

Navigate to the **application** in which you will create the network. You can get there by clicking the **grid icon** in the upper right corner, and then clicking the **application name** to go to the application dashboard.

The application dashboard is still empty. This will change once you added your first blockchain network and node. Click **Start here**, or click **Blockchain networks** in the left navigation.

Click **Add blockchain network**. This opens a form.

Follow these steps to set up the blockchain network:

1. First **select the protocol** of your choice and click **Continue**.
2. Choose a **network name** and a **node name**. Choose names that are easily recognizable in your dashboards. If you are joining a public network, you do not need to provide a network name.

:::info Note

Your network needs minimum 1 validating node to be operational. Therefore, we will already deploy 1 validating node to your network. You can [add more nodes](2_add-a-node-to-a-network.md) later.

:::

1. Choose a **deployment plan**. Select the type, cloud provider, region and resource pack. [More about deployment plans](../launch-platform/managed-cloud-deployment/13_deployment-plans.md)
2. Only for [Hyperledger Besu](../blockchain-guides/1_Hyperledger-Besu/2_enterprise-ethereum-network-settings.md) and [Hyperledger Fabric](../blockchain-guides/5_Hyperledger-Fabric/2_hyperledger-fabric-network-settings.md), and optional: **Configure the network settings.** You can choose to keep the default settings, or configure them according to your own preferences. Be aware that these settings cannot be changed once your network is deployed.
3. You can see the **resource costs** associated with this network displayed at the bottom of the form. Click **Confirm** to add the network to your application.

The network is now added to the **blockchain network overview** with the status "deploying". When your network is fully deployed, the status will change to "running". This will only take a few minutes. You can click the network in the overview list to see detailed information, e.g. stats, usage metrics, logs, network participants, etc. Depending on the protocol, different network information will be available.

Navigate to the **Blockchain nodes** section of the application to see the **first node** that was deployed together with the network. You can click this node in the overview list to see detailed information, e.g. stats, usage metrics, connection info, logs, etc.

Depending on the protocol, different node information will be available.

Now you can start [adding more nodes](2_add-a-node-to-a-network.md).

## Manage a network

![Manage Network](../../static/img/about-settlemint/manage-network.png)

Navigate to the **application** in which the blockchain network is created. Click **Blockchain networks** in the left navigation, and then choose the network from the overview list.

Click **Manage network** to see the available actions. You can only perform these actions if you have administrator rights.

- **Leave Network** - Removes the network from the application
- **Pause Network** - Pauses the network from operation.
- **Upgrade or re-apply config** -Retry deploying the network or adds more resources.

:::warning Warning

You can only delete a blockchain network when it has no more resources (e.g. nodes, smart contract sets, etc.) related to it. Resources first have to be deleted one by one.

:::
