import { ethers, run } from 'hardhat'

import { VotingDAO__factory } from '../typechain-types' 

async function main() {
  const [signer] = await ethers.getSigners()

  const votingDAO = await new VotingDAO__factory(signer).deploy()

  await votingDAO.deployed()

  console.log('VotingDAO deployed to:', votingDAO.address)

  await run('verify:verify', {
    address: votingDAO.address,
    contract: 'contracts/VotingDAO.sol:VotingDAO'
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
