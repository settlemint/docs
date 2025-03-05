---
title: "Connect to a node"
---

For a software application to interact with a blockchain (e.g. by sending transactions/data to the network, or even just by reading data), it must connect to a node. This section describes how to connect to your Avalanche node.

Once a node has been deployed on an EVM (Ethereum Virtual Machine) compatible network, such as Avalanche, it can be accessed by different endpoints such as JSON-RPC, JSON-WS or GraphQL. You can connect to your already deployed node using these 3 most common endpoints.

## JSON-RPC

JSON-RPC, is a stateless, light-weight remote procedure call (RPC) protocol. Primarily, the specification defines several data structures and the rules around their processing. By default, the version of the JSON-RPC protocol needs to be 2.0, and you need to provide the node ID as well as a method and parameters.

There are different kinds of methods that can be used: ADMIN methods, DEBUG methods, ETH methods etc. The entire list of methods that can be used can be found in the [Avalanche official documentation](https://docs.avax.network/build/avalanchego-apis).

If you want to correctly connect to your node, you need to respect the right structure for the request, which is always the same:

```json
{
"jsonrpc":"2.0"
"Id": nodeId
"method":"methodName"
"params":{
}
}
```

If you want to connect to a node deployed on the SettleMint platform, go to the **Connect** tab on the **Node detail page** in the **Blockchain nodes** section of your application. Select JSON-RPC or any other endpoint and click **Try it out**. You will then be redirected to a new tab where you will be able to test different methods as well as the related Curl command line.

## JSON-WS

To make RPC requests over WebSockets, you can use wscat, which is by definition a Node.js based command-line tool. First you will need to connect to your node's WebSocket server using wscat, as follows: `"wscat -c ws://<JSON-RPC-ws-endpoint:port>"`. All the credentials are provided in the **Connect** tab on the **Node detail page** in the **Blockchain nodes** section of your application. After you have established a connection, the terminal should display a '>' prompt. You will then be able to send individual requests as a JSON data package, as above, for instance:

```json
{
"jsonrpc":"2.0"
"Id": 1
"method":"eth_blockNumber"
"params":{
}
}
```

## GraphQL

GraphQL is a query language and server-side runtime for API's. It is designed to make APIs fast, flexible, and developer-friendly.
We have a GraphQL interface that can be used with many different queries. These queries can be tested out in our GraphQL playground. You can also test out the different graphql queries with cURL, those request would look like this:

```bash
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: <AUTH_TOKEN>" --data
'{ "query": "{syncing{startingBlock currentBlock highestBlock}}"}' http://<DOMAIN>.settlemint.com/graphql
```

If you want to connect to a node deployed on the SettleMint platform, go to the **Connect** tab on the **Node detail page** in the **Blockchain nodes section** of your application. Select Graphql and click **Try it out**. This will bring you to the GraphQL playground where you can use all the different queries.
