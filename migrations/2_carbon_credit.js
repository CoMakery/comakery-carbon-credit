require('dotenv').config()
const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonCredit, process.env.MAINNET_DEPLOYER_ADDRESS, "CoMakery Carbon Credit Pilot", "CCC0")
};
