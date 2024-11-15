---
title: Prerequisites Overview
sidebar_position: 1
---

# Prerequisites Overview

Before installing the SettleMint Platform, you'll need to set up several core services. This section provides detailed guides for each prerequisite, with multiple deployment options to suit your infrastructure needs.

## Required Services

1. **Domain and TLS**
   - Domain name configuration
   - SSL/TLS certificates
   - Secure communication setup

2. **Ingress Controller**
   - Traffic management
   - Load balancing
   - SSL/TLS termination

3. **PostgreSQL Database**
   - Primary database for the platform
   - Stores user data, configurations, and platform state
   - Minimum version: PostgreSQL 13+

4. **Redis Cache**
   - In-memory data structure store
   - Used for session management and caching
   - Handles real-time features

5. **S3-Compatible Storage**
   - Object storage for platform assets
   - Blockchain data persistence
   - File management system

6. **HashiCorp Vault**
   - Secrets management
   - Encryption key storage
   - Secure credentials handling

7. **OAuth Provider**
   - Authentication and authorization service
   - User identity management
   - Single sign-on capabilities

8. **Metrics and Logs**
   - Prometheus for metrics collection
   - Grafana for visualization
   - Loki for log aggregation

## Information Collection

Each prerequisite guide includes an "Information Collection Box" containing specific details you'll need for the platform installation. We recommend:
- Recording all values as you progress
- Keeping credentials secure
- Validating configurations before proceeding

## Deployment Options

For each service, we provide multiple deployment options:
- Self-hosted deployment
  - Helm chart installation
  - Docker container setup
- Managed services
  - Cloud provider solutions
  - Third-party services

Choose the option that best fits your:
- Security requirements
- Infrastructure capabilities
- Operational expertise
- Budget constraints

## Next Steps

1. Review the infrastructure requirements
2. Plan your deployment strategy
3. Set up each prerequisite service
4. Collect required information
5. Proceed to platform installation

## Need Assistance?

If you need help with prerequisites setup:
- Check individual service documentation
- Contact SettleMint support
- Join our community channels