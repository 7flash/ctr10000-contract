require('dotenv').config();

const { ethers } = require('hardhat');

async function mintToken() {
    const [minter] = await ethers.getSigners();

    const signature = '0x7b29581e99b5637dc62d4153169a55972f9f707bd0eb761d475a1fe827bf2aad7d16ebde433e71ee6acf1e23c40f96396be13e875048d84393427ecedf229ffe1b'

    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        minter
    );

    const { hash } = await contract.mint(signature);

    console.log('mint transaction', hash);
}

mintToken();