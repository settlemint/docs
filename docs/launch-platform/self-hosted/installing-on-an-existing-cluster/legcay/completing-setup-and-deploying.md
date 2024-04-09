# Completing Setup

Once the Admin Console and the base SettleMint Platform deployer have been installed either on an [airgapped cluster](./install-airgap/install-airgap.md)
or on a [cluster connected to the internet](./install-online/install-online.md)
, you can proceed to the next step of configuring and installing the SettleMint Platform.

You can access the Admin Console to complete the SettleMint Platform setup, run preflight checks, and deploy.

## Access the Admin Console and Deploy the Application

- To complete the application setup and deploy, access the Admin Console on port 8800:

  - **Existing cluster**: If the port forward is active, go to [http://localhost:8800](http://localhost:8800/) to
    access the admin console.

    If you need to reopen the port forward to the Admin Console, run the following command:

        ```
        kubectl kots admin-console -n APP_NAMESPACE
        ```

    Replace `APP_NAMESPACE` with the namespace on the cluster where you installed the application.

- Log in to the admin console:

  - **Existing cluster**: Log in with the password that you created during installation.

  ![CleanShot 2022-10-01 at 13.01.15@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_13.01.152x.png)

- Upload the license file [downloaded from Step 1](../download/download-portal.md)

  ![CleanShot 2022-10-01 at 13.01.29@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_13.01.292x.png)

- Upload the `.airgap` Airgapped Bundle downloaded from Step 1 or press the install from the
  internet link at the bottom if your cluster is connected to the internet.

  ![CleanShot 2022-10-01 at 13.01.52@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_13.01.522x.png)

- If there are configurations specific to the application, complete the fields on the configuration screen then
  click **Continue**. The required and optional configuration fields on this screen are used to build the final
  deployable Kubernetes manifests for the application.

  ![CleanShot 2022-10-01 at 13.05.31@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_13.05.312x.png)

- Complete the preflight checks. The admin console automatically runs preflight checks (conformance tests) against the
  target namespace and cluster to ensure that the environment meets the minimum requirements to support the
  application.

  ![CleanShot 2022-10-01 at 13.51.30@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_13.51.302x.png)

- Check warnings and failures:

  - Resolve the warnings and failures, and click **Re-run** to run the preflight checks again.
  - If there are no failures that prevent application deployment, you can choose to dismiss the preflight check
    warnings to continue.
  - If you are installing with minimal role-based access control (RBAC), the admin console recognizes if the preflight
    checks failed due to insufficient privileges.

  When this occurs, a kubectl preflight command displays that lets you manually run the preflight checks. The results
  are then automatically uploaded to the admin console.

After preflight checks are complete, Replicated deploys the admin console and the application, and the admin console
dashboard opens:

![CleanShot 2022-10-01 at 14.05.30@2x.png](/img/completing-setup-and-deploying/CleanShot_2022-10-01_at_14.05.302x.png)

1. (Recommended) Change the admin console login password:
   1. Click the menu in the top right corner of the admin console, then click **Change password**.
   2. Enter a new password in the dialog, and click **Change Password** to save.

<!--
2. (Kubernetes Installer Cluster Only) Add primary and secondary nodes to the cluster. You might add nodes to either
   meet application requirements defined by the vendor or to support your usage of the application.
-->

2. Configure application and cluster monitoring. This allows you to view graphs on the admin
   console dashboard with key metrics collected by Prometheus.
   <!-- See [Monitoring Applications](notion://www.notion.so/settlemint/monitoring-applications).
   -->
