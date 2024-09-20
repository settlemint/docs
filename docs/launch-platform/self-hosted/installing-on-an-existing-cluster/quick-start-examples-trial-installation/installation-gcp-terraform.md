---
sidebar_position: 1
sidebar_label: 'Sandbox Installation: BTP on Google Cloud Platform with Terraform'
---

# BTP on Goodle Cloud Platform

## **For DEMO purposes only.**
*This is not production ready solution. We run all components locally and not in HA mode. For production, we suggest running PostgreSQL, Redis, and Vault outside of the cluster.*

This repository contains the code for the tutorial BTP on GCP.

<div style={{ display:"flex" , justifyContent: "center" }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/fovi3PWYcd0?si=mUysC79FjZLtgnLN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Prerequisites

### Hashicorp Terraform

For the infrastructure setup, you need to have [Terraform](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/install-cli) installed. Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. Terraform can manage existing and popular service providers as well as custom in-house solutions.

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### Google Cloud Platform

The Google Cloud Platform (GCP) is a set of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, YouTube, Google Maps, and so on. You will need a Google Cloud Platform account, if you do not have a GCP account, [create one now](https://console.cloud.google.com/freetrial/). Create a new project to be used for the tutorial.

You will also need the gcloud command line tool, which you can [install](https://cloud.google.com/sdk/docs/install) and authenticate with by running the following command:

```sh
brew cask install google-cloud-sdk
gcloud auth application-default login
```

You will need to enable several API for your project.

- container.googleapis.com:`` https://console.developers.google.com/apis/api/container.googleapis.com/overview?project=<project_id>``
- cloudkms.googleapis.com (KMS) API: ``https://console.developers.google.com/apis/api/container.googleapis.com/overview?project=`<project_id>``

Your GCP IAM user should have permission to manage GKE clusters, CloudDNS zones, KMS keys and IAM permissions. Suggest to run it with `Owner` permission. If you cannot grant your GCP user `Owner` permissions, grant following:
- Editor
- Cloud KMS Admin
- Project IAM Admin
- Kubernetes Engine Admin
- Service Account Admin

### SettleMint Blockchain Transformation Platform credentials

From your Customer Success contact, you will get login credentials for the SettleMint OCI registry hosting the Helm chart and docker images. We will also need the version to be installed.

### OAuth2 Provider Setup

We will use Google login to login to BTP platform.

Browse https://console.cloud.google.com/apis/credentials/consent and press `CONFIGURE CONSENT SCREEN`. Choose`External` and press create.

Fill all fields:
`App name` - staging
`User support email` - your email
`Developer contact information` - your email

Browse to https://console.developers.google.com/apis/credentials and on the top use + CREATE CREDENTIALS, choose `OAuth client ID` and then as type Web application.

In Authorised JavaScript origins add the domain name you will use to access BTP platform, for example example https://btp.settlemint.com. In Authorised redirect URIs use https://btp.settlemint.com/api/auth/callback/google.

You will get a Client ID and Client secret at the end of this process, note them down for later.

## Terraform setup

Below you will find instruction how to setup BTP platform on GCP with terraform code. It consist 2 steps and manual step, as we need to preconfigure public DNS zone to access BTP platform.

clone the following github repository:
```sh 
git clone git@github.com:settlemint/tutorial-btp-on-gcp.git
```

Export following env variables before execute terraform code:
```sh
export TF_VAR_gcp_dns_zone=`YOUR_DNS_ZONE` # DNS zone(subdomain) you are using to access the btp platform, eg btp.settlemint.com
export TF_VAR_gcp_project_id=`YOUR_GCP_PROJECT_ID` # gcp project id where you setup BTP platform
export TF_VAR_gcp_region=`YOUR_GCP_REGION` # where cluster will deploy
export TF_VAR_gcp_client_id=`YOUR_GCP_CLIENT_ID` # from OAuth2 Provider Setup step
export TF_VAR_gcp_client_secret=`YOUR_GCP_CLIENT_SECRET` # from OAuth2 Provider Setup step
export TF_VAR_oci_registry_username=`YOUR_REGISTRY_USERNAME` # provided by Customer Success Team
export TF_VAR_oci_registry_password=`YOUR_REGISTRY_PASSWORD` # provided by Customer Success Team
export TF_VAR_btp_version=`BTP_VERSION` # provided by Customer Success Team

```

### Setting up the DNS zone.

Step 1: Create the DNS Zone in Google Cloud DNS

1.	Navigate to the `00_dns_zone` folder:
This folder contains the Terraform code to create the DNS zone on Google Cloud DNS.

2.	Run Terraform to create the DNS zone:
Execute the following commands to initialize Terraform and apply the configuration:

```sh
terraform init
terraform apply
```

It will create GCP Cloud DNS with zone from `TF_VAR_gcp_dns_zone` env variable.

3.	Retrieve the nameservers:
After applying the Terraform configuration, note down the nameservers from the output. These nameservers will be used to delegate the subdomain.

Step 2: Delegate the Subdomain in Your Domain Registrar (Cloudflare as an example)

1.	Log in to your domain registrar (e.g., Cloudflare):
Access the DNS settings for your top-level domain (e.g., settlemint.com).
2.	Add NS records for the subdomain:
Use the nameservers retrieved from the Terraform output to delegate the subdomain to Google Cloud DNS. For example, if the subdomain is btp.settlemint.com, add the following NS records:
	•	Type: NS
	•	Name: btp (or btp.settlemint.com)
	•	Content: ns-cloud-a1.googledomains.com
	•	TTL: Auto
Repeat this for each nameserver provided by Google Cloud DNS (ns-cloud-a2.googledomains.com, ns-cloud-a3.googledomains.com, etc.).

To check if a domain or subdomain is correctly delegated to the specified nameservers use following command:
```sh
dig NS btp.settlemint.com
```

Example of the output:
```
> dig NS btp.settlemint.com

; <<>> DiG 9.10.6 <<>> NS btp.settlemint.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 57022
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 9

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;btp.settlemint.com.		IN	NS

;; ANSWER SECTION:
btp.settlemint.com.	300	IN	NS	ns-cloud-a4.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a1.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a2.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a3.googledomains.com.

;; ADDITIONAL SECTION:
ns-cloud-a1.googledomains.com. 102654 IN A	216.239.32.106
ns-cloud-a2.googledomains.com. 102417 IN A	216.239.34.106
ns-cloud-a3.googledomains.com. 102278 IN A	216.239.36.106
ns-cloud-a4.googledomains.com. 102507 IN A	216.239.38.106
ns-cloud-a1.googledomains.com. 102654 IN AAAA	2001:4860:4802:32::6a
ns-cloud-a2.googledomains.com. 102417 IN AAAA	2001:4860:4802:34::6a
ns-cloud-a3.googledomains.com. 102278 IN AAAA	2001:4860:4802:36::6a
ns-cloud-a4.googledomains.com. 102507 IN AAAA	2001:4860:4802:38::6a

;; Query time: 58 msec
;; SERVER: 10.123.50.1#53(10.123.50.1)
;; WHEN: Mon Jul 01 11:30:57 EEST 2024
;; MSG SIZE  rcvd: 344
```

After the domain is delegated, you can create underlying infrastructure.

### Setting up the infrastructure.

In the `01_infrastructure` folder, run the following terraform command to create BTP infrastructure:
```sh
terraform init
terraform apply
```

It will create BTP platform on top of GCP cloud.

### Destroy the infrastructure.

To destroy infrastructure, run following command:
```sh
terraform destroy
```

If it's fail, try to run it second time.
