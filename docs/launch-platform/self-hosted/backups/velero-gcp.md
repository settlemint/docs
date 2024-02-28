# Velero Backups on Google Cloud

## Velero CLI Install

Install velero cli binary from [VMWare](https://github.com/vmware-tanzu/velero/releases)

```
For Linux x86_64:
curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
tar zxvf velero-v1.10.1-linux-amd64.tar.gz
sudo mv velero-v1.10.1-linux-amd64/velero /usr/local/bin/velero
velero version
```

## GCP Install

### Prep Work:

- Create GCS Bucket
- Create IAM Service Account
- Download Service Account Credential JSON File

### Run the velero install command with these additional flags:

### Velero 1.10 and later:

Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

### Velero versions earlier than 1.10:

Use the `--use-restic` and `--use-volume-snapshots=false` flags.

Example:

```
export BUCKET=<GCS_BUCKET_NAME>
velero install \
  --provider gcp \
  --plugins velero/velero-plugin-for-gcp:v1.6.0 \
  --bucket $BUCKET \
  --secret-file ./CREDS_FILE
  --use-node-agent --uploader-type=restic \
  --use-volume-snapshots=false
```

### Application Admin Configuration

- Navigate to Snapshots
- Select Settings & Schedule tab
- Change the Destination location to Google Cloud Storage
- Enter Bucket Name and Path.
- Copy/Paste the information from the Service Account Credential JSON File
- Click "Update storage settings" button.
- Start a Partial Snapshot (Application) or Full Snapshot (Instance)

Optional:

- Restore from Partial Snapshot (Application) or Full Snapshot (Instance)

Sources: [Velero](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup), [Replicated](https://docs.replicated.com/enterprise/snapshots-storage-destinations#configure-gcp-storage-for-online-environments)
