# Install the kotsadm Package

The kotsadm package provides the admin console which facilitates the installation of the SettleMint Platform.

In an airgapped environment, the kotsadm package needs to be downloaded and pushed to a private repository using
the `kubectl kots` command. Following this, the KOTS plugin will bootstrap the admin console to automate the
management of the application.

See section "Image Registry" in [this doc](./install-airgap.md). This registry must be set up before installing the
kotsadm package.

## Install the Admin Console

1.  Download the admin console binary bundle, `kotsadm.tar.gz` ([Downloads](../download/download-airgap.md))

    - latest kotsadm release notes can be found [here](https://docs.replicated.com/release-notes/rn-app-manager)

2.  Run the following command to extract admin console container images and push them into
    the [private registry created as part of the Airgapped Installation](./install-airgap.md):

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/settlemint-platform \
        --registry-username RW_USERNAME \
        --registry-password RW_PASSWORD
    ```

        Replace:
         - `RW_USERNAME` with the username for an account that has read and write access to the private image registry.
         - `RW_PASSWORD` with the password for the account with read and write access.

3.  Install the admin console using the images that you pushed in the previous step:

    ```
    kubectl kots install settlemint-platform \
        --wait-duration 20m \
        --ensure-rbac \
        --strict-security-context \
        --kotsadm-namespace settlemint-platform \
        --kotsadm-registry private.registry.host \
        --registry-username RO-USERNAME \
        --registry-password RO-PASSWORD
    ```

    Replace: - `RO_USERNAME` with the username for an account that has read-only access to the private image registry. - `RO_PASSWORD` with the password for the read-only account.
