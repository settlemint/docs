---
title: Ingress Controller
sidebar_position: 2
---

# Ingress Controller Setup

## Overview

The ingress controller is responsible for:
* Managing external access to services
* Load balancing
* SSL/TLS termination
* Routing rules

## Deployment Options

<Tabs>
<TabItem value="helm" label="Helm Chart" default>

### Install with Helm

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

Wait for the load balancer IP to be assigned:
```bash
kubectl get service -n ingress-nginx ingress-nginx-controller \
  --output jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

</TabItem>
<TabItem value="marketplace" label="Cloud Marketplace">

### Cloud Provider Marketplaces

Choose your cloud provider's marketplace offering:

* **Digital Ocean**:
  * Install "NGINX Ingress Controller" from marketplace
  * Automatically configures load balancer

* **CIVO**:
  * Enable "Nginx ingress controller" during cluster creation
  * Or add from marketplace post-creation

* **Other Providers**:
  * Most cloud providers offer similar marketplace solutions
  * Follow provider-specific installation steps

</TabItem>
</Tabs>

## Validation

Verify your installation:

```bash
# Check pods are running
kubectl get pods -n ingress-nginx

# Verify service and IP allocation
kubectl get svc -n ingress-nginx
```

## Information Collection

<div className="alert alert--success" role="alert">

### Required Values for Platform Installation

* [ ] Ingress class name (default: `nginx`)
* [ ] Load balancer IP address
* [ ] Ingress controller namespace

:::note Example Configuration
```yaml
ingress:
  enabled: true
  className: nginx
  # Other ingress settings will be configured in Domain & TLS section
```
:::

</div>

## Troubleshooting

Common issues and solutions:

1. **No Load Balancer IP**
* Verify cloud provider load balancer service is running
* Check cloud provider quotas
* Ensure correct service annotations

2. **Controller Not Ready**
* Check pod logs: `kubectl logs -n ingress-nginx <pod-name>`
* Verify resource requirements are met
* Check network policies

## Next Steps

1. ✅ Verify ingress controller is running
2. ✅ Note down the load balancer IP
3. ➡️ Proceed to [Domain and TLS Setup](./domain-and-tls)

:::tip Need Help?
Contact [support@settlemint.com](mailto:support@settlemint.com) if you encounter any issues.
:::