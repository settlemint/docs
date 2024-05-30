---
sidebar_position: 2
sidebar_label: 'Infrastructure'
---

Before starting the installation, ensure your environment meets the following requirements:

# Infrastructure


The following components are a prerequisite to run BTP successfully. Collect the values here to use them later in the [helm chart values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/).

At this stage, we highly recommend taking a moment to explore our quick start examples, if you haven't already. This will give you a valuable overview of the different components involved.

## Configure the Kubeconfig

This step involves obtaining and setting up the kubeconfig file to access the Kubernetes cluster. Depending on the provider, you may need to download it or obtain it using provider-specific commands. After obtaining the kubeconfig, ensure it's correctly merged if necessary and verify that the correct cluster is set as active.

### Examples

- For Google Cloud (GKE), use `gcloud container clusters get-credentials`.
- For CIVO Cloud, download it from the dashboard and merge it into your local kubeconfig.
- For Digital Ocean, utilize `doctl kubernetes cluster kubeconfig save`.

## Helm 3 and Pre-flight Checks

Make sure you have Helm v3 installed. Installation instructions can be found on [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/).

After you have Helm 3 set up, install and run the preflight checks plugin:

```
curl https://krew.sh/preflight | bash
helm template oci://registry.settlemint.com/settlemint-platform/settlemint --version x.x.x | kubectl preflight -
```

## Ingress Controller

For the successful operation of the SettleMint Blockchain Transformation Platform (BTP), it's essential that your Kubernetes cluster is outfitted with an Ingress Controller. This key component plays a vital role in directing external traffic towards BTP services in an effective and secure manner. Ensure that your Kubernetes cluster incorporates an Ingress Controller capable of routing traffic to the BTP. If you're in need of one, the Ingress-Nginx Controller comes highly recommended for its reliability and security, making it an excellent choice for BTP. For more information, please visit: [https://kubernetes.github.io/ingress-nginx/](https://kubernetes.github.io/ingress-nginx/). If opting for Ingress-Nginx, we provide a straightforward option to link BTP with it. For users of other ingress solutions, such as the OpenShift Router, you will need to manually create an equivalent ingress configuration. Remember to substitute all instances of `settlemint.local` with the hostname of your choice.

### A typical set of parameters you should collect:

- `hostname`: the hostname on which BTP will be available. This domain name needs to be routed to the public IP address of the ingress controller service.

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)


```yaml
ingress:
  enabled: true
  className: nginx
  host: "<hostname>"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  tls:
    - secretName: "blockchaintransformationplatform"
      hosts:
        - "<hostname>"
        - "*.<hostname>"
```

## OAuth2 Provider

The OAuth2 providers we support include Google, GitHub, Auth0, and Keycloak. If you require integration with other systems, such as LDAP, we recommend utilizing Keycloak. Keycloak allows for the configuration of LDAP settings and supports straightforward username/password accounts.

### A typical set of parameters you should collect:

- `clientID`: This is the OAuth Client ID specified by your provider.
- `clientSecret`: This refers to the OAuth Client Secret provided by your provider.
- `issuerURL`: This is the URL of the provider that will be utilized to verify the JWT token.

The following is a list of available providers and the values they accept:


```yaml
google:
  enabled: false
  clientID: ""
  clientSecret: ""
github:
  enabled: false
  clientID: ""
  clientSecret: ""
auth0:
  enabled: false
  clientID: ""
  clientSecret: ""
  issuerURL: ""
keycloak:
  enabled: false
  clientID: ""
  clientSecret: ""
  issuerURL: ""
```
 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)

```yaml
auth:
  jwtSigningKey: "<random>"
  providers:
    enabled: true
    clientID: "<client id>"
    clientSecret: "<client secret>"
```

## Redis

A Redis server is essential for offering session storage for the job queues utilized in the BTP.

If you don't have one, you have two options: install it yourself, for instance, by following the instructions at [https://github.com/bitnami/charts/tree/main/bitnami/redis](https://github.com/bitnami/charts/tree/main/bitnami/redis), or opt for a managed service such as  https://redis.com/cloud/overview.

A typical set of parameters you should collect:

- host: the hostname of the redis server
- port: the port of the redis server
- password: the password of the redis server

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)

```yaml
 redis:
  host: redis-master.redis.svc.cluster.local
  password: supersecretredispassword
  ```

  ## Postgres

A PostgreSQL server is necessary for hosting the database required by the BTP.

If you don't currently have a PostgreSQL server, you can set it up yourself by following the guide at [https://github.com/bitnami/charts/tree/main/bitnami/postgresql](https://github.com/bitnami/charts/tree/main/bitnami/postgresql), or you can choose a managed service such as [https://neon.tech/](https://neon.tech/) or [https://aws.amazon.com/rds/postgresql/](https://aws.amazon.com/rds/postgresql/).

### A typical set of parameters you should collect:

- `host`: the hostname of the PostgreSQL server
- `port`: the port of the PostgreSQL server
- `username`: the username of the PostgreSQL server
- `password`: the password of the PostgreSQL server
- `database`: the database name of the PostgreSQL server

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)


```yaml
postgresql:
  host: postgresql.postgresql.svc.cluster.local
  user: mypsqlusername
  password: mysupersecretpsqlpassword
  database: mypsqldbname
```

## Storage

The BTP platform requires a solution that supports both horizontal scaling and access to state files. For this purpose, an S3-compatible API is essential. In environments with internet access, using a bucket in AWS S3 is advised. For operations in air-gapped environments or those preferring to host data within their own data center, MinIO is a suitable alternative.

