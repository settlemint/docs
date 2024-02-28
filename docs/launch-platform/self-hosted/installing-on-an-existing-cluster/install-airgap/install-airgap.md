# Install the SettleMint Platform in an Airgap Environment

When installing the SettleMint Platform on a cluster without internet access, you will need to ensure that you have
followed the steps discribed in the [download section](../../download/download-airgap.md) to download the required license and installation files.

Airgapped install is only available for licenses that have the airgapped feature enabled.

## Image Registry for Airgapped Installations

To install an application into an airgapped cluster, you must have a docker image registry that is available inside the
network.

The app manager rewrites the application image names in all application manifests to read from the on-prem registry, and
it retags and pushes the images to the on-prem registry. When authenticating to the registry, credentials with push
permissions are required.

A single application expects to use a single “namespace” in the docker image registry.

The namespace name can be any valid URL-safe string, supplied at installation time. Keep in mind that a registry
typically expects the namespace to exist before any images can be pushed into it.

To install on an existing cluster that is airgapped, run the following from the machine that is connected to the
airgapped cluster.

1. **Install the [KOTS CLI](./install-kots.md) plugin**

   ```bash
       curl https://kots.io/install | bash
   ```

Refer to [KOTS CLI](./install-kots.md) for more details on verifying the version of your KOTS plugin as well as for more
details on Open Shift command line linkages. 2. **Install the [Admin Console](./install-kotsadm.md)**

3. **Install the SettleMint Platform application via the Admin Console**

   As explained in the [download section](../../download/download-airgap.md),
   there are 2 ways to proceed with your airgapped installations: Full or Small Bundles. In the case of **Small**
   Bundle, there is an additional step to run the script to push the images to your local registry. You must run this step
   **prior** to running the `kots install` command below.

   The [instructions to set up the images on your local registry are here](./installer-pull-images.md).

   Note that in the following commands, the SettleMint Platform application **SLUG** will be provided to you based on
   the version that you are installing.

   General format:

   ```bash
   kubectl kots install <SLUG> <args>
   ```

   Airgapped Small bundle installation:

   ```bash
   kubectl kots install settlemint-platform/stable-small-airgap <args>
   ```

   - Use the command below to specify the private registry and other arguments
   - When prompted by the `kots install` command:
     1. Provide the namespace where you want to deploy the application and the Admin Console.
     2. Create a new password for logging in to the Admin Console.

**Example**

```bash
  kubectl kots install settlemint-platform/stable-small-airgap
  --kotsadm-namespace settlemint-platform
  --kotsadm-registry private.registry.host
  --registry-username REGISTRY-USERNAME
  --registry-password REGISTRY-PASSWORD
  --wait-duration 20m
  --ensure-rbac --strict-security-context --use-minimal-rbac

  Enter the namespace to deploy to: settlemint-platform
   • Deploying Admin Console
   • Creating namespace ✓
   • Waiting for datastore to be ready ✓
   Enter a new password to be used for the Admin Console: ••••••••••
   • Waiting for Admin Console to be ready ✓
```

After the `kots install` command installed the Admin Console and the application on the cluster, it creates a port
forward to the Admin Console. The Admin Console is exposed internally on the cluster and can only be accessed using a
port forward.

Log in to the Admin Console to complete the application setup, run preflight checks, and deploy.
See [Completing Application Setup and Deploying](../completing-setup-and-deploying.md)
