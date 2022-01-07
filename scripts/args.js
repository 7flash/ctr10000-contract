require('dotenv').config();

const proxyRegistry = process.env.PROXY_REGISTRY
const vrfCoordinator = process.env.VRF_COORDINATOR
const linkToken = process.env.LINK_TOKEN
const ctrSigner = process.env.CTR_SIGNER
const linkFee = process.env.LINK_FEE
const linkKeyHash = process.env.LINK_KEY_HASH

const tokenName = "CTR10000";
const tokenSymbol = "CTR";
const tokenMutableMetadataURI = "https://metadata.ctr10000.com/";

module.exports = [
    tokenName,
    tokenSymbol,
    tokenMutableMetadataURI,
    proxyRegistry,
    vrfCoordinator,
    linkToken,
    ctrSigner,
    linkFee,
    linkKeyHash    
]