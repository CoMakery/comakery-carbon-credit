pragma solidity ^0.5.12;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

// ERC20Detailed("CoMakery Carbon Credits", "CCC", 18)
contract CarbonCredit is ERC20, Ownable, ERC20Detailed {

  event DepositCarbonCreditsFromCertificate(
    address indexed approvedBy,
    uint256 indexed value,
    string ifpsHashOfCarbonCreditCertificate);

  constructor(string memory _name, string memory _symbol)
  ERC20Detailed(_name, _symbol, 18)
  public {
    
  }

  function depositCarbonCreditsFromCertificate(uint256 _value, string memory _ipfsHashOfCarbonCreditCertificate) public {
    _mint(owner(), _value);
    emit DepositCarbonCreditsFromCertificate(owner(), _value, _ipfsHashOfCarbonCreditCertificate);
  }
}
