---
title: Smart Contract Sets
description: Smart Contract Sets
---


## Introduction

A Smart Contract Set is a [code studio](../../0_code-studio/0_code-studio.md) that comes with a [smart contract set template](2_smart-contract-templates.md) for your chosen use case. It is a powerful tool that accelerates the development of your smart contracts.

You can choose from a wide variety of templates in our open-source [template library](2_smart-contract-templates.md#template-library). Each template includes pre-built smart contracts which you can then customize to meet your specific needs.

If you need a fundamental explanation of what smart contracts are and how they work, we recommend contacting our team to join our Learn World Blockchain course. Our experts will guide you through the basics, ensuring you have a solid foundation before diving into development. For a practical guide, please visit [deploying a contract](4_deploying-a-contract.md).

## Overview of the Smart Contract Deployment Process on SettleMint

SettleMint's smart contract sets include both Hardhat and Foundry, enabling you to compile, test, and deploy using your preferred framework or a combination of both. This flexibility allows you to optimize your development process to best suit your project needs and preferences.

The following is a high-level overview of smart contract development processes at SettleMint.

### 1. Adding a Smart Contract Set

- **Add dev tool**: Navigate to the application you want to create the smart contract set in, then to the dev tools page and press the button "Add dev tool".
- **Code studio**: Select the "Code studio" option as the type of dev tool.
- **Smart contract set**: Select the "Smart contract set" option as the type of Code studio.
- **Picking Your Template**: Pick the template of your choice.

For detailed instructions, please see [add a smart contract set](3_add-smart-contract-set.md).

### 2. Compiling and Configuring The Smart Contract

- **Compiling**: Convert your smart contract code into a format that the blockchain can understand and execute.
- **Configuring**: SettleMint sets all the necessary configurations for you,
- **Purpose**: Tailors the deployment process to your specific requirements and ensures your contract can run on the blockchain.

### 3. Deploying and Interacting with the Smart Contract

- **Deploying**: Upload your compiled smart contract to a blockchain network.
- **Interacting**: Once deployed, interact with the smart contract through transactions that call its functions.
- **Purpose**: Makes the contract accessible on the blockchain so users can interact with it and utilize its features to perform actions defined in its logic.

## Tools to Use

At SettleMint, we provide the option to use either Foundry or Hardhat. Both of these tools allow you to compile and deploy smart contracts within the SettleMint IDE. The workflow in both frameworks is very similar: you compile and then deploy the smart contracts.

### Foundry

Foundry is a toolkit for EVM development. It provides tools to compile, test, and deploy smart contracts.

1. **Initialize Project**: Set up your project folder and deploy a Foundry smart contract set.
2. **Write and Configure Contract**: Create your smart contract code in Solidity and set up your project settings in a `foundry.toml` file if needed.
3. **Compile and Deploy Contract**: Convert your Solidity code into bytecode and deploy your compiled contract to the blockchain network of your choice.

### Hardhat

Hardhat is a development environment for EVM software. It provides a flexible and extensible ecosystem for building, testing, and deploying smart contracts.

1. **Initialize Project**: Set up your project folder and deploy a Hardhat smart contract set.
2. **Write and Configure Contract**: Create your smart contract code in Solidity and set up your project settings in a `hardhat.config.js` file if needed.
3. **Compile and Deploy Contract**: Convert your Solidity code into bytecode and deploy your compiled contract to the blockchain network of your choice.

## Key Points

- **Smart Contracts**: Self-executing programs with predefined rules.
- **Compiling and Configuring**: Converts code into a format the blockchain can run and tailors the deployment process.
- **Deploying and Interacting**: Uploads the compiled code to the blockchain and makes it accessible for interaction.
  By following these steps and using the appropriate tools, you can easily create, compile, and deploy smart contracts to automate and secure your business processes on the blockchain.
