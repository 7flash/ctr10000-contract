require('dotenv').config();

async function freezeMetadata() {
    const { ethers } = require('hardhat');
    
    const [owner] = await ethers.getSigners();
    
    const contract = new ethers.Contract(
        process.env.CTR_CONTRACT,
        require('../artifacts/contracts/CTR10000.sol/CTR10000.json').abi,
        owner
    );

    const metadataURI = `ipfs://${process.env.IPFS_METADATA}/`;
    
    console.log({ metadataURI });

    const { hash } = await contract.freezeMetadata(metadataURI);
    
    console.log('freezeMetadata transaction', hash);
}

freezeMetadata();