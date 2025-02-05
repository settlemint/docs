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
# Create blockchain explorer
settlemint platform create insights blockscout <name>

# Get information about the command and all available options
settlemint platform create insights blockscout --help
```

</TabItem>
<TabItem value="sdk-js" label="SDK JS">

For a full example of how to create a blockchain explorer using the SDK, see the [Blockscout SDK API Reference](https://www.npmjs.com/package/@settlemint/sdk-blockscout#api-reference).

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
settlemint platform list services --type insights

# Restart explorer
settlemint platform restart insights blockscout <name>
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
