require('dotenv').config();

async function setMetadata() {
    const { ethers } = require('hardhat');

    const [owner] = await ethers.getSigners();

    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        owner
    );

    const metadataURI = `ipfs://${process.env.CONTRACT_METADATA_URI}`;

    console.log({ metadataURI })

    const { hash } = await contract.setContractMetadata(
        metadataURI
    );

    console.log('setMetadata transaction', hash);

    const contractURI = await contract.contractURI();

    console.log('contractURI', contractURI);
}

setMetadata();