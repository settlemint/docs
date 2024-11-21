---
title: Platform Installation
sidebar_position: 3
---

# Platform Installation Guide

## Overview

This guide walks you through installing the SettleMint Platform using Helm, providing a command-line based installation method with full control over the deployment process.

## Prerequisites

Before starting the installation, ensure you have:
- Completed all [prerequisite services](/launch-platform/self-hosted/installation-guide/prerequisites/overview) setup
- Collected all required information from the prerequisite guides
- Met all infrastructure requirements
- Helm 3.x installed
- kubectl access to your cluster
- Admin permissions

## Installation Steps

### 1. Sign in to the SettleMint Helm Registry

```bash
helm registry login harbor.settlemint.com --username <username> --password <password>
```

Replace `<username>` and `<password>` with your provided credentials.

### 2. Review Configuration Options

View all available configuration options:

```bash
helm show values oci://registry.settlemint.com/settlemint-platform/settlemint --version 7.0.0
```

### 3. Install the Platform

Create a values file (values.yaml) with your configuration:

```yaml
ingress:
  enabled: true
  className: nginx
  host: "<your-domain>"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  tls:
    - secretName: "blockchaintransformationplatform"
      hosts:
        - "<your-domain>"
        - "*.<your-domain>"

redis:
  host: "<redis-host>"
  password: "<redis-password>"
  port: "<redis-port>"
  tls: true

postgresql:
  host: "<postgresql-host>"
  port: "<postgresql-port>"
  user: "<postgresql-user>"
  password: "<postgresql-password>"
  database: "<postgresql-database>"
  sslMode: require

auth:
  jwtSigningKey: "<jwt-signing-key>"
  providers:
    google:
      enabled: true
      clientID: "<google-client-id>"
      clientSecret: "<google-client-secret>"

vault:
  address: "<vault-address>"
  namespace: "admin"
  roleId: "<vault-role-id>"
  secretId: "<vault-secret-id>"

features:
  observability:
    metrics:
      enabled: true
      apiUrl: "<prometheus-url>"
    logs:
      enabled: true
      apiUrl: "<loki-url>"
  deploymentEngine:
    platform:
      domain:
        hostname: "<your-domain>"
    clusterManager:
      domain:
        hostname: "<your-domain>"
    state:
      s3ConnectionUrl: "<s3-connection-url>"
      credentials:
        encryptionKey: "<encryption-key>"
        aws:
          accessKeyId: "<aws-access-key>"
          secretAccessKey: "<aws-secret-key>"
          region: "<aws-region>"
```

<details>
<summary>Click to see a complete example values file</summary>

```yaml
ingress:
  enabled: true
  className: nginx
  host: "sandbox-demo.blockchaintransformationplatform.com"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  tls:
    - secretName: "blockchaintransformationplatform"
      hosts:
        - "sandbox-demo.blockchaintransformationplatform.com"
        - "*.sandbox-demo.blockchaintransformationplatform.com"

redis:
  host: redis-17220.c250.eu-central-1-1.ec2.cloud.redislabs.com
  password: supersecretredispassword
  port: 17220
  tls: true

postgresql:
  host: ep-morning-moon-a20p0s24-pooler.eu-central-1.aws.neon.tech
  port: 5432
  user: sandbox-demo_owner
  password: mysupersecretpsqlpassword
  database: sandbox-demo
  sslMode: require

auth:
  jwtSigningKey: "HamMmiYGP+sBClp0tWbhlg8I5+k/OOoM+/7rNOLpHtI="
  providers:
    google:
      enabled: true
      clientID: "123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
      clientSecret: "GOCSPX-abcdefghijklmnopqrstuvwxyz"

vault:
  address: "https://sandbox-demo-public-vault-975715c8.ba526938.z1.hashicorp.cloud:8200"
  namespace: "admin"
  roleId: "12345678-90ab-cdef-ghij-klmnopqrstuv"
  secretId: "12345678-90ab-cdef-ghij-klmnopqrstuv"

features:
  observability:
    metrics:
      enabled: true
      apiUrl: "http://victoria-metrics-victoria-metrics-single-server.observability.svc.cluster.local:8428/prometheus/api/v1"
    logs:
      enabled: true
      apiUrl: "http://loki-gateway.observability.svc.cluster.local/loki/api/v1"
  deploymentEngine:
    platform:
      domain:
        hostname: "sandbox-demo.blockchaintransformationplatform.com"
    clusterManager:
      domain:
        hostname: "sandbox-demo.blockchaintransformationplatform.com"
    state:
      s3ConnectionUrl: "s3://sandbox-demo-bucket?region=eu-central-1"
      credentials:
        encryptionKey: "r532kL19Jrp8Fnql43ScR4UhN46Sh1QmgbJXjkPC2YI="
        aws:
          accessKeyId: "AKIAIOSFODNN7EXAMPLE"
          secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
          region: "eu-central-1"

app:
  replicaCount: 2
api:
  replicaCount: 2
job:
  replicaCount: 2
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
  autoscaling:
    enabled: true
deployWorker:
  replicaCount: 2
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
  autoscaling:
    enabled: true
clusterManager:
  replicaCount: 2
docs:
  replicaCount: 2
```

</details>

Install the platform:

```bash
helm upgrade --install settlemint oci://registry.settlemint.com/settlemint-platform/settlemint \
  --namespace settlemint \
  --version 7.0.0 \
  --create-namespace \
  --values values.yaml
```

### 4. Verify Installation

Check the deployment status:

```bash
kubectl get pods -n settlemint
```

Verify all pods are running and ready.

### 5. Access the Platform

Once all pods are running, access the platform at `https://<your-domain>`.

## Troubleshooting

If you encounter issues during installation:

1. Debug the installation:
```bash
helm upgrade --install --debug --dry-run settlemint oci://registry.settlemint.com/settlemint-platform/settlemint \
  --namespace settlemint \
  --values values.yaml
```

2. Check pod logs:
```bash
kubectl logs -n settlemint <pod-name>
```

3. Generate a support bundle:
```bash
# Install support bundle plugin
curl https://krew.sh/support-bundle | bash

# Generate bundle
kubectl support-bundle --load-cluster-specs
```

Send the generated support bundle to [support@settlemint.com](mailto:support@settlemint.com) for assistance.

## Uninstalling

To remove the platform:

```bash
helm delete settlemint --namespace settlemint
```

**Note:** This will not delete persistent volumes or other resources outside of Helm's control. You may need to clean these up manually.