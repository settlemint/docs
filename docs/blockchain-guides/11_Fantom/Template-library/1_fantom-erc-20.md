# ERC-20 token

ERC-20 tokens are blockchain-based assets, issued on all EVM compatible blockchain networks such as Fantom, that have value and can be sent and received. These tokens are fungible, meaning they can be exchanged with another token of the same type because they have identical properties and there is an equal value. For example, the ERC-20 token of Alice is exactly the same as the ERC-20 token of Bob. They can exchange their token without consequences.

Examples of fungible assets are currencies, stocks of a company, bonds, gold and other precious metals.

The ERC-20 smart contract is the perfect standard to organize a crowdsale and let companies raise funds to launch their project.

## ERC-20 smart contract features

An ERC-20 smart contract is used to create fungible tokens and bring them to the blockchain. This process is called minting. It also keeps track of the total supply as well as the balances of users as they exchange their tokens.

The ERC-20 smart contract on the SettleMint platform has the following features:

- Custom name, symbol and initial supply that can be chosen by the user.
- Minting capabilities that let the admin of the smart contract mint (i.e create) new tokens.
- Pausable capabilities that let the admin pause the contract in case of emergency.
- Burnable capabilities that let users burn (i.e destroy) their token.

By default, the account that deploys the ERC-20 smart contract gets 1,000,000 tokens. You can change this behaviour by modifying the **“constructor”** in **“GenericToken.sol”**. If you do not mint tokens in the constructor, make sure to mint some after the deployment.

```solidity
contract GenericToken is ERC20, ERC20Burnable, Pausable, AccessControl {
 constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
   _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
   _mint(msg.sender, 1000000 * 10**decimals());
 }
```

## Deploying an ERC-20 smart contract

To set the name and symbol for your token, go to the **“deploy”** folder and in **“00_Deploy_GenericToken.ts”**, change the values in **“args”** in the **“deploy”** function.

```typescript
await deploy('GenericToken', {
  from: deployer,
  args: ['GenericToken', 'GT'],
  log: true
});
```

As soon as you are happy with the changes you made, just click on **“deploy”** in the **“task runner”** of the IDE and after a few seconds, your ERC-20 smart contract should be deployed on the network of your choice.

The **“GenericToken.ts”** script in the **“test”** folder showcases all the functionalities of the ERC-20 standard. It shows you how to use the smart contract in your dapp.

## ERC-20 with meta transactions

The SettleMint platform also provides an ERC-20 template set with meta transaction capabilities. Meta transactions are used to fill the need for EVM-based contracts to accept transactions from externally owned accounts that do not have Matic to pay for gas. In short, implementing such an interface omits the need for the end user to pay for gas. With meta transactions, gas is paid by a `gas relayer` and a smart contract, known as a `trusted forwarder`, forwards the transactions to the recipient contract, i.e the one that the end user wants to interact with in the first place.

### Setting up meta transactions

When looking at the GenericTokenMeta.sol smart contract in the IDE we can see the main differences with the basic ERC20 being the following:

```solidity
...
constructor(
  ...
  address trustedForwarder
) ERC20(name_, symbol_) ERC2771Context(trustedForwarder_)
...

function _msgSender() internal view override(Context, ERC2771Context) returns (address sender) {
  sender = ERC2771Context._msgSender();
}

function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
  return ERC2771Context._msgData();
}

```

Let’s unpack this:

1. We pass in the constructor an Ethereum address, the `trustedForwarder`, to the `ERC2771Context` constructor. This enables the smart contract to accept transactions coming from the `Trusted Forwarder`.
2. `_msgSender()` function is kind of an alias for `msg.sender`. When called it returns `msg.sender` for regular transactions, but for meta transactions it returns the end user (rather than the `relayer` or the `trusted forwarder`).
3. `_msgData()` function is again an alias of some sort for msg.data. For meta transactions it will return the raw transaction data from the perspective of the end user rather than the `relayer`.

### Sending a meta transaction to the ERC-20 contract

Sending a meta transaction is slightly different than sending a regular transaction, but the template set comes with an example in which 10 tokens are transferred between two wallets without Matic.

