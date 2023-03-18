# Token Airdrop 🪂
🤖 Smart-contract address: https://testnet.bscscan.com/address/0x2E0cb96756a2989734ec0d4B54c7091A86E4C8fB

✅ __What's done__:
- Create a standard ERC20 token 
- Create a smart contract for airdrop (sending tokens to multiple addresses) 
- Make an airdrop of your tokens to at least 2 addresses 

EXTRA: Use Merkle Tree to optimize your airdrop (you can make an airdrop via claim) 

## Run app
```shell
npm install

cat .env
# add this to your .env file
PRIVATE_KEY="PASTE_YOUR"
BSCSCAN_API_KEY="PASTE_YOUR"

npx hardhat compile
npx hardhat run scripts/deploy.ts --network <your network>
```

## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
