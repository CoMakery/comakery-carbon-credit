const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CarbonCredit, "CoMakery Carbon Credit Pilot", "CCC0")
};
