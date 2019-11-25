const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonCredit, accounts[0], "CoMakery Carbon Credit Pilot", "CCC0")
};
