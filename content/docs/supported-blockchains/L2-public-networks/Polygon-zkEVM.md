---
title: "Polygon zkEVM"
---

Polygon zkEVM, introduced by the Polygon (formerly Matic) team in March 2023,
represents the latest advancement in Polygon's efforts to provide a Layer 2
scalability solution. Using cryptographic zero-knowledge proofs to offer
validity and quick finality to off-chain transaction computation, also known as
a ZK-Rollup. It is the first zkEVM to be fully equivalent to an EVM, meaning
that all existing smart contracts, developer toolings, and wallets work
seamlessly. Polygon zkEVM provides a complete EVM-like experience for developers
and users alike, with significantly lower transaction costs and higher
throughput than Ethereum.

## Mainnet and Testnet

SettleMint supports both the Polygon zkEVM **Mainnet** and the **Testnet**.

The Mainnet is the primary public Polygon zkEVM production blockchain, where
actual-value transactions take place. Polygon zkEVM does not have its own native
token. Instead, it uses MATIC, the native token of the Polygon network, for
transactions, gas fees, and other network activities. The Testnet is an instance
of the blockchain to be used for testing and experimentation. There are also
coins used in the Testnet but they have no value, so there is no risk of real
fund.

You can consider the Testnet as a prototype and the Mainnet as the official
production blockchain. Or think of this as an analog to production versus
staging servers.

## zkEVM

zkEVM stands for "zero-knowledge Ethereum Virtual Machine". It is a type of
Ethereum scaling solution that uses zero-knowledge proofs (ZKPs) to verify the
validity of transactions off-chain. This means that zkEVMs can process thousands
or even millions of transactions per second, with very low fees.

ZKPs are a cryptographic technique that allows someone to prove that they know a
piece of information without revealing the information itself. In the context of
zkEVMs, ZKPs are used to prove that a batch of transactions has been processed
correctly, without revealing the individual transactions in the batch.

Here are some of the benefits of zkEVMs:

- **Scalability**: zkEVMs can process thousands or even millions of transactions
  per second, which is much faster than Ethereum's current throughput.
- **Low fees**: zkEVMs can significantly reduce transaction fees, making
  Ethereum more affordable to use.
- **Security**: zkEVMs are just as secure as Ethereum, as they use the same
  underlying blockchain technology.
- **Compatibility**: zkEVMs are compatible with existing Ethereum smart
  contracts and wallets, so developers and users can start using them
  immediately.

In a nutshell, Polygon zkEVM allows you to use Ethereum with the scalability and
low fees of a Layer 2 solution.

## Consensus mechanism

The Polygon zkEVM consensus algorithm is a permissionless system that allows
anyone to participate in the process of validating and finalizing transactions.
It is based on a Proof of Efficiency (PoE) mechanism, which rewards participants
for their contributions to the network.

The Polygon zkEVM consensus algorithm works as follows:

1. **Sequencers** propose batches of transactions to the network.
2. **Validators** verify the validity of the proposed batches and generate
   proofs of correctness.
3. **Aggregators** aggregate the proofs from the validators and submit them to
   the Consensus Contract.
4. **The Consensus Contract** verifies the proofs and finalizes the
   transactions.

Sequencers, validators, and aggregators are all incentivized to participate in
the network by receiving rewards in MATIC, the native token of the Polygon
network.

The Polygon zkEVM consensus algorithm is designed to be secure, efficient, and
fair. It is also designed to be compatible with the Ethereum mainnet, so that
users can easily move their assets between the two networks.

More information on the consensus mechanism can be found on the
[official Polygon website](https://wiki.polygon.technology/docs/zkevm/architecture/).
