---
title: "Ethereum"
---

Ethereum is one of the most popular public blockchains. It has its own
cryptocurrency, called Ether (ETH) or Ethereum, and its own native programming
language called Solidity to build and publish dApps (distributed applications)
on the Ethereum blockchain.

## Mainnet and Testnet

cle SettleMint supports, the Ethereum **Mainnet**, the **Sepolia Testnet** and
the **Holesky Testnet**.

The Mainnet is the primary public Ethereum production blockchain, where
actual-value transactions take place. Each transaction requires payment of a
transaction fee, payable in the native coin ETH. The Testnet is an instance of
the blockchain to be used for testing and experimentation. There are also coins
used in the Testnet but they have no value, so there is no risk of real fund.

You can consider the Testnet as a prototype and the Mainnet as the official
production blockchain. Or think of this as an analog to production versus
staging servers.

## Geth client

In order to participate in a blockchain, you need some form of client software
that implements the features required to run a node. SettleMint uses **Geth**
which is the official Ethereum client, written in the programming language Go,
and fully open source. While there are other clients (like Parity), Geth can be
seen as the de facto reference implementation for running an Ethereum node. It
is the most widespread client with the biggest user base and variety of tooling
for developers.

More information on Geth can be found on the
[official Geth website](https://geth.ethereum.org/).

## Consensus mechanism

Proof of Stake (PoS) is Ethereum's new consensus mechanism. In PoS, nodes are
chosen to validate transactions and create new blocks based on the amount of
Ether they hold and lock up as a stake. This means that the more Ether a node
stakes, the higher its chances of being chosen to validate transactions and earn
rewards for its work.

Unlike Proof of Work (PoW), which requires miners to perform computationally
intensive tasks, PoS relies on the concept of "finality" – the idea that once a
block is added to the blockchain, it is irreversible and has been "finalized."
This makes the PoS consensus mechanism more energy-efficient than PoW.

Validators are chosen to participate in block validation based on a randomized
algorithm that takes into account their staked Ether. This collateral can be
slashed if they misbehave or act maliciously. The PoS consensus mechanism is
currently being implemented on the Ethereum mainnet chain as well as Goereli
testnet.

More information on the consensus mechanism can be found on the
[official Ethereum website](https://ethereum.org/en/developers/docs/consensus-mechanisms/).
