---
title: Add a Smart Contract Set
description: Add a Smart Contract Set using Platform UI, SDK CLI, or SDK JS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add a Smart Contract Set

Smart contract sets allow you to incorporate **business logic** into your application by deploying smart contracts that run on the blockchain. You can add a smart contract set via different methods as part of your development workflow.

:::info Note
You must have an existing application before you add a smart contract set.
:::

<Tabs>
  <TabItem value="platform-ui" label="Platform UI">

  Follow these steps to add a smart contract set through the Platform UI:

  1. Navigate to the **application** where you want to add the smart contract set.
  2. Open **Dev tools** and click on **Add a Dev tool**.
  
     ![Dev tools](../../../../../static/img/smart-contract-sets/empty-dev-tools.png)
  
  3. Select **Code Studio** as the Dev tool type.
  
     ![Select Code Studio](../../../../../static/img/smart-contract-sets/select-code-studio.png)
  
  4. Then choose **Smart Contract Set**.
  
     ![Select Smart Contract Set](../../../../../static/img/smart-contract-sets/select-smart-contract-set.png)
  
  5. Pick a **template**; the Code Studio will load with your chosen smart contract template.
  
     ![Select Template](../../../../../static/img/smart-contract-sets/select-template.png)
  
  6. Click **Continue** to enter details such as the Dev tool name, user, and deployment plan.
  
     ![Click Continue](../../../../../static/img/smart-contract-sets/click-continue.png)
  
  7. Confirm the resource cost and click **Confirm** to add the smart contract set.
  
  You can now further configure and eventually deploy your smart contracts.
  
  </TabItem>
  
  <TabItem value="sdk-cli" label="SDK CLI">

  First, ensure you are authenticated:
  
  ```bash
  settlemint login
  ```
  
  Then create a smart contract set with the following command (refer to the [CLI docs](/using-platform/15_dev-tools/1_SDK/2_cli/2_commands) for more details):
  
  ```bash
  settlemint platform create smart-contract-set <tool-name> \
    --application <application-name> \
    --template <template-name> \
    --deployment-plan <deployment-plan>
  ```
  
  For example:
  
  ```bash
  settlemint platform create smart-contract-set my-scset \
    --application my-app \
    --template default \
    --deployment-plan starter
  ```
  
  Manage your smart contract set with:
  
  ```bash
  # List smart contract sets
  settlemint platform list smart-contract-sets --application <application-name>
  
  # Read smart contract set details
  settlemint platform read smart-contract-set <smart-contract-set-name>
  
  # Delete a smart contract set
  settlemint platform delete smart-contract-set <smart-contract-set-name>
  ```
  
  </TabItem>
  
  <TabItem value="sdk-js" label="SDK JS">

  You can also add a smart contract set programmatically using the JS SDK. The API follows the same pattern as for applications and blockchain networks:
  
  ```typescript
  import { createSettleMintClient } from '@settlemint/sdk-js';

  const client = createSettleMintClient({
    accessToken: process.env.SETTLEMENT_ACCESS_TOKEN!,
    instance: 'https://console.settlemint.com'
  });

  // Create a Smart Contract Set
  const createSmartContractSet = async () => {
    const result = await client.smartContractSet.create({
      applicationUniqueName: "your-app",        // Your application unique name
      name: "my-smart-contract-set",            // The smart contract set name
      template: "default"                         // Template to use (choose from available templates)
    });
    console.log('Smart Contract Set created:', result);
  };

  // List Smart Contract Sets
  const listSmartContractSets = async () => {
    const sets = await client.smartContractSet.list("your-app");
    console.log('Smart Contract Sets:', sets);
  };

  // Read Smart Contract Set details
  const readSmartContractSet = async () => {
    const details = await client.smartContractSet.read("smart-contract-set-unique-name");
    console.log('Smart Contract Set details:', details);
  };

  // Delete a Smart Contract Set
  const deleteSmartContractSet = async () => {
    await client.smartContractSet.delete("smart-contract-set-unique-name");
    console.log('Smart Contract Set deleted');
  };
  ```
  
  :::tip
  Get your access token from the Platform UI under User Settings → API Tokens.
  :::
  
  </TabItem>
</Tabs>

:::info Note
All operations require that you have the necessary permissions in your workspace.
:::

For protocol-specific information, please refer to the relevant section in our blockchain guides:

- [Hyperledger Besu Smart Contracts IDE](/docs/blockchain-guides/1_Hyperledger-Besu/6_enterprise-ethereum-integration-tools.md)
- [Ethereum Smart Contracts IDE](/docs/blockchain-guides/0_Ethereum/5_ethereum-integration-tools.md)
- [Avalanche Smart Contracts IDE](/docs/blockchain-guides/2_Avalanche/5_avalanche-integration-tools.md)
- [Polygon Smart Contracts IDE](/docs/blockchain-guides/4_Polygon/5_polygon-integration-tools.md)
- [Hyperledger Fabric Smart Contracts IDE](/docs/blockchain-guides/5_Hyperledger-Fabric/6_hyperledger-fabric-integration-tools.md)
