const privateKey = "a5f5187197d7e1a4515a8a9f2d6ed9ac0c20620b88a86b8a0f6ae271349f8d6c";
const endpointUrl = "https://kovan.infura.io/v3/b57d025a837f40e6a9a53c279c054b5d";
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    dev: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "4447", // Match any network id
      }
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
       version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
       optimizer: {
         enabled: true,
         runs: 200
       },
    }
  }
};
