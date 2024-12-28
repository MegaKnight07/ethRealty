require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // To use environment variables

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    holesky: {
      url: "https://holesky.infura.io/v3/65f8c62f564843a6990ae99b2575ce8a", // Replace with a working RPC URL for Holesky
      accounts: [
        process.env.PRIVATE_KEY_BUYER,
        process.env.PRIVATE_KEY_SELLER,
        process.env.PRIVATE_KEY_INSPECTOR,
        process.env.PRIVATE_KEY_LENDER
      ], // Use environment variables to keep your private key secure

      gas: 3000000, // Adjust based on your contract
      gasPrice: 20000000000, //
      chainId: 17000, // Chain ID for Holesky
    },
  },
};
