---
title: "Fantom"
---

Fantom is a high-performance, scalable, and secure smart-contract platform
launched in December 2019. It is designed to overcome the limitations of older
blockchain platforms like Ethereum. Fantom's native cryptocurrency is called
FTM. The platform leverages a unique consensus mechanism known as Lachesis,
which allows it to process transactions much faster and at a lower cost compared
to traditional blockchains. Fantom is fully compatible with the Ethereum Virtual
Machine (EVM), enabling developers to deploy their existing Ethereum dApps on
Fantom without any changes. Beyond scalability and compatibility, Fantom
emphasizes decentralization. The network is secured by a decentralized network
of validators and governed through on-chain governance, ensuring it is not
controlled by any single entity.

## Mainnet and Testnet

SettleMint supports, the **Fantom Mainnet** and the **Fantom Testnet**.

The Mainnet is the primary public Fantom production blockchain where real-value
transactions occur. Each transaction requires payment of a transaction fee,
payable in the native coin FTM. The Testnet, on the other hand, is an instance
of the blockchain used for testing and experimentation. The coins used in the
Testnet have no real value, mitigating the risk of losing real funds.

You can consider the Testnet as a prototype environment and the Mainnet as the
official production blockchain, similar to the analogy of staging versus
production servers.

## Consensus mechanism

The Fantom consensus algorithm is known as Lachesis, a unique asynchronous
Byzantine Fault Tolerant (aBFT) protocol. Lachesis does not rely on leaders to
propose blocks, allowing it to provide high throughput and fast finality.
Transactions on the Fantom network are confirmed in about 1-2 seconds.

Lachesis works as follows:

    1.	**Asynchronous**: Transactions are processed asynchronously, meaning that validators do not need to wait for the previous transaction to be completed before starting a new one.
    2.	**Byzantine Fault Tolerant**: The protocol can achieve consensus even if up to one-third of the nodes act maliciously.
    3.	**Finality**: Transactions achieve finality within a few seconds, making them irreversible once confirmed.

The Lachesis consensus algorithm is scalable, secure, and decentralized,
providing a robust foundation for decentralized applications.

More information can be found on the
[official Fantom website](https://fantom.foundation/).
