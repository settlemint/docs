---
title: Deployment Plans
description: Guide to deployment plans and resource allocation in SettleMint
---

import { Callout } from "fumadocs-ui/components/callout";
import { Card } from "fumadocs-ui/components/card";
import { Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <Card>
    ### Infrastructure Types
    - **Shared** - Cost-effective, shared resources
    - **Dedicated** - Exclusive infrastructure
    - **On-premise** - Custom deployment
    - **BYOC** - Bring Your Own Cloud
  </Card>

  <Card>
    ### Resource Packs
    - **Small** - Basic resources
    - **Medium** - Standard resources
    - **Large** - Enhanced resources
  </Card>
</div>

## Infrastructure Types

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <Card>
    ### Shared Infrastructure
    - Most cost-effective
    - Shared cluster resources
    - Variable performance
    - Suitable for testing
  </Card>

  <Card>
    ### Dedicated Infrastructure
    - Exclusive resources
    - Highest specifications
    - Predictable performance
    - Production ready
  </Card>
</div>

<Callout type="info">
  For On-premise and BYOC options, please [contact
  us](mailto:support@settlemint.com).
</Callout>

## Cloud Providers & Regions

### Choose Provider

Select from supported cloud providers:

- Google Cloud Platform
- Amazon Web Services
- Microsoft Azure

### Select Region

Pick available regions based on:

- Geographic location
- Compliance requirements
- Performance needs

## Resource Packs

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <Card>
    ### Small
    - Basic memory allocation
    - Standard vCPU
    - Minimal storage
    - Development use
  </Card>

<Card>
  ### Medium - Enhanced memory - Multiple vCPUs - Extended storage - Production
  ready
</Card>

  <Card>
    ### Large
    - Maximum memory
    - Dedicated vCPUs
    - Extensive storage
    - High performance
  </Card>
</div>

## Recommended Setups

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <Card>
    ### Development/PoC
    - Shared infrastructure
    - Small resource pack
    - Basic monitoring
    - Cost optimized
  </Card>

  <Card>
    ### Production
    - Dedicated infrastructure
    - Medium/Large resource pack
    - Full monitoring
    - High availability
  </Card>
</div>



For each service you deploy (network, node, smart contract set, etc.) you need
to select a deployment plan. The deployment plan defines the infrastructure
type, the cloud provider and region of your choice, and the resources (memory,
vCPU and disk space) that will be allocated to your service.

## Infrastructure type

Not all applications are equal. Some are for experimentation, some are pilots,
while others are high volume and mission critical. We make it easy to match the
infrastructure to the scale of the project.

- **Shared** - This is typically the most cost-effective deployment
  configuration. Resources are deployed in a shared cluster. The performance
  will vary based on the demand from other services sharing the infrastructure.
  This configuration is like living on an island with other inhabitants with
  whom you need to share limited resources.
- **Dedicated** - This configuration offers the highest specifications without
  requiring additional technical overhead. Your service runs on its own
  exclusively-used cloud infrastructure, meaning it can't be impacted by others.
  To continue the metaphor, with this configuration you choose the size of the
  island based on your needs, and you don't share its resources with anyone
  else.

**On-premise** and **Bring Your Own Cloud (BYOC)** are also supported. Feel free
[contact us](mailto:support@settlemint.com) to discuss these options.

## Cloud provider and region

We offer you the flexibility to deploy your services in the cloud of your
choice, and easily build cross-cloud provider and cross-geographical region
networks. All leading cloud providers are supported and we are continously
working on adding support for more regions.

[Discover all supported cloud providers and available regions](/launching-the-platform/managed-cloud-deployment/supported-cloud-providers)

## Resource pack

The resource pack refers to the memory, vCPU and disk space allocated to your
service. You can choose between **small, medium and large**. If at some point
the current resource usage is about to reach its limit, and the service risks
getting stuck, you can scale the resource pack.

## Recommended setup

- Non-production application or Proof of Concept: shared infrastructure and
  small resource pack
- Application in production mode: dedicated infrastructure and medium resource
  pack


