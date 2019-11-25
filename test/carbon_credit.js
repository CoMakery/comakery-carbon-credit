const CarbonCredit = artifacts.require("CarbonCredit")

contract('CarbonCredit', function(accounts) {
  it("should assert true", function(done) {
    var carbon_credit = CarbonCredit.deployed();
    assert.isTrue(true);
    done();
  });
});
