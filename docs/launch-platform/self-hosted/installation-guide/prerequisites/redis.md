---
title: Redis Cache
sidebar_position: 3
---

# Redis Cache Setup

## Overview

Redis is a critical component of the SettleMint Platform, serving as an in-memory data store for:
- Session management
- Caching
- Real-time features
- Temporary data storage

## Deployment Options

Choose the deployment method that best suits your infrastructure:

### Self-Hosted Options
- [Helm Chart Deployment](#helm-chart)
- [Docker Deployment](#docker)

### Managed Services
- [Redis Cloud](#redis-cloud)
- [DigitalOcean Redis](#digitalocean)
- [Google Cloud Memorystore](#google-cloud)

## Self-Hosted Deployment

### <a name="helm-chart"></a>Helm Chart Deployment

1. Add the Redis Helm repository:

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

2. Create values file (redis-values.yaml):

```
architecture: standalone
auth:
  enabled: true
  password: "your-secure-password"
master:
  persistence:
    size: 8Gi
```

3. Install Redis:

```
helm install redis bitnami/redis -f redis-values.yaml
```

:::info Required Values
To complete platform installation, you'll need:
- Endpoint: redis-master.default.svc.cluster.local
- Password: Value from auth.password
- Port: 6379 (default)
:::

### <a name="docker"></a>Docker Deployment

1. Create persistent volume:

```
docker volume create redis_data
```

2. Run Redis container:

```
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7 --requirepass "your-secure-password"
```

:::info Required Values
To complete platform installation, you'll need:
- Endpoint: Container host IP or hostname
- Password: Value from --requirepass
- Port: 6379 (mapped port)
:::

## Managed Services

### <a name="redis-cloud"></a>Redis Cloud

1. Sign up at [Redis Cloud](https://redis.com/cloud/overview/)
2. Create new subscription:
   - Select fixed subscription
   - Choose region
   - Set memory limit (minimum 2GB)
   - Enable password protection

:::info Required Values
To complete platform installation, you'll need:
- Endpoint: Provided public endpoint
- Password: Generated password
- Port: Provided port number
:::

### <a name="digitalocean"></a>DigitalOcean Redis

1. Access DigitalOcean Console
2. Create Database > Redis
3. Configure:
   - Choose plan (minimum 2GB)
   - Select datacenter
   - Enable eviction policy

:::info Required Values
To complete platform installation, you'll need:
- Endpoint: Provided connection string
- Password: Default password (shown in overview)
- Port: Provided port number
:::

### <a name="google-cloud"></a>Google Cloud Memorystore

1. Open Google Cloud Console
2. Navigate to Memorystore > Redis
3. Create Instance:
   - Set capacity (minimum 2GB)
   - Choose region
   - Configure network

:::info Required Values
To complete platform installation, you'll need:
- Endpoint: Instance IP address
- Authentication: IAM-based
- Port: 6379 (default)
:::

## Requirements

Regardless of deployment method, ensure:
- Minimum 2GB RAM allocated
- Network accessibility from platform
- Authentication enabled
- Persistence configured (if needed)
- Monitoring setup