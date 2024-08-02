# Install the KOTS CLI

The [KOTS CLI](https://github.com/replicatedhq/kots) is a kubectl plugin that helps to configure and build dynamic
Kubernetes manifests.

The Kots CLI also serves as the bootstrapper for the in-cluster Kubernetes application Admin
Console [kotsadm](./install-kotsadm.md) which can be used to automate the core Kots CLI tasks for managing
applications (license verification, configuration, updates, image renaming, version controlling changes, and deployment)
as well as additional KOTS tasks (running preflight checks and performing support bundle analysis).

## Install KOTS CLI

```bash
   curl https://kots.io/install | bash
```

Confirm the installation was successful with either of the following commands

```bash
$ kubectl kots version
Replicated KOTS 1.88.0
```

```bash
$ oc kots version
Replicated KOTS 1.88.0
```

The version needed for each SettleMint Platform will be specified in the Download Portal.

See [here](https://github.com/replicatedhq/kots/releases) for all KOTS releases.

To install KOTS manually

1. Download the latest release for your operating system
   from [here](https://github.com/replicatedhq/kots/releases/latest)

2. Unpack the release.

3. Rename the kots executable kubectl-kots ( or oc-kots)

4. Copy the renamed kubectl-kots (or oc-kots) to anywhere on the PATH.
