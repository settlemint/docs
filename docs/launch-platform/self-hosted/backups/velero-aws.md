# Velero Backups on AWS

## Velero CLI Install

Install velero cli binary from [VMWare](https://github.com/vmware-tanzu/velero/releases)

```
For Linux x86_64:
curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
tar zxvf velero-v1.10.1-linux-amd64.tar.gz
sudo mv velero-v1.10.1-linux-amd64/velero /usr/local/bin/velero
velero version
```

## AWS Install

Install aws CLI tool from [Amazon](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

```
For Linux x86_64:
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Prep Work:

- Create S3 Bucket
- Create IAM User

### Create a credential file to be used to install the velero-aws plugin:

```
[default]
aws_access_key_id=<AWS_ACCESS_KEY_ID>
aws_secret_access_key=<AWS_SECRET_ACCESS_KEY>
```

### Run the velero install command with these additional flags:

### Velero 1.10 and later:

Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

### Velero versions earlier than 1.10:

Use the `--use-restic` and `--use-volume-snapshots=false` flags.

Example:

```
export BUCKET=<S3_BUCKET_NAME>
export REGION=<S3_BUCKET_REGION>
velero install \
   --provider aws \
   --plugins velero/velero-plugin-for-aws:v1.6.0 \
   --bucket $BUCKET \
   --backup-location-config region=$REGION \
   --secret-file CREDS_FILE \
   --use-node-agent --uploader-type=restic \
   --use-volume-snapshots=false
```

### Application Admin Configuration

- Navigate to Snapshots
- Select Settings & Schedule tab
- Change the Destination location to Amazon S3
- Enter S3 Bucket Name, Region, and Path.
- Enter IAM User Access Key ID and Access Key Secret
- Click "Update storage settings" button.
- Start a Partial Snapshot (Application) or Full Snapshot (Instance)

Optional:

- Restore from Partial Snapshot (Application) or Full Snapshot (Instance)

Sources: [Velero](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup), [Replicated](https://docs.replicated.com/enterprise/snapshots-storage-destinations#configure-aws-storage-for-online-environments)
