/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    live: {
      url: process.env.NODE_URL,
      accounts: [
        process.env.OWNER_PRIVATE_KEY
      ],
      gasPrice: Number(process.env.GAS_PRICE),
      gasMultiplier: 1.1
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
