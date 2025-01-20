---
title: Platform Installation
sidebar_position: 3
---

# Platform Installation Guide

## Overview

This guide walks you through installing the SettleMint Platform using Helm, providing a command-line based installation method with full control over the deployment process.

## Prerequisites

Before starting the installation, ensure you have:

- Completed all [prerequisite services](prerequisites/overview.md) setup
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
  className: "nginx"
  host: '<your-domain>'
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/proxy-ssl-server-name: "on"
    nginx.ingress.kubernetes.io/proxy-body-size: "500m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    cert-manager.io/cluster-issuer: "letsencrypt"  # If using cert-manager
  tls:
    - secretName: 'platform-tls'
      hosts:
        - '<your-domain>'
        - '*.<your-domain>'

redis:
  host: '<redis-host>'
  port: '<redis-port>'
  password: '<redis-password>'
  tls: true

postgresql:
  host: '<postgresql-host>'
  port: '<postgresql-port>'
  user: '<postgresql-user>'
  password: '<postgresql-password>'
  database: '<database-name>'
  sslMode: require

auth:
  jwtSigningKey: '<your-jwt-signing-key>'
  providers:
    google:
      enabled: true
      clientID: '<google-client-id>'
      clientSecret: '<google-client-secret>'
    microsoftEntraId:
      enabled: true
      clientID: '<microsoft-client-id>'
      clientSecret: '<microsoft-client-secret>'
      tenantId: '<microsoft-tenant-id>'

vault:
  address: '<vault-address>'
  roleId: '<vault-role-id>'
  secretId: '<vault-secret-id>'
  namespace: 'vault'

features:
  observability:
    metrics:
      enabled: true
      apiUrl: '<victoria-metrics-url>'
    logs:
      enabled: true
      apiUrl: '<loki-url>'
  deploymentEngine:
    platform:
      domain:
        hostname: '<your-domain>'
    clusterManager:
      domain:
        hostname: '<your-domain>'
    state:
      s3ConnectionUrl: 's3://<bucket-name>?region=<region>'
      secretsProvider: 'passphrase'
      credentials:
        encryptionKey: '<your-encryption-key>'
        aws:
          accessKeyId: '<aws-access-key>'
          secretAccessKey: '<aws-secret-key>'
          region: '<aws-region>'
        # azure:
        #   # -- Azure storage account name
        #   storageAccount: '<azure-storage-account>'
        #   # -- Azure storage account key
        #   storageKey: '<azure-storage-key>'
    targets:
      - id: '<cluster-id>'
        name: '<cluster-name>'
        icon: '<cluster-icon>'
        clusters:
          - id: '<cluster-instance-id>'
            name: '<cluster-instance-name>'
            icon: '<cluster-instance-icon>'
            location:
              lat: '<latitude>'
              lon: '<longitude>'
            connection:
              sameCluster:
                enabled: true
            namespace:
              single:
                name: '<namespace>'
            domains:
              service:
                tls: true
                hostname: '<your-domain>'
            storage:
              storageClass: '<storage-class>'
            ingress:
              ingressClass: '<ingress-class>'
            capabilities:
              mixedLoadBalancers: false

app:
  replicaCount: '<replicas>'
api:
  replicaCount: '<replicas>'
  existingSecret: '<platform-secret>'
job:
  resources:
    requests:
      cpu: '<cpu-request>'
      memory: '<memory-request>'
  autoscaling:
    enabled: true
deployWorker:
  resources:
    requests:
      cpu: '<cpu-request>'
      memory: '<memory-request>'
  autoscaling:
    enabled: true
clusterManager:
  replicaCount: '<replicas>'
docs:
  replicaCount: '<replicas>'

imagePullCredentials:
  registries:
    harbor:
      enabled: true
      registry: "harbor.settlemint.com"
      username: '<registry-username>'
      password: '<registry-password>'
      email: '<registry-email>'

support:
  kubernetes-replicator:
    enabled: true

features:
  billing:
    enabled: false
    alerting:
      slack:
        enabled: false
        webhookUrl: ''
    stripe:
      apiSecret: ''
      webhookSecret: ''
      webhookUrl: ''
      apiLiveMode: false
      taxRateId: ''
      publishableKey: ''
    autoDelete:
      enabled: false
    emailUsageExcel:
      enabled: true

  privateKeys:
    hsm:
      awsKms:
        enabled: false
    txsigner:
      image:
        registry: ghcr.io
        repository: settlemint/btp-signer
        tag: '7.6.10'

  networks:
    besu:
      image:
        registry: docker.io
        repository: hyperledger/besu
        tag: '24.12.2'
    quorum:
      image:
        registry: docker.io
        repository: quorumengineering/quorum
        tag: '24.4.1'
    geth:
      image:
        registry: docker.io
        repository: ethereum/client-go
        tag: 'alltools-v1.13.4'
    fabric:
      ca:
        image:
          registry: docker.io
          repository: hyperledger/fabric-ca
          tag: '1.5.13'
      orderer:
        image:
          registry: docker.io
          repository: hyperledger/fabric-orderer
          tag: '2.5.10'
      tools:
        image:
          registry: docker.io
          repository: hyperledger/fabric-tools
          tag: '2.5.10'
      peer:
        image:
          registry: docker.io
          repository: hyperledger/fabric-peer
          tag: '2.5.10'
      couchdb:
        image:
          registry: docker.io
          repository: apache/couchdb
          tag: '3.4.2'
      dind:
        image:
          registry: docker.io
          repository: library/docker
          tag: '24.0.7-alpine3.18'
    mainnets:
      enabled: true
      ethereumMetricsExporter:
        image:
          registry: docker.io
          repository: ethpandaops/ethereum-metrics-exporter
          tag: '0.26.0'

  smartContractSets:
    etherscan:
      apiKeys:
        etherscan: ""
        polyscan: ""
        zkevmpolyscan: ""
        bscscan: ""
        arbiscan: ""
        optimistic: ""
    ide:
      image:
        registry: ghcr.io
        repository: settlemint/btp-ide
        tag: 'v7.6.5'
    sets:
      - id: starterkit-asset-tokenization
        name: Asset Tokenization
        image:
          registry: ghcr.io
          repository: settlemint/starterkit-asset-tokenization
          tag: '0.0.11'
      # ... (other sets can be added as needed)

  customDomains:
    enabled: false
    outerIngressClass: "nginx"
    email: ""

  crons:
    cleanup: "0 */10 * * * *"
```

:::note
Replace all placeholder values with your actual configuration
- The license section should be configured with your provided license file
- Image tags should be verified for the latest stable versions
- Remove any unused features to keep the configuration clean
:::

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
