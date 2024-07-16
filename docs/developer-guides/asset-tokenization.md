---
title: Asset Tokenization
description: A Guide to Connecting a Frontend to Your Blockchain Application
sidebar_position: 3
keywords: [asset tokenization, solidity, smart contract]
---

This guide will show you how to build an asset tokenization application using SettleMint.

In this guide, you will learn:

- What Asset Tokenizaton Is
- The Benefits of using Asset Tokenization
- Asset Tokenization Use-Cases
- How to build and deploy an Asset Tokenization Application

## What Is Asset Tokenization?

Asset tokenization is the process of representing ownership rights to an asset through digital tokens on a blockchain. These tokens serve as a digital representation of the asset and are recorded and managed on the blockchain network, enabling secure ownership transfer and efficient trading.

## Benefits of Asset Tokenization

- **Increased Liquidity:** Tokenizing assets enables fractional ownership, allowing investors to buy and sell smaller units, thereby increasing liquidity for traditionally illiquid assets.
- **Accessibility:** Tokenization removes barriers to entry by enabling participation in asset ownership, allowing investors of all sizes to access previously exclusive investment opportunities.
- **Efficiency:** Digital tokens can be traded 24/7, reducing settlement times, and eliminating intermediaries, thereby streamlining the process and reducing costs.
- **Transparency:** Blockchain provides a transparent and immutable ledger, offering a clear audit trail for asset ownership, transfers, and transactions.

## Asset Tokenization Use-Cases

- **Real Estate:** Tokenizing real estate assets enables fractional ownership, making it more accessible to a broader investor base and facilitating efficient trading.
- **Supply Chain:** Tokenizing supply chain assets such as goods, inventory, or documents can enhance traceability, provenance, and efficient transfer of ownership.
- **Art and Collectibles:** Tokenizing artwork and collectibles allows for easy ownership transfer, provenance verification, and fractional ownership, making it more inclusive and liquid.
- **Investment Funds:** Tokenizing investment funds allows for fractional ownership, streamlined distribution, and automated compliance with regulatory requirements.

## Building an Asset Tokenization Application

## Part 1: Resource Setup

### 1. Create an Application

To start, you need to create an application on SettleMint. An application is a collection
of the different components on SettleMint that will help run your solution.

![Create an Application](./../../static/img/developer-guides/asset-tokenization/create-an-application.png)

To create an application on SettleMint, select the application launcher in the top right of the dashboard (four boxes). Click `Add an application`.

You will now be able to create a blockchain application and give it a name.

### 2. Deploy a Network and Node

After creating an application, you can now deploy a network and node. We will use both of these
resources to deploy our Asset Tokenization Smart Contract.

![Deploy a Network or Node](./../../static/img/developer-guides/asset-tokenization/create-a-network.gif)

To create a network and node, click on the `Start Here` button. Then Select `Add a Blockchain Network`. This will show all the supported blockchains on SettleMint.

For this guide, select `Hyperledger Besu`.

![Configure Besu](../../static/img/developer-guides/asset-tokenization/configure-besu.png)

After selecting `Hyperledger Besu`, you now have the option to select our deployment plan.

For this guide, you can use the following settings:

**Type**: Shared

**Cloud Provider**: Google Cloud

**Region**: Location closest to you

**Resouce Pack**: Small

![Network Success](../../static/img/developer-guides/asset-tokenization/network-success.png)

After clicking confirm, the node and network will start deploying at the same time. You will
see the status as `Running` once both have been successfully deployed.

### 3. Create IPFS Storage

This guide uses a simple image as the tokenized asset. This image will be pinned on IPFS, so the next step is to deploy a storage service.

![IPFS Storage](../../static/img/developer-guides/asset-tokenization/add-ipfs.png)

Click on `Storage` and then select `Add storage`. Then select `IPFS` and names create a name called `Token Storage`. You can choose the same deployment plan that you did earlier with the network and node.

### 4. Deploy a Private Key

To get access to the node you deployed, you will need to generate a private key.

![Create a Key](../../static/img/developer-guides/asset-tokenization/create-key.png)

