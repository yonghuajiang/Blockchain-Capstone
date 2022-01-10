pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./ERC721Mintable.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is  ERC721Mintable{
  using SafeMath for uint256;
  Verifier public sqrVerifier;

// TODO define a solutions struct that can hold an index & an address
  struct solution {
    uint256 tokenId;
    address tokenAddress;
}
// TODO define an array of the above struct
  solution[] private solutions;

  constructor (address verify_address) public{
    sqrVerifier = Verifier(verify_address);

  }

// TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => solution) private solution_map;


// TODO Create an event to emit when a solution is added
  event solution_add(bytes32 solutionkey, uint256 tokenId, address tokenAddress);


// TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint256 tokenId, address tokenAddress) onlyOwner public{
    bytes32 solutionkey = keccak256(abi.encodePacked(tokenId, tokenAddress));
    solution memory addedSolution = solution({tokenId:tokenId, tokenAddress:tokenAddress});
    solutions.push(addedSolution);
    solution_map[solutionkey] = addedSolution;
    emit solution_add(solutionkey, tokenId, tokenAddress);
  }

  function totalSolution() public view returns(uint256){
    return solutions.length;
  }

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly

  function mint(uint256 tokenId,
                address tokenAddress,
                uint[2] memory a,
                uint[2][2] memory b,
                uint[2] memory c,
                uint[2] memory input) onlyOwner public{

  require(sqrVerifier.verifyTx(a,b,c,input),"The trasaction was not verified!");
  bytes32 solutionkey = keccak256(abi.encodePacked(tokenId, tokenAddress));
  require(solution_map[solutionkey].tokenAddress != address(0),strConcat("The solution has not been added:", uint2str(tokenId)));
  super.mint(tokenAddress, tokenId);
}

}
