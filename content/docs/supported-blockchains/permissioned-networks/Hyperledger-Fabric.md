---
title: "Hyperledger Fabric"
---

Hyperledger Fabric is an open source enterprise-grade permissioned distributed
ledger technology (DLT) platform, designed for use in enterprise contexts, that
delivers some key differentiating capabilities over other popular distributed
ledger or blockchain platforms.

Fabric has a highly modular and configurable architecture, enabling innovation,
versatility and optimization for a broad range of industry use cases including
banking, finance, insurance, healthcare, human resources, supply chain and even
digital music delivery.

Fabric is the first distributed ledger platform to support smart contracts
authored in general-purpose programming languages such as Java, Go and Node.js,
rather than constrained domain-specific languages (DSL). This means that most
enterprises already have the skill set needed to develop smart contracts, and no
additional training to learn a new language or DSL is needed.

The Fabric platform is also permissioned, meaning that, unlike with a public
permissionless network, the participants are known to each other, rather than
anonymous and therefore fully untrusted. This means that while the participants
may not fully trust one another (they may, for example, be competitors in the
same industry), a network can be operated under a governance model that is built
off of what trust does exist between participants, such as a legal agreement or
framework for handling disputes.

Fabric can leverage consensus protocols that do not require a native
cryptocurrency to incent costly mining or to fuel smart contract execution.
Avoidance of a cryptocurrency reduces some significant risk/attack vectors, and
absence of cryptographic mining operations means that the platform can be
deployed with roughly the same operational cost as any other distributed system.

The combination of these differentiating design features makes Fabric one of the
better performing platforms available today both in terms of transaction
processing and transaction confirmation latency, and it enables privacy and
confidentiality of transactions and the smart contracts (what Fabric calls
"chaincode") that implement them.

## Consensus mechanism

Fabric currently offers a CFT (crash fault-tolerant) ordering service
implementation based on the [etcd](https://coreos.com/etcd/) library of the Raft
protocol.

The Raft protocol is the go-to ordering service choice for production networks,
the Fabric implementation of the established Raft protocol uses a "leader and
follower" model, in which a leader is dynamically elected among the ordering
nodes in a channel (this collection of nodes is known as the "consenter set"),
and that leader replicates messages to the follower nodes. Because the system
can sustain the loss of nodes, including leader nodes, as long as there is a
majority of ordering nodes (what's known as a "quorum") remaining, Raft is said
to be "crash fault tolerant" (CFT). In other words, if there are three nodes in
a channel, it can withstand the loss of one node (leaving two remaining). If you
have five nodes in a channel, you can lose two nodes (leaving three remaining
nodes). This feature of a Raft ordering service is a factor in the establishment
of a high availability strategy for your ordering service. Additionally, in a
production environment, you would want to spread these nodes across data centers
and even locations. For example, by putting one node in three different data
centers. That way, if a data center or entire location becomes unavailable, the
nodes in the other data centers continue to operate.

More information can be found on the official
[Hyperledge Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest).
