---
title: Infrastructure Requirements
sidebar_position: 4
---

# Infrastructure Requirements

:::note
The requirements listed below are for the core platform components only. If you plan to host prerequisites (databases, caches, etc.) or additional services on the same infrastructure, you'll need to add their requirements to these baseline specifications.
:::

## Compute Resources

### Minimum Requirements (Platform Only)
- **CPU**: 4 cores
- **RAM**: 16GB
- **Storage**: 100GB SSD

### Recommended Specifications (Platform Only)
- **CPU**: 8+ cores
- **RAM**: 32GB
- **Storage**: 250GB+ SSD

## Network Requirements

### Connectivity
- Outbound internet access for container images and updates
- Load balancer configuration
- Ingress controller
- SSL/TLS certificates

### Ports
- HTTP/HTTPS (80/443)
- Custom ports for services
- Internal communication ports

## Storage Requirements

### Performance
- SSD storage for databases
- Redundant storage for critical data
- Backup storage considerations

### Capacity Planning
- Initial storage requirements
- Growth projections
- Backup storage allocation

## Security Requirements

### Access Control
- RBAC configuration
- Network policies
- Security groups

### Compliance
- Data residency requirements
- Encryption requirements
- Audit logging capabilities

## High Availability Considerations

### Multi-Zone Deployment
- Zone redundancy
- Failover configuration
- Backup and recovery planning

## Additional Resource Requirements

### Prerequisites Resource Requirements
If you plan to host prerequisites on the same infrastructure, add these approximate requirements:

- **PostgreSQL**:
  - CPU: 2 cores
  - RAM: 4GB
  - Storage: 50GB SSD
- **Redis**:
  - CPU: 2 cores
  - RAM: 4GB
  - Storage: 20GB SSD
- **HashiCorp Vault**:
  - CPU: 2 cores
  - RAM: 4GB
  - Storage: 20GB SSD
- **MinIO**:
  - CPU: 2 cores
  - RAM: 8GB
  - Storage: 100GB+ SSD (varies based on usage)

### Example Total Requirements with Prerequisites
For a production setup hosting both the platform and prerequisites:

- **Total CPU**: 16+ cores (8 platform + 8 prerequisites)
- **Total RAM**: 52GB+ (32GB platform + 20GB prerequisites)
- **Total Storage**: 440GB+ SSD (250GB platform + 190GB prerequisites)

### Service-Specific Requirements
Since this platform is designed for deploying blockchain nodes, middlewares, integrations and other services, you'll need to carefully plan your infrastructure capacity based on the number and types of services you intend to deploy. Please refer to our [Service Requirements Documentation](link-to-service-requirements) for detailed specifications of each service.

:::tip
We recommend:
1. List all services you plan to deploy initially
2. Calculate their combined resource requirements
3. Add those to the platform and prerequisite requirements above
4. Include a 30% buffer for growth and peak loads
:::