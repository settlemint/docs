---
title: S3-Compatible Storage
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# S3-Compatible Storage Setup

## Overview

S3-compatible storage is used for:

- Platform assets storage
- Blockchain data persistence
- File management
- State storage

## Deployment Options

<Tabs>
<TabItem value="managed" label="Managed Service (Recommended)" default>

### AWS S3 (Native)

1. Create new S3 bucket:
   - Choose region
   - Enable versioning
   - Configure default encryption
2. Create IAM user:
   - Generate access key and secret
   - Attach minimal required permissions

### Digital Ocean Spaces

1. Access Digital Ocean Console
2. Create new Spaces bucket:
   - Choose datacenter region
   - Configure CDN (optional)
3. Create Spaces access key

### Azure Blob Storage

1. Create Storage Account:
   - Go to Azure Portal
   - Create new Storage Account
   - Select performance tier and redundancy
   - Enable hierarchical namespace (recommended)

2. Create Container:
   - Navigate to Storage Account
   - Create new container
   - Set access level (private recommended)

3. Get Access Credentials:
   - Generate Shared Access Signature (SAS)
   - Or use Storage Account access keys
   - Note the connection string

:::tip
Azure Blob Storage offers:
- Geo-redundant storage options
- Integration with Azure AD
- Built-in disaster recovery
- Pay-as-you-go pricing
:::

### Google Cloud Storage

1. Create Storage Bucket:
   - Go to Google Cloud Console
   - Create new bucket
   - Choose location type
   - Set storage class
   - Configure access control

2. Set up Service Account:
   - Create new service account
   - Generate JSON key file
   - Assign Storage Object Admin role
   - Download credentials

:::tip
GCP Storage benefits:
- Multi-regional deployment
- Object lifecycle management
- Strong consistency
- Integrated security controls
:::

:::tip
Managed services provide:

- Built-in redundancy
- Automatic scaling
- Global availability
- Integrated monitoring
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

- Configure proper storage class
- Set up backup procedures
- Enable encryption
- Configure monitoring
  :::

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

<Tabs>
<TabItem value="aws" label="AWS S3" default>

- [ ] S3 endpoint URL (e.g., s3.amazonaws.com)
- [ ] Bucket name
- [ ] Access key ID
- [ ] Secret access key
- [ ] Region (e.g., us-east-1)
- [ ] State encryption key

</TabItem>
<TabItem value="azure" label="Azure Blob Storage">

- [ ] Storage account name
- [ ] Container name
- [ ] Storage account key
- [ ] State encryption key

</TabItem>
<TabItem value="gcp" label="Google Cloud Storage">

- [ ] Project ID
- [ ] Bucket name
- [ ] Service account credentials (JSON)
- [ ] State encryption key

</TabItem>
<TabItem value="minio" label="MinIO">

- [ ] MinIO endpoint URL
- [ ] Bucket name
- [ ] Access key
- [ ] Secret key
- [ ] Region
- [ ] State encryption key

</TabItem>
</Tabs>

:::note Example Configuration

```yaml
deploymentEngine:
  state:
    # AWS S3
    connectionUrl: 's3://bucket-name?region=us-east-1&endpoint=s3.amazonaws.com'

    # Azure Blob Storage
    connectionUrl: 'azblob://<container-path>'

    # Google Cloud Storage
    connectionUrl: 'gs://bucket-name'

    credentials:
      encryptionKey: 'your-generated-key' # From openssl command

      # AWS Credentials
      aws:
        accessKeyId: 'your-access-key'
        secretAccessKey: 'your-secret-key'
        region: 'us-east-1'

      # Azure Credentials
      azure:
        storageAccount: 'storage-account-name'
        storageKey: 'storage-account-key'

      # GCP Credentials
      google:
        project: 'project-id'
        credentials: |
          {
            "type": "service_account",
            "project_id": "your-project",
            "private_key_id": "key-id",
            "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
            "client_email": "service-account@project.iam.gserviceaccount.com",
            "client_id": "client-id",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account@project.iam.gserviceaccount.com"
          }
```
:::

</div>

## Validation

Test your storage configuration:

```bash
# Using AWS CLI
aws s3 ls s3://your-bucket \
  --endpoint-url your-endpoint \
  --access-key your-access-key \
  --secret-key your-secret-key

# Using Azure CLI
az storage blob list \
  --container-name your-container \
  --account-name your-storage-account \
  --account-key your-storage-key

# Using Google Cloud CLI
gsutil ls gs://your-bucket

# Expected: List of objects or empty result
```

:::tip
Make sure you have installed and configured the respective CLI tools:
- AWS CLI: `aws configure`
- Azure CLI: `az login`
- Google Cloud CLI: `gcloud auth login`
:::

## Troubleshooting

Common issues and solutions:

1. **Access Denied**

   AWS S3:
   - Verify IAM credentials
   - Check bucket policies
   - Confirm IAM role permissions
   - Validate endpoint URL format

   Azure Blob Storage:
   - Check storage account access keys
   - Verify container access level
   - Confirm Shared Access Signature (SAS) permissions
   - Check storage account firewall settings

   Google Cloud Storage:
   - Verify service account permissions
   - Check IAM roles (Storage Object Admin)
   - Validate JSON credentials file
   - Confirm project access

2. **Connection Issues**

   AWS S3:
   - Check endpoint accessibility
   - Verify region setting
   - Confirm VPC endpoints (if applicable)
   - Check SSL/TLS requirements

   Azure Blob Storage:
   - Verify network access rules
   - Check private endpoints configuration
   - Confirm storage account status
   - Validate VNET settings (if applicable)

   Google Cloud Storage:
   - Check VPC Service Controls
   - Verify network connectivity
   - Confirm regional availability
   - Check firewall rules

3. **Performance Issues**

   AWS S3:
   - Check transfer acceleration settings
   - Review bucket region location
   - Monitor request rates

   Azure Blob Storage:
   - Verify storage account tier
   - Check geo-replication status
   - Monitor bandwidth metrics

   Google Cloud Storage:
   - Review storage class settings
   - Check bucket location
   - Monitor throughput metrics

## Next Steps

1. ✅ Set up S3-compatible storage
2. ✅ Generate encryption key
3. ➡️ Proceed to [HashiCorp Vault Setup](/documentation/docs/launch-platform/self-hosted/installation-guide/prerequisites/hashicorp-vault)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::