First, to send meta transactions using the `forwarder`, we have to define three objects called `EIP712Domain`, `domain` and `types` as follows:

```typescript
const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

const domain = {
  name: 'MinimalForwarder',
  version: '0.0.1',
  chainId: parseInt(await getChainId()),
  verifyingContract: forwarderAddress
};
const types = {
  EIP712Domain,
  ForwardRequest: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'gas', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'data', type: 'bytes' }
  ]
};
```

:::warning Note

The name and version of domain have to match those of the forwarder (see the contract `Forwarder.sol`).

:::

Then, we need to generate the function data as follows:

```typescript
const functionData = token.interface.encodeFunctionData('transfer', [
  walletTwoAddress,
  ethers.utils.parseUnits('10')
]);
```

In that expression, `transfer` is the ERC-20 function we want to execute, `walletTwoAddress` is the account that will receive the tokens and the last parameter is the amount of tokens to be transferred.

The last step before sending the meta transaction is to create and sign the message containing the underlying transaction as follows:

```typescript
const walletOneNonce = Number(
  await read('Forwarder', 'getNonce', walletOneAddress)
);
const req = {
  from: walletOneAddress,
  to: token.address,
  value: '0',
  gas: '100000',
  nonce: walletOneNonce,
  data: functionData
};

const signedData = ethSigUtil.signTypedData({
  privateKey: walletOne.getPrivateKey(),
  data: {
    types: types,
    domain: domain,
    primaryType: 'ForwardRequest',
    message: req
  },
  version: ethSigUtil.SignTypedDataVersion.V4
});
```

Finally, once the transaction is signed, we can send it to the `forwarder`:

```typescript
await forwarder.execute(req, signedData, { gasLimit: '100000' });
```

## ERC-20 Crowdsale

Crowdsales allow the participants of a network to purchase tokens, usually in exchange for ether. A crowdsale can take many different forms, and our powerful templateset allows you the flexibility to shape and deploy the crowdsale according to your needs.

### Stage 1: Creating a supply of the tokens being sold

This is done in the templateset by deploying an ERC-20 contract.

### Stage 2: Configuring and deploying the crowdsale

When deploying a crowdsale, there are different specifications to be considered:

- Crowdsale rates - price of the token being sold
- Validation - Who can actually purchase the tokens?
- Distribution - When does the distribution of the tokens actually take place?
- Token emission - Who actually transfers the tokens to the beneficiaries?
- Phases of the crowdsale - Are all the tokens going to be distributed in one go or are they going to be distributed in different phases?

The ERC-20 crowdsale templateset we provide is designed to give you full flexibility to modify these different parameters according to your requirements.

#### Price of the token being sold

In our Crowdsale templateset, you can fix the price of the token in the `_usdRate` field on the `CrowdSale` contract.

Its value is the number of tokens for one USD.

#### Validation

Validation refers to ensuring that the buyers meet certain conditions before they can purchase tokens.

Our templateset provides KYC / AML whitelisting capabilities out of the box. The buyers must be whitelisted before they can purchase tokens.

This is implemented using openzepellin’s `AccessControl`. The address with the `DEFAULT_ADMIN_ROLE` grants `WHITELISTED_ROLE` to buyers before they can purchase tokens.

#### Purchase of tokens

The buyers can be allocated the tokens in two ways.

The first method is where the whitelisted buyers can send Matic to the contract directly. The equivalent amount of tokens will be calculated automatically. The calculation is done by first converting the Matic to USD leveraging Chainlink Oracle. Then, the USD is converted to the equivalent amount of tokens using the `_usdRate` set in the crowdsale.

Alternatively, the admin of the crowdsale can directly allocate tokens to certain buyers by calling the `externalBuyTokens` function. This function can only be called by addresses which have been granted `DEFAULT_ADMIN_ROLE`. Here the tokens get transferred from the sender of the transaction to the beneficiary address listed as a parameter. The reason for providing such a function is to support allocation of tokens to buyers:

