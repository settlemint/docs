# Install the SettleMint Platform in an Online Environment

You can install the SettleMint Platform on an existing Kubernetes cluster that contains nodes that can access the
internet.

During an online installation, the installer pulls container images from the upstream registries directly.

To install on an existing cluster in an online environment, run the following commands from the machine that has access to the
cluster.

1. **Install the KOTS CLI plugin**:

   ```bash
     curl https://kots.io/install | bash
   ```

   Refer to [KOTS CLI](./install-kots.md) for more details on verifying the version of your KOTS plugin as well as for more
   details on Open Shift command line linkages.

2. **Install the admin console and the SettleMint Platform on the cluster**

The command that installs the admin console and the SettleMint Platform on the cluster has the following syntax:

```bash
  kubectl kots install <SLUG> <args>
```

Note in the following commands that the SettleMint Platform application **SLUG** will be provided to you.

For the online installation the application **SLUG** is just **settlemint-platform**:

```bash
  kubectl kots install settlemint-platform <args>
```

- **Install the latest version of the SettleMint Platform**:

  If you want to install the latest version, you can run the following command in a terminal:

  ```bash
  kubectl kots install settlemint-platform --wait-duration 20m --ensure-rbac --strict-security-context
  ```

- **Install a specific version of the SettleMint Platform**:

  With the admin console v1.67.0 and later, you can install a
  specific version of the SettleMint Platfrom.

  - Use the `app-version-label` argument and the version label for a particular
    version of your vendor's application.

    ```bash
    kubectl kots install settlemint-platform --wait-duration 20m --ensure-rbac --strict-security-context --app-version-label=VERSION_LABEL
    ```

  Replace:

  - `VERSION_LABEL` with the label for the version of the application to install. For
    example, `--app-version-label=3.0.1`.

  - When prompted by the `kots install` command: 1. Provide the namespace where you want to deploy the application and the admin console. 2. Create a new password for logging in to the admin console.

- **Example**:

  ```bash
  $ kubectl kots install settlemint-platform
  Enter the namespace to deploy to: settlemint-demo
    • Deploying Admin Console
      • Creating namespace ✓
      • Waiting for datastore to be ready ✓
  Enter a new password to be used for the Admin Console: ••••••••
    • Waiting for Admin Console to be ready ✓
    • Press Ctrl+C to exit
    • Go to http://localhost:8800 to access the Admin Console
  ```

After the `kots install` command installed the admin console and the application on the cluster, it creates a port
forward to the admin console. The admin console is exposed internally on the cluster and can only be accessed using a
port forward.

Log in to the admin console to complete the application setup, run preflight checks, and deploy.
See [Completing Application Setup and Deploying](../completing-setup-and-deploying.md).
