---
sidebar_position: 1
sidebar_label: 'Sandbox Installation: All Prerequisites in the Cluster'
---
# SettleMint Platform Sandbox Installation Guide (all prerequisites installed in the cluster)

This sandbox installation guide provides the steps for setting up and installing the SettleMint Blockchain Transformation Platform on a managed Kubernetes cluster. The guide assumes a prior understanding of Kubernetes, Helm, Google Kubernetes Engine (GKE), and other relevant technologies.

**NOTE:** Sandbox installations are not designed or suitable for production use and cannot be upgraded to a production-ready state. Use this sandbox setup at your own risk.

## Contents

- [SettleMint Platform Sandbox Installation Guide (all prerequisites installed in the cluster)](#settlemint-platform-trial-installation-guide-all-prerequisites-installed-in-the-cluster)
  - [Contents](#contents)
  - [Requirements](#requirements)
  - [Managed Kubernetes Cluster Setup](#managed-kubernetes-cluster-setup)
    - [Establish a Cluster](#establish-a-cluster)
    - [Configure the Kubeconfig](#configure-the-kubeconfig)
  - [Helm Setup](#helm-setup)
  - [Prerequisites Installation](#prerequisites-installation)
    - [An Ingress Controller](#an-ingress-controller)
    - [TLS Configuration](#tls-configuration)
    - [Redis Installation](#redis-installation)
    - [Postgresql Installation](#postgresql-installation)
    - [Minio Installation](#minio-installation)
    - [Hashicorp Vault Installation](#hashicorp-vault-installation)
    - [Prometheus \& Loki Installation](#prometheus--loki-installation)
    - [Kubernetes Target clusters](#kubernetes-target-clusters)
  - [OAuth2 Provider Setup](#oauth2-provider-setup)
  - [SettleMint Platform Installation](#settlemint-platform-installation)
  - [Additional Steps](#additional-steps)

## [Requirements](#requirements)

Before proceeding with the installation, ensure the following requirements are met:

- Access to a google cloud account
- Pre-installed Google Cloud CLI (specifically the `gcloud` command)
- Helm 3 is installed
- Knowledge of Kubernetes, Helm, and GKE

## [Managed Kubernetes Cluster Setup](#managed-kubernetes-cluster-setup)

### [Establish a Cluster](#establish-a-cluster)

In this guide, we are using a GKE cluster as an example. The cluster utilized is zonal, autoscaling, and comprised of `e2-standard-8` machines (8 vCPU/32GB Memory). The cluster can be created using the Google UI, the CLI, or infrastructure as code tools such as Terraform or Pulumi. Below is a sample cluster creation command:

```bash
gcloud beta container --project "your-project-id" clusters create "trail-cluster" \
  --no-enable-basic-auth \
  --cluster-version "1.29.1-gke.1589017" \
  --release-channel "regular" \
  --machine-type "e2-standard-8" \
  --image-type "COS_CONTAINERD" \
  --disk-type "pd-balanced" \
  --disk-size "100" \
  --metadata disable-legacy-endpoints=true \
  --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
  --num-nodes "1" \
  --enable-ip-alias \
  --network "projects/your-project-id/global/networks/default" \
  --subnetwork "projects/your-project-id/regions/europe-west1/subnetworks/default" \
  --no-enable-intra-node-visibility \
  --default-max-pods-per-node "110" \
  --security-posture=standard \
  --workload-vulnerability-scanning=disabled \
  --enable-dataplane-v2 \
  --no-enable-master-authorized-networks \
  --addons HorizontalPodAutoscaling,HttpLoadBalancing,NodeLocalDNS,GcePersistentDiskCsiDriver \
  --enable-autoupgrade \
  --enable-autorepair \
  --max-surge-upgrade 1 \
  --max-unavailable-upgrade 0 \
  --binauthz-evaluation-mode=DISABLED \
  --autoscaling-profile optimize-utilization \
  --no-enable-managed-prometheus \
  --enable-shielded-nodes \
  --enable-l4-ilb-subsetting \
  --zone "europe-west1-b"
```

_Replace the placeholder `your-project-id` with your actual Google cloud project ID._

### [Configure the Kubeconfig](#configure-the-kubeconfig)

To set up access to the cluster, get the kubeconfig for the cluster by following these steps:

1. List clusters:

```bash
gcloud container clusters list --project your-project-id
```

2. Get and set cluster credentials:

```bash
gcloud container clusters get-credentials trail-cluster --region "europe-west1-b" --project your-project-id
```

_Replace the placeholder `your-project-id` with your actual Google cloud project ID._

3. Ensure the cluster is set as the active context in the kubeconfig. Use `kubectl config current-context` to verify.

## [Helm Setup](#helm-setup)

Sign in to the SettleMint Helm registry. Replace `<username>` and `<password>` with your actual credentials:

```bash
helm registry login registry.settlemint.com --username <username> --password <password>
```

## [Prerequisites Installation](#prerequisites-installation)

This section covers the installation prerequisites, including setting up an ingress controller, installing Redis, Postgresql, Minio, and more.

### [An Ingress Controller](#an-ingress-controller)

For this installation, we will use [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/). Install by running:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

Wait a few minutes for the load balancer IP to become available. You can monitor the status by running:

```bash
kubectl get service --namespace ingress-nginx ingress-nginx-controller --output wide --watch
```

Then, you need to link a domain name to the external load balancer IP. Create an A record in your DNS provider that points to this IP and ensure that it resolves:

```bash
dig sandbox-demo.blockchaintransformationplatform.com
```

You will also need to create a wildcard CNAME `*.sandbox-demo.blockchaintransformationplatform.com` that points to `sandbox-demo.blockchaintransformationplatform.com` and confirm that it resolves:

```bash
dig random.sandbox-demo.blockchaintransformationplatform.com
```

### [TLS Configuration](#tls-configuration)

The platform can run without TLS, but it is highly insecure and not recommended. There are many options to add a TLS certificate to this URL. For the purpose of this guide, we will manually set up TLS using [cert-manager](https://cert-manager.io/docs/). Firstly, add the Jetstack Helm repository, update it, then install cert-manager:

```bash
helm repo add jetstack https://charts.jetstack.io --force-update
helm repo update
helm upgrade --install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
```

To issue wildcard certificates, you MUST use the dns01 solver. Suppose this domain uses Cloudflare as the DNS provider. In this case, configure the dns01 resolver with Cloudflare. Start by making an API token for the zone on [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) and store it in this secret:

```bash
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

### [Redis Installation](#redis-installation)

Install Redis server from [Bitnami](https://github.com/bitnami/charts/tree/main/bitnami/redis) in the Kubernetes cluster:

```bash
helm upgrade --install redis oci://registry-1.docker.io/bitnamicharts/redis \
  --namespace redis \
  --version 18.19.2 \
  --create-namespace \
  --set architecture=standalone \
  --set global.redis.password=supersecretredispassword
```

Remember the URL `redis-master.redis.svc.cluster.local` and the password `supersecretredispassword` as they will be required later.

**NOTE:** For production setups, consider using a High Availability (HA) server.

### [Postgresql Installation](#postgresql-installation)

Install a Postgresql server from [Bitnami](https://github.com/bitnami/charts/tree/main/bitnami/redis) in your cluster:

```bash
helm upgrade --install postgresql oci://registry-1.docker.io/bitnamicharts/postgresql \
  --namespace postgresql \
  --version 14.3.3 \
  --create-namespace \
  --set global.postgresql.auth.username=mypsqlusername \
  --set global.postgresql.auth.password=mysupersecretpsqlpassword \
  --set global.postgresql.auth.database=mypsqldbname
```

Remember the URL `postgresql.postgresql.svc.cluster.local`, and the username `mypsqlusername`, password `mysupersecretpsqlpassword`, and database name `mypsqldbname` as they will be needed later.

**NOTE:** For production setups, consider using a High Availability (HA) server.

### [Minio Installation](#minio-installation)

Install Minio, an S3 compatible storage server. A local Minio server is used in this case:

```bash
helm upgrade --install minio oci://registry-1.docker.io/bitnamicharts/minio \
  --namespace minio \
  --version 13.8.4 \
  --create-namespace \
  --set defaultBuckets=myminiobucket \
  --set disableWebUI=false \
  --set auth.rootUser=myminiorootuser \
  --set auth.rootPassword=mysupersecretminiorootpassword \
  --set statefulset.replicaCount=1 \
  --set provisioning.enabled=true \
  --set "provisioning.config[0].name=region" \
  --set "provisioning.config[0].options.name=eu-central-1" \
  --set "provisioning.users[0].username=myminiouser" \
  --set "provisioning.users[0].password=mysupersecretminiopassword" \
  --set "provisioning.users[0].disabled=false" \
  --set "provisioning.users[0].policies[0]=readwrite" \
  --set "provisioning.users[0].setPolicies=true" \
  --set-string provisioning.extraCommands="if [[ ! \$(mc admin user svcacct ls provisioning myminiouser | grep myminiousersvcacc) ]]; then mc admin user svcacct add --access-key \"myminiousersvcacc\" --secret-key \"mysupersecretminiosvcaccountsecretkey\" provisioning myminiouser; fi"
```

Remember the address `minio.minio.svc.cluster.local`, and the set values: region `eu-central-1`, bucket name `myminiobucket`, access key `myminiousersvcacc`, secret key `mysupersecretminiosvcaccountsecretkey` for later use.

Generate a state encryption key using `openssl rand -base64 32` and note it down.

**NOTE:** For production setups, consider using a High Availability (HA) server.

### [Hashicorp Vault Installation](#hashicorp-vault-installation)

Install the Vault Helm chart:

```bash
helm upgrade --install vault vault \
  --repo https://helm.releases.hashicorp.com \
  --namespace vault \
  --create-namespace
```

Vault will not start fully because it must be configured immediately after installation. The following steps demonstrate how to configure Vault on a non-secure, non-HA setup.

Initialize the Vault:

```bash
kubectl exec vault-0 -n vault -- vault operator init -key-shares=1 -key-threshold=1
```

The output will display an unseal key and an initial root token. Record the unseal key because it cannot be recovered. Unseal the Vault:

```bash
export VAULT_UNSEAL_KEY="your-unseal-key"
kubectl exec vault-0 -n vault -- vault operator unseal $VAULT_UNSEAL_KEY
```

Start an interactive shell session on the vault pod:

```bash
kubectl exec --stdin=true --tty=true vault-0 -n vault -- /bin/sh
```

Log in with your root token:

```bash
vault login
```

Then, create three stores for the private keys of the platform:

```bash
vault secrets enable -path=ethereum kv-v2
vault secrets enable -path=ipfs kv-v2
vault secrets enable -path=fabric kv-v2
```

Next, enable the AppRole authentication method and create an App Role with read-write access to the `ethereum`, `ipfs`, and `fabric` kv stores:

```bash
vault auth enable approle

vault policy write ethereum -<<EOF
path "ethereum/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
EOF

vault policy write ipfs -<<EOF
path "ipfs/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
EOF

vault policy write fabric -<<EOF
path "fabric/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
EOF

vault write auth/approle/role/platform-role \
    token_ttl=1h \
    token_max_ttl=4h \
    secret_id_ttl=6h \
    policies="ethereum,ipfs,fabric"
```

To retrieve the Role ID and Secret ID for the `platform-role`, run:

```bash
vault read auth/approle/role/platform-role/role-id
vault write -force auth/approle/role/platform-role/secret-id
```

Record the role id and secret id as they will be needed later.

**NOTE:** For production setups, consider using a High Availability (HA) server.

### [Prometheus & Loki Installation](#prometheus--loki-installation)

Lightweight monitoring with VictoriaMetrics and Loki is necessary for the platform.

Install Victoria Metrics:

```bash
helm upgrade --install victoria-metrics victoria-metrics-single \
  --repo https://victoriametrics.github.io/helm-charts/ \
  --namespace observability \
  --create-namespace \
  --set server.scrape.enabled=true
```

Next, install Loki and Promtail:

```bash
helm install loki loki \
  --repo https://grafana.github.io/helm-charts \
  --namespace observability \
  --create-namespace \
  --set loki.auth_enabled=false \
  --set loki.commonConfig.replication_factor=1 \
  --set loki.storage.type=filesystem \
  --set loki.limits_config.ingestion_rate_strategy=local \
  --set loki.limits_config.max_entries_limit_per_query=50000 \
  --set loki.limits_config.max_concurrent_tail_requests=1000 \
  --set loki.limits_config.max_query_length=0 \
  --set loki.limits_config.max_query_parallelism=32 \
  --set loki.limits_config.max_query_series=0 \
  --set loki.limits_config.reject_old_samples=true \
  --set loki.limits_config.reject_old_samples_max_age=168h \
  --set loki.limits_config.enforce_metric_name=false \
  --set loki.limits_config.ingestion_rate_mb=16 \
  --set loki.limits_config.ingestion_burst_size_mb=32 \
  --set singleBinary.replicas=1 \
  --set monitoring.dashboards.enabled=false \
  --set monitoring.rules.enabled=false \
  --set monitoring.serviceMonitor.enabled=false \
  --set monitoring.selfMonitoring.enabled=false \
  --set monitoring.selfMonitoring.grafanaAgent.installOperator=false \
  --set monitoring.podLogs.enabled=false \
  --set monitoring.lokiCanary.enabled=false \
  --set test.enabled=false
```

On GKE, metrics server is already installed, so there is no need for us to do so.
If you do not have it, install it like this:

```bash
helm install metrics-server metrics-server \
  --repo https://kubernetes-sigs.github.io/metrics-server/ \
  --namespace observability \
  --create-namespace \
  --set server.persistentVolume.enabled=false \
  --set metrics.enabled=true \
  --set service.annotations.prometheus\\.io/scrape="true" \
  --set service.annotations.prometheus\\.io/port="443" \
  --set service.annotations.kubernetes\\.io/cluster-service="true" \
  --set service.annotations.kubernetes\\.io/name="metrics-server"
```

We do need kube-state-metrics.

```bash
helm install kube-state-metrics kube-state-metrics \
  --repo https://prometheus-community.github.io/helm-charts \
  --namespace observability \
  --create-namespace
```

**NOTE:** For production setups, consider using a High Availability (HA) server.

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

Now check wich storage classes are available

```bash
kubectl get storageclasses
```

and make/use one with WaitForFirstConsumer and with volume expansion set to true.

## [OAuth2 Provider Setup](#oauth2-provider-setup)

In this example we will use Google login. [Browse to https://console.developers.google.com/apis/credentials]( https://console.developers.google.com/apis/credentials])and on the top use `+ CREATE CREDENTIALS`, choose `OAuth client ID` and then as type `Web application`.

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
  host: "<hostname>"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  tls:
    - secretName: "blockchaintransformationplatform"
      hosts:
        - "sandbox-demo.blockchaintransformationplatform.com"
        - "*.sandbox-demo.blockchaintransformationplatform.com"
redis:
  host: redis-master.redis.svc.cluster.local
  password: supersecretredispassword
postgresql:
  host: postgresql.postgresql.svc.cluster.local
  user: mypsqlusername
  password: mysupersecretpsqlpassword
  database: mypsqldbname
auth:
  jwtSigningKey: "<random>"
  providers:
    google:
      enabled: true
      clientID: "<client id>"
      clientSecret: "<client secret>"
vault:
  address: http://vault.vault.svc.cluster.local:8200
  roleId: "<role id>"
  secretId: "<secret id>"
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
      s3ConnectionUrl: "s3://myminiobucket?region=eu-central-1&endpoint=minio.minio.svc.cluster.local:9000&disableSSL=true&s3ForcePathStyle=true"
      credentials:
        encryptionKey: "<random>"
        aws:
          accessKeyId: "myminiousersvcacc"
          secretAccessKey: "mysupersecretminiosvcaccountsecretkey"
          region: "eu-central-1"
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
              storageClass: "standard-rwo"
            ingress:
              ingressClass: "settlemint-nginx"
            capabilities:
              mixedLoadBalancers: false
app:
  replicaCount: 2
api:
  replicaCount: 2
job:
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
  autoscaling:
    enabled: true
deployWorker:
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
EOF
```

<!-- You should now be able to access the platform at <https://sandbox-demo.blockchaintransformationplatform.com>. -->

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