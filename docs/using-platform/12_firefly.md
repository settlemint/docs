# Firefly FabConnect

Firefly FabConnect is an open-source middleware that lets you interact with your Fabric network and the chaincode deployed on it. When you add the FabConnect middleware to your application on the SettleMint Platform, you automatically deploy a RESTful API to:

- Manage identities on your network.
- Send transactions to your chaincode.
- Check any transaction receipt.
- Create event streams and subscriptions.

:::warning

Before you start, make sure you are running:

- A Fabric Network.
- A Fabric smart contract set.

:::

## Manage Identities

Identities on a Fabric network are managed in two steps. First, a CA admin must register users. This is a process in which the CA admin gives an ID and secret to an identity. Then, the user of the identity enrolls the ID and secret pair to get a public/private key pair to sign transactions.

Registering an identity can be done as follows using Firefly FabConnect:

```shell
curl --request POST \
  --url https://fireflyfab-7853.gke-europe.settlemint.com/identities \
  --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1icm9pc2UiLCJlbWFpbCI6ImFtYnJvaXNlQHNldHRsZW1pbnQuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20v…' \
  --header 'Content-Type: application/json' \
  --data '{
  "type": "client",
  "name": "user3",
  "attributes": {}
}'
```

This request returns the secret associated with name user3:

```shell

{
"name": "user3",
"secret": "fkrTKPOZZYWO"
}

```

The end user of that identity can enroll it as follows:

```shell

curl --request POST \
 --url <https://fireflyfab-7853.gke-europe.settlemint.com/identities/user3/enroll> \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1icm9pc2UiLCJlbWFpbCI6ImFtYnJvaXNlQHNldHRsZW1pbnQuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20v…' \
 --header 'Content-Type: application/json' \
 --data '{
"secret": "fkrTKPOZZYWO"
"attributes": {}
}'

```

## Sending Transactions

Assuming that you have a [chaincode deployed](../blockchain-guides/5_Hyperledger-Fabric/6_hyperledger-fabric-integration-tools.md) on your network, you can send a transaction through the middleware:

```shell

curl --request POST \
 --url <https://fireflyfab-7853.gke-europe.settlemint.com//transactions> \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1icm9pc2UiLCJlbWFpbCI6ImFtYnJvaXNlQHNldHRsZW1pbnQuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20v…' \
 --header 'Content-Type: application/json' --data '{
"headers": {
"type": "SendTransaction",
"signer": "user3",
"channel": "default-channel",
"chaincode": "assetTransfer"
},
"func": "CreateAsset",
"args": [
"asset01", "blue", "5", "Alice", "500"
],
"init": false, "fly-sync": true
}'

```

This transaction creates an asset in the assetTransfer chaincode deployed on the Fabric network.

## Create Event Streams

Firefly FabConnect can also be used to stream events happening on your network. You can either use webhook or websocket to deliver the data.

This request create a stream using webhooks:

```shell

curl --request POST \
 --url <https://fireflyfab-7853.gke-europe.settlemint.com/eventstreams> \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1icm9pc2UiLCJlbWFpbCI6ImFtYnJvaXNlQHNldHRsZW1pbnQuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20v…' \
 --header 'Content-Type: application/json' \
 --data '{
"type": "webhook",
"name": "AssetTransfer",
"webhook": {
"url": "<https://myAssets.com/assetTransfer>",
"tlsSkipVerifyHost": "true"
}
}'

```

The response contains an event stream ID that is required to create a subscription:

```shell

curl --request POST \
 --url <https://fireflyfab-7853.gke-europe.settlemint.com//subscriptions> \
 --header 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1icm9pc2UiLCJlbWFpbCI6ImFtYnJvaXNlQHNldHRsZW1pbnQuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20v…' \
 --header 'Content-Type: application/json' \
 --data '{
"payloadType": "string",
"name": "mySubscription",
"channel": "default-channel",
"signer": "user3",
"fromBlock": "0",
"stream": "es-92183185-01e3-4bc9-5433-348a640f5fe1",
"filter": {
"blockType": "tx",
"chaincodeId": "",
"eventFilter": ""
}
}'

```
