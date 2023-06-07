import { ethers, run } from 'hardhat'

import { FoodBattle__factory } from '../typechain-types' 

async function main() {
  const [signer] = await ethers.getSigners()

  const token = await new FoodBattle__factory(signer).deploy()

  await token.deployed()

  console.log('NFT deployed to:', token.address)

  // await run('verify:verify', {
  //   address: token.address,
  //   contract: 'contracts/NFT.sol:FoodBattle'
  // })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})