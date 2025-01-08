# Private keys

To send transactions to a blockchain network, you need a private key to sign these transcations, and the private key should contain enough funds to cover the gas price for the transaction.

You can sign transactions with private keys you created outside SettleMint with e.g. MetaMask or other wallet solutions. SettleMint however provides an option to **create and manage private keys within the platform**.

When you deploy a blockchain node it contains a signing proxy that captures the eth_sendTransaction call, uses the appropriate key from the private key section to sign it, and sends it onwards to the blockchain node. You can use this proxy directly via the nodes JSON-RPC endpoints ([https://eth.wiki/json-rpc/API](https://eth.wiki/json-rpc/API)) and via tools like Hardhat ([https://hardhat.org/config/#json-rpc-based-networks](https://hardhat.org/config/#json-rpc-based-networks)) configured to use the “remote” default option for signing. The smart contract set IDE is preconfigured to use this signing proxy.

## Create a private key

Navigate to your **application** , click **Private keys** in the left navigation, and then click **Create a private key**. This opens a form.

Follow these steps to create the private key:

1. Choose a **private key type**. You can choose between two types
   **Accessible ECDSA P256**
   These are Ethereum-style private keys and are generated from a mnemonic and the standard derivation path. You can access the public key and address, and the private key and mnemonic. This is easy to use in external tools, in deployment scripts, and to import in e.g. MetaMask. Since the private key is exposed, it is not a good idea to use these keys to hold significant access rights and funds.
   **HSM ECDSA P256**
   The HSM variant of the private keys allows you to do the same things, but only via the signing proxy. The private key never leaves the HSM and cannot be exposed to you, or even administrators of the platform. These keys are recommended for production projects or mainnet projects where the key manages large amounts of funds or access rights.

2. Choose a **name** for your private key.
3. Select the **nodes** on which you want the key to be active. You can change this later in the **Nodes** tab of your private key.
4. You see the **cost** for this private key displayed at the bottom of the form. Click **Confirm** to add the private key.

The private key is now added to the overview. You can click the private key to see detailed information.

## Fund the private key

For networks that require gas to perform a transaction, your private key should contain enough funds to cover the gas price.

In the **Private key section**, you can fund your private key with the native cryptocurrency of that network.

Follow these steps to fund your key:

1. Click the **private key** in the overview to see detailed information
2. Open the **Balances tab**. You see a list of all the networks you added in your application, together with the option to fund the private key.
3. Click **Fund**. This opens a QR code.
4. Scan the **QR code** with the exchange or wallet of your choice to fund your private key.

## Bring Your Own Key

In addition to creating private keys within the SettleMint platform, you can also bring and manage your own custom keys. This is useful if you've already generated a private key using an external tool like MetaMask or another wallet solution.

To use your custom key material:

1. **Create a New Private Key**:

   - Navigate to your **application**, click **Private keys** in the left navigation, and then click **Create a private key**. This opens a form.

2. **Select Accessible ECDSA P256**:

   - Choose the **Accessible ECDSA P256** option to create a key from a mnemonic.

3. **Use Custom Key Material**:

   - Check the “Use custom key material” box to enable input fields for your own mnemonic and derivation path.

4. **Enter Your Mnemonic and Derivation Path**:

   - Paste your mnemonic phrase into the "Mnemonic" field and enter the derivation path you wish to use.

5. **Select Nodes**:

   - Choose the nodes on which this key will be active. You can modify this later in the **Nodes** tab of your private key.

6. **Confirm**:
   - Review your entries and click **Confirm** to import your private key.
