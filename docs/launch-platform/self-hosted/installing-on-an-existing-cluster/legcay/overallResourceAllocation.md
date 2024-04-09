# Overall Resource Allocation

## Platform Resource Requirements

- Total Minimum CPU: 3 cores
- Total Recommended CPU: 16.15 cores
- Total Minimum Memory: 8 GiB
- Total Recommended Memory: 30.5 GiB

Please note that these requirements are specifically for the core components of the SettleMint platform and assume the deployment of one instance of each service, including ipfs, integration-studio, middleware, besu, firefly, and ide.

For detailed resource requirements for each image, you can refer to the [Default resource requirements
](https://console.settlemint.com/documentation/docs/reference/resources/), where you will find a breakdown of the requirements for each image.

## Consideration for Multiple Besu Nodes

To ensure network stability and fault tolerance, it is recommended to deploy a minimum of 4 besu nodes for the blockchain component. Adjusting the resource requirements accordingly, here are the adjusted requirements for 4 besu nodes:

- Total Minimum CPU (including 4 besu nodes): 3.4 cores
- Total Recommended CPU (including 4 besu nodes): 17.35 cores
- Total Minimum Memory (including 4 besu nodes): 11.896 GiB
- Total Recommended Memory (including 4 besu nodes): 50.98 GiB

## Overhead Consideration

To account for any additional resource needs and ensure smooth performance, it is recommended to allocate a certain overhead. While the exact overhead percentage may vary based on your specific deployment and usage patterns, a commonly suggested starting point is around **20%**. You can adjust this value over time based on your monitoring and performance analysis.

Please refer to the [Default resource requirements
](https://console.settlemint.com/documentation/docs/reference/resources/) for more detailed information on the resource requirements for each image.

---
