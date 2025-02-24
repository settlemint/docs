---
title: "Enterprise Ethereum Node Types"
---

# Node types

You can choose between 2 types of node:

**Validator node**
A validator node is a node that actively participates in the consensus mechanism of the network. It validates the correctness of transactions and creates new blocks. A validator node is a full node, meaning it holds a complete copy of the current state of the blockchain ledger.

**Non-validator node**
A non-validator node is node that does not actively participate in the consensus mechanism of the network. A non-validator node is also a full node.

SettleMint uses the IBFT (Istanbul Byzantine Fault Tolerant) 2.0 consensus mechanism for Hyperledger Besu networks. Byzantine fault tolerance is the ability for the network to function correctly and reach consensus, despite nodes failing or propagating incorrect information to peers.

All nodes running in SettleMint are configured to be **archive nodes**, meaning they all include all previous states of a given blockchain since its origin.

:::info Note

You need at least 4 validator nodes for your blockchain network to be Byzantine Fault Tolerant and continue operating if 1 validator node fails.

:::

[Learn here how to interact with your Hyperledger Besu node.](4_enterprise-ethereum-connect-to-a-node.md)
