---
title: "Avalanche"
---

Avalanche was launched in 2020 by Ava Labs, and has its own cryptocurrency
called AVAX. It focuses on scalability, speed and low transactions costs.
Avalanche is fully compatible with Ethereum components, dApps (distributed
applications), and tooling.

## Mainnet and Testnet

SettleMint supports both the Avalanche **Mainnet** and the **Fuji Testnet**.

The Mainnet is the primary public Avalanche production blockchain, where
actual-value transactions take place. Each transaction requires payment of a
transaction fee, payable in the native coin AVAX. The Testnet is an instance of
the blockchain to be used for testing and experimentation. There are also coins
used in the Testnet but they have no value, so there is no risk of real fund.

You can consider the Testnet as a prototype and the Mainnet as the official
production blockchain. Or think of this as an analog to production versus
staging servers.

## X-Chain, C-Chain and P-Chain

Avalanche is somewhat unique, because its Mainnet is made up of three
blockchains: X-Chain, C-Chain, and P-Chain.

### X-Chain: Exchange Chain

This blockchain is used to create digital assets and carry out transactions,
which are paid in AVAX.

### C-Chain: Contract Chain

This blockchain runs smart contracts and is compatible with Ethereum.

### P-Chain: Platform Chain

This is the blockchain where anyone can create their own custom blockchain
network, called a subnet or subnetwork. A subnet is managed by its own
validators.

With each blockchain having different roles, Avalanche improves speed and
scalability compared to running all processes on just one chain.

## Consensus mechanism

A consensus mechanism defines the rules for the nodes in a blockchain network to
reach agreement on the current state of the blockchain ledger.

Avalanche uses a novel consensus mechanism that is close to Proof of Stake
(PoS), but that has its own specific characteristics. In fact, there are two
consensus mechanims, called **Avalanche** and **Snowman**.

The core concept of both is **random subsampling**. Validators randomly poll
other validators to determine whether a new transaction is valid. After a
certain amount of repeated random subsampling, it's statistically proven that it
would be almost impossible for a transaction to be false. This repeated sampling
happens extremely fast regardless of the number of validators in the network.
Any node that has staked AVAX can vote on every transaction, which makes the
network more robust and decentralized.

Avalanche and Snowman are quite similar, but support a different structure to
store data, in line with the different needs of the three specific blockchains.
The X-Chain uses the Avalanche consensus mechanism, while the C-Chain and the
P-Chain use the Snowman mechanism.

More information can be found on the
[official Avalanche website](https://build.avax.network/docs).
