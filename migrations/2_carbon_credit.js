require('dotenv').config()
const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonCredit, process.env.DEPLOYER_ADDRESS, process.env.NAME, process.env.SYMBOL)
};
