---
title: Add a Blockchain Node
description: Guide to adding a Blockchain Node to a Network
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add a node to a network

Once you have deployed a permissioned network or joined a public network, you can add more nodes to it. The number of nodes needed depends on your network's protocol.

## How to add a node

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

![Add a Node](../../static/img/about-settlemint/add-node.png)

Navigate to the **application** that includes the network to which you want to add nodes.
Click **Blockchain nodes** in the left navigation, then click **Add a blockchain node**.

Follow these steps:
1. Select the **blockchain network** to add this node to
2. Choose a **node name**
3. Select **node type** (VALIDATOR/NON_VALIDATOR for permissioned networks)
4. Configure deployment settings
5. Click **Confirm** to add the node

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

First ensure you're authenticated:
```bash
settlemint login
```

Create a blockchain node:
```bash
settlemint platform create blockchain-node besu <node-name> \
  --blockchain-network <network-name> \
  --node-type <VALIDATOR|NON_VALIDATOR> \
  --provider <provider> \
  --region <region>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';

const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const createNode = async () => {
  const result = await client.blockchainNode.create({
    applicationUniqueName: "your-application",
    blockchainNetworkUniqueName: "your-network",
    name: "my-node",
    nodeType: "VALIDATOR",
    provider: "provider",
    region: "region"
  });
  console.log('Node created:', result);
};
```

:::tip
Get your access token from the Platform UI under User Settings → API Tokens.
:::

</TabItem>
</Tabs>

## Manage a node

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to your node and click **Manage node** to see available actions:
- View node details and status
- Monitor node health
- Restart node operations

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List nodes
settlemint platform list services --application <application-name>

# Restart node
settlemint platform restart blockchain-node <node-name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List nodes

// List nodes
await client.blockchainNode.list("your-application");

// Delete node
await client.blockchainNode.read("node-unique-name");

// Restart node
await client.blockchainNode.restart("node-unique-name");
```

</TabItem>
</Tabs>

:::info Note
All operations require appropriate permissions in your workspace.
:::
