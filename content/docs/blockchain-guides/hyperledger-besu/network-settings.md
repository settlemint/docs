---
title: "Network Settings"
---

Depending on your requirements, you can configure some advanced settings for your Hyperledger Besu network. We provide default settings, but you can change these according to your own preferences.

## Chain ID

Ethereum network identifier. Used for peer-to-peer communication between nodes as well as during the transaction signature process. Another identifier, known as the network ID is defaulted to the chain ID.

## Seconds per block

Interval for new block creation.
Default: 15 s

## Gas limit

The maximum amount of gas that can be consumed for a given transaction.
Default: 9007199254740991

## Gas price

The price per gas unit.
Default: 0 wei

## EVM stack size

Size for the stack on which the EVM operates. The EVM (Ethereum Virtual Machine) is the environment in which all Ethereum nodes and smart contracts live.
Default: 2048

## Contract size limit

Maximum limit for a smart contract.
Default: 2048 GB

## Warning

These settings can no longer be changed once the network is deployed.
