---
title: Deployment Plans
description: A list of the available Deployment Plans for SettleMint
---

# Deployment plans

For each service you deploy (network, node, smart contract set, etc.) you need to select a deployment plan. The deployment plan defines the infrastructure type, the cloud provider and region of your choice, and the resources (memory, vCPU and disk space) that will be allocated to your service.

## Infrastructure type

Not all applications are equal. Some are for experimentation, some are pilots, while others are high volume and mission critical. We make it easy to match the infrastructure to the scale of the project.

- **Shared** - This is typically the most cost-effective deployment configuration. Resources are deployed in a shared cluster. The performance will vary based on the demand from other services sharing the infrastructure. This configuration is like living on an island with other inhabitants with whom you need to share limited resources.
- **Dedicated** - This configuration offers the highest specifications without requiring additional technical overhead. Your service runs on its own exclusively-used cloud infrastructure, meaning it can't be impacted by others. To continue the metaphor, with this configuration you choose the size of the island based on your needs, and you don't share its resources with anyone else.

**On-premise** and **Bring Your Own Cloud (BYOC)** are also supported. Feel free [contact us](mailto:support@settlemint.com) to discuss these options.

## Cloud provider and region

We offer you the flexibility to deploy your services in the cloud of your choice, and easily build cross-cloud provider and cross-geographical region networks. All leading cloud providers are supported and we are continously working on adding support for more regions.

[Discover all supported cloud providers and available regions](../launch-platform/managed-cloud-deployment/0_supported-cloud-providers.md)

## Resource pack

The resource pack refers to the memory, vCPU, and disk space allocated to your service. You can choose between **small, medium, and large** options. You can proactively scale the resource pack if you anticipate that current resource usage might approach its limit, which could potentially impact service performance.

## Recommended setup

- Non-production application or Proof of Concept: shared infrastructure and small resource pack
- Application in production mode: dedicated infrastructure and medium resource pack