To create a key, click on the `Private Keys` option, then select the `Accessible EC DSA P256`
option. Create a name and select the node that you deployed in the earlier step.

## Part 2: The Smart Contract

Now that you have deployed the needed resources, you can create and deploy the Asset
Tokenization smart contract.

### 1. Create a Smart Contract

![Create a Smart Contract](../../static/img/developer-guides/asset-tokenization/create-smart-contract.gif)

First, you need to deploy a `Smart Contract Set`. Select the `Smart Contract Sets` option
on the left.

You will now be given the option to select a template. Choose the `Empty` option.
Create a name and select the same deployment plan as you did earlier.

### 2. Opening the Integrated Development Environment (IDE)

To add and edit the smart contract code, you will use the IDE.

![Open Fullscreen](../../static/img/developer-guides/asset-tokenization/open-fullscreen.png)

Once the resource has been deployed, select the `IDE` tab and then `View in fullscreen mode`.

### 3. Adding the Smart Contract Code

With the IDE open in fullscreen, create a new file for your Asset Tokenization smart contract.

![Create Asset Contract](../static/img/developer-guides/../../../../static/img/developer-guides/asset-tokenization/create-asset-contract.png)

1. On the File Explorer on the left side, select the `Contracts` option.
2. Right Click and select `New File...`
3. Create a new file called `AssetTokenization.sol`

After the file is created, copy and paste the Solidity code below:

<details>
    <summary> Solidity Code</summary>
  
