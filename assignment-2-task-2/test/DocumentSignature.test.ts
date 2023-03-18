import { expect } from 'chai'
import { randomBytes } from 'crypto'
import { Wallet } from 'ethers'
import { ethers } from 'hardhat'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

import { DocumentSignature__factory, SuperNFT__factory } from '../typechain-types'

describe('Airdrop', () => {
  it('Full Cycle', async () => {
    const [signer, guy] = await ethers.getSigners()

    const token = await new SuperNFT__factory(signer).deploy()

    const randomAddresses = new Array(15)
      .fill(0)
      .map(() => new Wallet(randomBytes(32).toString('hex')).address)

    const merkleTree = new MerkleTree(
      randomAddresses.concat(signer.address),
      keccak256,
      { hashLeaves: true, sortPairs: true }
    )

    const root = merkleTree.getHexRoot()

    const documentSignature = await new DocumentSignature__factory(signer).deploy(
      token.address,
      root
    )

    await token.grantRole(await token.MINTER_ROLE(), documentSignature.address)

    const proof = merkleTree.getHexProof(keccak256(signer.address))

    expect(await documentSignature.claimed(signer.address)).to.eq(false)

    expect(await documentSignature.canSign(signer.address, proof)).to.eq(true)

    await documentSignature.sign(proof)

    expect(await documentSignature.claimed(signer.address)).to.eq(true)

    expect(await documentSignature.canSign(signer.address, proof)).to.eq(false)

    expect(await token.ownerOf(0)).to.eq(signer.address)

    await expect(documentSignature.sign(proof)).to.be.revertedWith(
      'DocumentSignature: Address is not a candidate for sign&claim'
    )

    expect(await documentSignature.claimed(guy.address)).to.eq(false)

    expect(await documentSignature.canSign(guy.address, proof)).to.eq(false)

    await expect(documentSignature.connect(guy).sign(proof)).to.be.revertedWith(
      'DocumentSignature: Address is not a candidate for sign&claim'
    )

    const badProof = merkleTree.getHexProof(keccak256(guy.address))

    expect(badProof).to.eql([])

    expect(await documentSignature.canSign(guy.address, badProof)).to.eq(false)

    await expect(documentSignature.connect(guy).sign(badProof)).to.be.revertedWith(
      'DocumentSignature: Address is not a candidate for sign&claim'
    )
  })
})