---
title: "Node types"
---

Before describing the different node types, we have to talk about Certificate Authorities (CA) and identities.

## Certificate Authorities

Certificate Authorities play a key role in the network because they dispense X.509 certificates that can be used to identify components as belonging to an organization. Certificates issued by CAs can also be used to sign transactions to indicate that an organization endorses the transaction result - a precondition of it being accepted onto the ledger. Let's examine these two aspects of a CA in a little more detail.

Firstly, different components of the blockchain network use certificates to identify themselves to each other as being from a particular organization. CAs are so important that Hyperledger Fabric provides you with a built-in one (called the Fabric-CA) to help you get going.

The mapping of certificates to member organizations is achieved via a structure called a Membership Services Provider (MSP), which defines an organization by creating an MSP which is tied to a root CA certificate to identify that components and identities were created by the root CA.

The mapping of certificates to member organizations is achieved via a structure called a Membership Services Provider (MSP), which defines an organization by creating an MSP which is tied to a root CA certificate to identify that components and identities were created by the root CA. The channel configuration can then assign certain rights and permissions to the organization through a policy.

Secondly, certificates issued by CAs are at the heart of the transaction generation and validation process. Specifically, X.509 certificates are used in client application transaction proposals and smart contract transaction responses to digitally sign transactions. Subsequently the network nodes who host copies of the ledger verify that transaction signatures are valid before accepting transactions onto the ledger.

More information about the Fabric-CA can be found on the official [Hyperledger Fabric-CA documentation website](https://hyperledger-fabric-ca.readthedocs.io/en/latest).

## Identities

The different actors in a blockchain network include peers, orderers, client applications, administrators and more. Each of these actors — active elements inside or outside a network able to consume services — has a digital identity encapsulated in an X.509 digital certificate. These identities really matter because they determine the exact permissions over resources and access to information that actors have in a blockchain network.

A digital identity furthermore has some additional attributes that Fabric uses to determine permissions, and it gives the union of an identity and the associated attributes a special name — principal. Principals are just like userIDs or groupIDs, but a little more flexible because they can include a wide range of properties of an actor's identity, such as the actor's organization, organizational unit, role or even the actor's specific identity. When we talk about principals, they are the properties which determine their permissions.

For an identity to be verifiable, it must come from a trusted authority. A membership service provider (MSP) is that trusted authority in Fabric. More specifically, an MSP is a component that defines the rules that govern the valid identities for this organization. The default MSP implementation in Fabric uses X.509 certificates as identities, adopting a traditional Public Key Infrastructure (PKI) hierarchical model.

More information about identities can be found on the official [Hyperledger Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest/identity/identity.html).

_SettleMint's platform uses the Fabric-CA to create a root CA, this CA acts as a dual-headed CA, meaning that it is used for issuing MSP and TLS certificates. This CA must be used to issue all certificates for the network, orderers, peers, administrators, and client applications._

## Peers

Peers are a fundamental element of the network because they host ledgers and chaincode (which contain smart contracts) and are therefore one of the physical points at which organizations that transact on a channel connect to the channel (the other being an application). A peer can belong to as many channels as an organizations deems appropriate (depending on factors like the processing limitations of the peer pod and data residency rules that exist in a particular country).

More information about peers can be found on the official [Hyperledger Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest/peers/peers.html).

## Orderers

An orderer (also known as an "ordering node") does transaction ordering, which along with other orderer nodes forms an ordering service. Because Fabric's design relies on deterministic consensus algorithms, any block validated by the peer is guaranteed to be final and correct. Orderers also enforce basic access control for channels, restricting who can read and write data to them, and who can configure them.

The ordering service gathers endorsed transactions from applications and orders them into transaction blocks, which are subsequently distributed to every peer node in the channel. At each of these committing peers, transactions are recorded and the local copy of the ledger updated appropriately. An ordering service is unique to a particular channel, with the nodes servicing that channel also known as a "consenter set". Even if a node (or group of nodes) services multiple channels, each channel's ordering service is considered to be a distinct instance of the ordering service.

More information about orderers and the ordering service can be found on the official [Hyperledger Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html).

## Application channels, or simply channels

SettleMint's platform creates by default an application channel called "default-channel" which is used to create an initial ledger for the network.

Users can create additional application channels using the binaries provided by Hyperledger Fabric (install them locally and download the node's certificates) or by creating a Smart contract set which is a configured web IDE with all the necessary files and binaries to interact with your peer node and orderers.

[Learn how to interact with your Hyperledger Fabric nodes](./connect-to-a-node)
