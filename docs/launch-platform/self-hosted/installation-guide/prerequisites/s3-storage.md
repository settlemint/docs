---
title: S3-Compatible Storage
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# S3-Compatible Storage Setup

## Overview

S3-compatible storage is used for:
* Platform assets storage
* Blockchain data persistence
* File management
* State storage

## Deployment Options

<Tabs>
<TabItem value="managed" label="Managed Service (Recommended)" default>

### AWS S3 (Native)
1. Create new S3 bucket:
   * Choose region
   * Enable versioning
   * Configure default encryption
2. Create IAM user:
   * Generate access key and secret
   * Attach minimal required permissions

### Digital Ocean Spaces
1. Access Digital Ocean Console
2. Create new Spaces bucket:
   * Choose datacenter region
   * Configure CDN (optional)
3. Create Spaces access key

:::tip
Managed services provide:
* Built-in redundancy
* Automatic scaling
* Global availability
* Integrated monitoring
:::

</TabItem>
<TabItem value="helm" label="Self-Hosted MinIO">

### MinIO Installation

1. Install MinIO:
```bash
helm upgrade --install minio oci://registry-1.docker.io/bitnamicharts/minio \
  --namespace minio \
  --version 13.8.4 \
  --create-namespace \
  --set defaultBuckets=platform-bucket \
  --set auth.rootUser=admin \
  --set auth.rootPassword=your-secure-password \
  --set provisioning.enabled=true \
  --set "provisioning.config[0].name=region" \
  --set "provisioning.config[0].options.name=us-east-1"
```

2. Create service account:
```bash
# Generate access credentials
mc admin user svcacct add minio platform-user
```

:::caution
For production use:
* Configure proper storage class
* Set up backup procedures
* Enable encryption
* Configure monitoring
:::

</TabItem>
</Tabs>

## State Encryption

Generate an encryption key for state data:
```bash
openssl rand -base64 32
```

:::caution Important
Store this encryption key securely - it's used to protect platform state data.
:::

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] S3 endpoint URL
* [ ] Bucket name
* [ ] Access key ID
* [ ] Secret access key
* [ ] Region
* [ ] State encryption key

:::note Example Configuration
```yaml
deploymentEngine:
  state:
    s3ConnectionUrl: "s3://bucket-name?region=us-east-1&endpoint=your-endpoint"
    credentials:
      encryptionKey: "your-generated-key"  # From openssl command
      aws:
        accessKeyId: "your-access-key"
        secretAccessKey: "your-secret-key"
        region: "us-east-1"
```
:::

</div>

## Validation

Test your S3 configuration:
```bash
# Using AWS CLI
aws s3 ls s3://your-bucket \
  --endpoint-url your-endpoint \
  --access-key your-access-key \
  --secret-key your-secret-key

# Expected: List of objects or empty result
```

## Troubleshooting

Common issues and solutions:

1. **Access Denied**
   * Verify credentials
   * Check bucket permissions
   * Confirm IAM/policy settings
   * Validate endpoint URL format

2. **Connection Issues**
   * Check endpoint accessibility
   * Verify region setting
   * Confirm network access
   * Check SSL/TLS requirements

## Next Steps

1. ✅ Set up S3-compatible storage
2. ✅ Generate encryption key
3. ➡️ Proceed to [HashiCorp Vault Setup](./hashicorp-vault)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::