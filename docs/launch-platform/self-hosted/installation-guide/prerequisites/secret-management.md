---
title: Secret Management
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Secret Management Setup

## Overview

Our platform supports two options for secret management:
- HashiCorp Vault
- Google Secret Manager

Both services are used for:
- Encryption key storage
- Private key management

## Deployment Options

<Tabs>
<TabItem value="gsm" label="Google Secret Manager" default>

### Google Secret Manager Setup

1. **Enable the Secret Manager API**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Navigate to Secret Manager
   - Enable the Secret Manager API for your project

2. **Create Service Account**
   - Navigate to IAM & Admin > Service Accounts
   - Create a new service account
   - Grant the following roles:
     - `Secret Manager Admin`

3. **Download Credentials**
   - Create and download a JSON key for the service account
   - Keep this file secure - you'll need it during platform installation

:::tip
Google Secret Manager provides:
- Fully managed service
- Automatic replication
- Fine-grained IAM controls
- Audit logging
:::

**Helm Chart Values:**
```yaml
# values.yaml for Helm installation
googleSecretManager:
  # -- Enable Google Secret Manager integration
  enabled: true
  # -- The Google Cloud project ID
  projectId: "your-project-id"
  # -- The Google Cloud service account credentials JSON
  credentials: |
    {
      // Your service account JSON key
    }
```
:::

:::tip
Make sure to:
1. Enable Google Secret Manager in your Helm values
2. Use the same project ID and credentials as in your platform configuration
3. Properly format the service account JSON credentials
:::

</TabItem>

<TabItem value="hcp" label="HCP Vault" default>

### HashiCorp Cloud Platform Setup

1. **Create Vault Cluster**

   - Sign up for [HashiCorp Cloud](https://portal.cloud.hashicorp.com)
   - Choose Development tier (sufficient for most setups)
   - Select "Start from Scratch" template
   - Pick your preferred region

2. **Configure Secret Engines**

   - Create KV secret engines:
     ```bash
     vault secrets enable -path=ethereum kv-v2
     vault secrets enable -path=ipfs kv-v2
     vault secrets enable -path=fabric kv-v2
     ```

3. **Set Up Authentication**

   - Enable AppRole auth method:
     ```bash
     vault auth enable approle
     ```
   - Create platform policy:
     ```bash
     vault policy write btp - <<EOF
     path "ethereum/*" {
       capabilities = ["create", "read", "update", "delete", "list"]
     }
     path "fabric/*" {
       capabilities = ["create", "read", "update", "delete", "list"]
     }
     path "ipfs/*" {
       capabilities = ["create", "read", "update", "delete", "list"]
     }
     EOF
     ```

4. **Create Platform Role**

   ```bash
   vault write auth/approle/role/platform-role \
       token_ttl=1h \
       token_max_ttl=4h \
       secret_id_ttl=0 \
       policies="btp"
   ```

   :::note TTL Configuration
   You can customize the TTL (Time To Live) settings:
   - `token_ttl`: How long tokens are valid (e.g., `1h`, `24h`, `30m`)
   - `token_max_ttl`: Maximum token lifetime including renewals
   - `secret_id_ttl`: How long secret IDs remain valid
     - Set to `0` for non-expiring secret IDs
     - Or specify duration like `6h`, `24h`, `168h` (1 week)
   :::

5. **Generate Credentials**

   ```bash
   # Get Role ID
   vault read auth/approle/role/platform-role/role-id

   # Generate Secret ID
   vault write -force auth/approle/role/platform-role/secret-id
   ```

:::tip
HCP Vault provides:

- Managed infrastructure
- Automatic updates
- Built-in high availability
- Professional support
  :::

</TabItem>

<TabItem value="self-hosted" label="Self-Hosted Vault">

### Helm Chart Installation

1. **Install Vault**

```bash
helm upgrade --install vault vault \
  --repo https://helm.releases.hashicorp.com \
  --namespace vault \
  --create-namespace
```

2. **Initialize Vault**

```bash
# Initialize and save keys
kubectl exec vault-0 -n vault -- vault operator init \
  -key-shares=1 \
  -key-threshold=1

# Unseal Vault (replace with your key)
kubectl exec vault-0 -n vault -- vault operator unseal $VAULT_UNSEAL_KEY
```

3. **Configure Vault**
   Follow the same configuration steps as HCP Vault (steps 2-5) after logging in with the root token.

:::caution
For production:

- Use multiple key shares
- Configure proper storage backend
- Set up high availability
- Implement proper unsealing strategy
  :::

</TabItem>
</Tabs>

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

Choose one of the following configurations for your Helm values:

**For Google Secret Manager:**
- [ ] GCP Project ID
- [ ] Service Account JSON key

:::note Example Helm Values for GSM
```yaml
# values.yaml
vault:
  enabled: false

googleSecretManager:
  # -- Enable Google Secret Manager integration
  enabled: true
  # -- The Google Cloud project ID
  projectId: 'your-project-id'
  # -- The Google Cloud service account credentials JSON
  credentials: |
    {
      // Your service account JSON key
    }
```
:::

**For HashiCorp Vault:**
- [ ] Vault address/endpoint
- [ ] Role ID
- [ ] Secret ID
- [ ] Namespace (if using HCP Vault: `admin`)

:::note Example Helm Values for Vault
```yaml
# values.yaml
googleSecretManager:
  enabled: false

vault:
  # -- Enable Hashicorp Vault integration
  enabled: true
  # -- The vault address you collected in the prerequisites
  address: 'https://vault-cluster.hashicorp.cloud:8200'
  # -- The vault namespace you collected in the prerequisites
  namespace: 'admin'  # Required for HCP Vault
  # -- The AppRole roleId you collected in the prerequisites
  roleId: 'your-role-id'
  # -- The AppRole secretId you collected in the prerequisites
  secretId: 'your-secret-id'
```
:::

:::important
Make sure to:
1. Enable only one secret management solution (`vault` or `googleSecretManager`)
2. Disable the other option by setting `enabled: false`
3. Provide all required values for your chosen solution
:::

</div>

## Validation

Test your secret management configuration:

<Tabs>
<TabItem value="gsm" label="Google Secret Manager">

```bash
# Set environment variables
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
export PROJECT_ID="your-project-id"

# Verify access
gcloud secrets list --project=$PROJECT_ID
```

</TabItem>
<TabItem value="vault" label="HashiCorp Vault">

Test your Vault configuration:

```bash
# Set environment variables
export VAULT_ADDR="your-vault-address"
export VAULT_NAMESPACE="admin"  # For HCP Vault
export VAULT_ROLE_ID="your-role-id"
export VAULT_SECRET_ID="your-secret-id"

# Verify access
vault write auth/approle/login \
  role_id=$VAULT_ROLE_ID \
  secret_id=$VAULT_SECRET_ID
```

</TabItem>
</Tabs>

## Troubleshooting

Common issues and solutions:

1. **Google Secret Manager Issues**
   - Verify service account permissions
   - Check credentials file format
   - Confirm API is enabled
   - Validate project ID

2. **Vault Issues**
   - Verify Vault address
   - Check network access
   - Confirm TLS settings
   - Validate namespace (HCP)

## Next Steps

1. ✅ Set up secret management service
2. ✅ Configure authentication
3. ➡️ Proceed to [Metrics and Logs Setup](/documentation/docs/launch-platform/self-hosted/installation-guide/prerequisites/metrics-and-logs)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::
