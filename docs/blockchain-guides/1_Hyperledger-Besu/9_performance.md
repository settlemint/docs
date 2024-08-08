# Understanding Transactions Per Second (TPS) on a Besu Node

This document aims to provide a comprehensive overview of transaction throughput on a Hyperledger Besu node, explaining key concepts for readers who may not be familiar with blockchain technology.

## Factors Affecting Transaction Performance

Several crucial factors influence the transaction performance of a Besu node:

1. **Network Latency**: The time it takes for data to travel between nodes in the network and between the sender of the transaction and the node can significantly impact transaction speed.
2. **Cloud Provider**: Different cloud providers offer varying levels of performance, which can affect node operation.
3. **Resource Pack**: The selected resource pack determines the computational resources (CPU, RAM, storage) allocated to a node and the requests-per-second rate limit, both of which significantly impact performance and maximum throughput.

## Read vs. Write Transactions in Blockchain

In a blockchain context, particularly for Ethereum-based systems like Besu, transactions can be categorized into two types:

### Read Transactions

Read transactions, also known as "calls," do not modify the blockchain state. They retrieve information from the blockchain without consuming gas or requiring mining. Examples include checking an account balance or reading smart contract data.

Using the loadbalancer feature, traditional scaling methods (horizontal scaling) can be applied to scale beyond a single node. This means that multiple Besu nodes can be set up behind a loadbalancer, allowing for increased read transaction throughput by distributing the load across multiple nodes. This approach is particularly effective for read-heavy applications, as it allows for parallel processing of read requests across multiple nodes, significantly increasing the overall capacity of the system.

### Write Transactions

Write transactions, on the other hand, modify the blockchain state. They require gas, must be mined into a block, and permanently alter the blockchain's data. Examples include transferring tokens or updating smart contract state.

The process of executing a write transaction involves several time-consuming steps:

1. Transaction Preparation: This includes constructing the transaction object with the necessary parameters such as recipient address, value, and data.
2. Gas Estimation: Before sending a transaction, it's crucial to estimate the gas required. This involves a call to the node to simulate the transaction and determine the appropriate gas limit.
3. Nonce Management: Each account has a nonce that must be incremented sequentially for each transaction. Managing nonces, especially for high-frequency transactions, requires careful tracking and can introduce delays.
4. Transaction Signing: The transaction must be cryptographically signed. This can be done using Accessible Keys stored in Hashicorp Vault (in memory) or via AWS KMS. The signing process, while quick, adds to the overall transaction time.
5. Transaction Submission: Once prepared and signed, the transaction is submitted to the node's transaction pool.
6. Mining and Confirmation: Finally, the transaction must be picked up by a miner, included in a block, and confirmed by the network.

Each of these steps contributes to the overall time taken for a write transaction, impacting the achievable transactions per second. The complexity of these operations, especially when dealing with high volumes of transactions, underscores the difference in throughput between read and write operations in blockchain systems.

## Factors Affecting Write Transactions

Several elements influence the performance of write transactions:

1. **Block Time**: The average time between blocks being added to the chain affects how quickly transactions can be processed.
2. **Block Gas Limit**: This caps the total amount of computational work that can be done in a single block, limiting the number of transactions per block.
3. **Transaction Gas Usage**: Different transactions consume varying amounts of gas, affecting how many can fit into a block.
4. **Nonce Management**: In Ethereum-style transactions, each account has a nonce that must increment correctly for each transaction. This can impact the rate at which transactions from a single account can be processed.

## Real-World Benchmarks

To provide concrete performance metrics, we conducted several tests using a Besu node with the following configuration:

- Resource Pack: Large (rate limiter disabled)
- Cloud Provider: Google Cloud
- Location: Brussels
- Testing Location: Within Belgium, using a high-speed internet connection
- Volume: 100 virtual users over 30 seconds

### Read Transaction Performance

In our tests, a single Besu node was able to handle over 2,000 read requests per second. This high throughput is possible because read operations do not modify the blockchain state and do not require consensus.

### Write Transaction Performance

For write transactions, there are two scenarios. The first scenario involved sending pre-signed transactions using the `eth_sendRawTransaction` method. This approach bypasses the need for real-time transaction signing on the node, potentially reducing processing overhead. This method demonstrated impressive performance, achieving between 700 and 800 transactions per second (TPS).

This high throughput is attributed to the reduced computational load on the node, as it doesn't need to perform signature verification for each incoming transaction. However, it's important to note that while this method can significantly boost transaction throughput, it requires careful management of nonces and pre-signing of transactions, which may introduce additional complexity in the transaction preparation process.

For real-time signed transactions using `eth_sendTransaction`, without a nonce supplied in the call and all from a single address (the slowest possible scenario), we observed a lower but still significant throughput of over 120 TPS accepted by the node. This reduction in throughput compared to a multi-address scenario is due to the sequential nature of transactions from a single sender.

Each transaction from an address must use a unique, incrementing nonce value. This nonce tracking ensures transactions are processed in the correct order and prevents double-spending, but it also means that transactions from a single address cannot be processed in parallel. This bookkeeping is handled by the buit in transaction signer, which will also retry transactions in the case of a duplicate nonce.

The node must process each transaction sequentially, verifying and incrementing the nonce for each one, which naturally limits the throughput compared to transactions from multiple addresses that can be processed concurrently.

## Conclusion

These benchmarks demonstrate the high performance capabilities of Besu nodes on the SettleMint platform. However, it's crucial to remember that real-world performance can vary based on network conditions, node configuration, and the specific nature of the transactions being processed. Always consider these factors when designing and implementing your blockchain solution.
