---
title: PostgreSQL Database
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# PostgreSQL Database Setup

## Overview

PostgreSQL serves as the primary database for:
* User data and configurations
* Platform state
* Application data
* Minimum version required: PostgreSQL 13+

## Deployment Options

<Tabs>
<TabItem value="managed" label="Managed Service (Recommended)" default>

### Cloud Provider Options

#### Digital Ocean Managed Database
1. Create new database cluster
   * Choose PostgreSQL 13+
   * Select plan (minimum 2 vCPU, 4GB RAM)
   * Enable connection pooling (recommended: 50 connections)

#### Neon Serverless PostgreSQL
1. Create new project
2. Set up new database
3. Enable connection pooling
4. Note the connection string

#### Other Providers
* Amazon RDS
* Google Cloud SQL
* Azure Database for PostgreSQL

:::tip
Managed services handle:
* Automatic backups
* High availability
* Security patches
* Performance monitoring
:::

</TabItem>
<TabItem value="helm" label="Helm Chart">

### Bitnami PostgreSQL Chart

1. Install PostgreSQL:
```bash
helm upgrade --install postgresql oci://registry-1.docker.io/bitnamicharts/postgresql \
  --namespace postgresql \
  --version 14.3.3 \
  --create-namespace \
  --set global.postgresql.auth.username=platform \
  --set global.postgresql.auth.password=your-secure-password \
  --set global.postgresql.auth.database=platform
```

2. Wait for deployment:
```bash
kubectl -n postgresql get pods -w
```

:::caution
For production use:
* Configure proper resource limits
* Set up regular backups
* Consider high availability setup
:::

</TabItem>
</Tabs>

## Requirements

<div className="row margin-bottom--lg">
<div className="col col--6">

### Minimum Specifications
* PostgreSQL 13 or higher
* 2 vCPU cores
* 4GB RAM
* 20GB storage

</div>
<div className="col col--6">

### Recommended Features
* Connection pooling
* Automated backups
* Point-in-time recovery
* SSL/TLS encryption

</div>
</div>

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] Database hostname
* [ ] Port number (default: 5432)
* [ ] Database name
* [ ] Username
* [ ] Password
* [ ] SSL mode (e.g., `require`)

:::note Example Configuration
```yaml
postgresql:
  host: "your-db-host"
  port: 5432
  user: "platform"
  password: "your-secure-password"
  database: "platform"
  sslMode: "require"  # or "disable" for local development
```
:::

</div>

## Validation

Test your PostgreSQL connection:
```bash
# Using psql client
psql "postgres://username:password@hostname:5432/dbname?sslmode=require"

# Or using connection string
psql "postgresql://username:password@hostname:5432/dbname?sslmode=require"
```

## Troubleshooting

Common issues and solutions:

1. **Connection Failures**
   * Verify credentials
   * Check network/firewall rules
   * Confirm SSL/TLS settings
   * Validate connection string format

2. **Performance Issues**
   * Check connection pool settings
   * Monitor resource usage
   * Review query performance
   * Verify index usage

## Next Steps

1. ✅ Set up PostgreSQL database
2. ✅ Configure connection pooling
3. ➡️ Proceed to [Redis Setup](./redis)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::