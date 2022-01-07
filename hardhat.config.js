/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')

const nodeUrl = process.env.NODE_URL

module.exports = {
  solidity: "0.8.4",
  networks: {
    live: {
      url: nodeUrl,
      accounts: [
        process.env.OWNER_PRIVATE_KEY
      ]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
