---
title: "The basics"
---

Enterprise Ethereum is the permissioned blockchain version of public Ethereum. The two major Enterprise Ethereum clients are **Hyperledger Besu and Quorum**. Both clients have implemented a permission layer, which only allows known nodes, designed specifically for use in a consortium environment, to join the network.

**Currently, SettleMint provides support for Hyperledger Besu.**

## What is Hyperledger Besu?

Hyperledger Besu is an open-source Ethereum client developed under the Apache 2.0 license and written in Java. It was started by the Linux Foundation under the Hyperledger umbrella project. This project is largely known for its Hyperledger Fabric component, which is one of the most prominent permissioned protocols in the blockchain space. While they both exist under the Hyperledger umbrella, Fabric and Besu have little in common in terms of the underlying technology. More specifically, whereas Fabric is a private protocol designed from the ground up to support enterprise-grade solutions, Besu seeks to utilize the public Ethereum network. Besu can run on the public network or on private networks, as well as on a number of testnets. The project, formerly known as Pantheon, joined the Hyperledger family in 2019, adding for the first time a public blockchain implementation to Hyperledger's suite of private blockchain frameworks.

## Features

Hyperledger Besu's main features include:

- **Permissioning**: Contrary to the Ethereum Mainnet, a permissioned network allows only specified nodes to join the network and to participate.
- **The Ethereum Virtual Machine (EVM)**: The EVM is what enables the deployment and execution of Ethereum smart contracts.
- **Privacy**: The Private Transaction Manager makes it possible to keep transactions between predefined parties private from other users of the network.
- **User-facing API**: The client provides mainnet Ethereum and EEA JSON-RPC APIs over HTTP and WebSocket protocols. It also supports a GraphQL API.

Hyperledger Besu's enterprise features are designed to adhere to the requirements of the [Enteprise Ethereum Alliance (EEA)](https://entethalliance.org/) client specification.

## Consensus mechanisms

A consensus mechanism defines the rules for the nodes in a blockchain network to reach an agreement on the current state of the blockchain ledger.

Besu comes with several consensus mechanisms. As an Ethereum implementation, Proof of Work (PoW) is a given, but the **Proof of Authority (PoA)** options are more suitable for enterprise projects. These can be used when participants know each other and there is a level of trust between them, e.g. in a permissioned consortium network.

PoA is a light and practical consensus mechanism that gives a small and designated number of blockchain actors the power to validate transactions within the network and to create new blocks. This results in faster block times and a much greater transaction throughput.

**SettleMint's Enterprise Ethereum networks always use the IBFT (Istanbul Byzantine Fault Tolerant) 2.0.**

In IBFT 2.0 networks, a group of nodes are selected to form the pool of validators. These nodes will be in charge of determining if a proposed block is suitable for addition to the chain. One of these validator nodes will be arbitrarily selected as the proposer. This single proposer, having received messages from the pool of validators, will decide what to add to the chain. This is presented as a proposed block to the other validators. Only if a majority (66% or more) of the validators deems the block valid will it be added to the ledger. At the end of each consensus round, the validators select a new proposer and the process is repeated. IBFT 2.0 has immediate finality. There are no forks and all valid blocks are included in the main chain.

When you deploy a Hyperledger Besu blockchain network on SettleMint, it should be Byzantine fault tolerance. [More about the number of nodes you need](3_enterprise-ethereum-node-types.md)

More information on Hyperledger Besu can be found in the official [Hyperledger Besu documentation](https://besu.hyperledger.org/en/stable/).
