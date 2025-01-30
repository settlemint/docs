---
title: Insights
description: Guide to using blockchain explorers in SettleMint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Insights

To view and inspect transactions in your blockchain application, SettleMint provides insightful dashboards via integrated blockchain explorers:
- **Blockscout** - For EVM compatible networks (Besu, Polygon Edge)
- **Hyperledger Explorer** - For Fabric networks
- **Otterscan** - Alternative EVM explorer with advanced features

## Add Blockchain Explorer

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to the **application** where you want to add a blockchain explorer. Click **Insights** in the left navigation, and then click **Add Insights**. This opens a form.

Follow these steps:
1. Select **Blockchain Explorer**
2. Select the target **blockchain node** and click **Continue**
3. Enter a **name** for your explorer instance
4. Configure deployment settings (provider, region, size)
5. Click **Confirm** to add the explorer

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

First ensure you're authenticated:
```bash
settlemint login
```

Create blockchain explorer:
```bash
settlemint platform create insights blockscout <name> \
  --application <app-name> \
  --blockchain-node <node-name> \
  --provider <provider> \
  --region <region>
```

Optional parameters:
- `--size <SMALL|MEDIUM|LARGE>`
- `--accept-defaults`

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

// 1. Platform Management - For creating and managing explorer instances
const client = createSettleMintClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  instance: 'https://console.settlemint.com'
});

// Create a new explorer instance
const createExplorer = async () => {
  const result = await client.insights.create({
    name: "my-blockscout",
    blockchainNodeUniqueName: "your-node",
    insightsCategory: "BLOCKCHAIN_EXPLORER",
    provider: "GKE",
    region: "EUROPE",
    size: "SMALL"
  });
  console.log('Explorer created:', result);
};

// 2. Explorer Operations - For querying blockchain data
const { client: blockscoutClient, graphql } = createBlockscoutClient({
  instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!
});

// Example: Query transaction details
const queryTransaction = async (hash: string) => {
  const query = graphql(`
    query GetTransaction($hash: String!) {
      transaction(hash: $hash) {
        hash
        blockNumber
        value
        gasUsed
      }
    }
  `);

  const result = await blockscoutClient.request(query, { hash });
  console.log('Transaction details:', result);
};
```

:::tip
The SDK enables you to programmatically access all blockchain data including transactions, blocks, addresses, smart contracts and more. For detailed API reference, check out the [Blockscout SDK documentation](https://github.com/settlemint/sdk/tree/main/sdk/blockscout).
:::

</TabItem>
</Tabs>

## Manage Explorer

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to your explorer and click **Manage insights** to:
- View explorer details and status
- Monitor health status
- Access the explorer interface
- Update configurations

Current status values:
- `DEPLOYING` - Initial deployment in progress
- `COMPLETED` - Running normally
- `FAILED` - Deployment or operation failed
- `PAUSED` - Explorer is paused
- `RESTARTING` - Explorer is restarting

Health status indicators:
- `HEALTHY` - Operating normally
- `HAS_INDEXING_BACKLOG` - Processing backlog
- `NOT_HA` - High availability issue
- `NO_PEERS` - Network connectivity issue

</TabItem>
<TabItem value="sdk-cli" label="SDK CLI">

```bash
# List explorers
settlemint platform list insights --application <app-name>

# Get explorer details
settlemint platform read insights <name>

# Delete explorer
settlemint platform delete insights <name>

# Restart explorer
settlemint platform restart insights <name>
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

```typescript
// List explorers
const listExplorers = async () => {
  const explorers = await client.insights.list("your-app");
  console.log('Explorers:', explorers);
};

// Get explorer details
const getExplorer = async () => {
  const explorer = await client.insights.read("explorer-unique-name");
  console.log('Explorer details:', explorer);
};

// Delete explorer
const deleteExplorer = async () => {
  await client.insights.delete("explorer-unique-name");
};

// Restart explorer
const restartExplorer = async () => {
  await client.insights.restart("explorer-unique-name");
};
```

</TabItem>
</Tabs>

## Using the Explorer

When the blockchain explorer is deployed and running successfully, you can:

1. Access the web interface through the **Interface tab**
2. View in fullscreen mode for better visibility
3. Inspect blocks, transactions, addresses and balances

Key features:
- View latest blocks and transactions
- Search by block number, transaction hash, or address
- Inspect transaction details and status
- View account balances and token transfers
- Monitor smart contract interactions

![Blockscout Interface](../../static/img/document360/Images/Blockscout%201.png)

### Transaction Details
Click a Transaction hash to see detailed information including:
- Gas usage and fees
- Input data and events
- Status and confirmations
- Related addresses

![Transaction View](../../static/img/document360/Images/Blockscout%202.png)

### Address Details
Click an Account address to view:
- Balance and token holdings
- Transaction history
- Contract interactions
- Analytics and graphs

![Address View](../../static/img/document360/Images/Blockscout%203.png)

:::info Note
All operations require appropriate permissions in your workspace.
:::
