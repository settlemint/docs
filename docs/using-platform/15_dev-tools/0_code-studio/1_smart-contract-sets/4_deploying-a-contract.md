---
title: Deploying a smart contract
description: Deploying a smart contract
sidebar_position: 3
---

# Deploying a smart contract

There are two main ways to deploy smart contracts in the Smart Contract Set: you can either use the Task Manager or run the commands manually in the terminal.

You can deploy your contracts to a local anvil node (for testing purposes) or to a network you have created in the platform.

The typical folder structure of SettleMint's smart contract set will include:

- **`contracts/`**: Contains the Solidity smart contracts for the project.
- **`test/`**: Houses the Solidity tests, written to verify the functionality of the smart contracts.
  - The test folder can contain both Hardhat tests written in TypeScript, and Foundry tests written in Solidity.
- **`script/`**: Includes scripts for deploying or interacting with the contracts post-deployment.
- **`lib/`**: Optional directory for Solidity libraries or external dependencies.
- **`ignitions/`**: A folder containing the ignitions for Hardhat deployment.
- **`out/`**: Generated directory where compilation artifacts (like ABI and binary) are stored.
- **`foundry.toml`**: Configuration file for Foundry, where you can set global settings and parameters.
- **`hardhat.config`**: Hardhat configuration file.
- **`subgraphs`**: Contains the indexing logic for your subgraphs, specific to your smart contract.

You need to compile your contracts before you can deploy them.

## Compile

### Hardhat

#### **Task Manager**

#### **Terminal**

### Foundry

#### **Task Manager**

#### **Terminal**

## Deploy to a network in the platform

### Hardhat

#### **Task Manager**

![SettleMint login](../../../../../static/img/deploy-scs/settlemint-login.png)
![Hardhat deploy remote task manager](../../../../../static/img/deploy-scs/hardhat-deploy-remote.png)
![Hardhat deploy remote select node](../../../../../static/img/deploy-scs/hardhat-deploy-remote-select-node.png)
![Hardhat deploy remote select private key](../../../../../static/img/deploy-scs/hardhat-deploy-remote-select-private-key.png)
![Hardhat deploy remote success](../../../../../static/img/deploy-scs/hardhat-deploy-remote-success.png)

#### **Terminal**

## Deploy to a local network

### Hardhat

#### **Task Manager**

![Hardhat start local network](../../../../../static/img/deploy-scs/hardhat-start-local-network.png)
![Hardhat deploy local network](../../../../../static/img/deploy-scs/hardhat-deploy-local-network.png)
![Hardhat deploy local network success](../../../../../static/img/deploy-scs/hardhat-deploy-local-success.png)

#### **Terminal**
