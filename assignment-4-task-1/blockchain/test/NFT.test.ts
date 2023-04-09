import { expect } from 'chai'
import { ethers } from 'hardhat'
import { NFT } from '../typechain-types'

describe('NFT', function () {
  let nft: NFT
  let owner: any
  let addr1: any
  let addr2: any

  beforeEach(async function () {
    ;[owner, addr1, addr2] = await ethers.getSigners()
    const NFTContract = await ethers.getContractFactory('NFT')
    nft = await NFTContract.deploy()
    await nft.deployed()
  })

  describe('minting', function () {
    it('should allow minting when below max supply', async function () {
      const tokenId = 1
      await nft.mint(addr1.address, { value: ethers.utils.parseEther('0.001') })
      expect(await nft.ownerOf(tokenId)).to.equal(addr1.address)
      expect(await nft.tokenURI(tokenId)).to.not.be.empty
      expect(await nft.totalSupply()).to.equal(1)
      expect(await nft.minted(tokenId)).to.be.true
    })

    it('should not allow minting when max supply is reached', async function () {
      for (let i = 0; i < 20; i++) {
        await nft.mint(addr1.address, {
          value: ethers.utils.parseEther('0.001'),
        })
      }
      await expect(
        nft.mint(addr1.address, { value: ethers.utils.parseEther('0.001') })
      ).to.be.revertedWith('Max supply reached')
    })

    it('should not allow minting without payment', async function () {
      await expect(nft.mint(addr1.address)).to.be.revertedWith(
        'Invalid payment amount'
      )
    })
  })

  describe('baseURI', function () {
    it('should return the correct baseURI', async function () {
      const newBaseURI =
        'ipfs://QmQgvFUpwgz97pPRAf3BrytH5Z1XwyWbagJCVWKpesM42L/'
      await nft.changeBaseURI(newBaseURI)
      expect(await nft.baseURI()).to.equal(newBaseURI)
    })
  })
})
