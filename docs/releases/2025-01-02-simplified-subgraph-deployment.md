# Simplified Subgraph Deployments

**Jan 02 2025**

We've significantly simplified the subgraph deployment process. Here's what's changed:

**Previous Process:**

- Required deploying a smart contract set
- Required IPFS deployment
- Middleware needed explicit connections to both smart contract set and IPFS
- Subgraphs could only be deployed to middlewares from their connected smart contract set

**New Process:**

- Deploy middlewares independently without a smart contract set or IPFS required
- Deploy subgraphs from any smart contract set to any middleware within an application

**Key Benefits:**

- Simplified Architecture: Reduced deployment complexity and dependencies
- Cost Efficiency: Reuse graph middlewares across different smart contract sets
- Enhanced Flexibility: Freedom to deploy subgraphs from any smart contract set to any middleware
