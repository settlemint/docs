---
sidebar_position: 5
sidebar_label: Run the Installation

---

# Run the Installation

To facilitate the process, SettleMint provides a Helm chart for a smooth and customizable platform installation.

## Helm Registry Login

Begin by signing into the SettleMint Helm registry. Replace `<username>` and `<password>` with your credentials:

```shell
helm registry login registry.settlemint.com --username <username> --password <password>
```

## Customization Options

The platform allows for extensive customization. To explore all available options, view the chart values:

```shell
helm show values oci://registry.settlemint.com/settlemint-platform/settlemint --version vX.X.X
```

## Helm Chart Configurations

To install the SettleMint Platform, you must customize the Helm chart values according to your cluster's setup and services. Here's a breakdown of essential configurations:

Check the [prerequisites](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/prerequisites/Infrastructure.md) section & [quick start example](/docs/launch-platform/self-hosted/installing-on-an-existing-cluster/quick-start-examples-trial-installation/installation-trial-cluster.md) for more information!

- **Ingress Configuration**: Define the hostname linked to your ingress controller's external IP. Use annotations for SSL and certificate issuer, such as `cert-manager.io/cluster-issuer: "letsencrypt"`.

- **Redis Configuration**: Specify the Redis service URL and password, e.g., `redis-master.redis.svc.cluster.local` and `supersecretredispassword`.

- **PostgreSQL Configuration**: Provide details such as host, user, password, and database name, for example, `postgresql.postgresql.svc.cluster.local`, `mypsqlusername`, `mysupersecretpsqlpassword`, and `mypsqldbname`.

- **MinIO (S3 Storage)**: Format the connection URL for MinIO and include credentials. Ensure access is secured with an encryption key.

- **Vault**: Define the Vault service URL, role ID, and secret ID for authentication and authorization purposes.

- **Authentication**: Generate a secure key for JWT token signing.

- **Observability**: Set endpoints for metrics and logs API, such as VictoriaMetrics and Loki.

- **Additional Configurations**: Define the number of replicas for apps, APIs, jobs, and workers. Generate random values for encryption and secrets.

### Deployment Command

Once your values file is prepared, deploy the SettleMint Platform with the following command:

```shell
helm upgrade --install settlemint oci://registry.settlemint.com/settlemint-platform/settlemint \
  --namespace settlemint \
  --version X.X.X \
  --create-namespace \
  --values -f YOUR-VALUES-FILE.YAML
```

### Example Values File

Here's an example snippet from a values file for your reference:

```yaml
helm upgrade --install settlemint oci://registry.settlemint.com/settlemint-platform/settlemint \
  --namespace settlemint \
  --version X.X.X \
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

Ensure all configurations are tailored to your infrastructure and security requirements. For comprehensive guidance, refer to the prerequisites section and quick start examples.

