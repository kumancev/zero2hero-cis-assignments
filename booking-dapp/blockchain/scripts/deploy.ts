import { ethers, run } from 'hardhat'

async function main() {
  const taxPercent = 7
  const securityFee = ethers.utils.parseEther('0.005')

  const Booking = await ethers.getContractFactory('Booking')
  const booking = await Booking.deploy(taxPercent, securityFee)

  await booking.deployed()

  console.log('Deployed contract address', booking.address)

  await run('verify:verify', {
    address: booking.address,
    contract: 'contracts/Booking.sol:Booking',
    constructorArguments: [taxPercent, securityFee],
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