- Who do not know how to send Matic to a contract
- Support payments in other forms other than Matic. For example, fiat payments can be supported. The buyer would send fiat to the crowdsale admin. The crowdsale admin would then call this function to allocate the equivalent amount of tokens to the buyer.

#### Distribution

Our templateset gives you flexibility over when you want to actually credit the tokens to the beneficiary.

This can be done immediately after the tokens have been purchased or a certain amount of time after the purchase, called vesting period.

To transfer the tokens immediately, set the `_vestingEndDate` field on the `CrowdSale` contract to `0` while deploying the contract.

When the vesting end date is not set, the tokens purchased get transferred immediately to the beneficiary’s address.

Transfering the tokens a certain amount of time after the purchase is achieved using two pieces:
Setting the `_vestingEndDate` on the contract to the timestamp at the end of the vesting period
Deploying a `VestingVault` contract and initializing `_vestingVault` field on the `CrowdSale` contract to it’s address

The beneficiary in this case is the `VestingVault` contract. All the tokens purchased by buyers get stored in the `VestingVault` contract.

A point to note here is that to store tokens in the `VestingVault` contract, the sender of the transaction must have a `VAULT_CONTROLLER_ROLE` of the `VestingVault` enabled. This can be seen in the deploy steps, explained below.

The buyers withdraw the tokens they bought after the vesting period has ended by calling the `release` method on the `VestingVault` of the crowdsale contract.

#### Token emission

Token emission refers to the actual transaction of transfer of tokens to the beneficiary.
In our templateset, the tokens are transferred from the crowdsale contract itself to the beneficiary.

The actual transfer from the contract to the beneficiary happens in the `deliverTokens` function on the `CrowdSale` contract.
This is the standard method for token emission.

There are 2 other patterns of token emission - you can read more about them here: [https://docs.openzeppelin.com/contracts/2.x/crowdsales#token-emission](https://docs.openzeppelin.com/contracts/2.x/crowdsales#token-emission)

#### Phases of the crowdsale

Crowdsales are divided into two broad categories. Crowdsales where the tokens are distributed all in one sale. Or, crowdsales with different phases, where in each phase of the crowdsale, the token being sold usually has a different price. There is also a limit to the number of tokens that can be sold in a particular phase.

To run a crowdsale where there is only one phase, you need to deploy only one `CrowdSale` contract.

To orchestrate a crowdsale with multiple phases, you need to deploy multiple `CrowdSale` contracts. Here, you deploy a `CrowdSale` contract for each phase.

Deploy steps:

Now that we know the different specifications needed for a crowdsale, we will walk you through how we have configured them and deployed the templateset example.

We are deploying an `ExampleCrowdSale` which is going to sell `ExampleToken`s at the rate of 250 tokens for 1 USD. The tokens are not going to be transferred to the beneficiary directly, they are going to be vested for 30 months in the `ExampleVestingVault`.

Here we are going to deploy:

1. An ERC20 token, the token to be sold
   In step `00_deploy_token` we deploy the `ExampleToken` which is the actual token to be sold.

2. A `VestingVault` contract to store the tokens for the vesting period
   In step `02_deploy_vestingvault` we deploy the `ExampleVestingVault` to store the tokens for the vesting period.

3. An `CrowdSale` contract which is the actual crowdsale
   In step `03_deploy_crowdsale` we deploy the `ExampleCrowdSale` contract which is the actual crowdsale. We pass the address of the token to be sold, the address of the vesting vault, along with other parameters like the USD rate.

4. Enable the `ExampleCrowdSale` to store tokens in the `ExampleVestingVault`
   In step `04_enable_crowdsale` we grant the `ExampleCrowdSale` crowdsale a `VAULT_CONTROLLER_ROLE` which allows the crowdsale to store tokens in the vesting vault.

5. Transfer tokens to the `ExampleCrowdSale` to start the crowdsale process
   We transfer 100 million Example Tokens to the crowdsale to be sold.

## Integration with the Middleware

Working with complex or large data in your dApp can be a challenge. In the SettleMint platform we provide you with a [middleware solution](../../../using-platform/7_middleware.md) that allows you to index and query this data easily and efficiently.
