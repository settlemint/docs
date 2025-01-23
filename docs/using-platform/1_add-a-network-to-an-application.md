---
title: Add a Blockchain Network
description: Guide to adding a Blockchain Network to your application
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add a network to an application

Before setting up a blockchain network, ensure you have an application in place. You must always [create an application](0_create-an-application.md) first, as this provides the context for organizing networks, nodes, dev tools, etc.

## How to add a blockchain network

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

![Add A Blockchain Network](../../static/img/about-settlemint/add-network.png)

Navigate to the **application** where you will create the network. Click **Add blockchain network** to open a form.

Follow these steps:
1. **Select the protocol** of your choice and click **Continue**.
2. Choose a **network name** and a **node name**. 
3. Configure your deployment settings and network parameters.
4. Click **Confirm** to add the network.

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

First ensure you're authenticated:
```bash
settlemint login
```

Create a blockchain network:
```bash
settlemint platform create blockchain-network besu <network-name> \
  --node-name <node-name> \
  --provider <provider> \
  --region <region> \
  --application <application-name>
```

Optional parameters:
- `--chain-id <chainId>`
- `--gas-limit <limit>`
- `--seconds-per-block <seconds>`
- `--size <SMALL|MEDIUM|LARGE>`
- `--type <SHARED|DEDICATED>`
- `--accept-defaults`

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';

const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const createNetwork = async () => {
  const result = await client.blockchainNetwork.create({
    applicationUniqueName: "your-application",
    name: "My Network",
    nodeName: "validator-1",
    consensusAlgorithm: "BESU_QBFT",
    provider: "provider",
    region: "region",
    size: "SMALL",
    type: "SHARED"
  });
  console.log('Network created:', result);
};
```

:::tip
Get your access token from the Platform UI under User Settings → API Tokens.
:::

</TabItem>
</Tabs>

## Manage a network

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

![Manage Network](../../static/img/about-settlemint/manage-network.png)

Navigate to your network and click **Manage network** to see available actions:
- View network details and status
- Monitor network health
- Restart network operations

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List networks
settlemint platform list services --application <application-name>

# Restart network
settlemint platform restart blockchain-network <network-name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List networks
const listNetworks = async () => {
  const networks = await client.blockchainNetwork.list("your-application-name");
  console.log('Networks:', networks);
};

// Delete network
const deleteNetwork = async () => {
  await client.blockchainNetwork.delete("network-unique-name");
};

// Restart network
const restartNetwork = async () => {
  await client.blockchainNetwork.restart("network-unique-name");
};
```

</TabItem>
</Tabs>

:::info Note
All operations require appropriate permissions in your workspace.
:::
