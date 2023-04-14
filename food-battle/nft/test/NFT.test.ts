import { ethers } from 'hardhat'
import { expect } from 'chai'
import { FoodBattle } from '../typechain-types'

describe('FoodBattle', function () {
  let foodBattle: FoodBattle
  let owner: any
  let addr1: any
  let addr2: any

  beforeEach(async function () {
    ;[owner, addr1, addr2] = await ethers.getSigners()

    const FoodBattleFactory = await ethers.getContractFactory(
      'FoodBattle',
      owner
    )
    foodBattle = await FoodBattleFactory.deploy()
    await foodBattle.deployed()
  })

  describe('Deployment', function () {
    it('Should set the correct owner', async function () {
      expect(await foodBattle.owner()).to.equal(owner.address)
    })

    it('Should set the correct token name and symbol', async function () {
      expect(await foodBattle.name()).to.equal('Food Battle')
      expect(await foodBattle.symbol()).to.equal('FBTL')
    })
  })

  describe('Minting', function () {
    it('Should only allow the owner to mint new tokens', async function () {
      await expect(foodBattle.connect(addr1).mint(1)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })

    it('Should mint new tokens', async function () {
      const numTokens = 5
      const initialSupply = await foodBattle.totalSupply()

      await foodBattle.mint(numTokens)

      const finalSupply = await foodBattle.totalSupply()

      expect(finalSupply).to.equal(initialSupply.add(numTokens))
    })

    it('Should not allow minting more than the maximum supply', async function () {
      const numTokens = 10001

      await expect(foodBattle.mint(numTokens)).to.be.revertedWith(
        'Max supply exceeded'
      )
    })
  })
})
