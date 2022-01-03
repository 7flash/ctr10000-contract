require('dotenv').config();

const { ethers } = require('hardhat');

async function mintToken() {
    const [minter] = await ethers.getSigners();

    const signature = '0x5589656715b6b984e2066051439400897b709450b31ee9a643cf4905e0453fce1424b0e0207a79952bbcf0da1fc969bc4a8846c3bdafb128405f98264b02c2af1b'

    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        minter
    );

    const { hash } = await contract.mint(signature);

    console.log('mint transaction', hash);
}

mintToken();