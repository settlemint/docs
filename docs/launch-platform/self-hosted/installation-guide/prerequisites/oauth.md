---
title: OAuth Provider
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OAuth Provider Setup

## Overview

The SettleMint Platform requires OAuth authentication for:

- User authentication
- Access control
- Single sign-on capabilities
- Identity management

## Provider Options

<Tabs>
<TabItem value="google" label="Google OAuth" default>

### Google OAuth Setup

1. **Access Google Cloud Console**

   - Go to [Google Cloud Console](https://console.developers.google.com/apis/credentials)
   - Select or create a project

2. **Create OAuth Client**

   - Click `+ CREATE CREDENTIALS`
   - Select `OAuth client ID`
   - Choose `Web application` type

3. **Configure OAuth Client**
   - Add Authorized JavaScript origins:
     ```
     https://your-domain.com
     ```
   - Add Authorized redirect URIs:
     ```
     https://your-domain.com/api/auth/callback/google
     ```

:::tip
Make sure to replace `your-domain.com` with your actual platform domain.
:::

</TabItem>
<TabItem value="azure" label="Azure AD">

### Azure Active Directory Setup

1. **Access Azure Portal**

   - Go to Azure Active Directory
   - Register a new application

2. **Configure Application**

   - Add redirect URIs
   - Set up platform configurations
   - Configure authentication settings

3. **Set Required Permissions**
   - OpenID Connect permissions
   - User.Read permissions
   - Additional scopes as needed

</TabItem>
<TabItem value="custom" label="Custom OIDC">

### Custom OIDC Provider

For enterprise setups, you can use any OpenID Connect compliant provider:

- Okta
- Auth0
- Keycloak
- Other OIDC-compliant providers

Required provider capabilities:

- OpenID Connect support
- OAuth 2.0 compliance
- User profile information
- Email verification

</TabItem>
</Tabs>

## JWT Configuration

Generate a secure signing key for JWT tokens:

```bash
openssl rand -base64 32
```

:::caution
Store this key securely - it's used to sign user sessions.
:::

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

- [ ] OAuth Client ID
- [ ] OAuth Client Secret
- [ ] JWT signing key
- [ ] Configured redirect URI

:::note Example Configuration

```yaml
auth:
  jwtSigningKey: 'your-generated-key' # From openssl command
  providers:
    google:
      enabled: true
      clientID: 'your-client-id' # From OAuth provider
      clientSecret: 'your-secret' # From OAuth provider
```

:::

</div>

## Validation

Before proceeding, verify:

1. OAuth client is properly configured
2. Redirect URIs match your domain
3. JWT signing key is generated and saved
4. Required scopes are enabled

## Troubleshooting

Common issues and solutions:

1. **Invalid Redirect URI**

   - Verify exact URI match
   - Check for protocol (https) mismatch
   - Confirm domain spelling

2. **Authentication Failures**
   - Verify client credentials
   - Check scope configurations
   - Validate JWT signing key

## Next Steps

1. ✅ Configure OAuth provider
2. ✅ Generate JWT signing key
3. ➡️ Proceed to [PostgreSQL Setup](/documentation/docs/launch-platform/self-hosted/installation-guide/prerequisites/postgresql)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::
