---
sidebar_position: 4
sidebar_label:  'Sandbox Installation: Prerequisites from Managed Services'
---
# SettleMint Platform Sandbox Installation Guide (all prerequisites from managed service providers)

This sandbox installation guide provides the steps for setting up and installing the SettleMint Blockchain Transformation Platform
on a managed Kubernetes cluster. The guide assumes a prior understanding of Kubernetes, Helm, Digital Ocean,
and other relevant technologies.

**NOTE:** Sandbox installations are not designed or suitable for production use and cannot be upgraded to a production-ready state. Use this sandbox setup at your own risk.

## [Requirements](#requirements)

Before proceeding with the installation, ensure the following requirements are met:

- Access to a Digital Ocean account
- Helm 3 is installed
- Knowledge of Kubernetes, Helm, and Digital Ocean

## [Managed Kubernetes Cluster Setup](#managed-kubernetes-cluster-setup)

### [Establish a Cluster](#establish-a-cluster)

In this guide, we are using a Digital Ocean cluster as an example. The cluster utilized is autoscaling, and comprised
of 4 vCPU/8GB Memory machines. The cluster can be created using the Digital Ocean UI.

### [Configure the Kubeconfig](#configure-the-kubeconfig)

To set up access to the cluster, get the kubeconfig for the cluster by following these steps:

```bash
brew install doctl
doctl auth init
doctl kubernetes cluster kubeconfig save sandbox-demo
```

Ensure the cluster is set as the active context in the kubeconfig. Use `kubectl config current-context` to verify.

## [Helm Setup](#helm-setup)

Sign in to the SettleMint Helm registry. Replace `<username>` and `<password>` with your actual credentials:

```bash
helm registry login registry.settlemint.com --username <username> --password <password>
```

## [Prerequisites Installation](#prerequisites-installation)

This section covers the installation prerequisites, including setting up an ingress controller, installing Redis, Postgresql, Minio, and more.

### [An Ingress Controller](#an-ingress-controller)

From the marketplace install `NGINX Ingress Controller`

Then, you need to link a domain name to the external load balancer IP. Create an A record in your DNS provider that points to this IP and ensure that it resolves:

```bash
dig sandbox-demo.blockchaintransformationplatform.com
```

You will also need to create a wildcard CNAME `*.sandbox-demo.blockchaintransformationplatform.com` that points to `sandbox-demo.blockchaintransformationplatform.com` and confirm that it resolves:

```bash
dig random.sandbox-demo.blockchaintransformationplatform.com
```

### [TLS Configuration](#tls-configuration)

