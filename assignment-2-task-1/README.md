# Rock-Paper-Scissors 🪨🧻✂️
🤖 Smart-contract address: https://testnet.bscscan.com/address/0xf01a1cd9b95426a3190d28717a789c7103fc9148

✅ __What's done__:
- Develop a "rock-paper-scissors" smart contract
- In this smart contract, it should be possible to play for an amount starting from 0.0001 tBNB
- The player can win or lose at random. If the player wins, he can get a reward of up to x2

__EXTRA__: Smart contract must use blockchain Oracles to determine winner
__EXTRA__: Added multiplayer functionality

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
