---
title: "Soneium State Machine"
---

# State Machine

This smart contract set implements a state machine. State machines are usually
used to represent a system where an entity goes through several sequential
states.

Each state has different functions and different roles associated with it. You
can call certain functions only if the state you are in is associated with that
function. The different roles associated with a state are the roles who are
allowed to perform transition to the next state from the given state.

Our templateset provides a powerful, highly customisable way to create a
statemachine for your use case.

## Description

### Representation of a state

Each state in the statemachine is represented using a `State` struct. A `struct`
is a data type in solidity used to represent an object containing different
attributes. The `State` struct is declared in the `StateMachine.sol` file as
follows:

```solidity
struct State {
  // a boolean to check if the state is actually created
  bool hasBeenCreated;
  // a mapping of functions that can be executed when in this state
  mapping(bytes4 => bool) allowedFunctions;
  // a mapping of all roles that have been configured for this state
  mapping(bytes32 => bool) allAllowedRoles;
  // a list of all the roles that have been configured for this state
  bytes32[] allowedRoles;
  // a list of all the preconditions that have been configured for this state
  function(bytes32, bytes32) internal view[] preConditions;
  // a list of callbacks to execute before the state transition completes
  function(bytes32, bytes32) internal[] callbacks;
  // a list of states that can be transitioned to
  bytes32[] nextStates;
  // function that executes logic and then does a StateTransition
  bytes4 preFunction;
}
```

To create a state, you can call the `createState` function which our templateset
provides out of the box. It is defined in the `StateMachine.sol` contract.

### Defining a state

To comprehensively represent your state, you need to define:

1. The next states that you can transition to from the given state (`nextStates`
   field)
2. The functions you can access when you are in the given state
   (`allowedFunctions` field)
3. The roles who can perform the state transition to the next state
   (`allowedRoles` field)

Our templateset allows you to do this very easily through the functions
`addNextStateForState`, `addAllowedFunctionForState` and `addRoleForState`.
These functions are defined in the `StateMachine.sol` file.

One thing to note is that these three functions can be only called by the admin.
The admin is set to the address from which the contract creation transaction is
sent.

### Transitioning from a state

#### 1. Pre-conditions

There are usually some conditions that need to be satisfed before transitioning
to the next state. Our templateset allows you to effortlessly add these
conditions using the `preConditions` field. It is important to note that while
defining pre-condition functions, you need to ensure they throw an exception
when the condition fails. Add a pre-condition for a state using
`addPreConditionForState` function.

#### 2. Callbacks

Before you transition to another state, there may be several actions you need to
perform first. To accomodate for this, our templateset provides support for
`callbacks`. `callbacks` for a given state are functions which are called before
moving to the next state from the given state. Add a callback for a state using
`addCallbackForState` function.

#### 3. State transition

Once pre-conditions are satisfied and the callbacks have been executed, we are
ready to perform our state transition.

Generally in a state transition, there is some business logic to be executed,
followed by the actual change of state. Both these steps are bundled in a
function, let's call such a function a transition function for the state. This
transition function should be called when you want to transition from the given
state.

To build your transition function - all you need to do is define the business
logic you want to execute before the state transition. To perform the actual
state transition, you can simply call the `transitionState` function.

The `transitionState` function we provide does all the heavy lifting of a state
transition for you (for example: checking the preconditions, execution of
callbacks, etc.). It also verifies all the edge conditions associated with state
transitions so you don't need to worry about them.

After you have defined your transition function for a state, you can calculate
its function signature and set the `preFunction` field on the state to the
calculated function signature. You can do this by calling
`setPreFunctionForState` defined in the `StateMachine.sol` contract.

### History of state transitions

To have more transparency, our templateset also records the history of state
transtions.

We use a `StateTransition` struct to store information on a state transition. It
is defined in the `StateMachine.sol` contract as:

```solidity
struct StateTransition {
  bytes32 fromState;
  bytes32 toState;
  address actor;
  uint256 timestamp;
}
```

The history is stored as an array of `StateTransition`s. To view the transition
at a particular index in the `history` array, you can use the `getHistory`
function defined in the `StateMachine.sol` contract.

You can also get the length of the `history` array using `getHistoryLength`
function.

To view the while history, you could get the length of the history array using
`getHistoryLength` and call `getHistory` for each index in the array.

## Usage

### 1. Setting up the state machine states and flow

