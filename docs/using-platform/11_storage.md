---
title: Storage
description: Guide to using storage solutions in SettleMint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Storage

Managing complex or large data in decentralized systems can be a challenge. To securely store and share your files and data, SettleMint offers two storage solutions that can interact with the blockchain: **IPFS (decentralized)** and **MinIO (centralized)**.

## Add Storage

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to the **application** where you want to add storage. Click **Storage** in the left navigation, and then click **Add storage**. This opens a form.

Follow these steps:
1. Choose storage type (IPFS or MinIO)
2. Choose a **Storage name**
3. Configure deployment settings
4. Click **Confirm**

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

First ensure you're authenticated:
```bash
settlemint login
```

Create storage:
```bash
settlemint platform create storage <type> <name> \
  --application <app-name> \
  --provider <provider> \
  --region <region> \
  --size <size>  # Optional: SMALL|MEDIUM|LARGE
```

Where `<type>` can be:
- `ipfs`
- `minio`

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';
import { createIPFSClient } from '@settlemint/sdk-ipfs';
import { createMinioClient } from '@settlemint/sdk-minio';

// 1. Platform Management - For creating and managing storage
const client = createSettleMintClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  instance: 'https://console.settlemint.com'
});

// Create storage instance
const createStorage = async () => {
  const result = await client.storage.create({
    applicationId: "your-app-id",     // Required
    name: "my-storage",               // Required
    storageProtocol: "IPFS",         // Required: "IPFS" | "MINIO"
    provider: "GKE",                  // Required
    region: "EUROPE",                 // Required
    size: "SMALL"                     // Optional: "SMALL" | "MEDIUM" | "LARGE"
  });
  console.log('Storage created:', result);
};

// 2. Storage Operations
// For IPFS
const ipfsClient = createIPFSClient({
  endpoint: process.env.SETTLEMINT_IPFS_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!
});

// Example IPFS operations
const uploadToIPFS = async (data: Buffer) => {
  const result = await ipfsClient.add(data);
  return result.cid;
};

// For MinIO
const minioClient = createMinioClient({
  endpoint: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessKeyId: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretAccessKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!,
  region: process.env.SETTLEMINT_MINIO_REGION
});

// Example MinIO operations
const uploadToMinio = async (bucket: string, objectName: string, data: Buffer) => {
  await minioClient.putObject(bucket, objectName, data);
};
```

:::tip
Get your access token from the Platform UI under User Settings → API Tokens.
:::

:::tip
The SDK enables you to:
- Use IPFS for decentralized storage - check out the [IPFS SDK documentation](https://github.com/settlemint/sdk/tree/main/sdk/ipfs)
- Use MinIO for S3-compatible storage - check out the [MinIO SDK documentation](https://github.com/settlemint/sdk/tree/main/sdk/minio)
:::

</TabItem>
</Tabs>

## Manage Storage

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to your storage and click **Manage storage** to:
- View storage details and status
- Monitor health
- Access storage interface
- Update configurations

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List storage instances
settlemint platform list storage --application <app-name>

# Get storage details
settlemint platform read storage <name>

# Delete storage
settlemint platform delete storage <name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List storage instances
const listStorage = async () => {
  const storages = await client.storage.list("your-app-id");
  console.log('Storage instances:', storages);
};

// Get storage details
const getStorage = async () => {
  const storage = await client.storage.read("storage-unique-name");
  console.log('Storage details:', storage);
};

// Delete storage
const deleteStorage = async () => {
  await client.storage.delete("storage-unique-name");
};
```

</TabItem>
</Tabs>

## About IPFS (decentralized)

The InterPlanetary File System (IPFS) is a peer-to-peer network for storing and sharing data in a distributed file system. When uploading a file to IPFS it generates a unique fingerprint (hash). Later when querying that data it will use that fingerprint to find nodes storing the data behind this fingerprint. This means that this hash is not only a key used to retrieve a file, but it also serves as a proof of integrity. Often such fingerprints will be stored on chain in order to act as a bridge between the blockchain and IPFS.

[Learn more on IPFS here](https://docs.ipfs.tech/concepts/)

## About MinIO (centralized - S3 compatible)

For private or confidential data, MinIO would be your preferred option.

[Learn more on MinIO here](https://min.io/)

MinIO is S3-compatible. If you want to **set up a MinIO client for AWS S3**, you need these parameters:

**endPoint**
The endpoint is the URL to object storage service. Example value: example-minio-123a.settlemint.com, unique-name.settlemint.com (you can get the unique name from the Details tab)

**accessKey**
The access key is like a user ID that uniquely identifies your account. You can get your access key under the **Connect tab**

**secretKey**
The secret key is like the password to your account. You can get your secret key under the **Connect tab**.

```js
var Minio = require('minio');

var s3Client = new Minio.Client({
  endPoint: 'your-minio-instance.settlemint.com',
  accessKey: 'YOUR-ACCESSKEYID',
  secretKey: 'YOUR-SECRETACCESSKEY'
});
```

You can now use the s3Client object to call methods like `makeBucket`, `getObject`, and [many more methods which you can find here](https://docs.min.io/docs/javascript-client-api-reference.html).

:::info Note
MinIO client can also be configured in Python, .NET, Java, Golang, Haskell. You can follow the [quickstart guides provided by MinIO here](https://docs.min.io/docs/java-client-quickstart-guide.html) for more information.
:::

:::info Note
All operations require appropriate permissions in your workspace.
:::
