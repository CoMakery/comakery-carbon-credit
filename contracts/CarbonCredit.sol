pragma solidity ^0.5.12;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

// ERC20Detailed("CoMakery Carbon Credits", "CCC", 18)
contract CarbonCredit is ERC20, Ownable {
  constructor() public {
    
  }
}
