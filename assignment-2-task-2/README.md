# Document Signature ✍️
🤖 Smart-contract address: https://testnet.bscscan.com/address/0x56Ca43552386408a48Fb7bB011a33cB3417385f2

✅ __What's done__:
- Develop a "document signature" smart contract
- Add 2 or more addresses to the "white list" 
- Whitelist addresses can sign 
EXTRA: A unique token (ERC721) is issued when signing a document 
EXTRA: Use Merkle Tree to optimize whitelisting

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
