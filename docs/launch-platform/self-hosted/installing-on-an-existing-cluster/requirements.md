---
sidebar_position: 1
---

# Installation Requirements

This topic describes the requirements for installing the SettleMint Platform.

## Supported Browsers

The following table lists the browser requirements for the latest admin console.

| Browser           | Support     |
| ----------------- | ----------- |
| Chrome            | 66+         |
| Firefox           | 58+         |
| Opera             | 53+         |
| Edge              | 80+         |
| Safari            | 13+         |
| Internet Explorer | Unsupported |

## Kubernetes Version Compatibility

Each release of the SettleMint Platform maintains compatibility with the current Kubernetes and OpenShift version, and
the two most recent versions at the time of its release. This includes support against all patch releases of the
corresponding Kubernetes version.

| KOTS Versions   | Kubernetes Compatibility | OpenShift Compatibility |
| --------------- | ------------------------ | ----------------------- |
| v1.78 and later | v1.26 and later          | v4.8 or later           |

## Minimum System Requirements

This section describes the minimum system requirements for installing the admin console on an existing
cluster or on an embedded cluster created by the Kubernetes installer.

### Existing Cluster Requirements

To install the admin console on an existing cluster, the cluster must meet the following requirements:

- **Admin console minimum requirements**: The admin console requires a minimum of 5 GB of disk space on the cluster. This
  includes 4 GB for the object store PersistentVolume and 1 GB for the PostgreSQL PersistentVolume.
  - **LimitRanges**: The admin console pod requests 50m CPU resources and 50 Mi memory. Existing clusters that have
    LimitRanges specified must support these values.
- **Kubernetes version compatibility**: The version of Kubernetes running on the cluster must be compatible with the
  version of the platform.

  For more information about the versions of Kubernetes that are compatible with each version, see [Kubernetes Version
  Compatibility](#kubernetes-version-compatibility) above.

- **OpenShift version compatibility**: For Red Hat OpenShift clusters, the version of OpenShift must use a supported
  Kubernetes version. For more information about supported OpenShift versions, see [Kubernetes Version
  Compatibility](#kubernetes-version-compatibility) above.
- **Storage class**: The cluster must have a default storage class available. To enable volume scaling VolumeExpansion
  needs to be enabled. For more information,
  see [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) in the Kubernetes documentation.
- **Role-based access control (RBAC)**: SettleMint requires the following RBAC permissions on the cluster:

  - An existing namespace and an RBAC binding that permits the user of the kubectl command-line tool to create
    workloads.
  - cluster-admin permissions to create namespaces and assign RBAC roles across the cluster.

  If your environment does not allow you to create cluster level objects, add the `--use-minimal-rbac` flag to
  the `kots install` command.

### Kubernetes Installer Cluster Requirements

To install the admin console on an embedded cluster created by the Kubernetes installer, your environment
must meet the following requirements:

- 4 CPUs or equivalent per machine.
- 8 GB of RAM per machine.
- 40 GB of disk space per machine.
- TCP ports 2379, 2380, 6443, 6783, 10250, 10251, and 10252 open between cluster nodes.
- UDP ports 6783 and 6784 open between cluster nodes.
- The Kubernetes installer is based on the open source kURL project. You must meet the additional requirements of the
  kURL project to use the Kubernetes installer.
  See [System Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements) in the kURL open source
  documentation.
- Root access is required.

Once all requirements are checked off, please proceed to [Step 2 - Airgap](./install-airgap/install-airgap.md) if you wish to install
on an airgapped cluster or [Step 2 - Online](./install-online/install-online.md) for the online installation.
