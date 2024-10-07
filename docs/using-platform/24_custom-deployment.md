# Custom Deployment

A Custom Deployment allows you to deploy your own Docker images, such as frontend applications, on the SettleMint platform. This feature provides flexibility for integrating custom solutions within your blockchain-based applications.

## Create a Custom Deployment

To create a Custom Deployment on the SettleMint platform, follow these steps:

1. Prepare your container image and push it to a container registry (public or private).
2. In the SettleMint platform, navigate to the Custom Deployments section.
3. Click on the "Add Custom Deployment" button to create a new deployment.
4. Provide the necessary details:
   - Container image path (e.g., registry.example.com/my-app:latest)
   - Container registry credentials (if using a private registry)
   - Environment variables (if required)
   - Custom domain information (if applicable)
5. Configure any additional settings as needed.
6. Click on 'Confirm' and wait for the Custom Deployment to be in the Running status. [View the list of statuses](../reference/14_statuses.md).

## DNS Configuration for Custom Domains

When using custom domains with your Custom Deployment, you'll need to configure your DNS settings correctly. Here's how to set it up:

1. **Add Custom Domain to the SettleMint Platform**:
   - Navigate to your Custom Deployment in the SettleMint platform.
   - In the manager custom deployment menu, click on the edit custom deployment action
   - Locate the custom domains configuration section
   - Enter your desired custom domain (e.g., example.com or app.example.com).
   - Save the changes to update your Custom Deployment settings.

2. **Obtain Your Application's Hostname**: After adding your custom domain, the SettleMint platform will provide you with a CNAME record. This can be found in the "Connect" tab of your Custom Deployment.

3. **Access Your Domain's DNS Settings**: Log in to your domain registrar or DNS provider's control panel.

4. **Create DNS Records**:
   - Create a CNAME record pointing your custom domain to the provided hostname.
   - Example: `CNAME example.com your-app.settlemint-platform.com`

5. **Configure Subdomains (Optional)**:
   - If you want to use subdomains, create additional CNAME records as needed.
   - Example: `CNAME app.example.com your-app.settlemint-platform.com`

6. **Set TTL (Time to Live)**:
   - Set a lower TTL (e.g., 300 seconds) initially to allow for quicker propagation.
   - You can increase it later for better caching (e.g., 3600 seconds).

7. **Verify DNS Propagation**:
   - Use online DNS lookup tools to check if your DNS changes have propagated.
   - Note that DNS propagation can take up to 48 hours, although it's often much quicker.

8. **SSL/TLS Configuration**:
   - The SettleMint platform typically handles SSL/TLS certificates automatically.
   - If you need to use your own certificates, please contact us for assistance and further instructions.

## Limitations and Considerations

When using Custom Deployment, keep the following limitations in mind:

1. **No Root User Privileges**: Your application will run without root user privileges for security reasons.

2. **Read-Only Filesystem**: The filesystem is read-only. For data persistence, consider using:
   - Hasura: A GraphQL engine that provides a scalable database solution. See [Backend-as-a-service
 documentation](../backend-as-a-service).
   - Other External Services: Depending on your specific needs, you may use other cloud-based storage or database services.

3. **Stateless Applications**: Your applications should be designed to be stateless. This ensures better scalability and reliability in a cloud environment.

## Best Practices

- Design your applications to be stateless and horizontally scalable.
- Use environment variables for configuration to make your deployments more flexible.
- Implement proper logging to facilitate debugging and monitoring.
- Regularly update your container images to include the latest security patches.

Custom Deployment offers a powerful way to extend the capabilities of your blockchain solutions on the SettleMint platform. By following these guidelines and best practices, you can seamlessly integrate your custom applications into your blockchain ecosystem.
