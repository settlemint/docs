# Smart contracts IDE

The SettleMint IDE is the only tool you need to edit the smart contract set template you have selected, or **write** your own brand **new** smart contracts. The programming language used for your Hyperledger Fabric smart contracts can be Go or Typescript.

## Using the IDE

On the left, in the **"Explorer"** panel, you can see all the folders and files related to the smart contract set.

The smart contract files are located in the **"src"** folder. You can edit them, or use them as is if the template fits all your needs. You can have as many smart contract folders as you want, think of them as packages.

The **"scripts"** folder contains the executable files that enable packaging, installing, approving, committing, and if needed, initializing the smart contract package. These scripts execute against the blockchain node connected to the smart contract set.

The **"node"** folder contains the node's configuration files, `core.yaml` and `configtx.yaml`. This folder is set as the `FABRIC_CFG_PATH` environment variable in your IDE.

The **"network"** folder contains the network's configuration files, CA certificates for the orderer and peer nodes.

## Yarn scripts

On the left, in the **"Task Manager"** panel, you can run predefined yarn scripts such as:

**"chaincode:package"** to package the smart contract code into a gzipped tar file and store it in the smart contract folder.

**"chaincode:install"** to install the chaincode definition on the peer node.

**"chaincode:approve"** to approve for your organization the chaincode definition previously installed on the peer node.

**"chaincode:check-commit"** to check the approval status of the chaincode definition.

**"chaincode:commit"** to commit the chaincode definition. Run this task when a sufficient number of channel members have approved the chaincode definition. If the chaincode definition has been approved by the majority (or all, it depends on the network's configuration) of the channel members, it will commit the chaincode definition.

**"chaincode:invoke-init"** to initialize the chaincode. Run this task when the chaincode definition has been committed and if it has an init function. Adjust (if needed) the arguments passed to the `init` function in the `./scripts/invoke-init-chaincode.sh` file.

You can view and explore these scripts in the package.json file in the project root. In case the **Task Manager** does not load, you can execute these scripts in the terminal integrated with the IDE by running `yarn name-of-script`.
For example, to run the `chaincode:package` task using the terminal, open a new terminal and run the command `yarn chaincode:package`.

## Generative AI plugin

The integration of an OpenAI GPT plugin into the Smart Contract IDE of the SettleMint platform brings forth significant advantages for the fast development of new smart contracts. Generative AI technology empowers developers by providing them with automated code suggestions, smart contract templates, and code completion capabilities. This accelerates the development process by reducing manual effort and improving code efficiency.

Additionally, the interactive debugging and explanation features offered by the GPT plugin greatly benefit developers of all skill levels. Beginners can leverage the plugin’s explanations to understand complex concepts, improve their coding skills, and gain insights into best practices. Experienced developers can utilize the debugging features to quickly identify and resolve issues, leading to more robust and error-free smart contracts.

Overall, the integration of the OpenAI GPT plugin into the SettleMint platform’s Smart Contract IDE combines the power of generative AI and interactive debugging to enhance productivity, code quality, and learning opportunities for developers in the blockchain space.

You can find this plugin in the sidebar (magic lamp icon), in context menu and the action panel. The first time you use the plugin you will get asked for an OpenAI API key. Depending on your OpenAI API access you can use the default GPT 3.5 model or the GPT 4 model which is slower, but more accurate. Check out the settings in the IDE to configure this and other settings (like using your own Azure GPT service)

Here are some prompts to get you started:

- Write a Solidity ERC20 token representing a bond, based on OpenZeppelin. Include a bond repayment and coupon payments.
- Write a Solidity ERC721 token representing real estate, based on OpenZeppelin and allow fractional ownership of this NFT in the form of ERC20 tokens.
- Write The Graph indexing code that indexes an ERC721 token on the Ethereum Mainnet.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-e4weLqbYjk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
