---
title: "Network Settings"
---

Depending on your requirements, you can configure some advanced settings for your Hyperledger Fabric network's default-channel. We provide default settings, but you can change these according to your own preferences.

## Endorsement policy

This setting is used to define the default ImplicitMetaPolicy for the Channel/Application/Endorsement and Channel/Application/LifecycleEndorsement policies.

An ImplicitMetaPolicy is only valid in the context of configuration. It aggregates the result of evaluating policies deeper in the configuration hierarchy, which are ultimately defined by SignaturePolicies.

More information about policies can be found on the official [Hyperledger Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest/policies.html).

### By ALL peers

ALL means that the policies Channel/Application/Endorsement and Channel/Application/LifecycleEndorsement require all of the sub-policies of type Endorsement be satisfied.

### By MAJORITY of peers

MAJORITY means that the policies Channel/Application/Endorsement and Channel/Application/LifecycleEndorsement require a strict majority (greater than half) of the sub-policies of type Endorsement be satisfied.

To further understand the above, consider the following example:

```yaml
Organizations:
  - &org1
    Name: org1

    SkipAsForeign: false

    ID: org1

    MSPDir: /var/hyperledger/fabric-ca-client/org1/msp

    Policies: &org1Policies
      Readers:
        Type: Signature
        Rule: "OR('org1.admin', 'org1.peer', 'org1.client')"
      Writers:
        Type: Signature
        Rule: "OR('org1.admin', 'org1.client')"
      Admins:
        Type: Signature
        Rule: "OR('org1.admin')"
      Endorsement:
        Type: Signature
        Rule: "OR('org1.peer')"

    AnchorPeers:
      - Host: org1.settlemint.com
        Port: 7051
  - &org2
    Name: org2

    SkipAsForeign: false

    ID: org2

    MSPDir: /var/hyperledger/fabric-ca-client/org2/msp

    Policies: &org2Policies
      Readers:
        Type: Signature
        Rule: "OR('org2.admin', 'org2.peer', 'org2.client')"
      Writers:
        Type: Signature
        Rule: "OR('org2.admin', 'org2.client')"
      Admins:
        Type: Signature
        Rule: "OR('org2.admin')"
      Endorsement:
        Type: Signature
        Rule: "OR('org2.peer')"

    AnchorPeers:
      - Host: org2.settlemint.com
        Port: 7051
  - &org3
    Name: org3

    SkipAsForeign: false

    ID: org3

    MSPDir: /var/hyperledger/fabric-ca-client/org3/msp

    Policies: &org3Policies
      Readers:
        Type: Signature
        Rule: "OR('org3.admin', 'org3.peer', 'org3.client')"
      Writers:
        Type: Signature
        Rule: "OR('org3.admin', 'org3.client')"
      Admins:
        Type: Signature
        Rule: "OR('org3.admin')"
      Endorsement:
        Type: Signature
        Rule: "OR('org3.peer')"

    AnchorPeers:
      - Host: org3.settlemint.com
        Port: 7051
  # Orderer organization
  - &org4
    Name: org4

    SkipAsForeign: false

    ID: org4

    MSPDir: /var/hyperledger/fabric-ca-client/org4/msp

    Policies: &org4Policies
      Readers:
        Type: Signature
        Rule: "OR('org4.member')"
      Writers:
        Type: Signature
        Rule: "OR('org4.member')"
      Admins:
        Type: Signature
        Rule: "OR('org4.admin')"
      Endorsement:
        Type: Signature
        Rule: "OR('org4.peer')"

    OrdererEndpoints:
      - org4.settlemint.com:7050

# Other configuration settings

Application: &ApplicationDefaults

  Organizations:

  Policies: &ApplicationDefaultPolicies
    LifecycleEndorsement:
      Type: ImplicitMeta
      Rule: "MAJORITY Endorsement"
    Endorsement:
      Type: ImplicitMeta
      Rule: "MAJORITY Endorsement"
    Readers:
      Type: ImplicitMeta
      Rule: "ANY Readers"
    Writers:
      Type: ImplicitMeta
      Rule: "ANY Writers"
    Admins:
      Type: ImplicitMeta
      Rule: "MAJORITY Admins"

  Capabilities:
    <<: *ApplicationCapabilities

# More configuration settings

Profiles:
  DefaultChannel:
    <<: *ChannelDefaults
    Orderer:
      <<: *OrdererDefaults
      Organizations:
        - org4
      Capabilities:
        <<: *OrdererCapabilities
    Application:
      <<: *ApplicationDefaults
      Organizations:
        - org1
        - org2
        - org3
      Capabilities:
        <<: *ApplicationCapabilities


```

Setting the Endorsement policy to MAJORITY will require by default (in the default-channel) that at least half of the peers in the network have to approve a chaincode definition before it is committed to the channel.

More information about Endorsement policies can be found on the official [Hyperledger Fabric documentation website](https://hyperledger-fabric.readthedocs.io/en/latest/endorsement-policies.html).

## Batch timeout

Controls the number of messages batched into a block. The orderer views messages opaquely, but typically, messages may be considered to be Fabric transactions. The batch is the group of messages in the data field of the block. Blocks will be a few KB larger than the batch size, when signatures, hashes, and other metadata is applied.

## Max messages in batch

The maximum number of messages to permit in a batch. No block will contain more than this number of messages.

## Absolute max bytes in batch

The absolute maximum number of bytes allowed for the serialized messages in a batch. The maximum block size is this value plus the size of the associated metadata (usually a few KB depending upon the size of the signing identities). Any transaction larger than this value will be rejected by ordering.

## Preferred max bytes in batch

The preferred maximum number of bytes allowed for the serialized messages in a batch. Roughly, this field may be considered the best effort maximum size of a batch. A batch will fill with messages until this size is reached (or the max message count, or batch timeout is exceeded). If adding a new message to the batch would cause the batch to exceed the preferred max bytes, then the current batch is closed and written to a block, and a new batch containing the new message is created. If a message larger than the preferred max bytes is received, then its batch will contain only that message. Because messages may be larger than preferred max bytes (up to Absolute max bytes in batch), some batches may exceed the preferred max bytes, but will always contain exactly one transaction.
