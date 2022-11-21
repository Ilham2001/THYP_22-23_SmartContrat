module.exports = {
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1"
    },
    loc_solidityproject_solidityproject: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    loc_local_local: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    loc_myserver_myserver: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1"
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.17"
    }
  }
};
