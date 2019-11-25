const CarbonCredit = artifacts.require("CarbonCredit")

contract('CarbonCredit', function(accounts) {
  var owner
  var token
  
  beforeEach(async () => {
    owner = accounts[0]
    token = await CarbonCredit.new()
  })

  it('should have the expected state on deployment', async () => {
    assert.equal(await token.totalSupply(), 0)
    assert.equal(await token.balanceOf(owner), 0)
    assert.equal(await token.owner(), owner)
  })

})
