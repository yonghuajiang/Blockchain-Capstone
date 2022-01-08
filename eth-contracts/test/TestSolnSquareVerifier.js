var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const fs = require('fs');
proof = JSON.parse(fs.readFileSync("/home/yonghuajiang/Documents/Blockchain-Capstone/zokrates/code/square/proof.json"))

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Soln Square Function Test', function () {
        beforeEach(async function () {
            this.contract = await SolnSquareVerifier.new({from: account_one});
          }
// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier



}

})
