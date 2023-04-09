import { ethers } from 'hardhat'
import { expect } from 'chai'
import { NFTStaking } from '../typechain-types'

describe('NFTStaking', () => {
  let nftStaking: NFTStaking
  let rewardsToken: any
  let nftCollection: any
  let owner: any
  let staker1: any
  let staker2: any

  beforeEach(async () => {
    ;[owner, staker1, staker2] = await ethers.getSigners()

    const RewardsToken = await ethers.getContractFactory('RewardToken')
    rewardsToken = await RewardsToken.deploy('Reward Token', 'RWD')

    const NFTCollection = await ethers.getContractFactory('NFT')
    nftCollection = await NFTCollection.deploy()
    await nftCollection.mint(owner.address, {
      value: ethers.utils.parseEther('0.001'),
    })
    await nftCollection.mint(staker1.address, {
      value: ethers.utils.parseEther('0.001'),
    })
    await nftCollection.mint(staker2.address, {
      value: ethers.utils.parseEther('0.001'),
    })

    const NFTStaking = await ethers.getContractFactory('NFTStaking')
    nftStaking = (await NFTStaking.deploy(
      rewardsToken.address,
      nftCollection.address
    )) as NFTStaking

    await rewardsToken.mint(nftStaking.address, '1000000000')
  })

  describe('stake', () => {
    it('should allow staking an NFT', async () => {
      await nftCollection.connect(staker1).approve(nftStaking.address, 2)
      await nftStaking.connect(staker1).stake(2)

      expect(await nftCollection.ownerOf(2)).to.equal(nftStaking.address)

      const staker = await nftStaking.stakers(staker1.address)
      expect(staker.amountStaked).to.equal(1)
      expect(await nftStaking.stakerAddress(2)).to.equal(staker1.address)
    })

    it("should not allow staking someone else's NFT", async () => {
      await nftCollection.connect(staker1).approve(nftStaking.address, 2)
      await expect(nftStaking.connect(staker2).stake(2)).to.be.revertedWith(
        "You don't own this token"
      )

      expect(await nftCollection.ownerOf(2)).to.equal(staker1.address)
    })
  })
})
