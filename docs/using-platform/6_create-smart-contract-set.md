# Add a smart contract set

By using smart contract sets, you can add **business logic** to your application.

Smart contract sets are programs that run on the blockchain and define the rules of your use case. They are self-executing with an 'if this do that' pattern, and run when the predefined conditions are met, e.g. a smart contract that transfers the ownership of a car once a certain amount of money has been transferred to the seller's account.

To speed up the process of writing and deploying smart contracts, we offer a **template library** and an **Integrated Development Environment (IDE)**. The template library includes pre-built smart contract sets for a certain use case, which are easily customizable to match your specific use case.

## How to add a smart contract set

Navigate to the **application** where you want to add the smart contract set. Make sure you have a network with a node in place.

Click **Smart contract sets** in the left navigation, and then click **Add a smart contract set**. This opens a form.

Follow these steps to add the smart contract set:

1. Select to which of your **blockchain nodes** the smart contract set needs to be deployed, and click **Continue**.
2. Choose a **template**. The instance of the IDE will contain a set of pre-built smart contract templates for the use case.
3. Choose a **Smart contract set name**. Choose one that will be easily recognizable in your dashboards.
4. Select the **IDE user**. The IDE that comes with the smart contract set is a single-user application. This user can be you or one of the other members in your organization.
5. Choose a **deployment plan**. Select the type, cloud provider, region and resource pack. [More about deployment plans](../launch-platform/managed-cloud-deployment/13_deployment-plans.md)
6. You see the resource cost for this smart contract set displayed at the bottom of the form. Click **Confirm** to add the smart contract set.

You are now ready to use the IDE and configure the smart contract set to your needs, and deploy it. You will see your deployed smart contracts in the **Details tab**.

For protocol-specific information, we refer to the relevant section in the blockchain guides:

- [Hyperledger Besu smart contracts IDE](../blockchain-guides/1_Hyperledger-Besu/6_enterprise-ethereum-integration-tools.md)
- [Ethereum smart contracts IDE](../blockchain-guides/0_Ethereum/5_ethereum-integration-tools.md)
- [Avalanche smart contracts IDE](../blockchain-guides/2_Avalanche/5_avalanche-integration-tools.md)
- [Binance Smart Chain smart contracts IDE](../blockchain-guides/3_Binance-Smart-Chain/5_binance-smart-chain-integration-tools.md)
- [Polygon smart contracts IDE](../blockchain-guides/4_Polygon/5_polygon-integration-tools.md)
- [Hyperledger Fabric smart contracts IDE](../blockchain-guides/5_Hyperledger-Fabric/6_hyperledger-fabric-integration-tools.md)
