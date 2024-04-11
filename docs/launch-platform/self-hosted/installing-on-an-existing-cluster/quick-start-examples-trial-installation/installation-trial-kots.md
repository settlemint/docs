---
sidebar_position: 3
sidebar_label:  'Trial Installation: Prerequisites from Managed Service Providers, Using KOTS'
---
# SettleMint Platform Trial Installation Guide with all prerequisites from managed service providers, using KOTS

This trial installation guide provides the steps for setting up and installing the SettleMint Blockchain Transformation Platform
on a managed Kubernetes cluster. The guide assumes a prior understanding of Kubernetes, CIVO Cloud,
and other relevant technologies.

**NOTE:** Trial installations are not designed or suitable for production use and cannot be upgraded to a production-ready state. Use this trial setup at your own risk.

## [Requirements](#requirements)

Before proceeding with the installation, ensure the following requirements are met:

- Access to a CIVO account
- Knowledge of Kubernetes and CIVO

## [Managed Kubernetes Cluster Setup](#managed-kubernetes-cluster-setup)

### [Establish a Cluster](#establish-a-cluster)

In this guide, we are using a CIVO cluster as an example.

- Large standard size (3 nodes)
- A firewall with port 80 and 443 open
- From the marketplace
  - Civo cluster autoscaler
  - Nginx ingress controller

### [Configure the Kubeconfig](#configure-the-kubeconfig)

To set up access to the cluster, get the kubeconfig for the cluster by downloading it from the CIVO dashboard and merge it into your kubeconfig file

```bash
cp ~/.kube/config ~/.kube/config_bk
KUBECONFIG=~/.kube/config:~/Downloads/civo.yaml kubectl config view --flatten > ~/.kube/config_tmp
mv ~/.kube/config_tmp ~/.kube/config
```

Ensure the cluster is set as the active context in the kubeconfig. Use `kubectl config current-context` to verify.

## [Prerequisites Installation](#prerequisites-installation)

This section covers the installation prerequisites, including setting up an ingress controller, installing Redis, Postgresql, Minio, and more.

### [An Ingress Controller](#an-ingress-controller)

From the marketplace install `Nginx`, if you have not during the cluster install

Then, you need to link a domain name to the external load balancer IP. Create an A record in your DNS provider that points to this IP and ensure that it resolves:

```bash
dig trial-demo.blockchaintransformationplatform.com
```

You will also need to create a wildcard CNAME `*.trial-demo.blockchaintransformationplatform.com` that points to `trial-demo.blockchaintransformationplatform.com` and confirm that it resolves:

```bash
dig random.trial-demo.blockchaintransformationplatform.com
```

### [TLS Configuration](#tls-configuration)

The platform can run without TLS, but it is highly insecure and not recommended. There are many options to add a TLS
certificate to this URL. In this guide we will leverage Cloudflare to provide TLS termination.

For your domain, purchase ACM and enable Total TLS. This will provide TLS certificates for each of the domainnames configured.

### [Redis Setup](#redis-setup)

Create an account at [RedisCloud](https://app.redislabs.com) and create a new subscription. A fixed plan of 1GB should suffice for now.
Then create a new database, all the defaults are correct.

Note the commections details as we will need them later, it will look something like

```
Public endpoint: redis-17220.c250.eu-central-1-1.ec2.cloud.redislabs.com:17220
Default user password: redacted
```

### [Postgresql Setup](#postgresql-setup)

For the Postgresql database we will be using the Serverless Postgres offering from [Neon](https://console.neon.tech).

Create a new database and note the connections details (with pooling enabled) as we will need them later, it will look something like

```
postgresql://trial-demo_owner:************@ep-morning-moon-a20p0s24-pooler.eu-central-1.aws.neon.tech/trial-demo?sslmode=require
```

### [S3 Storage Setup](#s3-setup)

We are using an AWS s3 bucket in this guide. Create a new bucket in your AWS account and again, all the defaults are correct.
Note the region and name of your bucket.

To be able to access it use AWS IAM to generate a user with an access key, make sure to note the access key and the secret access key.

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

In this example we will use Google login. Browse to https://console.developers.google.com/apis/credentials and on the top use `+ CREATE CREDENTIALS`, choose `OAuth client ID` and then as type `Web application`.

In `Authorised JavaScript origins` add the domain name you created in the Ingress controller section, in this example `https://trial-demo.blockchaintransformationplatform.com`. In `Authorised redirect URIs` use `https://trial-demo.blockchaintransformationplatform.com/api/auth/callback/google`.

You will get a Client ID and Client secret at the end of this process, note them down for later.

We will also need a secret to encrypt the JWT token. Generate a random key with `openssl rand -base64 32` and record this for later.

## [SettleMint Platform Installation](#settlemint-platform-installation)

Installing the platform, and its full lifecycle is handled by KOTS. Install the plugin and then launch the platform installer

```
curl https://kots.io/install | bash
kubectl kots install settlemint-platform
```

Answer the questions and wait for it to install the KOTS admin panel.

```
Enter the namespace to deploy to: settlemint
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
Enter a new password for the admin console (6+ characters): ••••••••••
  • Waiting for Admin Console to be ready ✓
  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
```

Browse to http://localhost:8800 and log in with the password you chose.

From your CS contact you will have received a license file, upload it in the next screen.

Then we will need to configure the platform using the values we collected above and then press continue.

You should now be able to access the platform at https://trial-demo.blockchaintransformationplatform.com.

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

**NOTE:** This trial installation of the SettleMint platform might not include the full functionalities of the platform. To explore a full-scale, premium tier of the SettleMint Platform, consider reaching out to the SettleMint team for a premium trial or subscription.