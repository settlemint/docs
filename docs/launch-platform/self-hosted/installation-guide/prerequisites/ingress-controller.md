---
title: Ingress Controller
sidebar_position: 7
---

# Ingress Controller Setup

## Overview

An Ingress Controller is required for the SettleMint Platform to manage external access to services. We recommend using NGINX Ingress Controller for its reliability and features:
- HTTP/HTTPS routing
- TLS termination
- Load balancing
- Path-based routing

## Deployment Options

Choose the deployment method that best suits your infrastructure:

### Self-Hosted Options
- [Helm Chart Deployment](#helm-chart)
- [Manifest Deployment](#manifest)

### Cloud Provider Options
- [AWS Load Balancer Controller](#aws)
- [GCP HTTP(S) Load Balancing](#gcp)
- [Azure Application Gateway](#azure)

## Self-Hosted Deployment

### <a name="helm-chart"></a>Helm Chart Deployment

1. Add the NGINX Ingress Helm repository:

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

2. Create values file (ingress-values.yaml):

```
controller:
  service:
    type: LoadBalancer
  config:
    use-forwarded-headers: "true"
    proxy-buffer-size: "16k"
  metrics:
    enabled: true
```

3. Install NGINX Ingress:

```
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  -f ingress-values.yaml
```

:::info Required Values
To complete platform installation, you'll need:
- Ingress Class Name: nginx
- Load Balancer IP/Hostname
- SSL Configuration (if enabled)
:::

### <a name="manifest"></a>Manifest Deployment

1. Apply the mandatory manifests:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

:::info Required Values
To complete platform installation, you'll need:
- Ingress Class Name: nginx
- Load Balancer IP/Hostname
- SSL Configuration (if enabled)
:::

## Cloud Provider Options

### <a name="aws"></a>AWS Load Balancer Controller

1. Install AWS Load Balancer Controller:
   - Set up IAM roles
   - Configure service account
   - Deploy controller

:::info Required Values
To complete platform installation, you'll need:
- ALB Ingress Class Name: alb
- SSL Certificate ARN
- VPC ID
:::

### <a name="gcp"></a>GCP HTTP(S) Load Balancing

1. Enable GKE Ingress:
   - Configure backend configuration
   - Set up SSL certificates
   - Configure health checks

:::info Required Values
To complete platform installation, you'll need:
- GCE Ingress Class Name: gce
- SSL Certificate Name
- Static IP (if used)
:::

### <a name="azure"></a>Azure Application Gateway

1. Set up Application Gateway Ingress:
   - Configure Application Gateway
   - Set up SSL certificates
   - Deploy controller

:::info Required Values
To complete platform installation, you'll need:
- AGIC Ingress Class Name: azure/application-gateway
- SSL Certificate Reference
- Application Gateway Resource ID
:::

## Requirements

Regardless of deployment method, ensure:
- Load balancer accessibility
- SSL/TLS configuration
- Sufficient resources allocated
- Network policies configured
- Monitoring enabled 