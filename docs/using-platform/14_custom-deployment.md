---
title: Custom Deployment
description: Guide to deploying custom Docker images on SettleMint
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Deployment

A Custom Deployment allows you to deploy your own Docker images, such as frontend applications, on the SettleMint platform. This feature provides flexibility for integrating custom solutions within your blockchain-based applications.

## Create a Custom Deployment

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

1. Prepare your container image and push it to a container registry (public or private).
2. In the SettleMint platform, navigate to the Custom Deployments section.
3. Click on the "Add Custom Deployment" button to create a new deployment.
4. Provide the necessary details:
   - Container image path (e.g., registry.example.com/my-app:latest)
   - Container registry credentials (if using a private registry)
   - Environment variables (if required)
   - Custom domain information (if applicable)
5. Configure any additional settings as needed.
6. Click on 'Confirm' and wait for the Custom Deployment to be in the Running status.

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# Create a custom deployment
settlemint platform create custom-deployment my-deployment \
  --application my-app \
  --image-repository registry.example.com \
  --image-name my-app \
  --image-tag latest \
  --port 3000 \
  --provider gcp \
  --region europe-west1

# With environment variables
settlemint platform create custom-deployment my-deployment \
  --application my-app \
  --image-repository registry.example.com \
  --image-name my-app \
  --image-tag latest \
  --env-vars NODE_ENV=production,DEBUG=false
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';

const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const createDeployment = async () => {
  const result = await client.customDeployment.create({
    applicationId: "app-123",
    name: "my-deployment",
    imageRepository: "registry.example.com",
    imageName: "my-app",
    imageTag: "latest",
    port: 3000,
    provider: "gcp",
    region: "europe-west1",
    environmentVariables: {
      NODE_ENV: "production"
    }
  });
};
```

</TabItem>
</Tabs>

## DNS Configuration for Custom Domains

When using custom domains with your Custom Deployment, you'll need to configure your DNS settings correctly. Here's how to set it up:

1. **Add Custom Domain to the SettleMint Platform**:
   - Navigate to your Custom Deployment in the SettleMint platform.
   - In the manage custom deployment menu, click on the edit custom deployment action.
   - Locate the custom domains configuration section.
   - Enter your desired custom domain (e.g., example.com for top-level domain or app.example.com for subdomain).
   - Save the changes to update your Custom Deployment settings.

2. **Configure DNS Records**:

   For Top-Level Domains (e.g., example.com):
   ```
   ALIAS example.com gke-europe.settlemint.com
   ALIAS www.example.com gke-europe.settlemint.com
   ```

   For Subdomains (e.g., app.example.com):
   ```
   CNAME app.example.com gke-europe.settlemint.com
   ```

## Manage Custom Deployments

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

1. Navigate to your application's **Custom Deployments** section
2. Click on a deployment to:
   - View deployment status and details
   - Manage environment variables
   - Configure custom domains
   - View logs
   - Check endpoints

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List custom deployments
settlemint platform list custom-deployments --application my-app

# Get deployment details
settlemint platform read custom-deployment my-deployment

# Restart deployment
settlemint platform restart custom-deployment my-deployment

# Edit deployment
settlemint platform edit custom-deployment my-deployment \
  --container-image registry.example.com/my-app:v2
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List deployments
const listDeployments = async () => {
  const deployments = await client.customDeployment.list("my-app");
};

// Get deployment details
const getDeployment = async () => {
  const deployment = await client.customDeployment.read("deployment-unique-name");
};

// Restart deployment
const restartDeployment = async () => {
  await client.customDeployment.restart("deployment-unique-name");
};

// Edit deployment
const editDeployment = async () => {
  await client.customDeployment.edit("deployment-unique-name", {
    imageTag: "v2"
  });
};
```

</TabItem>
</Tabs>

## Limitations and Considerations

When using Custom Deployment, keep the following limitations in mind:

1. **No Root User Privileges**: Your application will run without root user privileges for security reasons.

2. **Read-Only Filesystem**: The filesystem is read-only. For data persistence, consider using:
   - Hasura: A GraphQL engine that provides a scalable database solution
   - Other External Services: Depending on your specific needs, you may use other cloud-based storage or database services

3. **Stateless Applications**: Your applications should be designed to be stateless. This ensures better scalability and reliability in a cloud environment.

4. **Use AMD-based Images**: Currently, our platform supports AMD-based container images. Ensure your Docker images are built for AMD architecture to guarantee smooth compatibility with our infrastructure.

## Best Practices

- Design your applications to be stateless and horizontally scalable
- Use environment variables for configuration to make your deployments more flexible
- Implement proper logging to facilitate debugging and monitoring
- Regularly update your container images to include the latest security patches

:::info Note
Custom Deployments support automatic SSL/TLS certificate management for custom domains.
:::
