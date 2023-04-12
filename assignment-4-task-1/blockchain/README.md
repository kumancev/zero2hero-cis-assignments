### ✅ __What's done__:
- [x] Create NFT collection (ERC721) 5-1000 items
- [x] Upload metadata to IPFS or on-chain 
- [x] Write tests in hardhat (at least 3 tests) 
- [x] Build smart contracts over hardhat
- [x] Mint the NFT
- [x] Write about the potential utility of your NFT collection (20-400 words)
- [x] Upload the project to github, write a Readme (40-600 words)

- [x] __EXTRA__: Cover all functions completely with tests. 
- [x] __EXTRA__: Create your own NFT collection (not a copy and not fully generated AI)
- [x] __EXTRA__: Get coverage and gas report from Hardhat
- [x] __EXTRA__: Create a landing page for your NFT collection

# Run project

This project demonstrates a NFT Mint and Staking use case. It comes with a contracts, a tests for that contract, coverage & gas report data and a script that deploys that contracts.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test --network hardhat
REPORT_GAS=true npx hardhat test --network hardhat
npx hardhat node 
npx hardhat run scripts/deploy.ts --network hardhat
```


## Smart-contract Review
This smart contract is called __"NFTStaking"__ and it allows users to stake their __NFTs__ (ERC721 tokens) in exchange for rewards in another __ERC20__ token. The rewards are calculated based on the amount of time the NFT is staked and the number of NFTs staked.

The contract includes functions for _staking_ NFTs, _withdrawing_ NFTs, _claiming_ rewards, _calculating_ rewards, and _retrieving_ staked tokens. It also includes a mapping of stakers to their staked tokens, as well as a mapping of token IDs to their staker addresses.

The contract inherits from the __OpenZeppelin__ library's _ReentrancyGuard_, and it imports other libraries like SafeERC20 and IERC20 for additional security and functionality. 
