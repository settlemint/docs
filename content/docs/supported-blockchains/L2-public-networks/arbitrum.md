---
title: "Arbitrum"
---

Arbitrum was launched in August 2021 by Offchain Labs, and has its own
cryptocurrency since March 2023 called ARB. It is a layer 2 scaling solution for
Ethereum that focusses on security, scalability and compatibility. Arbitrum uses
optimistic rollup technology to process transactions off-chain, which allows it
to offer significantly faster transaction speeds and lower fees than Ethereum
mainnet. It uses AVM (Arbitrum Virtual Machine) which is a custom virtual
machine that was created for the Arbitrum Layer 2 scaling solution. The AVM is
designed to be fully compatible with the Ethereum Virtual Machine (EVM), but it
also includes a number of optimizations that make it more efficient and
scalable. In addition to scalability and compatibility, Arbitrum is also focused
on decentralization. The Arbitrum network is secured by a decentralized network
of validators, and it is governed by a DAO (decentralized autonomous
organization). This ensures that Arbitrum is not controlled by any single
entity.

## Mainnet and Testnet

SettleMint supports, the **Arbitrum One Mainnet** and the **Arbitrum Testnet** .

The Mainnet is the primary public Arbitrum production blockchain, where
actual-value transactions take place. Each transaction requires payment of a
transaction fee, payable in the native coin ARB. The Testnet is an instance of
the blockchain to be used for testing and experimentation. There are also coins
used in the Testnet but they have no value, so there is no risk of real fund.

You can consider the Testnet as a prototype and the Mainnet as the official
production blockchain. Or think of this as an analog to production versus
staging servers.

## Consensus mechanism

The Arbitrum consensus algorithm is a hybrid system that combines **optimistic
rollups** with a **sequencer**. Optimistic rollups assume that all transactions
are valid unless proven otherwise, which allows transactions to be processed
off-chain, resulting in faster and cheaper transactions.

The sequencer is a node that is responsible for proposing batches of
transactions to the Arbitrum network. The sequencer is not trusted by the
network, and any node can challenge the sequencer's proposal if they believe
that it contains invalid transactions.

The Arbitrum consensus algorithm is scalable, secure, and decentralized. However
currently it has a seven-day withdrawal period and relies on a centralized
sequencer, but the team is looking into creating a decentralized sequencer and
reduce the withrawal period to two days.

More information can be found on the
[official Arbitrum website](https://docs.arbitrum.io/intro/).
