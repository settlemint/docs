# Velero Backups on Internal Storage

## Velero CLI Install

Install velero cli binary from [VMWare](https://github.com/vmware-tanzu/velero/releases)

```
For Linux x86_64:
curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
tar zxvf velero-v1.10.1-linux-amd64.tar.gz
sudo mv velero-v1.10.1-linux-amd64/velero /usr/local/bin/velero
velero version
```

## Local Storage Install

### Prep Work:

- Ensure there is enough disk space for application and backups

### Application Admin Configuration

- Navigate to Snapshots
- Select Settings & Schedule tab
- Change the Destination location to Internal Storage (Default)
- Click "Update storage settings" button.
- Start a Partial Snapshot (Application) or Full Snapshot (Instance)

Optional:

- Restore from Partial Snapshot (Application) or Full Snapshot (Instance)

Sources: [Replicated](https://docs.replicated.com/enterprise/snapshots-config-workflow)
