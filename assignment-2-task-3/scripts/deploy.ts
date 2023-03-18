import { ethers, run } from 'hardhat'
import { parseEther } from 'ethers/lib/utils'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'

import {
  MerkleAirdrop__factory,
  MerkleAirdropToken__factory
} from '../typechain-types'

async function main() {
  const [signer] = await ethers.getSigners()

  const token = await new MerkleAirdropToken__factory(signer).deploy()

  await token.deployed()

  console.log('Token deployed to:', token.address)

  const randomAddresses = [
    '0xF49e9Ecf7fA6c273D3667fBb703965bA2E07aed2', 
    '0x0113a9c63980e8F6240f4F5Cac06aCc8969aDA5a', 
    '0x9Aa88b9DC55E51C84F34Ec2571874d2bca89d516', 
    '0xc9BCA7D25db249945e94baD36FC37E27E2c21606',
    '0xdD870fA1b7C4700F2BD7f44238821C26f7392148' // The address in remix
  ]

  const merkleTree = new MerkleTree(
    randomAddresses.concat(signer.address),
    keccak256,
    { hashLeaves: true, sortPairs: true }
  )

  const root = merkleTree.getHexRoot()

  console.log('Root: ', root)
  
  const airdrop = await new MerkleAirdrop__factory(signer).deploy(
    token.address,
    root
  )
  
  await airdrop.deployed()

  console.log('Airdrop deployed to:', airdrop.address)

  await token.transfer(airdrop.address, parseEther('10'))

  const proof = merkleTree.getHexProof(keccak256(signer.address))

  console.log('Proof for Сlaim:', proof)

  await run('verify:verify', {
    address: token.address,
    contract: 'contracts/MerkleAirdropToken.sol:MerkleAirdropToken'
  })

  await run('verify:verify', {
    address: airdrop.address,
    contract: 'contracts/MerkleAirdrop.sol:MerkleAirdrop',
    constructorArguments: [token.address, root]
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})