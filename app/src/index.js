import Web3 from "web3";
import SolnSquareVerifier from "../../eth-contracts/build/contracts/SolnSquareVerifier.json";

const proof = {
        "proof": {
            "a": ["0x01e9817e1cb9ba55e9672d571bc144bf5fe5e5fb2074df68d2c8665ab1a130f1", "0x27aa72a4ed225547c6e9b27a445dbce10b839088b82cc90f78537751252f0b7e"],
            "b": [["0x08f95b30eb8df0f29447cb07faca52fa5d46dae2a6e5dbb13acf30b3914cd6fc", "0x1fb9462ca830f758b43d8cc59647f7db62ea79f53cf81d0c1b8a11c3ec7dce44"], ["0x070a98c9abd25a9b768d723a112da7ee38c93adcea706b54ccb2adb546106bef", "0x18a8911e71f777f16a94655b5999627b847705eae42106f696f88190326f50a0"]],
            "c": ["0x0951d3253c6a8b2abf0ed6c46a9e46bf2c6625946eb7098699bc9e01e9ba0595", "0x11278711a70335f9e5cacc65220fa7c970312068ee549148b5f5926fdb164c1a"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000090", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }


const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = 4;//await web3.eth.net.getId();
      const deployedNetwork = SolnSquareVerifier.networks[networkId];
      this.meta = new web3.eth.Contract(
        SolnSquareVerifier.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = ["********","***********"];
      this.account = accounts[0];
      console.log(this.account);
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  addSolution: async function() {
    const { addSolution } = this.meta.methods;
    const id = document.getElementById("tokenID").value;
    const address = document.getElementById("tokenAddress").value;
    await addSolution(id, address).send({from: this.account});

    console.log(this.account);
    App.setStatus("New Solution was added: token_id is " + id + "; token_address is."+ address);
  },

  // Implement Task 4 Modify the front end of the DAPP
  mint: async function() {
    const { mint, totalSupply } = this.meta.methods;
    const id = document.getElementById("tokenIDmint").value;
    const address = document.getElementById("tokenAddressMint").value;
    await mint(id,address,proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send({from: this.account});

    let numToken = await totalSupply().call({from: this.account});
    App.setStatus("New Token was minted: token_id is " + id + "; token_address is."+ address + " totalToken is:"+numToken);
  },

  setStatus: function(message) {
  const totalSupplyElement = document.getElementById("totalSupply");
  totalSupplyElement.innerHTML = message;
}


};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"),);
  }

  App.start();
});
