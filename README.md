# Yagnostic subgraph
Yagnostic Rinkeby testnet <a href="https://thegraph.com/explorer/subgraph/mike-p-blaize/yagnosticrinkeby">subgraph link</a>.<br>
Yagnostic BSC <a href="https://thegraph.com/explorer/subgraph/mike-p-blaize/yagnostic-bsc">subgraph link</a>.<br>

## Installation
To develop and deploy this subgraph install <a href="https://github.com/graphprotocol/graph-cli">Graph CLI</a> globally on your machine by using Yarn
- `$ yarn global add @graphprotocol/graph-cli`

For development purposes, you will need `Node.js` and a package manager – `yarn`. For the development, the following versions were used:
- `yarn` – 1.22.10
- `@graphprotocol/graph-cli` – ^0.20.0
- `@graphprotocol/graph-ts` – ^0.20.0
- `mustache` – ^4.2.0

Run the command `$ yarn` to install all the dependencies specified in `package.json`.

##Configuration

Subgraph allows to deploy same contracts to different networks.<br>
All possible networks is presented as config at `./config/*.json`.<br>
Each network config has next structure:<br>
>{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"network": "mainnet", &ndash; chain network. All the supported networks listed <a href = "https://thegraph.com/docs/define-a-subgraph#from-an-existing-contract">here</a><br>
&nbsp;&nbsp;&nbsp;&nbsp;"address": "0x123" &ndash;  controller contract address <br>
}


## Running scripts

###Prepare Network
First we need to choose network from our config to deploy to.<br>
Now we have only two supported networks `rinkeby` and `bsc`. To create subgraph manifest file `subgraph.yaml` from template
we use `mustache` package. So there are several scripts to prepare for each network.<br>

Use `$ yarn prepare:rinkeby` for `rinkeby` network.<br>
Use `$ yarn prepare:bsc-mainnet` for `mainnet` network.

That script generates `subgraph.yaml` with chosen network.

### Development
Use `$ yarn codegen` to generate an AssemblyScript class for every smart contract in the ABI files mentioned in subgraph.yaml<br><br>
Use `$ yarn build` to check your mapping code in `./src/mappings/*` before trying to deploy your subgraph to the Graph Explorer.<br>
>**Important**: `$yarn codegen` must be performed again after every change to the GraphQL schema or the ABIs included in the manifest.
> It must also be performed at least once before building or deploying the subgraph.
### Deploy
Use `$ yarn deploy` to upload the subgraph files that you've built with `$yarn build` to IPFS
and tell the Graph Explorer to start indexing your subgraph using these files.

##Subgraph structure

- `./src/mappings`<br>
  - `controller.ts` - consists methods to control each user balances and each vault APY
  - `helpers.ts` - consists of helper functions and constants.
  - `vault.ts` - consists methods to add new vault in subgraph tracking list.
- `./src/abis` - consists of all needed contracts abi<br>
- `./config` - network configs<br>
- `./schema.graphql` - graphql entities<br>
- `./subgraph.template.yaml` - The Subgraph Manifest template<br>
 