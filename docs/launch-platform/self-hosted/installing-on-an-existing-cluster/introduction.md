---
sidebar_position: 1
sidebar_label: Introduction
---

# SettleMint BTP - Installation Guide

Welcome to the SettleMint Blockchain Transformation Platform (BTP) guide. This guide is designed to walk you through the core principles of our platform, outline what you'll need to get started, and guide you through the installation process.

## Overview

- [Introduction](#introduction)
- [Understand the installation process](#understand-the-installation-process)
- [Quick Start & Sandbox installations](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/quick-start-examples-trial-installation/installation-trial-cluster/)
- [Prerequisites](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/prerequisites/Infrastructure/)

- [Run the Installation](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)
- [Get Support](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/support-and-troubleshooting/)

## Introduction

SettleMint BTP is built to ensure unmatched flexibility through its "Bring Your Own Infrastructure" strategy.

This strategy enables seamless integration of the blockchain transformation platform 'BTP' with your existing infrastructure, covering cloud services, databases, authentication providers, and storage solutions.

It also provides numerous benefits, such as enabling you to specify the high availability and readiness of each component, customize your disaster recovery plan, and implement the platform on familiar, white-labeled components, among others.

<!-- DIAGRAM HERE -->

After finishing the installation, you will have access to a suite of services and tools designed to support you throughout your blockchain journey. To explore these tools in detail, we invite you to visit our [Developer Hub](/docs/about-settlemint/intro/).

- **Public chains**: Polygon PoS, Polygon zkevm, Ethereum, Avalanche, Arbitrum, Optimism, Fantom, Hedera _(Internet access required)_
- **Private chains**: Hyperledger Besu, Quorum, Hyperledger Fabric
- **Block Explorers**: Otterscan for Public networks, Blockscout for permissioned
- **Storage**: IPFS, MinIO
- **Integration Tools**: Integration studio, Hasura
- **Integrated IDE**: Including smart contract sets
- **Smart contract Indexer**: The Graph Middleware

It's essential to remember that preparing your infrastructure and necessary services is a [prerequisite](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/prerequisites/Infrastructure/). Once this foundation is established, you'll need to populate the helm charts values file, as detailed in the subsequent "Platform installation” section.

## Understand the Installation Process

The installation procedure encompasses a series of crucial steps, including acquiring a licence, setting up your environment, launching the platform, and adjusting settings after installation.

### The Installation Process

1. **Obtain a License:** Contact SettleMint at <hello@settlemint.com> to obtain a licence key.
2. **Registry Authentication:** Authenticate with our container registry using the credentials provided via email.
3. **Prepare Your Environment:** Set up your Kubernetes cluster, configure the domain, TLS, storage, and authentication provider (see prerequisites).
4. **Service Preparation:** Deploy and configure the required services (Redis, Postgres, Vault) as per your HA and configurability needs.
5. **Deploy the Platform:** Use Helm to add the SettleMint repository, update it, and install BTP v7 with your custom configurations.
6. **Enjoy the Platform 🥳:** Access and explore the functionalities of SettleMint BTP.

Should you encounter any issues or have questions during any phase of the installation process, feel free to contact us at <support@settlemint.com>. Our team is ready to assist you.

Next:

- [Explore one of our sandbox installations](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/quick-start-examples-trial-installation/installation-trial-cluster/) to get a hands-on feel for the platform
- [Proceed to the prerequisites page](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/prerequisites/Infrastructure/) to prepare for a full installation
