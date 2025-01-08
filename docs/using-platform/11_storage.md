# Storage

Managing complex or large data in decentralized systems can be a challenge. To securely store and share your files and data, SettleMint offers two storage solutions that can interact with the blockchain: **IPFS (decentralized)** and **MinIO (centralized)**.

## Adding storage

Navigate to the **application** where you want to add storage. Click **Storage** in the left navigation. This opens a form.

Follow these steps to add storage:

1. Choose **'IPFS'** or **'MinIO'**
2. Choose a **name** for your storage. Choose one that will be easily recognizable in your dashboards.
3. Choose a **deployment plan**. Select the type, cloud provider, region and resource pack. [More about deployment plans](../launch-platform/managed-cloud-deployment/3_deployment-plans)
4. You can see the resource cost for your storage displayed at the bottom of the form. Click **Confirm** to add the storage.

When the storage is deployed, click on it from the list, and go to the **Interface tab** to start adding files. You can connect to your storage using the details provided in the **Connect tab**.

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
