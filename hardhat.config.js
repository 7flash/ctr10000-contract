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
        '00bf86fffc5983d68bf25f6db8fc25151c8b315819c58d0da66c313d721747f2'
      ]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
