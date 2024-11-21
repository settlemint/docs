---
title: Infrastructure Requirements
sidebar_position: 2
description: Infrastructure requirements for self-hosting the platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Infrastructure Requirements

:::caution
The requirements listed below are for the core platform components only. Additional resources will be needed for prerequisites and services you plan to deploy.
:::

## Compute Resources

<Tabs>
  <TabItem value="minimum" label="Minimum Requirements" default>

* **CPU**: 4 cores
* **RAM**: 16GB
* **Storage**: 100GB SSD

:::note
Minimum requirements are suitable for testing and development environments only.
:::

  </TabItem>
  <TabItem value="recommended" label="Recommended Specifications">

* **CPU**: 8+ cores
* **RAM**: 32GB
* **Storage**: 250GB+ SSD

:::tip
These specifications provide headroom for growth and better performance.
:::

  </TabItem>
</Tabs>

## Network Requirements

The platform requires specific network configurations to ensure secure and reliable communication between components:

<div className="row">
<div className="col col--6">

### Connectivity
* **Internet Access**: Required for pulling container images and updates
* **Load Balancer**: For distributing traffic across nodes
* **Ingress Controller**: For routing external traffic
* **SSL/TLS**: Valid certificates for secure communication

</div>
<div className="col col--6">

### Required Ports
* **80/443**: HTTP/HTTPS traffic
* **6443**: Kubernetes API server
* **30000-32767**: NodePort services range
* **10250**: Kubelet API
* **179**: Calico BGP (if using Calico)

</div>
</div>

:::note Network Security
We recommend implementing network policies and security groups to control traffic flow between components.
:::

## Storage Requirements

Proper storage configuration is crucial for platform stability and performance. Consider the following requirements:

<div className="row">
<div className="col col--6">

### Performance Requirements
* **Type**: SSD storage required for all components
* **IOPS**: Minimum 3000 IOPS for database volumes
* **Latency**: < 10ms average latency
* **Throughput**: 125MB/s minimum for database volumes

</div>
<div className="col col--6">

### Capacity Planning
* **Initial Allocation**: Start with recommended sizes
* **Growth Buffer**: Plan for 30% annual growth
* **Backup Storage**: Equal to primary storage
* **Monitoring**: Implement storage usage alerts

</div>
</div>

:::tip Storage Best Practices
* Use separate volumes for different components
* Implement regular backup procedures
* Monitor storage performance metrics
* Set up alerts for capacity thresholds
:::

## Prerequisites Resource Requirements

:::info Prerequisites Impact
When hosting prerequisites on the same infrastructure, these requirements must be added to the base platform specifications. Each component can be hosted separately or together depending on your architecture.
:::

<Tabs>
  <TabItem value="database" label="Database Layer" default>

### PostgreSQL
<div className="row">
<div className="col col--6">

#### Resource Requirements
* **CPU**: 2 cores
* **RAM**: 4GB
* **Storage**: 50GB SSD

</div>
<div className="col col--6">

#### Recommendations
* High IOPS SSD storage
* Regular backups
* Consider high availability setup

</div>
</div>

### Redis
<div className="row">
<div className="col col--6">

#### Resource Requirements
* **CPU**: 2 cores
* **RAM**: 4GB
* **Storage**: 20GB SSD

</div>
<div className="col col--6">

#### Recommendations
* In-memory performance
* Persistence configuration
* Consider clustering for HA

</div>
</div>

  </TabItem>
  <TabItem value="storage" label="Object Storage">

### MinIO
<div className="row">
<div className="col col--6">

#### Resource Requirements
* **CPU**: 2 cores
* **RAM**: 8GB
* **Storage**: 100GB+ SSD

</div>
<div className="col col--6">

#### Recommendations
* Scalable storage setup
* Regular capacity monitoring
* Backup strategy required

</div>
</div>

  </TabItem>
  <TabItem value="security" label="Security Services">

