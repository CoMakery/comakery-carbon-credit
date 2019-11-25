const CarbonCredit = artifacts.require("CarbonCredit")

contract('CarbonCredit', function(accounts) {
  var owner
  var token
  
  beforeEach(async () => {
    owner = accounts[0]
    token = await CarbonCredit.new("ABC Token", "ABC")
  })

  it('should have the expected state on deployment', async () => {
    assert.equal(await token.owner(), owner)
    assert.equal(await token.totalSupply(), 0)
    assert.equal(await token.balanceOf(owner), 0)
    assert.equal(await token.symbol(), "ABC")
    assert.equal(await token.name(), "ABC Token")
    assert.equal(await token.decimals(), 18)
  })

})
