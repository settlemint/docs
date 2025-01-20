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

<details>
<summary>Click to see a complete example values file</summary>

```yaml
ingress:
  enabled: true
  className: "nginx"
  host: 'example.company.com'
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/proxy-ssl-server-name: "on"
    nginx.ingress.kubernetes.io/proxy-body-size: "500m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    cert-manager.io/cluster-issuer: "letsencrypt"
  tls:
    - secretName: 'example-tls'
      hosts:
        - 'example.company.com'
        - '*.example.company.com'

redis:
  host: 'redis.example.local'
  port: '6379'
  password: 'abc123password'
  tls: true

postgresql:
  host: 'postgresql.example.local'
  port: '5432'
  user: 'db_user'
  password: 'xyz789password'
  database: 'platform_db'
  sslMode: require

auth:
  jwtSigningKey: 'abc123jwt456xyz789signing000key111example'
  providers:
    google:
      enabled: true
      clientID: 'example-123456789.apps.googleusercontent.com'
      clientSecret: 'abcdef-example-google-secret'

vault:
  address: 'http://vault.example.local:8200'
  roleId: 'abc123-role-id'
  secretId: 'xyz789-secret-id'
  namespace: 'vault'

features:
  observability:
    metrics:
      enabled: true
      apiUrl: 'http://metrics.example.local/api/v1'
    logs:
      enabled: true
      apiUrl: 'http://logs.example.local/api/v1'
  deploymentEngine:
    platform:
      domain:
        hostname: 'example.company.com'
    state:
      s3ConnectionUrl: 's3://example-bucket?region=us-east-1'
      secretsProvider: 'passphrase'
      credentials:
        encryptionKey: 'abc123encryption456key789example000key'
        aws:
          accessKeyId: 'EXAMPLEKEYID123456'
          secretAccessKey: 'abc123example456secret789key000aws'
          region: 'us-east-1'
    targets:
      - id: 'example'
        name: 'Example Cluster'
        icon: 'kubernetes'
        clusters:
          - id: 'main'
            name: 'Main'
            icon: 'global'
            location:
              lat: 0.0000
              lon: 0.0000
            connection:
              sameCluster:
                enabled: true
            namespace:
              single:
                name: 'example'
            domains:
              service:
                tls: true
                hostname: 'example.company.com'
            storage:
              storageClass: 'standard'
            ingress:
              ingressClass: 'nginx'

app:
  replicaCount: '2'
api:
  replicaCount: '2'
  existingSecret: 'example-secret'
job:
  resources:
    requests:
      cpu: '100m'
      memory: '512Mi'
deployWorker:
  resources:
    requests:
      cpu: '100m'
      memory: '512Mi'
clusterManager:
  replicaCount: '2'

imagePullCredentials:
  registries:
    harbor:
      enabled: true
      registry: "harbor.settlemint.com"
      username: 'example_user'
      password: 'abc123registry456password'
      email: 'example@company.com'

support:
  kubernetes-replicator:
    enabled: true
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

### 6. Target Clusters Configuration

The platform supports deploying blockchain nodes and applications to multiple target clusters across different cloud providers and regions. This section explains how to configure target clusters in your values file.

#### Target Structure
The targets configuration follows this hierarchy:
- **Cloud Provider** (e.g., GKE, EKS, AKS)
- **Clusters** (e.g., regions like Europe, Singapore, etc.)

#### Basic Configuration Example
```yaml
features:
  deploymentEngine:
    targets:
      - id: GKE
        name: Google Cloud
        icon: google
        clusters:
          - id: EUROPE
            name: Brussels
            icon: belgium
            location:
              lat: 50.8505
              lon: 4.3488
            namespace:
              multiple:
                enabled: true
                prefix: "sm"
            connection:
              pulumi:
                enabled: true
                stackname: "organization/clusters/gke-europe"
            domains:
              service:
                tls: true
                hostname: "gke-europe.example.com"
            storage:
              storageClass: "standard"
            ingress:
              ingressClass: "nginx"
            capabilities:
              mixedLoadBalancers: false
              nodePorts:
                enabled: true
                range:
                  min: 30000
                  max: 32767
      - id: EKS
        name: AWS
        icon: aws
        clusters:
          - id: SINGAPORE
            name: Singapore
            icon: singapore
            location:
              lat: 1.3521
              lon: 103.8198
            namespace:
              multiple:
                enabled: true
                prefix: "prod"
            connection:
              pulumi:
                enabled: true
                stackname: "organization/clusters/eks-singapore"
            domains:
              service:
                tls: true
                hostname: "eks-singapore.example.com"
            storage:
              storageClass: "gp3"
            ingress:
              ingressClass: "nginx"
            capabilities:
              mixedLoadBalancers: true
              nodePorts:
                enabled: true
                range:
                  min: 30000
                  max: 32767
      - id: AKS
        name: Azure
        icon: azure
        clusters:
          - id: MIDDLE_EAST
            name: Dubai
            icon: uae
            location:
              lat: 25.276987
              lon: 55.296249
            namespace:
              multiple:
                enabled: true
                prefix: "prod"
            connection:
              pulumi:
                enabled: true
                stackname: "organization/clusters/aks-middleeast"
            domains:
              service:
                tls: true
                hostname: "aks-middleeast.example.com"
            storage:
              storageClass: "managed-premium"
            ingress:
              ingressClass: "nginx"
            capabilities:
              mixedLoadBalancers: true
              nodePorts:
                enabled: true
                range:
                  min: 30000
                  max: 32767
