---
title: Domain and TLS Configuration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Domain and TLS Configuration

## Overview

<div className="row margin-bottom--lg">
<div className="col col--6">

### Purpose
* Secure platform access
* Service-to-service communication
* API endpoint security
* User authentication

</div>
<div className="col col--6">

### Requirements
* Registered domain name
* DNS management access
* Ability to create DNS records
* TLS certificate provider

</div>
</div>

## Domain Configuration

<Tabs>
<TabItem value="setup" label="Setup Steps" default>

### 1. Configure Main Domain
* Create an A record pointing to your ingress controller IP
* Example: `platform.company.com → 203.0.113.1`

### 2. Add Wildcard Subdomain
* Create a CNAME record for all subdomains
* Pattern: `*.platform.company.com → platform.company.com`

</TabItem>
<TabItem value="validation" label="Validation">

### DNS Resolution Tests
```bash
# Check A record
dig +short platform.company.com

# Check CNAME record
dig +short test.platform.company.com

# Verify IP matches ingress
kubectl -n ingress-nginx get svc ingress-nginx-controller \
  -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

</TabItem>
</Tabs>

## TLS Configuration

<Tabs>
<TabItem value="cloudflare" label="Cloudflare (Recommended)" default>

### Quick Setup with Cloudflare

1. **Add Domain to Cloudflare**
   * Transfer DNS management
   * Update nameservers

2. **Configure SSL/TLS**
   * Purchase Advanced Certificate Manager (ACM)
   * Enable Total TLS
   * Set SSL/TLS mode to Full (Strict)

:::tip Benefits
* Automatic certificate management
* DDoS protection included
* Easy wildcard certificate support
* Global CDN
:::

</TabItem>
<TabItem value="certmanager" label="cert-manager">

### Setup with cert-manager

1. **Install cert-manager**
```bash
helm repo add jetstack https://charts.jetstack.io --force-update
helm repo update
helm upgrade --install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
```

2. **Configure DNS Provider**
```bash
# Create API token secret
kubectl apply -n cert-manager -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: cloudflare-api-token-secret
  namespace: cert-manager
type: Opaque
stringData:
  api-token: <API Token>
EOF
```

3. **Create ClusterIssuer**
```bash
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
  namespace: cert-manager
spec:
  acme:
    email: your-email@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: issuer-account-key
    solvers:
      - dns01:
          cloudflare:
            apiTokenSecretRef:
              name: cloudflare-api-token-secret
              key: api-token
EOF
```

:::caution Important
* Use a valid email address for certificate notifications
* Ensure DNS provider API token has sufficient permissions
* Allow time for initial certificate issuance
:::

</TabItem>
</Tabs>

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] Domain name (e.g., `platform.company.com`)
* [ ] Ingress annotations (if using cert-manager: `cert-manager.io/cluster-issuer: "letsencrypt"`)
* [ ] TLS secret name for the certificate
* [ ] SSL redirect setting (`true` or `false`)

:::note Example Configuration
```yaml
ingress:
  enabled: true
  className: nginx
  host: "platform.company.com"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  tls:
    - secretName: "tls-secret"
      hosts:
        - "platform.company.com"
        - "*.platform.company.com"

deploymentEngine:
  platform:
    domain:
      hostname: "platform.company.com"
  clusterManager:
    domain:
      hostname: "platform.company.com"
  targets:
    - clusters:
        - domains:
            service:
              tls: true
              hostname: "platform.company.com"
          ingress:
            ingressClass: "nginx"
```
:::

</div>

## Troubleshooting

<div className="row margin-bottom--lg">
<div className="col col--6">

### DNS Issues
* **Not Resolving**
  * Verify A record IP
  * Check CNAME configuration
  * Allow DNS propagation (48h max)

* **Wrong IP**
  * Confirm ingress controller IP
  * Update DNS records
  * Clear local DNS cache

</div>
<div className="col col--6">

### Certificate Issues
* **cert-manager**
  * Check issuer status
  * Verify DNS01 challenge
  * Review cert-manager logs

* **Cloudflare**
  * Verify SSL/TLS mode
  * Check certificate status
  * Confirm proxy status

</div>
</div>

## Next Steps

1. ✅ Verify DNS resolution
2. ✅ Confirm TLS certificate issuance
3. ➡️ Proceed to [OAuth Provider Setup](./oauth)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::