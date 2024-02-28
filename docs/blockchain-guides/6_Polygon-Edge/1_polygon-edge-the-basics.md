# The basics

Polygon Edge is a modular and extensible framework developed by Polygon Technology. Its primary purpose is to bootstrap new Ethereum-compatible blockchain networks. Similar to Hyperledger Besu, a Polygon Edge network can either be permissioned or public. On SettleMint, all Polygon Edge networks are permissioned which means that only a set of specified nodes can join the network.

## Features

Polygon Edge's main features include:

- **Permissioning**: Only specified nodes can join and participate in the network.
- **Ethereum compatible**: A Polygon Edge network is fully compatible with Ethereum smart contracts and transactions.
- **Support for industry standard wallets**: Users are able to interact with industry standard wallets through JSON-RPC.
- **Cross-chain communication**: Transfer assets to and from any Ethereum-compatible network, i.e Ethereum or Polygon thanks to the native [ChainBridge](https://wiki.polygon.technology/docs/edge/additional-features/chainbridge/overview/).

## Consensus mechanism

A consensus mechanism defines the rules for the nodes in a blockchain network to reach an agreement on the current state of the blockchain ledger.

Polygon Edge supports two versions of the Istanbul Byzantine Fault Tolerant IBFT consensus mechanism: **Proof of Stake (PoS)** or **Proof of Authority (PoA)**. Any Polygon Edge network deployed with SettleMint uses **Proof of Authority**.

You can find more information on Polygon Edge in the official [documentation](https://wiki.polygon.technology/docs/edge/)
