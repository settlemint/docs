---
title: Terraform Installation (Optional)
sidebar_position: 9
---

# Terraform Installation

:::caution Quick Setup Only
This Terraform-based installation is designed for quick setup and testing environments only. For production deployments, we strongly recommend following the manual installation process to properly configure and secure each component according to your organization's requirements.

**Key limitations of Terraform setup:**
- Components run locally in the cluster without High Availability
- Basic security configurations
- Limited customization options
- Not suitable for production workloads
:::

For a quick deployment of the SettleMint Platform and all its prerequisites on Google Cloud Platform (GCP), we provide a Terraform-based installation method. This is optional - you can skip this if you prefer to set up the prerequisites manually.

## Prerequisites

### Hashicorp Terraform

Install [Terraform](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/install-cli):

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### Google Cloud Platform Setup

1. Create a [Google Cloud Platform account](https://console.cloud.google.com/freetrial/) if you don't have one
2. Install the gcloud CLI:
```sh
brew cask install google-cloud-sdk
gcloud auth application-default login
```

3. Enable required APIs for your project:
   - Container API: `https://console.developers.google.com/apis/api/container.googleapis.com/overview?project=<project_id>`
   - Cloud KMS API: `https://console.developers.google.com/apis/api/cloudkms.googleapis.com/overview?project=<project_id>`

4. Configure IAM permissions. Your GCP user needs either:
   - `Owner` role (recommended for quick setup)

   OR all of these roles:
   - `Editor`
   - `Cloud KMS Admin`
   - `Project IAM Admin`
   - `Kubernetes Engine Admin`
   - `Service Account Admin`

## Installation Steps

1. Clone the installation repository:
```sh
git clone git@github.com:settlemint/tutorial-btp-on-gcp.git
```

2. Set required environment variables:
```sh
# DNS zone (subdomain) for platform access (e.g., btp.settlemint.com)
export TF_VAR_gcp_dns_zone='YOUR_DNS_ZONE'

# Your GCP project ID
export TF_VAR_gcp_project_id='YOUR_GCP_PROJECT_ID'

# Target GCP region
export TF_VAR_gcp_region='YOUR_GCP_REGION'

# OAuth credentials (from prerequisites/oauth.md)
export TF_VAR_gcp_client_id='YOUR_GCP_CLIENT_ID'
export TF_VAR_gcp_client_secret='YOUR_GCP_CLIENT_SECRET'

# Registry credentials (provided by SettleMint)
export TF_VAR_oci_registry_username='YOUR_REGISTRY_USERNAME'
export TF_VAR_oci_registry_password='YOUR_REGISTRY_PASSWORD'
export TF_VAR_btp_version='BTP_VERSION'
```

### DNS Zone Setup

1. Navigate to the DNS zone setup directory:
```sh
cd tutorial-btp-on-gcp/00_dns_zone
```

2. Create the DNS zone:
```sh
terraform init
terraform apply
```

3. Configure your domain registrar with the nameservers from the Terraform output. For example, in Cloudflare:
   - Add NS records for your subdomain (e.g., btp.settlemint.com)
   - Point to the Google nameservers (ns-cloud-aX.googledomains.com)

4. Verify DNS delegation:
```sh
dig NS btp.settlemint.com
```

Expected output should show Google nameservers:
```
;; ANSWER SECTION:
btp.settlemint.com.	300	IN	NS	ns-cloud-a4.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a1.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a2.googledomains.com.
btp.settlemint.com.	300	IN	NS	ns-cloud-a3.googledomains.com.
```

### Platform Infrastructure Setup

1. Navigate to the infrastructure directory:
```sh
cd ../01_infrastructure
```

2. Deploy the infrastructure:
```sh
terraform init
terraform apply
```

This will create:
- GKE cluster
- All required prerequisites
- The SettleMint Platform installation

## Cleanup

To remove all created resources:

```sh
terraform destroy
```

Note: You may need to run the destroy command twice if the first attempt fails.

## Next Steps

After the Terraform deployment completes:

1. Access the platform at `https://btp.<your-domain>`
2. Follow the initial setup wizard
3. Review the [platform documentation](/docs/introduction) for next steps

## Troubleshooting

If you encounter issues:

1. Verify all environment variables are set correctly
2. Ensure DNS delegation is complete (can take up to 48 hours)
3. Check the Terraform logs for specific error messages
4. Contact [support@settlemint.com](mailto:support@settlemint.com) if you need assistance

**Note:** The Terraform installation is designed for demonstration and testing. For production deployments, we recommend following the manual installation process to configure each component according to your specific requirements.