```solidity
// SPDX-License-Identifier: MIT

// SettleMint.com

pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "hardhat/console.sol";

/**
 * @title AssetTokenization
 * @dev A contract for tokenizing assets using ERC1155 standard with upgradeable functionality.
 */
contract AssetTokenization is Initializable, UUPSUpgradeable, ERC1155SupplyUpgradeable, OwnableUpgradeable {
    /**
     * @dev Struct representing an asset.
     * @param assetId Unique identifier number.
     * @param maxSupply Maximum number of tokens for the asset.
     * @param faceValue Initial value of the asset.
     * @param maturityTimestamp Maturity date in the value of a unix timestamp.
     */
    struct Asset {
        uint256 assetId;
        uint256 maxSupply;
        uint256 faceValue;
        uint256 maturityTimestamp;
    }

    /// @notice Name of the asset.
    string public name;

    /// @notice Symbol of the asset.
    string public symbol;

    /// @notice Mapping from asset ID to asset details.
    mapping(uint256 => Asset) public assetToDetails;

    /**
     * @dev Event emitted on asset transfer.
     * @param from Address from which the asset is transferred.
     * @param to Address to which the asset is transferred.
     * @param assetIds Array of asset IDs being transferred.
     * @param amounts Array of amounts of each asset being transferred.
     */
    event AssetTransferEvent(address indexed from, address indexed to, uint256[] assetIds, uint256[] amounts);

    /**
     * @dev Initializes the contract with a name, symbol, and URI.
     * @param _name Name of the asset.
     * @param _symbol Symbol of the asset.
     * @param _uri URI for the asset metadata.
     */
    function initialize(string memory _name, string memory _symbol, string memory _uri) external initializer {
        __ERC1155_init(_uri);
        __Ownable_init(msg.sender);
        name = _name;
        symbol = _symbol;
    }

    /**
     * @dev Creates a new asset.
     * @param assetId Unique identifier for the asset.
     * @param maxSupply Maximum supply of the asset.
     * @param faceValue Initial value of the asset.
     * @param maturityTimestamp Maturity date of the asset in unix timestamp.
     */
    function createAsset(uint256 assetId, uint256 maxSupply, uint256 faceValue, uint256 maturityTimestamp)
        external
        onlyOwner
    {
        require(assetToDetails[assetId].assetId != assetId, "Assets already exist");
        Asset memory asset = Asset(assetId, maxSupply, faceValue, maturityTimestamp);
        assetToDetails[assetId] = asset;
    }

    /**
     * @dev Mints a specified amount of an asset to a recipient.
     * @param assetId ID of the asset to mint.
     * @param amounts Amount of the asset to mint.
     * @param recipient Address to receive the minted assets.
     */
    function mint(uint256 assetId, uint256 amounts, address recipient) external onlyOwner {
        require(assetToDetails[assetId].assetId == assetId, "Asset does not exist");
        require(totalSupply(assetId) + amounts <= assetToDetails[assetId].maxSupply, "Max Supply");
        require(assetToDetails[assetId].maturityTimestamp > block.timestamp, "Asset is already matured");
        _mint(recipient, assetId, amounts, "");
    }

    /**
     * @dev Mints multiple assets in a batch to a recipient.
     * @param assetId Array of asset IDs to mint.
     * @param amounts Array of amounts for each asset to mint.
     * @param recipient Address to receive the minted assets.
     */
    function mintBatch(uint256[] memory assetId, uint256[] memory amounts, address recipient) public onlyOwner {
        for (uint256 i = 0; i < assetId.length; i++) {
            require(assetToDetails[assetId[i]].assetId == assetId[i], "Asset does not exist");
            require(totalSupply(assetId[i]) + amounts[i] <= assetToDetails[assetId[i]].maxSupply, "Max Supply");
            require(assetToDetails[assetId[i]].maturityTimestamp > block.timestamp, "Asset is already matured");
        }
        _mintBatch(recipient, assetId, amounts, "");
    }

    /**
     * @dev Burns a specified amount of an asset from the sender.
     * @param assetId ID of the asset to burn.
     * @param amounts Amount of the asset to burn.
     */
    function burn(uint256 assetId, uint256 amounts) external {
        require(assetToDetails[assetId].assetId == assetId, "Asset does not exist");
        _burn(msg.sender, assetId, amounts);
    }

    /**
     * @dev Burns multiple assets in a batch from the sender.
     * @param assetId Array of asset IDs to burn.
     * @param amounts Array of amounts for each asset to burn.
     */
    function burnBatch(uint256[] memory assetId, uint256[] memory amounts) external {
        for (uint256 i = 0; i < assetId.length; i++) {
            require(assetToDetails[assetId[i]].assetId == assetId[i], "Asset does not exist");
        }
        _burnBatch(msg.sender, assetId, amounts);
    }

    /**
     * @dev Sets a new URI for all assets.
     * @param newuri New URI to set.
     */
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    /**
     * @dev Returns the URI for a specific asset ID.
     * @param id Asset ID to query the URI for.
     * @return URI of the specified asset ID.
     */
    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(id), id, ".json"));
    }

    /**
     * @dev Updates the state on asset transfer and emits the transfer event.
     * @param from Address from which the asset is transferred.
     * @param to Address to which the asset is transferred.
     * @param assetId Array of asset IDs being transferred.
     * @param amounts Array of amounts of each asset being transferred.
     */
    function _update(address from, address to, uint256[] memory assetId, uint256[] memory amounts)
        internal
        override(ERC1155SupplyUpgradeable)
    {
        emit AssetTransferEvent(from, to, assetId, amounts);
    }

    /**
     * @dev Authorizes the upgrade of the contract to a new implementation.
     * @param newImplementation Address of the new implementation.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

````
</details>

### 4. Change the Deployment Configuration

With the code pasted in the IDE, you now need to change the deployment settings to include the smart contract you have just created.

![Edit Deployment Contract](./../../static/img/developer-guides/asset-tokenization/edit-deploy.png)

In the file explorer on the left, select the `deploy` folder. Then open the `00_deploy_example.ts` file.

Go to line 13 and replace `Example` with `AssetTokenization`. Make sure this is the same name as your smart contract or you will receive an error.

### 5. Deploy the Contract

With those settings changed, you are now ready to compile and deploy your smart contract.

![Compile Contract](./../../static/img/developer-guides/asset-tokenization/compile-contract.png)

To compile the smart contract:
1. Select the `Task Manager` on the left menu
2. Click `compile` under the hardhat folder
3. A terminal window below will show the status of the compiling contract

To deploy your smart contract:
1. Select the `smartcontract:deploy` option under the `npm` folder
2. The terminal will open to show the status of deploying your contract
3. The terminal will show the contract address of your smart contract.

![Contract Address](./../../static/img/developer-guides/asset-tokenization/contract-address.png)

The contract address is the number starting with `0x` after the `Deployed at` message in the terminal.


:::info
Save this contract address as you will use it later in this guide when building the integration.
:::


## Part 3: Connect the Resources



### 1. Upload an Image to IPFS

You will now upload the image to the IPFS storage service you deployed earlier.

![Asset Image](./../../static/img/developer-guides/asset-tokenization/asset.png)

Save the image above to your computer. It is what you will use to represent your asset.

![Add to IPFS](./../../static/img/developer-guides/asset-tokenization/add-to-ipfs.png)

To upload this image to IPFS:
1. Click on Storage
2. Select File Manager
3. Select the `Import` option

![Set Pinning](./../../static/img/developer-guides/asset-tokenization/set-pinning.png)

After the image has been imported, select the `Share Link` option by clicking on the 3 dots
next to the file size.

:::info
Save this URL as you will use it later in this guide when building the integration.
:::

Select the `Set pinning` option. This will make sure your file remains on IPFS.

![Set Local Node](./../../static/img/developer-guides/asset-tokenization/set-local-node.png)

Choose the local node option and click `Apply`.

### 2. Get the JSON-RPC Endpoint

To connect to the network that you have created, you need to get your JSON-RPC connection URL.

![JSON RPC Node](./../../static/img/developer-guides/asset-tokenization/json-rpc.png)

The URL can be found by:
1. Selecting `Blockchain nodes`
2. Clicking on the `Connect` tab
3. Copy the `JSON-RPC` URL

:::info
Save this URL as you will use it later in this guide when building the integration.
:::



### 3. Create a SettleMint API Key
To ensure that your network is secure, you will also need to generate an API to have access to it.
![Create an API Key](./../../static/img/developer-guides/asset-tokenization/create-api-key.png)

To create an API key, click on your profile icon in the top right. Then select `API Keys` and `Generate a new API Key`.
![Generate API Key](./../../static/img/developer-guides/asset-tokenization/generate-key.png)

You can now name your API key and check all of the resources below to give your key access to your entire application.

### 4. Setup Integration Studio Deployment

The final step is to create a deployment of the `Integration Studio`.

![Create an Integration](./../../static/img/developer-guides/asset-tokenization/create-an-integration.png)

To create an integration studio deployment:

1. Click on `Integration Tools` on the left menu
2. Name the Integration Studio
3. Choose the same deployment plan you have used in this guide

![Open an Integration](./../../static/img/developer-guides/asset-tokenization/open-integration.png)

Open your Integration Studio by selecting the `Interface` tab and then opening it in fullscreen mode.

For this guide, import the template below into the Integration Studio.


![Import an Integration](./../../static/img/developer-guides/asset-tokenization/import-integration.png)

To import the below JSON file:
1. Click on the hamburger icon in the top right next to the `Deploy` button.
2. Select the import option
3. Paste the below JSON code into the window


<details>
    <summary>JSON Code</summary>
```json

