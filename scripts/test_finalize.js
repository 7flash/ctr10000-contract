require('dotenv').config();

async function testFinalize() {
    const { ethers } = require('hardhat');

    const [owner] = await ethers.getSigners();

    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        owner
    );

    const { hash } = await contract.testFinalize();

    console.log('finalize transaction', hash);
}

testFinalize();