### HashiCorp Vault
<div className="row">
<div className="col col--6">

#### Resource Requirements
* **CPU**: 2 cores
* **RAM**: 4GB
* **Storage**: 20GB SSD

</div>
<div className="col col--6">

#### Recommendations
* High availability setup
* Auto-unsealing configuration
* Regular key rotation

</div>
</div>

  </TabItem>
</Tabs>

<div className="alert alert--warning margin-top--md">
<h4>Production Considerations</h4>
<p>
These are baseline requirements. For production environments, consider:
</p>
<ul>
  <li>High availability configurations may require 2-3x these resources</li>
  <li>Monitoring and logging overhead</li>
  <li>Backup storage requirements</li>
  <li>Scaling headroom for growth</li>
</ul>
</div>

### Total Resource Summary

For a production setup hosting both platform and prerequisites:

<div className="row">
<div className="col col--4">

### CPU
* Platform: 8 cores
* Prerequisites: 8 cores
* **Total: 16+ cores**

</div>
<div className="col col--4">

### RAM
* Platform: 32GB
* Prerequisites: 20GB
* **Total: 52GB+**

</div>
<div className="col col--4">

### Storage
* Platform: 250GB
* Prerequisites: 190GB
* **Total: 440GB+**

</div>
</div>

## Service Requirements

The platform allows you to deploy services in two ways:
1. On the same cluster as the platform
2. On separate target clusters

<div className="row">
<div className="col col--6">

### Same Cluster Deployment
If you plan to deploy services on the same cluster as the platform:
* Add service requirements to the platform requirements
* Include them in capacity planning
* Account for resource overhead
* Plan for scaling headroom

</div>
<div className="col col--6">

### Target Cluster Deployment
Using separate target clusters for services:
* Keeps platform and service workloads isolated
* Requires separate infrastructure planning
* Can be optimized for specific service needs
* Enables geographic distribution

</div>
</div>

:::tip Infrastructure Planning Strategy
We recommend:
1. List all services you plan to deploy
2. Decide on deployment strategy (same cluster or target clusters)
3. For same cluster: Add service requirements to platform requirements
4. For target clusters: Plan separate infrastructure
5. Include 30% buffer for growth and peak loads
:::

:::info Example Calculation
Let's calculate requirements for a setup with:
- 2 Polygon nodes (Mainnet & Mumbai)
- 1 Hyperledger Besu node
- 1 Smart Contract Portal
- 1 Integration Studio
- 1 Blocksout Explorer

**Service Requirements (Medium size, Dedicated mode):**
* Polygon Nodes (2x):
  * CPU: 2 × 1.5 cores = 3 cores
  * RAM: 2 × 1.0 GB = 2 GB
  * Storage: Minimal

* Besu Node (1x):
  * CPU: 1.5 cores
  * RAM: 2.5 GB
  * Storage: 100 GB

* Smart Contract Portal:
  * CPU: 2.0 cores
  * RAM: 2.0 GB
  * Storage: 10 GB

* Integration Studio:
  * CPU: 2.0 cores
  * RAM: 4.0 GB
  * Storage: 10 GB

* Blocksout Explorer:
  * CPU: 2.0 cores
  * RAM: 4.0 GB
  * Storage: 50 GB

**Same Cluster Approach:**
* Total CPU: 27+ cores (16 platform/prereqs + 11 services)
* Total RAM: 67GB+ (52GB platform/prereqs + 15GB services)
* Total Storage: 620GB+ (440GB platform/prereqs + 180GB services)

**Target Cluster Approach:**
* Platform Cluster: 16+ cores, 52GB+ RAM, 440GB+ storage
* Service Cluster: 11+ cores, 15GB+ RAM, 180GB+ storage
:::

:::tip Service Requirements Reference
For detailed specifications of all available services and their resource requirements, please refer to our [Service Requirements Documentation](/documentation/docs/reference/service-requirements).
:::