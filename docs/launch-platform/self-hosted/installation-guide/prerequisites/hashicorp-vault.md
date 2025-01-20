---
title: HashiCorp Vault
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HashiCorp Vault Setup

## Overview

HashiCorp Vault is used for:

- Secrets management
- Encryption key storage
- Secure credentials handling
- Private key management

## Deployment Options

<Tabs>
<TabItem value="cloud" label="HCP Vault (Recommended)" default>

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
<TabItem value="helm" label="Self-Hosted">

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

- [ ] Vault address/endpoint
- [ ] Role ID
- [ ] Secret ID
- [ ] Namespace (if using HCP Vault: `admin`)

:::note Example Configuration

```yaml
vault:
  address: 'https://vault-cluster.hashicorp.cloud:8200'
  namespace: 'admin' # Required for HCP Vault
  roleId: 'your-role-id'
  secretId: 'your-secret-id'
```

:::

</div>

## Validation

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

## Troubleshooting

Common issues and solutions:

1. **Authentication Failures**

   - Verify role ID and secret ID
   - Check policy attachments
   - Confirm namespace setting
   - Validate token TTLs

2. **Connection Issues**
   - Verify Vault address
   - Check network access
   - Confirm TLS settings
   - Validate namespace (HCP)

## Next Steps

1. ✅ Set up Vault instance
2. ✅ Configure authentication
3. ➡️ Proceed to [Metrics and Logs Setup](/documentation/docs/launch-platform/self-hosted/installation-guide/prerequisites/metrics-and-logs)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::