```

#### Configuration Options

##### Cloud Provider Level
- `id`: Unique identifier for the cloud provider (GKE, EKS, AKS)
- `name`: Display name
- `icon`: Icon identifier for the UI

##### Cluster Level
- `id`: Unique identifier for the cluster
- `name`: Display name for the region/location
- `icon`: Icon identifier for the UI
- `disabled`: (Optional) Set to true to disable this cluster
- `location`: Geographic coordinates for visualization
  - `lat`: Latitude
  - `lon`: Longitude

##### Namespace Configuration
```yaml
namespace:
  single:
    enabled: false  # Use for single namespace deployments
    name: deployments
    runAsUser: 2024
    fsGroup: 2024
  multiple:
    enabled: true   # Use for multiple namespace deployments
    prefix: "sm"    # Prefix for created namespaces
```

##### Connection Settings
```yaml
connection:
  sameCluster:
    enabled: false
  kubeconfig:
    enabled: false
  pulumi:
    enabled: true
    stackname: "organization/clusters/cluster-name"
```

##### Domain Configuration
```yaml
domains:
  service:
    tls: true                           # Enable TLS for the domain
    hostname: "cluster.example.com"     # Domain for accessing services
```

The domain configuration determines how services in the cluster will be accessed. Each cluster needs a unique domain that resolves to its ingress controller.

##### Storage Configuration
```yaml
storage:
  storageClass: "standard"              # Default storage class for the cluster
```

Storage class recommendations per cloud provider:
- GKE: Use `"standard"` for general purpose or `"premium-rwo"` for better performance
- EKS: Use `"gp3"` for general purpose or `"io1"` for high-performance workloads
- AKS: Use `"managed-premium"` for production or `"default"` for development

##### Ingress Configuration
```yaml
ingress:
  ingressClass: "nginx"                 # Ingress controller class name
```

The ingress class should match your installed ingress controller. Common options:
- `"nginx"` for NGINX Ingress Controller
- `"azure/application-gateway"` for Azure Application Gateway
- `"alb"` for AWS Application Load Balancer

##### Capabilities Configuration
```yaml
capabilities:
  mixedLoadBalancers: false            # Support for mixed LoadBalancer services
  nodePorts:
    enabled: true                      # Enable NodePort service type
    range:                            # Port range for NodePort services
      min: 30000
      max: 32767
```

Capabilities determine what features are available in the cluster:
- `mixedLoadBalancers`: Enable if your cluster supports both internal and external load balancers
- `nodePorts`: Configure if you need to expose services using NodePort type
  - The port range should be within Kubernetes defaults (30000-32767)
  - Ensure the range doesn't conflict with other services

#### Important Considerations

1. **Domain Names**
   - Each cluster must have a unique domain name
   - Domains should be properly configured in your DNS provider
   - TLS certificates will be automatically managed if cert-manager is configured

2. **Storage Classes**
   - Verify the storage class exists in your cluster before using it
   - Consider performance requirements when selecting storage classes
   - Some features may require specific storage capabilities (e.g., RWX support)

3. **Network Capabilities**
   - `mixedLoadBalancers` should match your cloud provider's capabilities
   - NodePort ranges should not conflict with other services
   - Ensure network policies allow required communication

:::tip
When setting up a new cluster, start with the basic configuration and gradually enable additional capabilities as needed. This approach helps in identifying potential issues early in the deployment process.
:::


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
