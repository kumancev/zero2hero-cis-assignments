import { ethers, run } from "hardhat";
import ContractConfig from "../configs/ContractConfig";
import ContractArguments from "../configs/ContractArguments";

async function main() {
  console.log("Deploying contract...");

  // We get the contract to deploy
  const Contract = await ethers.getContractFactory(ContractConfig.contractName);
  const contract = await Contract.deploy(...ContractArguments);

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  await run('verify:verify', {
    address: contract.address,
    contract: 'contracts/RFC.sol:RFS',
    constructorArguments: [...ContractArguments]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
