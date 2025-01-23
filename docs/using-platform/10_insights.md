import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Insights

To view and inspect transactions in your blockchain application, SettleMint provides insightful dashboards via the integrated Blockscout blockchain explorer.([1](https://github.com/settlemint/sdk/tree/main/sdk/blockscout))

**Blockscout** can be hooked up to any of your permissioned EVM compatible blockchain networks running in SettleMint. This includes **Hyperledger Besu and Polygon Edge**.

## Adding the blockchain explorer

<Tabs>
<TabItem value="platform-ui" label="Platform UI">

Navigate to the **application** where you want to add a blockchain explorer. Click **Insights** in the left navigation, and then click **Add Insights**. This opens a form.

Follow these steps to add the blockchain explorer:

1. Select **Blockchain Explorer**
2. Select the target **blockchain node** for the blockchain explorer and click **Continue**
3. Enter a **name** for this instance of the blockchain explorer
4. Choose a **deployment plan**
5. Click **Confirm** to add the blockchain explorer

</TabItem>

<TabItem value="sdk-cli" label="SDK CLI">

```bash
settlemint login

# Create blockchain explorer
settlemint platform create insights blockscout <name> \
  --application <app-name> \
  --blockchain-node <node-name> \
  --provider <provider> \
  --region <region>
```

</TabItem>

<TabItem value="sdk-js" label="SDK JS">

```typescript
import { createSettleMintClient } from '@settlemint/sdk-js';
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

// Initialize Blockscout client
const blockscoutClient = createBlockscoutClient({
  endpoint: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!
});
```

</TabItem>
</Tabs>

## Using the blockchain explorer

When the blockchain explorer is deployed and running successfully, click it from the list and start using it. Click the **Interface tab** to access the web UI. You can view this in full screen mode by clicking **View in fullscreen mode**.

You can inspect all blocks, transactions, addresses and balances.

Click a block in the latest Blocks section to inspect its transactions, or click a transaction form the Transactions section to view its details. You can also click View all Blocks or View all Transactions button to view the full list of transactions or blocks.

![Blockscout 1.png](../../static/img/document360/Images/Blockscout%201.png)

Click a Transaction hash to see the Transaction Details

![Blockscout 2.png](../../static/img/document360/Images/Blockscout%202.png)

Click an Account address to see the Address Details

![Blockscout 3.png](../../static/img/document360/Images/Blockscout%203.png)

:::info Note
The SDK enables you to easily query transaction data, blocks, addresses, smart contracts and more from your SettleMint-powered blockchain networks.
:::
