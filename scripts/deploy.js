
const hre = require("hardhat");

async function main() {
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.waitForDeployment();
  console.log("NFTMarket deployed to:", nftMarket.target);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.target);
  await nft.waitForDeployment();
  console.log("NFT deployed to:", nft.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
