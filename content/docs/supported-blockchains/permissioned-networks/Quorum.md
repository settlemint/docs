---
title: "Quorum"
---

Quorum is an open-source enterprise-grade **permissioned blockchain platform**
based on Ethereum, designed for use in enterprise contexts. Originally developed
by **J.P. Morgan**, it extends Ethereum’s capabilities by introducing **privacy
features, improved performance, and flexible consensus mechanisms** to cater to
business needs. Quorum enables enterprises to build and deploy **secure,
private, and high-performance blockchain applications** while maintaining
**Ethereum compatibility**. It is widely used in industries such as **finance,
supply chain, healthcare, and government services**, where regulatory
compliance, transparency, and security are critical.

Quorum supports **private transactions**, allowing organizations to conduct
**confidential smart contract executions** without exposing sensitive data on
the blockchain. It achieves this by integrating **privacy managers** such as
**Tessera**, which securely encrypts transaction details while allowing
authorized participants to access relevant data. Unlike public Ethereum
networks, Quorum eliminates the need for **cryptocurrency mining**, reducing
costs and improving transaction efficiency. The platform's **permissioned
nature** ensures that only authorized participants can join and interact within
the network, providing **better governance and security** in enterprise
environments.

## Consensus mechanism

Quorum supports multiple **consensus mechanisms** tailored for enterprise use
cases, including **Raft-based Crash Fault Tolerance (CFT)** and **Istanbul
Byzantine Fault Tolerance (IBFT)**. The **Raft protocol** follows a
leader-follower model, ensuring efficient transaction ordering with fast
finality. It is a **CFT mechanism**, meaning it can tolerate node failures as
long as a majority (quorum) of nodes remain functional. If a network has three
nodes, it can sustain the loss of one node; if there are five nodes, up to two
can fail while maintaining consensus. This approach ensures **high availability
and fault tolerance**, making it suitable for production deployments.

On the other hand, **IBFT** is a Byzantine Fault Tolerant (BFT) consensus
mechanism that ensures **finality with immediate block confirmation**, making it
more resilient against malicious actors. IBFT requires a supermajority of nodes
(at least two-thirds) to agree on a block before it is added to the ledger. This
mechanism is particularly beneficial in networks where trust between
participants is **partially decentralized** but must still adhere to **strict
security and reliability standards**. By supporting both **CFT and BFT models**,
Quorum allows enterprises to choose the consensus mechanism that best aligns
with their operational requirements.

More information can be found on the official  
[Quorum documentation website](https://consensys.net/docs/quorum/).
