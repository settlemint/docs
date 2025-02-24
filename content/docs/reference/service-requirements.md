---
title: Service Requirements
description: Resource requirements for blockchain services that can be deployed on the platform
---

# Service Requirements

This document outlines the resource requirements for various services that can be deployed on the platform. Each service is available in different tiers and deployment modes to suit your needs.

:::info Self-Hosted Installations
For self-hosted installations, when calculating infrastructure requirements, you should only consider the **Dedicated** mode specifications. Shared mode is only applicable for cloud-hosted deployments.
:::

## Deployment Modes

Services can be deployed in two modes:

- **Dedicated**: Provides isolated resources for maximum performance and security
- **Shared**: Offers cost-effective resource sharing while maintaining service quality

Each mode comes in three sizes:

- **Small**: For testing and development environments
- **Medium**: For production environments with moderate load
- **Large**: For high-performance production environments

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="services" queryString defaultValue="blockchain">
  <TabItem value="blockchain" label="Blockchain Nodes">

## Public Networks

### Avalanche

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Fuji (Testnet) Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### Polygon

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Mumbai (Testnet) Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Amoy Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### BSC

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Testnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### Fantom

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Testnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### Soneium

- **Minato Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### Arbitrum

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Testnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

### Optimism

- **Mainnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

- **Testnet Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 0.5         | -            | 10  |
| Medium | Dedicated | 1.5         | 1.0         | -            | 20  |
| Large  | Dedicated | 2.25        | 1.5         | -            | 30  |

## Permissioned Networks

### Hyperledger Besu

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

### Quorum

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

### Polygon Edge

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

### Hyperledger Fabric

- **CA Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

- **Orderer Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

- **Peer Node**

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |

  </TabItem>
  <TabItem value="smartcontracts" label="Smart Contract Sets">

### Solidity Smart Contract Set

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 2.0         | 1.0         | 10           | -   |
| Medium | Dedicated | 4.0         | 2.0         | 20           | -   |
| Large  | Dedicated | 6.0         | 3.0         | 30           | -   |
| Small  | Shared    | 2.0         | 1.0         | 10           | -   |
| Medium | Shared    | 4.0         | 2.0         | 20           | -   |
| Large  | Shared    | 6.0         | 3.0         | 30           | -   |

  </TabItem>
  <TabItem value="middleware" label="Middleware Services">

### Attestation Indexer

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 1.0         | 1.0         | 5            | 20  |
| Medium | Dedicated | 2.0         | 2.0         | 10           | 30  |
| Large  | Dedicated | 3.0         | 3.0         | 20           | 40  |
| Small  | Shared    | 1.0         | 1.0         | 5            | 20  |
| Medium | Shared    | 2.0         | 2.0         | 10           | 30  |
| Large  | Shared    | 3.0         | 3.0         | 20           | 40  |

### Graph Middleware

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 3.0         | 3.0         | 100          | 10  |
| Medium | Dedicated | 6.0         | 6.0         | 200          | 20  |
| Large  | Dedicated | 9.0         | 9.0         | 300          | 30  |
| Small  | Shared    | 3.0         | 3.0         | 100          | 10  |
| Medium | Shared    | 6.0         | 6.0         | 200          | 20  |
| Large  | Shared    | 9.0         | 9.0         | 500          | 30  |

### Smart Contract Portal

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 1.0         | 1.0         | 5            | 20  |
| Medium | Dedicated | 2.0         | 2.0         | 10           | 30  |
| Large  | Dedicated | 3.0         | 3.0         | 20           | 40  |
| Small  | Shared    | 1.0         | 1.0         | 5            | 20  |
| Medium | Shared    | 2.0         | 2.0         | 10           | 30  |
| Large  | Shared    | 3.0         | 3.0         | 20           | 40  |

### Firefly Fabconnect

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.25        | 0.25        | 5            | 20  |
| Medium | Dedicated | 0.5         | 0.5         | 10           | 30  |
| Large  | Dedicated | 0.75        | 0.75        | 20           | 40  |
| Small  | Shared    | 0.25        | 0.25        | 5            | 20  |
| Medium | Shared    | 0.5         | 0.5         | 10           | 30  |
| Large  | Shared    | 0.75        | 0.75        | 20           | 40  |

  </TabItem>
  <TabItem value="integrations" label="Integration Services">