For your convenience the Generic.sol template contract has all the necessary
boilerplate code set up. So modify the different states and their relationships
at your leisure.

#### Creating states

```solidity
// Create the variable
bytes32 public constant STATE_START = "STATE_START";

// use the createState helper inside the setupStateMachine function
function setupStateMachine(address adminAddress) internal override {
    ...
    createState(STATE_START);
    ...
    // set the correct state as the starting state
    setInitialState(STATE_START);
}
```

#### Defining flow and roles

```solidity
// Add next states to existing states to define flow
// Add Roles to state
function setupStateMachine(address adminAddress) internal override {
    ...
    addNextStateForState(STATE_START, STATE_END);
    addRoleForState(STATE_START, ROLE_ADMIN, adminAddress);
    ...

}
```

### 2. Understanding the deployment process and deploying the contract

Before we dive in you should know that the `Generic.sol` contract extends from
the `StateMachineMetadata.sol` contract. It's an interface on top of the base
`StateMachine.sol` contract that allows linking metadata to a contract. The
setup for this takes place during the deployment of the contract. So let's do
just that.

Now when deploying the contract you may want to bind some IPFS data to it. A
potential use case for this could be lifecycle tracing of a vehicle for example.
So you could define a state machine that describes the various states a vehicle
goes through (manufacturing, maintenance, etc...), but the vehicle itself has
several unchanging attributes that don't need to be stored on-chain (f.e. a
repair manual). IPFS is perfect for that.

Let's look at the constructor of our `Generic.sol` contract to get an idea of
the inputs it will need for deployment:

```solidity
  constructor(
    uint256 entityId,
    string memory ipfsHash,
    string memory baseURI
  ) {
    address adminAddress = msg.sender;
    _roles = [ROLE_ADMIN, ROLE_MANUFACTURER, ROLE_ONE, ROLE_TWO, ROLE_THREE, ROLE_FOUR];
    _setRoleAdmin(ROLE_ADMIN, DEFAULT_ADMIN_ROLE);
    _grantRole(DEFAULT_ADMIN_ROLE, adminAddress);
    setupStateMachine(adminAddress);
    _entityId = entityId;
    _baseURI = baseURI;
    _setEntityURI(_entityId, ipfsHash);
  }
```

Since the binding of the metadata is key-value based, you can see the entityId
being the key and the value being the url/ipfshah or any other identifier to
retrieve your metadata from the web (for example the unique suffix of a
wetransfer link). The baseURI is an optional prefix that will be attached to the
passed identifier (here ipfsHash). This baseURI will be `ipfs://` here,
indicating the character of the metadata.

The reason we want to use an entityId as key to retrieve the bound value is to
provide flexibility to the end user. F.e., if only the deployer knows the key,
then only he can retrieve the value. Or maybe you want to extend the
functionalities of the `StateMachineMetadata.sol` contract, allowing users to
add metadata later on etc...

Your entityId can be any slug you want. But we recommend using a crypto library
to generate a unique 32 bytes long one at least, for obvious reasons.

Now to deploy our contract you define an entityId and the data you want to
upload to IPFS:

```typescript
// This  identifier is used as a key to attach metadata to the smart contract
// See StateMachineMetadata.sol for more info
// This value is hardcoded here to make graph indexing of the metadata possible
export const entityId = 3073193977; // crypto.randomBytes(32).readUInt32LE()

// Let's define the metadata for our entity that we want to upload to IPFS
const metadata = {
  param1: "param1",
  param2: "param2",
};

// using our hardhat task to upload the data to IPFS
const jsonCid: string = await run("ipfs-upload-string", {
  data: JSON.stringify(metadata),
  ipfspath: `/generic-statemachine/metadata/metadata-${entityId}.json`,
  ipfsnode,
});

// Then we deploy
const statemachine = await factory.deploy(
  BigNumber.from(entityId),
  jsonCid,
  "ipfs://"
);
```

### 3. Indexing on-chain data

#### statemachinemetadata Indexing Module

The statemachinemetadata indexing module has 3 main and 1 helper file:

1. `subgraph/datasource/statemachinemetadata.gql.json` - Schema definition file
2. `subgraph/datasource/statemachinemetadata.yaml` - Subgraph manifest template
   file
3. `subgraph/datasource/statemachinemetadata.ts` - Mapping functions file

