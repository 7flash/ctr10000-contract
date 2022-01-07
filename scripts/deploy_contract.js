const { ethers } = require('hardhat');

const args = require('./args');

async function deployContract() {
    const factory = await ethers.getContractFactory('CTR10000');

    console.log('deployment arguments', args);

    const contract = await factory.deploy(...args);

    console.log('contract deployed at', contract.address);
}

deployContract()