The platform can run without TLS, but it is highly insecure and not recommended. There are many options to add a TLS
certificate to this URL. For the purpose of this guide, we will install [cert-manager](https://cert-manager.io/docs/) from
the Digital Ocean Marketplace.

To issue wildcard certificates, you MUST use the dns01 solver. Suppose this domain uses Cloudflare as the DNS provider.
In this case, configure the dns01 resolver with Cloudflare. Start by making an API token for the zone on
https://dash.cloudflare.com/profile/api-tokens and store it in this secret:

```bash
kubectl apply -f -n cert-manager - <<EOF
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

Next, create a ClusterIssuer. You must replace the email address with your own email. Let's Encrypt will use this email to contact you about expiring certificates and issues related to your account:

```bash
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
  namespace: cert-manager
spec:
  acme:
    email: sandbox-demo@settlemint.com
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

### [Redis Setup](#redis-setup)

In the Digital Ocean dashboard launch a Redis database cluster. For the purpose of this demo, the smallest plan
and regular disks is fine.

Note the commections details as we will need them later, it will look something like

```
username = default
password = ************************
host = sandbox-demo-redis-do-user-2313783-0.c.db.ondigitalocean.com
port = 25061
```

### [Postgresql Setup](#postgresql-setup)

In the Digital Ocean dashboard launch a PostgreSQL database cluster. For the purpose of this demo, the 2 vCPU 4Gb memory plan
and regular disks is fine.

Note the commections details as we will need them later, it will look something like

```
username = doadmin
password = ************************
host = sandbox-demo-psql-do-user-2313783-0.c.db.ondigitalocean.com
port = 25060
database = defaultdb
sslmode = require
```

As the platform can scale automatically, it is recommended to configure a connection pool on Digital Ocean. Create one
with 50 connections and link it to the database. Use the database name as the pool name.

### [S3 Storage Setup](#s3-setup)

In the Digital Ocean dashboard launch a Spaces Object Storage bucket. Collect the orgin endpoint and note it as we need it later.
It will look like this: https://sandbox-demo-s3.ams3.digitaloceanspaces.com
Also create a spaces key on https://cloud.digitalocean.com/account/api/spaces

Generate a state encryption key using `openssl rand -base64 32` and note it down.

### [Hashicorp Vault Setup](#hashicorp-vault-setup)

Hashicorp Vault is a tool for managing secrets and protecting sensitive data. It is open-source but only under a BSL-license
that prevents anyone from offering it as a service. So we will leverage their cloud offering for this.

Create a new Vault cluster on the Hashicorp Cloud. For this demo the Development tier and extra small size is sufficient.
As a template choose `Start from Scratch`.

When it is running, generate a new admin token from the UI and launch the web UI.

Then, create three secret engines for the private keys of the platform:

- Generic KV
- Path:
  - ethereum
  - ipfs
  - fabric

Next go to `Authentication Methods` and add a new `AppRole` method.
Then go to `Policies` and create a new role named btp with the following policy:

```hcl
path "ethereum/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "fabric/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "ipfs/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
```

Next, open up the terminal create your app role:

```bash
vault write auth/approle/role/platform-role \
    token_ttl=1h \
    token_max_ttl=4h \
    secret_id_ttl=6h \
    policies="btp"
```

To retrieve the Role ID and Secret ID for the `platform-role`, run:

```bash
vault read auth/approle/role/platform-role/role-id
vault write -force auth/approle/role/platform-role/secret-id
```

Record the role id and secret id as they will be needed later.

### [Prometheus & Loki Installation](#prometheus--loki-installation)

To enable the monitoring features of the platform, we are going to install the `Kubernetes Monitoring Stack` and `Grafana Loki` from the
Digital Ocean marketplace.

On Digital Ocean, metrics server is already installed, so there is no need for us to do so.
We do need kube-state-metrics which we can also install from the Marketplace.

### Kubernetes Target clusters

Next we will need to configure where the platform will deploy the services. We will set it up with a single namespace on the same cluster.

We need to create the namespace we are going to deploy in:

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: deployments
  labels:
    reloader: 'enabled'
    kots.io/app-slug: 'settlemint-platform'
spec: {}
status: {}
EOF
```

Now create a storage class that has WaitForFirstConsumer as volume binding mode and allows volume expansion:

```bash
kubectl apply -f - <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: btp-storage
provisioner: dobs.csi.digitalocean.com
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
EOF
```

## [OAuth2 Provider Setup](#oauth2-provider-setup)

In this example we will use Google login. Browse to https://console.developers.google.com/apis/credentials and on the top use `+ CREATE CREDENTIALS`, choose `OAuth client ID` and then as type `Web application`.

In `Authorised JavaScript origins` add the domain name you created in the Ingress controller section, in this example `https://sandbox-demo.blockchaintransformationplatform.com`. In `Authorised redirect URIs` use `https://sandbox-demo.blockchaintransformationplatform.com/api/auth/callback/google`.

You will get a Client ID and Client secret at the end of this process, note them down for later.

We will also need a secret to encrypt the JWT token. Generate a random key with `openssl rand -base64 32` and record this for later.

## [SettleMint Platform Installation](#settlemint-platform-installation)

To facilitate the process, SettleMint provides a Helm chart. For a typical platform installation, please sign in to the Settlemint Helm registry. Replace `<username>` and `<password>` with your credentials:

```bash
helm registry login registry.settlemint.com --username <username> --password <password>
```

The platform allows for extensive customisation, to check out all the options take a look at the values

```bash
helm show values oci://registry.settlemint.com/settlemint-platform/settlemint --version 7.0.0
```

We will do an installation based on the choices we made in the prerequisite section.

```bash
helm upgrade --install settlemint oci://registry.settlemint.com/settlemint-platform/settlemint \
  --namespace settlemint \
  --version 7.0.0 \
  --create-namespace \
  --values - <<EOF
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
  host: sandbox-demo-redis-do-user-2313783-0.c.db.ondigitalocean.com
  password: redacted
  port: 25061
  tls: true
postgresql:
  host: sandbox-demo-psql-do-user-2313783-0.c.db.ondigitalocean.com
  port: 25061
  user: doadmin
  password: redacted
  database: defaultdb
  sslMode: require
auth:
  jwtSigningKey: "HamMmiYGP+sBClp0tWbhlg8I5+k/OOoM+/7rNOLpHtI="
  providers:
    google:
      enabled: true
      clientID: "redacted"
      clientSecret: "redacted"
vault:
  address: https://sandbox-demo-public-vault-975715c8.ba526938.z1.hashicorp.cloud:8200
  namespace: admin
  roleId: "redacted"
  secretId: "redacted"
features:
  observability:
    metrics:
      enabled: true
      apiUrl: "http://kube-prometheus-stack-prometheus.kube-prometheus-stack.svc.cluster.local:9090/prometheus/api/v1"
    logs:
      enabled: true
      apiUrl: "http://loki.loki-stack.svc.cluster.local:3100/loki/api/v1"
  deploymentEngine:
    platform:
      domain:
        hostname: "sandbox-demo.blockchaintransformationplatform.com"
    clusterManager:
      domain:
        hostname: "sandbox-demo.blockchaintransformationplatform.com"
    state:
      s3ConnectionUrl: "s3://sandbox-demo-s3?region=US&endpoint=ams3.digitaloceanspaces.com"
      credentials:
        encryptionKey: "r532kL19Jrp8Fnql43ScR4UhN46Sh1QmgbJXjkPC2YI="
        aws:
          accessKeyId: "redacted"
          secretAccessKey: "redacted"
          region: "US"
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
                hostname: "sandbox-demo.blockchaintransformationplatform.com"
            storage:
              storageClass: "btp-storage"
            ingress:
              ingressClass: "settlemint-nginx"
            capabilities:
              mixedLoadBalancers: true
app:
  replicaCount: 2
api:
  replicaCount: 2
job:
  replicaCount: 2
deployWorker:
  replicaCount: 2
clusterManager:
  replicaCount: 2
docs:
  replicaCount: 2
EOF
```

You should now be able to access the platform at https://sandbox-demo.blockchaintransformationplatform.com.

**IMPORTANT:** Please refer to the actual SettleMint documentation for the most up-to-date, detailed, and accurate instructions. This is an illustrative guide and may be outdated or incorrect, and there may be additional configuration steps required for a fully functional deployment.

## [Additional Steps](#additional-steps)

Should an error occur during installation, debug the installation with the following command:

```bash
helm upgrade --install --debug --dry-run ...
```

To delete the installation and try again, use:

```bash
helm delete settlemint --namespace settlemint
```

And if you are stuck after this, there is a built in way to collect all the information SettleMint's Customer Success team needs to help you out.

Install the support bundle plugin

```bash
curl https://krew.sh/support-bundle | bash
```

Run the support bundle checks

```bash
kubectl support-bundle --load-cluster-specs
```

You can then send the generated file to [support@settlemint.com](mailto:support@settlemint.com)

Enjoy exploring the SettleMint Platform!

**NOTE:** This sandbox installation of the SettleMint platform might not include the full functionalities of the platform. To explore a full-scale, premium tier of the SettleMint Platform, consider reaching out to the SettleMint team for a premium sandbox or subscription.