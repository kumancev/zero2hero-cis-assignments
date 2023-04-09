import { ethers } from 'hardhat'
import { Signer, Contract } from 'ethers'
import { expect } from 'chai'

describe('RewardToken', function () {
  let owner: Signer
  let nonOwner: Signer
  let token: Contract

  beforeEach(async function () {
    ;[owner, nonOwner] = await ethers.getSigners()

    const RewardToken = await ethers.getContractFactory('RewardToken')
    token = await RewardToken.deploy('Reward Token', 'RWD')
    await token.deployed()
  })

  it('should have correct name and symbol', async function () {
    expect(await token.name()).to.equal('Reward Token')
    expect(await token.symbol()).to.equal('RWD')
  })

  it('should mint tokens', async function () {
    await token.connect(owner).mint(await owner.getAddress(), 100)

    expect(await token.balanceOf(await owner.getAddress())).to.equal(100)
  })

  it('should not allow non-owners to mint tokens', async function () {
    await expect(
      token.connect(nonOwner).mint(await nonOwner.getAddress(), 100)
    ).to.be.revertedWith('Ownable: caller is not the owner')
    expect(await token.balanceOf(await nonOwner.getAddress())).to.equal(0)
  })
})
