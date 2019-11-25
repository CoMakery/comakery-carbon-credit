const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonCredit)
};
