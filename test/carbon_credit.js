const truffleAssert = require('truffle-assertions')
const CarbonCredit = artifacts.require("CarbonCredit")

contract('CarbonCredit', function (accounts) {
  var owner
  var notOwner
  var token
  var emptyAddress = web3.utils.padLeft(0x0, 40)
  var ipfsCarbonCertificateHash = "QmcFULbtwMYLwe2cUdUvvWNQVcRsqKCVgFbaUGgseJcpsa"

  beforeEach(async () => {
    owner = accounts[0]
    notOwner = accounts[1]
    token = await CarbonCredit.new(owner, "ABC Token", "ABC")
  })

  it('should have the expected state on deployment', async () => {
    assert.equal(await token.owner(), owner)
    assert.equal(await token.totalSupply(), 0)
    assert.equal(await token.balanceOf(owner), 0)
    assert.equal(await token.symbol(), "ABC")
    assert.equal(await token.name(), "ABC Token")
    assert.equal(await token.decimals(), 18)
  })

  it('can depositCarbonCreditsFromCertificate', async () => {
    let tx = await token.depositCarbonCreditsFromCertificate(100, ipfsCarbonCertificateHash, {
      from: owner
    })

    truffleAssert.eventEmitted(tx, 'Transfer', (ev) => {
      assert.equal(ev.from, emptyAddress)
      assert.equal(ev.to, owner)
      assert.equal(ev.value, 100)
      return true
    })

    truffleAssert.eventEmitted(tx, 'DepositCarbonCreditsFromCertificate', (ev) => {
      assert.equal(ev.ifpsHashOfCarbonCreditCertificate, ipfsCarbonCertificateHash)
      assert.equal(ev.value, 100)
      assert.equal(ev.approvedBy, owner)
      return true
    })

    assert.equal(await token.totalSupply(), 100)
    assert.equal(await token.balanceOf(owner), 100)
  })

  it('only owner can deposit carbon credits from certificate', async () => {
    await truffleAssert.reverts(token.depositCarbonCreditsFromCertificate(100,
      ipfsCarbonCertificateHash, {
        from: notOwner
      }), "Ownable: caller is not the owner")
  })

  it('can pass in an owner address that is not the deployer', async () => {
    let randoOwner = accounts[5]
    token = await CarbonCredit.new(randoOwner, "ABC Token", "ABC")
    assert.equal(await token.owner(), randoOwner)
  })

  it('can retire carbon credits in your own address', async () => {
    await token.depositCarbonCreditsFromCertificate(100, 'ipfshashabc')

    let tx = await token.retire(3, {
      from: owner
    })

    truffleAssert.eventEmitted(tx, 'Transfer', (ev) => {
      assert.equal(ev.from, owner)
      assert.equal(ev.to, emptyAddress)
      assert.equal(ev.value, 3)
      return true
    })

    assert.equal(await token.balanceOf(owner), 97)
  })

  it('cannot retire more carbon credits than you have', async () => {
    await token.depositCarbonCreditsFromCertificate(100, 'ipfshashabc')
    await truffleAssert.reverts(token.retire(101, {
      from: owner
    }), 'ERC20: burn amount exceeds balance')

    assert.equal(await token.balanceOf(owner), 100)
  })

  it('can lookup the carbon credit certificates that have been deposited and get their value', async () => {
    await token.depositCarbonCreditsFromCertificate(100, ipfsCarbonCertificateHash)
    assert.equal(await token.carbonCertificates(0), ipfsCarbonCertificateHash)
    assert.equal(await token.carbonCertificateValue(ipfsCarbonCertificateHash), 100)
  })

  it('cannot deposit the same carbon credit more than once', async () => {
    assert.equal(await token.carbonCertificatesLength.call(), 0)
    await token.depositCarbonCreditsFromCertificate(100, ipfsCarbonCertificateHash)
    assert.equal(await token.carbonCertificatesLength.call(), 1)
    assert.equal(await token.carbonCertificates(0), ipfsCarbonCertificateHash)

    await truffleAssert.reverts(token.depositCarbonCreditsFromCertificate(100,
      ipfsCarbonCertificateHash), "Certificate already deposited")

    assert.equal(await token.carbonCertificatesLength.call(), 1)
  })

  it('considers a 0 value carbon credit to not be set', async () => {
    await truffleAssert.reverts(token.depositCarbonCreditsFromCertificate(0,
      ipfsCarbonCertificateHash), "Certificate must have a value greater than 0")
    
    assert.equal(await token.carbonCertificatesLength.call(), 0)
  })
})