The state information is always encrypted. By default, encryption is performed using a key that you provide. Alternatively, you can opt to use an AWS KMS key ARN for encryption through AWS KMS.

### A typical set of parameters you should collect:

- S3 connection URL:
    - For MinIO: `s3://<my-bucketname>?region=eu-central-1&endpoint=<my-minio-host>:9000&disableSSL=true&s3ForcePathStyle=true`
    - For AWS S3: `s3://<my-bucketname>?region=eu-central-1`
- `accessKeyId`: This is the access key for the specified bucket.
- `secretAccessKey`: This is the secret access key for the specified bucket.

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)

```yaml
state:
  s3ConnectionUrl: "s3://myminiobucket?region=eu-central-1&endpoint=minio.minio.svc.cluster.local:9000&disableSSL=true&s3ForcePathStyle=true"
```

## Vault Service

For the BTP, all private key material can be securely stored in Hashicorp Vault. You are required to supply a configured Vault instance, which can be set up on-premise, in your private cloud, or you can utilize the Hashicorp Cloud service.
To accommodate this setup, you must create three kv2 secret engines, each designated for a specific path:
  - `ethereum`
  - `ipfs`
  - `fabric`

Additionally, an AppRole is necessary to facilitate access to these secrets.

### A typical set of parameters you should collect:

- `address`: the address to your vault, in Hashicorp Vault this will look like "https://my-vault.hashicorp.cloud:8200"
- `namespace`: if you are using an enterprise vault, you will have a namespace. Leave this empty if not used
- `roleId`: the roleId of the AppRole
- `secretId`: the secretId of the AppRole

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)

```yaml
vault:
  address: http://vault.vault.svc.cluster.local:8200
  roleId: "<role id>"
  secretId: "<secret id>"
```

## Prometheus / Loki

The observability suite within the BTP leverages Prometheus and Loki for monitoring and logging. You are required to specify the API endpoints for these services. It’s worth noting that Prometheus can be replaced with API-compatible alternatives, such as VictoriaMetrics, if preferred.

This observability suite is optional and can be activated as described below.

### A typical set of parameters you should collect:

- Prometheus API URL: this is an example from Grafana cloud: `https://prometheus-prod-01-eu-west-0.grafana.net/api/prom/api/v1/`
- Loki API URL: this is an example from Grafana cloud: `https://logs-prod-eu-west-0.grafana.net/loki/api/v1/`

 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)


```yaml
features:
  observability:
    metrics:
      enabled: true
      apiUrl: "https://prometheus-prod-01-eu-west-0.grafana.net/api/prom/api/v1/"
    logs:
      enabled: true
      apiUrl: "http://loki-gateway.observability.svc.cluster.local/loki/api/v1/"
```

## Kubernetes Target Clusters

To deploy your blockchain nodes and additional services with the SettleMint Blockchain Transformation Platform (BTP), it's crucial to correctly set up your Kubernetes clusters. Here is a refined explanation that captures all the essential details:

### 1. Choosing Your Deployment Environment

BTP can be deployed within a single cluster or across multiple external clusters. Your choice will determine the specific preparations required.

### 2. Preparing External Clusters

For external clusters, `kubeconfig` files are necessary. These files must be independent of any cloud provider's specific tools, ensuring compatibility across different environments.
Each external cluster must have the BTP-specific Ingress Controller installed. Achieve this by using our Helm charts values file, making sure to disable any features not needed for your deployment.

### 3. Namespace Configuration for Deployment

You have the option to deploy services in separate namespaces for each service or within a single pre-configured namespace. The approach you choose can vary depending on the cluster's organization and your preferences.

### 4. Setting Up Domain Names for Service Access

Access to services is facilitated through domain names. The setup can involve:

- Wildcard DNS

 entries for each cluster, ensuring they include TLS termination to secure the domain.
- Path-based routing as an alternative method, depending on the cluster’s setup and requirements.

Before deploying, please verify that your provided cluster includes an Ingress controller configured to handle routing. Our deployment process assumes and relies on the presence of an Ingress controller for seamless operation. We offer a straightforward "Ingress" object designed specifically for nginx-ingress, which can be easily adjusted to align with your preferred Ingress controller.

### 5. Enabling Inter-Cluster Connectivity

Should your deployment strategy require connectivity between different clusters (for instance, to interlink blockchain networks), BTP needs the capability to manage new load balancers and link them with appropriate domain names.

To facilitate this, activate **p2pLoadBalancers** and configure DNS name management automatically via Cloudflare credentials. This setup is crucial for maintaining seamless communication and interoperability across your infrastructure.

In addition, the 'mixedLoadBalancers' option facilitates the creation of TCP/UDP load balancers on the same port, which is essential for enabling discovery mechanisms.


 [In your values file](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/run-the-Installation/)


```yaml
targets:
  - id: gke
    name: "Google Cloud"
    icon: google
    clusters:
      - id: sandbox
        name: "Sandbox Demo"
        icon: belgium
        location:
          lat: 50.8505
          lon: 4.3488
        connection:
          sameCluster:
            enabled: true
        namespace:
          single:
            name: deployments
        domains:
          service:
            tls: true
            hostname: "sandbox-saeed.blockchaintransformationplatform.com"
        storage:
          storageClass: "standard-rwo"
        ingress:
          ingressClass: "settlemint-nginx"
        capabilities:
          mixedLoadBalancers: false
```
Once your values file is prepared, you're all set to proceed with the installation!