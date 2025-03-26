---
title: "Hedera"
---

Hedera is a public distributed ledger technology (DLT) network that was launched
in August 2018 by Hedera Hashgraph, LLC. It uses the Hashgraph consensus
algorithm, which is a unique and novel approach to achieving consensus in a
distributed network. Hedera's native cryptocurrency is called HBAR, and it is
used to power the network's services, including smart contracts, file storage,
and regular transactions.

Hedera focuses on providing high throughput, low latency, and fair transaction
ordering, making it suitable for enterprise-grade applications. Unlike
blockchain-based systems, Hedera's Hashgraph algorithm ensures fast, fair, and
secure transactions without compromising decentralization.

## Mainnet and Testnet

SettleMint supports, the **Hedera Mainnet** and the **Hedera Testnet**.

The Mainnet is the primary public Hedera production network, where actual-value
transactions occur. Each transaction requires payment of a transaction fee,
payable in HBAR, the native cryptocurrency. The Testnet, on the other hand, is
an environment used for testing and experimentation. Testnet transactions use
test HBAR, which have no real-world value, ensuring no risk of real fund loss
during development and testing.

You can think of the Testnet as a sandbox for developers and the Mainnet as the
official production network. This setup is similar to the concept of production
versus staging servers in software development.

## Consensus mechanism

Hedera uses the Hashgraph consensus algorithm, which is based on a directed
acyclic graph (DAG). This algorithm provides several advantages:

    •	`High Throughput`: The network can process thousands of transactions per second.
    •	`Fairness`: Transactions are timestamped, ensuring fair ordering.
    •	`Security`: It achieves asynchronous Byzantine Fault Tolerance (aBFT), the highest level of security for a consensus algorithm.

In Hashgraph, each node in the network shares information (events) with other
nodes, and through a process called gossip-about-gossip and virtual voting,
consensus is reached efficiently and quickly. This method ensures that Hedera
remains decentralized and resilient against attacks while maintaining high
performance.

## JSON RPC Relay

The Hedera JSON-RPC Relay is an open-source project implementing the Ethereum
JSON-RPC standard. The JSON-RPC relay allows developers to interact with Hedera
nodes using familiar Ethereum tools. This allows Ethereum developers and users
to deploy, query, and execute contracts as they usually would.

Hedera's JSON RPC relay is a complex software component that relies on multiple
elements, including consensus nodes and the mirror node. This complexity can
lead to issues such as connection `timeouts`, especially during smart contract
deployments. One Ethereum transaction can generate more than ten Hedera
transactions, which increases the likelihood of encountering these problems.
However, these issues are typically limited to the initial contract deployment
phase. Once a contract is successfully deployed, subsequent contract calls
should not experience such problems.

More information can be found on the
[official Hedera website](https://hedera.com/).
