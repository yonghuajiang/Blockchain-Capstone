var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('Verifier');

const fs = require('fs');
proof = JSON.parse(fs.readFileSync("/home/yonghuajiang/Documents/Blockchain-Capstone/zokrates/code/proof.json"))

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Soln Square Function Test', function () {
      beforeEach(async function () {
          const squareVerifier = await SquareVerifier.new({from: accounts[0]});
          this.contract = await SolnSquareVerifier.new(squareVerifier.address,{from: account_one});
      })
      // Test if a new solution can be added for contract - SolnSquareVerifier

      it('test new solution addition', async function () {

        let startSolutions = await this.contract.totalSolution.call();
        await this.contract.addSolution(1,account_one);
        await this.contract.addSolution(2,account_one);
        await this.contract.addSolution(3,account_one);
        await this.contract.addSolution(4,account_one);
        await this.contract.addSolution(5,account_two);
        await this.contract.addSolution(6,account_two);
        await this.contract.addSolution(7,account_two);
        await this.contract.addSolution(8,account_two);
        await this.contract.addSolution(9,account_two);
        await this.contract.addSolution(10, account_two);
        let endSolutions = await this.contract.totalSolution.call();
        assert.equal(endSolutions.toNumber() - startSolutions.toNumber(), 10, "Solution number is different!");
      })

      // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
      it('token was minted', async function () {

        await this.contract.addSolution(1,account_one);
        await this.contract.addSolution(2,account_two);
        await this.contract.addSolution(3,account_two);
        await this.contract.addSolution(4,account_two);

        await this.contract.mint(1,account_one,proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
        await this.contract.mint(2,account_two,proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
        await this.contract.mint(3,account_two,proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
        await this.contract.mint(4,account_two,proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);

        let allsupply = await this.contract.totalSupply.call();
        assert.equal(allsupply, 4, "Solution number is different!");
      })


})

})
