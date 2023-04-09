import { ethers, run } from "hardhat";

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy("Reward Token", "RWD");
  const ShapeNFT = await ethers.getContractFactory("NFT");
  const shapeNFT = await ShapeNFT.deploy();

  await rewardToken.deployed();
  await shapeNFT.deployed();

  console.log(`RWD token deployed to ${rewardToken.address}`);
  console.log(`Shape NFT's collection deployed to ${shapeNFT.address}`);

  const reward_token_address = rewardToken.address;
  const nft_collection_address = shapeNFT.address;

  const NFTStaking = await ethers.getContractFactory("NFTStaking");
  const nftStaking = await NFTStaking.deploy(reward_token_address, nft_collection_address);

  console.log(`NFT Staking deployed to ${nftStaking.address}`);

  await run('verify:verify', {
    address: reward_token_address,
    contract: 'contracts/RewardToken.sol:RewardToken',
    constructorArguments: ["Reward Token", "RWD"]
  })

  await run('verify:verify', {
    address: nft_collection_address,
    contract: 'contracts/ShapeNFT.sol:NFT',
    constructorArguments: []
  })

  await run('verify:verify', {
    address: nftStaking.address,
    contract: 'contracts/NFTStaking.sol:NFTStaking',
    constructorArguments: [reward_token_address, nft_collection_address]
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
