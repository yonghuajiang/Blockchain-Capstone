var ERC721MintableComplete = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            this.contract.mint(account_one, 1);
            this.contract.mint(account_one, 2);
            this.contract.mint(account_one, 3);
            this.contract.mint(account_one, 4);
            this.contract.mint(account_two, 5);
            this.contract.mint(account_two, 6);
            this.contract.mint(account_two, 7);
            this.contract.mint(account_two, 8);
            this.contract.mint(account_two, 9);
            this.contract.mint(account_two, 10);
        })

        it('should return total supply', async function () {
          let totalSupply = await this.contract.totalSupply.call();
          assert.equal(totalSupply, 10, "There are 10 tokens!");

        })

        it('should get token balance', async function () {
          let balance = await this.contract.balanceOf.call(account_two);
          assert.equal(balance,6, "Account_two should have 6 tokens!");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
          let URI = await this.contract.tokenURI.call(1);
          assert.equal(URI,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI is incorrect!");
        })

        it('should transfer token from one owner to another', async function () {
          await this.contract.transferFrom.call(account_one, account_two, 1,{from:account_one});
          let owner = await this.contract.ownerOf.call(1);
          assert.equal(owner,account_two, "Token owner is not transfered!");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
          let mint_fail = false;
          try
          {
              await this.contract.mint(account_two, 12);
          }
          catch(e) {
              mint_fail = true;
          }
          assert.equal(mint_fail, true, "only contract owner can mint token!");
        })

        it('should return contract owner', async function () {
          let contract_owner = await this.contract.getterOwner.call();
          assert.equal(contract_owner, account_one, "The contract owner is not correct!");
        })

    });
})