[
    {
        "id": "a781da6f697711d2",
        "type": "tab",
        "label": "Asset Tokenisation",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "0231410d77b80776",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "timestamp",
                "v": "",
                "vt": "date"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 80,
        "wires": [
            [
                "8154b1dd0912e484"
            ]
        ]
    },
    {
        "id": "8154b1dd0912e484",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "Set Global Variables",
        "func": "const glbVar = {\n    privateKey: \"\",\n    privateKeyAddress: \"\",\n    smartContract: \"\",\n    bpassKey: \"\",\n    rpcEndpoint: \"\",\n    abi: \n\n}\n\nglobal.set('privateKey', glbVar.privateKey);\nglobal.set('privateKeyAddress',glbVar.privateKeyAddress)\nglobal.set('contract', glbVar.smartContract);\nglobal.set('bpassKey', glbVar.bpassKey);\nglobal.set('rpcEndpoint', glbVar.rpcEndpoint);\nglobal.set('abi',glbVar.abi)\n\nreturn msg;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 80,
        "wires": [
            [
                "a7c63a0fd0d1a779"
            ]
        ]
    },
    {
        "id": "a7c63a0fd0d1a779",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 80,
        "wires": []
    },
    {
        "id": "a3bf422b89eaf40e",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "Initialise Asset",
        "url": "/initialise",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 180,
        "y": 140,
        "wires": [
            [
                "a9c266c0127bcb1a"
            ]
        ]
    },
    {
        "id": "7b77a930a3755dfb",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "assetName",
                "v": "",
                "vt": "str"
            },
            {
                "p": "assetSymbol",
                "v": "",
                "vt": "str"
            },
            {
                "p": "assetUri",
                "v": "",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 200,
        "wires": [
            [
                "a9c266c0127bcb1a"
            ]
        ]
    },
    {
        "id": "a9c266c0127bcb1a",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "Initialise Asset",
        "func": "///////////////////////////////////////////////////////////\n// Configuration                                         //\n///////////////////////////////////////////////////////////\n\nconst bpassKey = global.get(\"bpassKey\");\nconst rpcEndpoint = global.get(\"rpcEndpoint\");\nconst privateKey = global.get(\"privateKey\");\nconst privateKeyAddress = global.get(\"privateKeyAddress\");\nconst contractAddress = global.get(\"contract\");\nconst abi = global.get(\"abi\");\n\n///////////////////////////////////////////////////////////\n// Logic                                                 //\n///////////////////////////////////////////////////////////\n\nconst provider = new ethers.providers.JsonRpcProvider(`${rpcEndpoint}/${bpassKey}`);\nconst signer = new ethers.Wallet(privateKey, provider)\nconst contract = new ethers.Contract(contractAddress, abi, signer);\n\nconst txData = await contract.interface.encodeFunctionData('initialize', [msg.assetName, msg.assetSymbol, msg.assetUri]);\n\nconst txObject = {\n    from: privateKeyAddress,\n    to: contractAddress,\n    data: txData,\n    chainId: 44467,\n    gasLimit: 300000,\n    gasPrice: 0\n}\n\nconst result = await provider.send('eth_sendTransaction', [txObject])\nmsg.payload = { txHash: result }\n\n///////////////////////////////////////////////////////////\n// End                                                   //\n///////////////////////////////////////////////////////////\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "ethers",
                "module": "ethers"
            }
        ],
        "x": 440,
        "y": 200,
        "wires": [
            [
                "fccc870e4d37747a",
                "e6ac0147c62409c5"
            ]
        ]
    },
    {
        "id": "fccc870e4d37747a",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 200,
        "wires": []
    },
    {
        "id": "e6ac0147c62409c5",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 140,
        "wires": []
    },
    {
        "id": "5d247bc6cf6cbe71",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "Create Asset",
        "url": "/createAsset",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 190,
        "y": 380,
        "wires": [
            [
                "d2b66c8a9936d187"
            ]
        ]
    },
    {
        "id": "34a89b0416bc6b81",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "assetId",
                "v": "",
                "vt": "num"
            },
            {
                "p": "maxSupply",
                "v": "",
                "vt": "num"
            },
            {
                "p": "faceValue",
                "v": "",
                "vt": "num"
            },
            {
                "p": "maturityTimestamp",
                "v": "",
                "vt": "num"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 440,
        "wires": [
            [
                "d2b66c8a9936d187"
            ]
        ]
    },
    {
        "id": "d2b66c8a9936d187",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "Create Asset",
        "func": "///////////////////////////////////////////////////////////\n// Configuration                                         //\n///////////////////////////////////////////////////////////\n\nconst bpassKey = global.get(\"bpassKey\");\nconst rpcEndpoint = global.get(\"rpcEndpoint\");\nconst privateKey = global.get(\"privateKey\");\nconst privateKeyAddress = global.get(\"privateKeyAddress\");\nconst contractAddress = global.get(\"contract\");\nconst abi = global.get(\"abi\")\n\n///////////////////////////////////////////////////////////\n// Logic                                                 //\n///////////////////////////////////////////////////////////\n\nconst provider = new ethers.providers.JsonRpcProvider(`${rpcEndpoint}/${bpassKey}`);\nconst signer = new ethers.Wallet(privateKey, provider)\nconst contract = new ethers.Contract(contractAddress, abi, signer);\n\nconst txData = await contract.interface.encodeFunctionData('createAsset', [msg.assetId, msg.maxSupply, msg.faceValue, msg.maturityTimestamp]);\n\nconst txObject = {\n    from: privateKeyAddress,\n    to: contractAddress,\n    data: txData,\n    chainId: 44467,\n    gasLimit: 300000,\n    gasPrice: 0\n}\n\nconst result = await provider.send('eth_sendTransaction', [txObject])\nmsg.payload = { txHash: result }\n\n///////////////////////////////////////////////////////////\n// End                                                   //\n///////////////////////////////////////////////////////////\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "ethers",
                "module": "ethers"
            }
        ],
        "x": 440,
        "y": 440,
        "wires": [
            [
                "044fdcbdfdcd7a04",
                "30a836f0c70cd525"
            ]
        ]
    },
    {
        "id": "044fdcbdfdcd7a04",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 4",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 440,
        "wires": []
    },
    {
        "id": "30a836f0c70cd525",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 380,
        "wires": []
    },
    {
        "id": "c23e1cab7499043b",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "timestamp",
                "v": "",
                "vt": "date"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 320,
        "wires": [
            [
                "23c87abb19d043c5"
            ]
        ]
    },
    {
        "id": "23c87abb19d043c5",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "Current Time + 10 Minutes",
        "func": "const start = msg.timestamp; // 2018-01-01 00:00:00\nconst end = msg.timestamp + 60 * 10; // 2018-02-10 00:00:00\n\nmsg.end = end;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 480,
        "y": 320,
        "wires": [
            [
                "f0aa49d74372ee5f",
                "57092e2536312a66"
            ]
        ]
    },
    {
        "id": "f0aa49d74372ee5f",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 3",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 320,
        "wires": []
    },
    {
        "id": "905a9d8acd2ffc25",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "Get Maturity Time",
        "url": "/initialise",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 170,
        "y": 260,
        "wires": [
            [
                "23c87abb19d043c5"
            ]
        ]
    },
    {
        "id": "57092e2536312a66",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 260,
        "wires": []
    },
    {
        "id": "3c4575afe9674c7d",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "Mint",
        "url": "/mintAsset",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 210,
        "y": 620,
        "wires": [
            [
                "396467b890506b70"
            ]
        ]
    },
    {
        "id": "91ddbb58a215cbc4",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "assetId",
                "v": "",
                "vt": "num"
            },
            {
                "p": "amounts",
                "v": "",
                "vt": "num"
            },
            {
                "p": "recipient",
                "v": "",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 680,
        "wires": [
            [
                "396467b890506b70"
            ]
        ]
    },
    {
        "id": "396467b890506b70",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "Mint Asset",
        "func": "///////////////////////////////////////////////////////////\n// Configuration                                         //\n///////////////////////////////////////////////////////////\n\nconst bpassKey = global.get(\"bpassKey\");\nconst rpcEndpoint = global.get(\"rpcEndpoint\");\nconst privateKey = global.get(\"privateKey\");\nconst privateKeyAddress = global.get(\"privateKeyAddress\");\nconst contractAddress = global.get(\"contract\");\nconst abi = global.get(\"abi\")\n\n///////////////////////////////////////////////////////////\n// Logic                                                 //\n///////////////////////////////////////////////////////////\n\nconst provider = new ethers.providers.JsonRpcProvider(`${rpcEndpoint}/${bpassKey}`);\nconst signer = new ethers.Wallet(privateKey, provider)\nconst contract = new ethers.Contract(contractAddress, abi, signer);\n\nconst txData = await contract.interface.encodeFunctionData('mint', [msg.assetId, msg.amounts, msg.recipient]);\n\nconst txObject = {\n    from: privateKeyAddress,\n    to: contractAddress,\n    data: txData,\n    chainId: 44467,\n    gasLimit: 300000,\n    gasPrice: 0\n}\n\nconst result = await provider.send('eth_sendTransaction', [txObject])\nmsg.payload = { txHash: result }\n\n///////////////////////////////////////////////////////////\n// End                                                   //\n///////////////////////////////////////////////////////////\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "ethers",
                "module": "ethers"
            }
        ],
        "x": 430,
        "y": 680,
        "wires": [
            [
                "800e2f3264dfcd5a",
                "8973a39a370872a0"
            ]
        ]
    },
    {
        "id": "800e2f3264dfcd5a",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 6",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 680,
        "wires": []
    },
    {
        "id": "8973a39a370872a0",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 620,
        "wires": []
    },
    {
        "id": "736e61d2a897367f",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "View Balance",
        "url": "/viewBalance",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 180,
        "y": 740,
        "wires": [
            [
                "79c13e182da793bf"
            ]
        ]
    },
    {
        "id": "4a5021a501f7fa28",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "address",
                "v": "",
                "vt": "str"
            },
            {
                "p": "id",
                "v": "",
                "vt": "num"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 800,
        "wires": [
            [
                "79c13e182da793bf"
            ]
        ]
    },
    {
        "id": "79c13e182da793bf",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "View Balance",
        "func": "///////////////////////////////////////////////////////////\n// Configuration                                         //\n///////////////////////////////////////////////////////////\n\nconst bpassKey = global.get(\"bpassKey\");\nconst rpcEndpoint = global.get(\"rpcEndpoint\");\nconst privateKey = global.get(\"privateKey\");\nconst privateKeyAddress = global.get(\"privateKeyAddress\");\nconst contractAddress = global.get(\"contract\");\nconst abi = global.get(\"abi\")\n\n///////////////////////////////////////////////////////////\n// Logic                                                 //\n///////////////////////////////////////////////////////////\n\nconst provider = new ethers.providers.JsonRpcProvider(`${rpcEndpoint}/${bpassKey}`);\nconst signer = new ethers.Wallet(privateKey, provider)\nconst contract = new ethers.Contract(contractAddress, abi, signer);\n\nconst txData = await contract.interface.encodeFunctionData('balanceOf', [msg.address, msg.id]);\n\nconst txObject = {\n    from: privateKeyAddress,\n    to: contractAddress,\n    data: txData,\n    chainId: 44467,\n    gasLimit: 300000,\n    gasPrice: 0\n}\n\nconst result = await provider.send('eth_sendTransaction', [txObject])\nmsg.payload = { txHash: result }\n\n///////////////////////////////////////////////////////////\n// End                                                   //\n///////////////////////////////////////////////////////////\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "ethers",
                "module": "ethers"
            }
        ],
        "x": 440,
        "y": 800,
        "wires": [
            [
                "2a6a5fc7f077b330",
                "4d5d69f4484e672a"
            ]
        ]
    },
    {
        "id": "2a6a5fc7f077b330",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 7",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 800,
        "wires": []
    },
    {
        "id": "4d5d69f4484e672a",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 740,
        "wires": []
    },
    {
        "id": "d4cda817f22bae82",
        "type": "http in",
        "z": "a781da6f697711d2",
        "name": "View Asset",
        "url": "/viewAsset",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 190,
        "y": 500,
        "wires": [
            [
                "2da7906165d6d5a3"
            ]
        ]
    },
    {
        "id": "95939c685c83f962",
        "type": "inject",
        "z": "a781da6f697711d2",
        "name": "",
        "props": [
            {
                "p": "assetId",
                "v": "",
                "vt": "num"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 210,
        "y": 560,
        "wires": [
            [
                "2da7906165d6d5a3"
            ]
        ]
    },
    {
        "id": "2da7906165d6d5a3",
        "type": "function",
        "z": "a781da6f697711d2",
        "name": "View Asset",
        "func": "///////////////////////////////////////////////////////////\n// Configuration                                         //\n///////////////////////////////////////////////////////////\n\nconst bpassKey = global.get(\"bpassKey\");\nconst rpcEndpoint = global.get(\"rpcEndpoint\");\nconst privateKey = global.get(\"privateKey\");\nconst privateKeyAddress = global.get(\"privateKeyAddress\");\nconst contractAddress = global.get(\"contract\");\nconst abi = global.get(\"abi\")\n\n///////////////////////////////////////////////////////////\n// Logic                                                 //\n///////////////////////////////////////////////////////////\n\nconst provider = new ethers.providers.JsonRpcProvider(`${rpcEndpoint}/${bpassKey}`);\nconst signer = new ethers.Wallet(privateKey, provider)\nconst contract = new ethers.Contract(contractAddress, abi, signer);\n\nconst txData = await contract.interface.encodeFunctionData('assetToDetails', [msg.assetId]);\n\nconst txObject = {\n    from: privateKeyAddress,\n    to: contractAddress,\n    data: txData,\n    chainId: 44467,\n    gasLimit: 300000,\n    gasPrice: 0\n}\n\nconst result = await provider.send('eth_sendTransaction', [txObject])\nmsg.payload = { txHash: result }\n\n///////////////////////////////////////////////////////////\n// End                                                   //\n///////////////////////////////////////////////////////////\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [
            {
                "var": "ethers",
                "module": "ethers"
            }
        ],
        "x": 430,
        "y": 560,
        "wires": [
            [
                "9844d4ddf4b294ef",
                "a31a26d871259c19"
            ]
        ]
    },
    {
        "id": "9844d4ddf4b294ef",
        "type": "debug",
        "z": "a781da6f697711d2",
        "name": "debug 5",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 760,
        "y": 560,
        "wires": []
    },
    {
        "id": "a31a26d871259c19",
        "type": "http response",
        "z": "a781da6f697711d2",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 770,
        "y": 500,
        "wires": []
    }
]

