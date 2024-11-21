---
title: Introduction
sidebar_position: 1
description: Getting started with the SettleMint Platform self-hosted installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Self-Hosted Installation Guide

Welcome to the SettleMint Platform self-hosted installation guide. This comprehensive guide will walk you through deploying the SettleMint Platform in your own infrastructure.

:::tip Installation Time
Complete installation typically takes 2-4 hours, depending on your infrastructure setup and familiarity with the components.
:::

## Guide Structure

This installation guide is organized into three main sections, designed to be followed in order:

<Tabs>
<TabItem value="requirements" label="1. Requirements" default>

Start here to ensure your infrastructure meets all necessary specifications before proceeding. This section covers:
* Kubernetes cluster requirements
* Network and storage specifications
* Access and security requirements

[View Requirements Guide](./infrastructure-requirements)

</TabItem>
<TabItem value="prerequisites" label="2. Prerequisites">

After confirming requirements, set up the required supporting services. This section provides:
* Step-by-step setup guides
* Multiple deployment options
* Configuration requirements
* Information collection checklists

[View Prerequisites Guide](./prerequisites/overview)

</TabItem>
<TabItem value="installation" label="3. Installation">

Finally, deploy the SettleMint Platform using Helm:
* Standard Kubernetes deployment
* Flexible configuration options
* Production-ready setup

[View Installation Guide](./platform-installation/overview)

</TabItem>
</Tabs>

:::tip Using This Guide
We recommend:
1. Read through each section before starting
2. Complete all requirements and prerequisites
3. Collect required information as you progress
4. Follow the guides in order
:::

## Before You Begin

<div className="row margin-bottom--lg">
<div className="col col--6">

### Required Access
* Administrative access to your infrastructure
* Ability to create/modify DNS records
* Permission to deploy Kubernetes resources
* Access to cloud resources (if applicable)

</div>
<div className="col col--6">

### Technical Prerequisites
* Kubernetes cluster (1.20+)
* `kubectl` CLI tool
* `helm` (required for installation)
* Basic understanding of container orchestration

</div>
</div>

## Information Collection

Throughout the installation process, you'll need to collect configuration details from each prerequisite service. We've made this easy by including "Information Collection Boxes" in each guide.

<div className="row margin-bottom--lg">
<div className="col col--6">

### How It Works
* Each prerequisite guide contains an Information Collection Box
* Required values are clearly marked
* Values are needed during platform installation
* Keep track of sensitive information securely

</div>
<div className="col col--6">

### Example Collection Box
:::info Required Values
To complete platform installation, you'll need:
- Endpoint: redis-master.default.svc.cluster.local
- Password: your-secure-password
- Port: 6379
:::

</div>
</div>


## Need Help?

<div className="row margin-bottom--lg">
<div className="col col--6">

### Documentation Resources
* [Troubleshooting Guide](../troubleshooting)
* [FAQ](../faq)
* [Best Practices](../best-practices)
* [Architecture Overview](../architecture)

</div>
<div className="col col--6">

### Support Channels
* [Technical Support Portal](https://support.settlemint.com)
* [Community Discord](https://discord.gg/settlemint)
* [GitHub Issues](https://github.com/settlemint/platform/issues)
* Email: support@settlemint.com

</div>
</div>

:::tip Next Step
Start by reviewing the [Infrastructure Requirements](./infrastructure-requirements) to ensure your environment meets all necessary specifications.
:::