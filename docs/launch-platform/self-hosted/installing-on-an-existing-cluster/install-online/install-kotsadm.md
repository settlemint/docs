# Install the kotsadm Package

The kotsadm package provides the admin console which facilitates the installation of the SettleMint Platform on your cluster.

## Install the admin Console

1. Install the admin console:

   ```bash
   kubectl kots install settlemint-platform \
       --wait-duration 20m \
       --ensure-rbac \
       --strict-security-context
   ```
