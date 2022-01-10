import SolnSquareVerifier from '../../build/contracts/SolnSquareVerifier.json';
import Web3 from 'web3';

export default class Contract {
  constructor(network, callback) {

    let config = Config[network];
    //this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
    this.flightSuretyApp = new this.web3.eth.Contract(SolnSquareVerifier.abi, );
    this.initialize(callback);
  }

  initialize(callback) {
    let self = this;
    this.web3.eth.getAccounts((error, accts) => {

      this.owner = accts[0];

      let counter = 1;

      while (this.airlines.length < 5) {
        this.airlines.push(accts[counter++]);
      }

      while (this.passengers.length < 5) {
        this.passengers.push(accts[counter++]);
      }

      console.log(accts[0]);

      /*fund airline*/
      this.flightSuretyData.methods.fund().call({
        from: accts[0],
        value: this.web3.utils.toWei('10', "ether"),
        gas: 3000000
      });

      /*register flights*/
      let flighttimestamp = new Date('2021-12-01 10:30:00');
      let payload = {
        airline: accts[0],
        flight: 'AA8017',
        timestamp: Math.floor(flighttimestamp.getTime() / 1000)
      }
      self.flightSuretyApp.methods
        .registerFlight(payload.flight, payload.timestamp)
        .send({
          from: self.owner,
          gas: 3000000
        });

      flighttimestamp = new Date('2022-01-01 17:45:00');
      payload = {
        airline: accts[0],
        flight: 'AA1388',
        timestamp: Math.floor(flighttimestamp.getTime() / 1000)
      }
      self.flightSuretyApp.methods
        .registerFlight(payload.flight, payload.timestamp)
        .send({
          from: self.owner,
          gas: 3000000
        });

      flighttimestamp = new Date('2022-02-22 12:30:00');
      payload = {
        airline: accts[0],
        flight: 'AA5232',
        timestamp: Math.floor(flighttimestamp.getTime() / 1000)
      }

      self.flightSuretyApp.methods
        .registerFlight(payload.flight, payload.timestamp)
        .send({
          from: self.owner,
          gas: 3000000
        });


      callback();
    });
  }

}
