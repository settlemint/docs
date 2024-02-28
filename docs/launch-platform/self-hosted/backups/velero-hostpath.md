# Velero Backups with HostPaths

## Velero CLI Install

Install velero cli binary from [VMWare](https://github.com/vmware-tanzu/velero/releases)

```
For Linux x86_64:
curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
tar zxvf velero-v1.10.1-linux-amd64.tar.gz
sudo mv velero-v1.10.1-linux-amd64/velero /usr/local/bin/velero
velero version
```

## Hostpath Install

### Prep Work:

- The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
- The host path must exist and be writable by the `user:group 1001:1001` on all nodes in the cluster. For example, in a Linux environment you might run `sudo chown -R 1001:1001 /backups` to change the `user:group` permissions.

### Additional Prep Info:

If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

### Run the velero install command with these additional flags:

### Velero 1.10 and later:

Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

### Velero versions earlier than 1.10:

Use the `--use-restic` and `--use-volume-snapshots=false` flags.

Example:

```
velero install \
--no-default-backup-location \
--no-secret \
--use-node-agent --uploader-type=restic \
--use-volume-snapshots=false
```

### Run command to set host path storage location

```
kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
```

Replace:

- NAME with the namespace where the admin console is installed and running
- PATH with the path to the directory where the backups will be stored

### Application Admin Configuration

- Navigate to Snapshots
- Select Settings & Schedule tab
- Change the Destination location to Host Path
- Enter Host Path.
- Click "Update storage settings" button.
- Start a Partial Snapshot (Application) or Full Snapshot (Instance)

Optional:

- Restore from Partial Snapshot (Application) or Full Snapshot (Instance)

Sources: [Velero](https://docs.replicated.com/enterprise/snapshots-velero-cli-installing), [Replicated](https://docs.replicated.com/enterprise/snapshots-configuring-hostpath)
