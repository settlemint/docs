# Enhanced Security Storage and Backend Options

We're excited to announce expanded support for security storage solutions and backend services:

**What's New**

- **Enhanced Security Key Management**
  - Added support for Google Secret Manager as an alternative to HashiCorp Vault
  - You can now securely store private keys and sensitive data in either service
  - Flexible configuration options to choose your preferred key management solution

- **New Backend Storage Options**
  - Google Cloud Storage (GCS) is now supported as a backend for Pulumi state storage
  - This provides more flexibility in how you manage your infrastructure state

- **Additional Cache Provider**
  - Google Cloud Memorystore for Redis is now available as an alternative to self-hosted Redis
  - Seamlessly switch between Redis implementations based on your infrastructure needs

**Breaking Changes**

- **Helm Values Configuration Update**
  - The Pulumi state connection URL configuration has been renamed:
    - Old: `deploymentEngine.state.s3connectionUrl`
    - New: `deploymentEngine.state.connectionUrl`
  - Action Required: Update your Helm values to use the new variable name when upgrading

**How to Get Started**

- Upgrade to the latest Helm chart version of our platform to enable these new features
- Update your Helm values to use the new connection URL variable name
- To use Google Secret Manager, update your security configuration in the platform settings
- For GCS backend storage, specify GCS as your Pulumi state backend in your configuration
- To utilize Google Memorystore, configure it as your cache provider in the platform settings

**What's Changed**

- Added new configuration options for security storage providers
- Extended backend storage capabilities
- Expanded cache provider options
- Renamed Pulumi state connection URL configuration variable

---

**Note**: Existing configurations using HashiCorp Vault, default Pulumi backends, or Redis will continue to work without any changes. However, if you're using S3 for Pulumi state storage, you must update your Helm values to use the new connection URL variable name.