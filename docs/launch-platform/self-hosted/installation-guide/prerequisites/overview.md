---
title: Overview
sidebar_position: 1
description: Complete guide to setting up prerequisites for the SettleMint Platform installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Prerequisites Overview

Before installing the SettleMint Platform, you'll need to set up several core services. This guide will walk you through each prerequisite and help you collect the necessary information for installation.

:::tip Quick Navigation
Use the sidebar to navigate between different prerequisites. We recommend following them in order, but you can skip to specific sections if needed.
:::

## How to Use This Section

1. Review each prerequisite service
2. Choose your preferred deployment method for each service
3. Follow the setup instructions
4. Record the required information in a secure location
5. Proceed to the next prerequisite

:::caution Important
Make sure to complete **all** prerequisites before proceeding with the platform installation. Missing or incorrectly configured services can cause installation failures.
:::

## Required Services

<Tabs>
<TabItem value="infrastructure" label="Infrastructure" default>

#### Ingress Controller
* Traffic management and load balancing
* SSL/TLS termination
* [Setup Guide](./ingress-controller)

#### Domain and TLS
* Domain name configuration
* SSL/TLS certificates
* [Setup Guide](./domain-and-tls)

#### Metrics and Logs
* Prometheus metrics collection
* Grafana visualization
* Loki log aggregation
* [Setup Guide](./metrics-and-logs)

</TabItem>
<TabItem value="databases" label="Databases & Cache">

#### PostgreSQL Database
* Primary platform database
* Stores user data and configurations
* Minimum version: PostgreSQL 13+
* [Setup Guide](./postgresql)

#### Redis Cache
* Session management
* Real-time features
* Performance optimization
* [Setup Guide](./redis)

</TabItem>
<TabItem value="security" label="Security & Storage">

#### S3-Compatible Storage
* Platform assets storage
* Blockchain data persistence
* [Setup Guide](./s3-storage)

#### HashiCorp Vault
* Secrets management
* Encryption keys
* [Setup Guide](./hashicorp-vault)

#### OAuth Provider
* Authentication service
* User identity management
* [Setup Guide](./oauth)

</TabItem>
</Tabs>

## Deployment Options

Each prerequisite service can be deployed in multiple ways:

<div className="row margin-bottom--lg">
<div className="col col--6">

### Self-Hosted
* ✅ Full control
* ✅ Data sovereignty
* ⚠️ Higher maintenance
* ⚠️ Requires expertise

</div>
<div className="col col--6">

### Managed Services
* ✅ Lower maintenance
* ✅ Managed updates
* ⚠️ Vendor lock-in
* ⚠️ Higher costs

</div>
</div>

:::info
Choose deployment options based on your:
* Security requirements
* Infrastructure capabilities
* Operational expertise
* Budget constraints
:::

## Information Collection

As you complete each prerequisite, you'll need to collect specific information required for the platform installation.

<div className="alert alert--success" role="alert">

### Information Collection Checklist

* ✅ Domain and TLS certificates
* ✅ Database connection strings
* ✅ Redis credentials
* ✅ S3 bucket details
* ✅ Vault access tokens
* ✅ OAuth client credentials
* ✅ Metrics endpoints

</div>

## Next Steps

1. Start with the [Ingress Controller](./ingress-controller) setup
2. Follow each prerequisite guide in order
3. Validate your configurations
4. Proceed to [Platform Installation](../platform-installation/overview)

## Need Help?

<div className="row margin-bottom--lg">
<div className="col col--6">

### Documentation
* Individual service guides
* Troubleshooting tips
* Best practices

</div>
<div className="col col--6">

### Support
* Contact SettleMint support
* Join community channels
* Schedule a consultation

</div>
</div>