And a helper file at `subgraph/fetch/statemachinemetadata.ts`

#### 1. statemachinemetadata Schema

We define 2 entities in the schema:

1. `StateMachineMetadataContract`

   This is the entity modelling the `Generic.sol` statemachine contract.

   - The field `currentState` holds the current state the entity represented by
     the statemachine is in.
   - The `stateTransitions` field hold a list of transitions that the entity has
     gone through.
   - The two fields `param1` and `param2` seem confusing, since we don't see
     them as state variables on the `Generic.sol` contract or any of the
     contracts that `Generic.sol` inherits. This is because they are not state
     variables on the contract, but metadata for the entity that we have
     uploaded on IPFS.

You can see them being set in the deploy script at
`deploy > 00_deploy_StateMachine.ts`.

If you wish to change the name of the parameters in the metadata from `param1`,
`param2` to your custom field name in the deploy script, please be sure to
propagate the changes in:

a. schema definition at `subgraph/datasource/statemachinemetadata.gql.json`

b. handler at `subgraph/datasource/statemachinemetadata.ts`

2. `StateTransition`

This is the entity representing the `Transition` event emitted by the
`Generic.sol` statemachine contract. Its fields represent the information
emitted by the event.

#### 2. statemachinemetadata Subgraph Manifest Template

The field of interest to us in the subgraph manifest template at
`subgraph/datasource/statemachinemetadata.yaml` is the `eventHandlers` field.

Here, we list the events we want to listen to, as given here:

```yaml
- event: Transition(address,bytes32,bytes32)
  handler: handleTransitions
```

We listen to the `Transition` event emitted by the `Generic` statemachine
contract. When that event is emitted, we call the `handleTransitions` mapping
function defined in `subgraph/datasource/statemachinemetadata.ts`

#### 3. statemachinemetadata Mapping function

The mapping functions for the `statemachinemetadata` indexing module are defined
in `subgraph/datasource/statemachinemetadata.ts`

It is advisable to run `graph:config`, `graph:compile`, and `graph:codegen`
tasks before playing around with this file to generate types and classes.\*\*

Now that we have our types and classes, let's see how they are used.

The `handleTransitions` handler takes in the `Transition` event. Then, it
performs three main tasks:

- fetches the `StateMachineMetadataContract` entity which emitted the
  `Transition` event

To do this, a custom fetcher was written
(`./subgraph/fetch/statemachinemetadata.ts`).

Inside the fetcher, you will see the hard coded `entityId` from the deploy
script `deploy > 00_deploy_StateMachine` again:

```typescript
const try_entityURI = sm.try_entityURI(BigInt.fromString(`3073193977`));
```

We fetch the metadata from IPFS using this entity ID and populate the fields on
the `StateMachineMetadataContract` entity accordingly:

```typescript
const try_entityURI = sm.try_entityURI(BigInt.fromString(`3073193977`));
const metadataURI = try_entityURI.reverted ? "" : try_entityURI.value;

if (metadataURI.includes("ipfs://")) {
  const ipfsHash = metadataURI.replace("ipfs://", "");
  const metadataURIBytes = ipfs.cat(ipfsHash);
  if (metadataURIBytes) {
    const metadataURIContent = json.try_fromBytes(metadataURIBytes);
    if (
      metadataURIContent.isOk &&
      metadataURIContent.value.kind == JSONValueKind.OBJECT
    ) {
      const entityMetadata = metadataURIContent.value.toObject();

      const param1 = entityMetadata.get("param1");
      const param2 = entityMetadata.get("param2");

      contract.param1 = param1 ? param1.toString() : null;
      contract.param2 = param2 ? param2.toString() : null;

      contract.save();
    }
  }
}
```

It's really important that this entityId matches with the one defined in the
deployment script. Also we want to point out that general indexing logic can be
re-used based on the protocol prefix we defined in the deployment as well
(`ipfs://`).

- Then, we create a new `StateTransition` entity to keep a track of the events
  emitted by the contract
- Finally, we save the changes in the storage

## Note

\*\*Before using this file, it is recommended to run the tasks `graph:config`,
`graph:compile` and `graph:codegen`.

The `graph:codegen` task is where the types/classes are generated based on the
entities defined in the schema (at `subgraphs > x.gql.json`). These
types/classes are imported and used in the mapping functions.

Without running this task, you will run into several `Cannot find module..`
linter errors while trying to use this file.
