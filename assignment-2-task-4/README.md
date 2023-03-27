# Voting System 🗳️

🤖 Smart-contract address: https://testnet.bscscan.com/address/0xea3b9fa1661f58815f6e1cc0b14dfdffb591c9de

### ✅ **What's done**:

- [x] Create a contract for the voting system
- [x] Add a feature to create a new voting session, including a theme and options for voting.
- [x] Add a feature that allows voters to cast their vote for a specific option.
- [x] Add a feature to get the current vote count for each option.
- [x] Add a feature to retrieve a list of all voting sessions.
- [x] Add a function to retrieve the results of a particular voting session.

- [x] **EXTRA**: Add a feature that allows the creator of a voting session to set a minimum quorum for the results to be considered valid.
- [x] **EXTRA**: Add Digital Identity functionality, to prevent sibyl attack _(added logic of DAO, you have to deposit funds before you vote + also can do fundraising)_

## Run app

```shell
npm install

cat > .env
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
