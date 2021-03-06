require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const projectId = "9fdcfe08c3404068964dc7b5e115e1c2";
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const keyData = fs.readFileSync("./p-key.txt", {
  encoding: "utf8",
  flag: "r",
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337, // config standard
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/" + projectId,
      accounts: [keyData],
    },
    mainnet: {
      url: "https://polygon-mainnet.infura.io/v3/" + projectId,
      accounts: [keyData],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
