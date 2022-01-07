require('dotenv').config();

async function setRoyalty() {
  const { ethers } = require('hardhat');

  const [owner] = await ethers.getSigners();

  const contract = new ethers.Contract(
    process.env.CTR_CONTRACT,
    require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
    owner
  );

  const royaltyValue = 250;

  const { hash } = await contract.setRoyalty(
    royaltyValue
  );

  console.log('setRoyalty transaction', hash);
}

setRoyalty();