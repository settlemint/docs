---
title: "Optimism"
---

# The basics

Optimism was launched in March 2021 by Optimism PBC, and has its own
cryptocurrency since May 2022 called OP. It is a layer 2 scaling solution for
Ethereum that focusses on security, scalability and ease-of-use. Optimism uses
optimistic rollup technology to process transactions off-chain, which allows it
to offer significantly faster transaction speeds and lower fees than Ethereum
mainnet. It uses Ethereum Virtual Machine (EVM), which means that developers can
deploy their existing Ethereum dapps to Optimism without any changes. In
addition to scalability and compatibility, Optimism is also focused on
decentralization. The Optimism network is secured by a decentralized network of
validators, and it is governed by a DAO (decentralized autonomous organization).
This ensures that Optimism is not controlled by any single entity.

## Mainnet and Testnet

SettleMint supports, the **OP Mainnet** and the **OP Goerlli Testnet**.

The Mainnet is the primary public Optimism production blockchain, where
actual-value transactions take place. Each transaction requires payment of a
transaction fee, payable in the native coin OP. The Testnet is an instance of
the blockchain to be used for testing and experimentation. There are also coins
used in the Testnet but they have no value, so there is no risk of real fund.

You can consider the Testnet as a prototype and the Mainnet as the official
production blockchain. Or think of this as an analog to production versus
staging servers.

## Consensus mechanism

The Optimism consensus algorithm is a hybrid system that combines **optimistic
rollups** with a **sequencer**. Optimistic rollups assume that all transactions
are valid unless proven otherwise, which allows transactions to be processed
off-chain, resulting in faster and cheaper transactions.

The sequencer is a node that is responsible for proposing batches of
transactions to the Arbitrum network. The sequencer is not trusted by the
network, and any node can challenge the sequencer's proposal if they believe
that it contains invalid transactions.

The Optimism consensus algorithm is scalable, secure, and decentralized.
However, it has a seven-day withdrawal period and relies on a centralized
sequencer.

More information can be found on the
[official Optimism website](https://console.optimism.io/).