````

</details>

### 5. Interact with the Smart Contract

The Integration Studio allows you to interact with your smart contract and add business logic.
Go to the newly created `Asset Tokenisation` tab in the Integration Studio.

![Asset Imported](./../../static/img/developer-guides/asset-tokenization/asset-imported.png)

The first function you need to complete is to set the global variables of the integration.

![Set Global Variables](./../../static/img/developer-guides/asset-tokenization/set-global-variables.gif)

To do this, click on the middle item in the diagram labeled `Set Global Variables`. There you will you a variable called `glbVar`. Here is where you will enter the information to start interacting with your smart contract.

![Set Global Variables](./../../static/img/developer-guides/asset-tokenization/globalvariables-settings.png)

1. **privateKey** - Enter your private key that you created in [Part 1 / Step 4](#4-deploy-a-private-key)
2. **privateKeyAdress** - The address created after completing [Part 1 / Step 4](#4-deploy-a-private-key)
3. **smartContract** - The address of your deployed smart contract after completing [Part 2 / Step 5](#5-deploy-the-contract)
4. **bpassKey** - The API key created when completing [Part 3 / Step 3](#3-create-a-settlemint-api-key)
5. **rpcEndpoint** - The JSON RPC URL that was shown when completing [Part 3 / Step 2](#2-get-the-json-rpc-endpoint)

With this information entered, click on the blue square next to the `Inject` item.

Now you need to create an asset by creating an asset name, asset symbol and assetUri.

![Change Asset Name](./../../static/img/developer-guides/asset-tokenization/assetname.gif)

To create an asset, double click on the `Inject` option next to the `Initialise Asset` item.

In this window you can set:
**msg.assetName** - Bond
**msg.assetSymbol** - BND
**msg.assetUri** - The IPFS URL of the asset you created after completing [Part 3 / Step 1](#1-upload-an-image-to-ipfs)

From here you can now click on the other `inject` options to:

1. Get a Maturity Tim
2. Create an Asset
3. View the Asset
4. Mint the Asset
5. View the Balance

![Asset Name](./../../static/img/developer-guides/asset-tokenization/asset-debug.png)

To see how the interactions with your smart contract, choose the `Debug` option under the deploy button.

## Great job!

You have now created and deployed an Asset Tokenization smart contract using SettleMint!

Find other guides in to help you build with SettleMint in our [Guide Library](guide-library.mdx)
