require('dotenv').config();

const { ethers } = require('hardhat');

async function setProvenance() {
    const [owner] = await ethers.getSigners();

    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        owner
    );

    const { hash } = await contract.setProvenance(
        process.env.PROVENANCE_CID
    );

    console.log('setProvenance transaction', hash);
}

setProvenance();