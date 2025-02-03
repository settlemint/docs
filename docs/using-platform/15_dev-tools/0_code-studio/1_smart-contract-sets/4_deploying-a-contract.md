---
title: Deploying a smart contract
description: Deploying a smart contract using Platform UI or SDK CLI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploying a smart contract

You can deploy your contracts to a network in the platform or a local development network. This guide covers both Platform UI and SDK CLI approaches.

<Tabs>
  <TabItem value="platform-ui" label="Platform UI">

  Follow these steps to deploy your smart contract through the Platform UI:

  1. Open the IDE by clicking on your smart contract set.
     
     ![Open IDE](../../../../../static/img/deploy-scs/open-ide.png)

  2. Click on the **Task Manager** button.
     
     ![Task Manager](../../../../../static/img/deploy-scs/task-manager.png)

  3. First compile your contract by running either:
     - **Hardhat - Build** task
       ![Hardhat compile task manager](../../../../../static/img/deploy-scs/hardhat-build.png)
     - **Foundry - Build** task
       ![Foundry compile task manager](../../../../../static/img/deploy-scs/foundry-build.png)

  4. To deploy to a platform network:
     - Run the **SettleMint - Login** task
       ![SettleMint login](../../../../../static/img/deploy-scs/settlemint-login.png)
     - Run the **Hardhat - Deploy to platform network** task
       ![Hardhat deploy remote task manager](../../../../../static/img/deploy-scs/hardhat-deploy-remote.png)
     - Select your node and private key when prompted
       ![Hardhat deploy remote select node](../../../../../static/img/deploy-scs/hardhat-deploy-remote-select-node.png)

  5. To deploy locally:
     - Run the **Hardhat - Start local network** task
       ![Hardhat start local network](../../../../../static/img/deploy-scs/hardhat-start-local-network.png)
     - Run the **Hardhat - Deploy to local network** task
       ![Hardhat deploy local network](../../../../../static/img/deploy-scs/hardhat-deploy-local-network.png)

  </TabItem>
  
  <TabItem value="sdk-cli" label="SDK CLI">

  ## Smart Contract Set CLI Commands

  The SDK CLI provides commands for building, testing, and deploying smart contracts. Here's a detailed guide:

  ### Prerequisites

  ```bash
  # Login to the platform
  settlemint login

  # Connect to your application
  settlemint connect
  ```

  ### Building (Compiling)

  ```bash
  # Build smart contracts using Hardhat
  settlemint scs hardhat build
  ```

  ### Deployment

  ```bash
  # Deploy smart contracts using Hardhat
  settlemint scs hardhat deploy

  # Deploy to local network
  settlemint scs hardhat deploy local

  # Deploy to platform network
  settlemint scs hardhat deploy remote
  ```

  ### Local Development Network

  ```bash
  # Start a development network using Hardhat
  settlemint scs hardhat network
  ```

  ### Testing

  ```bash
  # Test the smart contracts using Hardhat
  settlemint scs hardhat test
  ```

  ### Scripts

  ```bash
  # Run a script using Hardhat
  settlemint scs hardhat script
  ```

  :::note Important
  Before deployment, ensure:
  - You're authenticated (`settlemint login`)
  - You're connected to your application (`settlemint connect`)
  - Your smart contracts are compiled (`settlemint scs hardhat build`)
  - For remote deployment: you have a running node and sufficient funds
  :::

  ### Environment Configuration

  When using `settlemint connect`, you'll be prompted to configure:
  - Workspace selection
  - Application selection
  - Blockchain node selection
  - The Graph instance selection
  - HD Private Key selection
  - Application access token creation

  This configuration is stored locally and used for subsequent commands.

  </TabItem>
</Tabs>

## Project Structure

The typical folder structure of a SettleMint smart contract set includes:

- **`contracts/`**: Contains the Solidity smart contracts
- **`test/`**: Contains both Hardhat (TypeScript) and Foundry (Solidity) tests
- **`script/`**: Deployment and interaction scripts
- **`lib/`**: Optional Solidity libraries
- **`ignitions/`**: Hardhat deployment configurations
- **`out/`**: Compilation artifacts
- **`foundry.toml`**: Foundry configuration
- **`hardhat.config`**: Hardhat configuration
- **`subgraphs/`**: The Graph indexing configurations

## Customize smart contracts

You can customize your smart contracts using the built-in IDE. The smart contract sets include a Generative AI plugin to assist with development. [Learn more about the AI plugin here.](./5_AI_plugin.md)