### Integration Studio

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 1.0         | 2.0         | 5            | 10  |
| Medium | Dedicated | 2.0         | 4.0         | 10           | 20  |
| Large  | Dedicated | 3.0         | 6.0         | 20           | 30  |
| Small  | Shared    | 1.0         | 2.0         | 5            | 10  |
| Medium | Shared    | 2.0         | 4.0         | 10           | 20  |
| Large  | Shared    | 3.0         | 6.0         | 20           | 30  |

### Hasura

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 1.0         | 2.0         | 20           | 10  |
| Medium | Dedicated | 2.0         | 4.0         | 50           | 20  |
| Large  | Dedicated | 3.0         | 6.0         | 100          | 30  |
| Small  | Shared    | 1.0         | 2.0         | 20           | 10  |
| Medium | Shared    | 2.0         | 4.0         | 50           | 20  |
| Large  | Shared    | 3.0         | 6.0         | 100          | 30  |

  </TabItem>
  <TabItem value="insights" label="Insights Services">

### Blocksout Explorer

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 1.0         | 2.0         | 20           | 10  |
| Medium | Dedicated | 2.0         | 4.0         | 50           | 20  |
| Large  | Dedicated | 3.0         | 6.0         | 100          | 30  |
| Small  | Shared    | 1.0         | 2.0         | 20           | 10  |
| Medium | Shared    | 2.0         | 4.0         | 50           | 20  |
| Large  | Shared    | 3.0         | 6.0         | 100          | 30  |

### Otterscan

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.75        | 1.25        | 10           | 10  |
| Medium | Dedicated | 1.5         | 2.5         | 100          | 20  |
| Large  | Dedicated | 2.25        | 3.75        | 500          | 30  |
| Small  | Shared    | 0.75        | 1.25        | 10           | 10  |
| Medium | Shared    | 1.5         | 2.5         | 100          | 20  |
| Large  | Shared    | 2.25        | 3.75        | 500          | 30  |

  </TabItem>
  <TabItem value="custom" label="Custom Deployments">

### Custom Deployments

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.5         | 0.5         | -            | 50  |
| Medium | Dedicated | 1.0         | 1.0         | -            | 100 |
| Large  | Dedicated | 2.0         | 2.0         | -            | 150 |
| Small  | Shared    | 0.5         | 0.5         | -            | 50  |
| Medium | Shared    | 1.0         | 1.0         | -            | 100 |
| Large  | Shared    | 2.0         | 2.0         | -            | 150 |

  </TabItem>
  <TabItem value="storage" label="Storage Services">

### Minio Storage

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.5         | 1.0         | 10           | 10  |
| Medium | Dedicated | 1.0         | 2.0         | 50           | 20  |
| Large  | Dedicated | 1.5         | 3.0         | 100          | 30  |
| Small  | Shared    | 0.5         | 1.0         | 10           | 10  |
| Medium | Shared    | 1.0         | 2.0         | 50           | 20  |
| Large  | Shared    | 1.5         | 3.0         | 100          | 30  |

### IPFS Storage

| Size   | Mode      | CPU (cores) | Memory (GB) | Storage (GB) | RPS |
| ------ | --------- | ----------- | ----------- | ------------ | --- |
| Small  | Dedicated | 0.5         | 1.0         | 10           | 10  |
| Medium | Dedicated | 1.0         | 2.0         | 50           | 20  |
| Large  | Dedicated | 1.5         | 3.0         | 100          | 30  |
| Small  | Shared    | 0.5         | 1.0         | 10           | 10  |
| Medium | Shared    | 1.0         | 2.0         | 50           | 20  |
| Large  | Shared    | 1.5         | 3.0         | 100          | 30  |

  </TabItem>
</Tabs>

---

## Resource Allocation Notes

- CPU resources are measured in cores
- Memory is measured in GB
- Storage is measured in GB (when applicable)
- RPS indicates Requests Per Second capacity
- Some services don't require persistent storage (indicated by "-")

:::tip Sizing Recommendation
For production environments, we recommend:

- Starting with Medium size for moderate workloads
- Using Dedicated mode for critical infrastructure
- Planning for 30% additional capacity for growth
  :::
