---
title: Redis Cache
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Redis Cache Setup

## Overview

Redis serves as a critical component for:
* Session management
* Real-time features
* Caching layer
* Performance optimization

## Deployment Options

<Tabs>
<TabItem value="managed" label="Managed Service (Recommended)" default>

### Cloud Provider Options

#### Redis Cloud
1. Create account at [Redis Cloud](https://app.redislabs.com)
2. Create new subscription:
   * Fixed plan (minimum 1GB)
   * Choose region
   * Enable password protection
3. Create database with default settings

#### Digital Ocean Redis
1. Access Digital Ocean Console
2. Create Database > Redis
3. Configure:
   * Choose smallest plan
   * Select datacenter
   * Enable eviction policy

:::tip
Managed services provide:
* Automatic backups
* High availability
* Security patches
* Performance monitoring
:::

</TabItem>
<TabItem value="helm" label="Helm Chart">

### Bitnami Redis Chart

1. Add repository:
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

2. Install Redis:
```bash
helm upgrade --install redis oci://registry-1.docker.io/bitnamicharts/redis \
  --namespace redis \
  --version 18.19.2 \
  --create-namespace \
  --set architecture=standalone \
  --set global.redis.password=your-secure-password
```

3. Wait for deployment:
```bash
kubectl -n redis get pods -w
```

:::caution
For production use:
* Configure proper resource limits
* Set up persistence
* Consider high availability setup
:::

</TabItem>
</Tabs>

## Requirements

<div className="row margin-bottom--lg">
<div className="col col--6">

### Minimum Specifications
* Redis 6.0 or higher
* 1GB memory
* Network access from platform
* Password protection enabled

</div>
<div className="col col--6">

### Recommended Features
* Persistence enabled
* Automatic backups
* Monitoring setup
* Eviction policies configured

</div>
</div>

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] Redis hostname/endpoint
* [ ] Port number (default: 6379)
* [ ] Password
* [ ] TLS enabled/disabled

:::note Example Configuration
```yaml
redis:
  host: "your-redis-host"
  port: 6379
  password: "your-secure-password"
  tls: true  # Set to false for local development
```
:::

</div>

## Validation

Test your Redis connection:
```bash
# Using redis-cli
redis-cli -h your-redis-host -p 6379 -a your-password ping

# Expected response
PONG
```

## Troubleshooting

Common issues and solutions:

1. **Connection Failures**
   * Verify credentials
   * Check network/firewall rules
   * Confirm TLS settings
   * Validate endpoint format

2. **Performance Issues**
   * Monitor memory usage
   * Check eviction policies
   * Review connection limits
   * Verify resource allocation

## Next Steps

1. ✅ Set up Redis instance
2. ✅ Configure security settings
3. ➡️ Proceed to [S3 Storage Setup](/documentation/docs/launch-platform/self-hosted/installation-guide/prerequisites/s3-storage)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::