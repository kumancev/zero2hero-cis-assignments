import { randomBytes } from 'crypto'
import { Wallet } from 'ethers'
import { ethers, run } from 'hardhat'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'

import { DocumentSignature__factory, SuperNFT__factory } from '../typechain-types'

async function main() {
  const [signer] = await ethers.getSigners()

  const token = await new SuperNFT__factory(signer).deploy()

  await token.deployed()

  console.log('NFT deployed to:', token.address)

  const randomAddresses = new Array(15)
    .fill(0)
    .map(() => new Wallet(randomBytes(32).toString('hex')).address)

  const merkleTree = new MerkleTree(
    randomAddresses.concat(signer.address),
    keccak256,
    { hashLeaves: true, sortPairs: true }
  )

  const root = merkleTree.getHexRoot()

  console.log('Root: ', root)
  
  const documentSignature = await new DocumentSignature__factory(signer).deploy(token.address, root)

  await documentSignature.deployed()

  console.log('DocumentSignature deployed to:', documentSignature.address)

  await (
    await token.grantRole(await token.MINTER_ROLE(), documentSignature.address)
  ).wait()

  const proof = merkleTree.getHexProof(keccak256(signer.address))

  console.log('Proof for Сlaim:', proof)

  await run('verify:verify', {
    address: token.address,
    contract: 'contracts/SuperNFT.sol:SuperNFT'
  })

  await run('verify:verify', {
    address: documentSignature.address,
    contract: 'contracts/DocumentSignature.sol:DocumentSignature',
    constructorArguments: [token.address, root]
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})