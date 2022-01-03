require('dotenv').config();

const { ethers } = require('hardhat');

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

async function requestStartingIndex() {
    const [owner] = await ethers.getSigners();
    
    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        owner
    );

    const { hash } = await contract.requestStartingIndex();

    console.log('requestStartingIndex transaction', hash);

    let startingIndex;

    while (!startingIndex) {
        await sleep();
        
        try {
            startingIndex = (await contract.startingIndex()).toNumber();
        } catch (_) {}
    }

    console.log('startingIndex', startingIndex);
}

requestStartingIndex();