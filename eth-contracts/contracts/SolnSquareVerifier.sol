pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is  ERC721Mintable{
  using SafeMath for uint256;
  using Pairing for *;

  struct Proof {
      Pairing.G1Point a;
      Pairing.G2Point b;
      Pairing.G1Point c;
  }

  Verifier private sqrVerifier;

  uint256 private max_index = 0;
// TODO define a solutions struct that can hold an index & an address
  struct solution {
    uint256 sol_index;
    address sol_address;
}
// TODO define an array of the above struct
  solution[] solutions;

  constructor () internal{
    sqrVerifier = new Verifier();

  }

// TODO define a mapping to store unique solutions submitted
  mapping(uint256 => solution) solution_map;


// TODO Create an event to emit when a solution is added
  event solution_add(uint256 tokenID, uint256 sol_index, address sol_address);


// TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint256 tokenID) onlyOwner public{
    max_index = max_index.add(1);
    solution memory addedSolution = solution({sol_index:max_index, sol_address:msg.sender});
    solutions.push(addedSolution);
    solution_map[tokenID] = addedSolution;
    emit solution_add(tokenID, max_index, msg.sender);
  }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

function mint(Proof memory proof, uint[2] memory input,uint256 tokenID) onlyOwner public{
  /*verify solution*/
  //require(sqrVerifier.verifyTx(proof,input),"The trasaction was not verified!");

  require(solution_map[tokenID].sol_address == address(0),"the token has been used!");
  super.mint(msg.sender, tokenID);
}
}
