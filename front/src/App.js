import React, { Component } from 'react';
import './App.css';
import VendingMachine from '../src/contracts/VendingMachine.json';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchain(this.props.dispatch);
  }

  async loadBlockchain(dispatch) {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      // Get balance of wallet (MetaMask)
      if (typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], balance: balance, web3: web3 });
      } else {
        window.alert('Please login with MetaMask');
      }

      // Load contracts
      try {
        const vendingMachine = new web3.eth.Contract(VendingMachine.abi, VendingMachine.networks[netId].address);
        const vendingMachineAddress = VendingMachine.networks[netId].address;
        this.setState({ vendingMachine: vendingMachine, vendingMachineAddress: vendingMachineAddress });
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network');
      }

    } else {
      window.alert('Please install MetaMask')
    }
  }

  async getBalance() {
    if (this.state.vendingMachine !== 'undefined') {
      try {
        return this.state.vendingMachine.methods.getBalance().call();
      } catch (e) {
        console.log('Error, get balance: ', e)
      }
    }
  }

  async puchase(amount) {
    if (this.state.vendingMachine !== 'undefined') {
      try {
        await this.state.vendingMachine.methods.purchase().send({ value: amount.toString(), from: this.state.account })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      vendingMachine: null,
      balance: 0,
      vendingMachineAddress: null
    }
  }

  render() {

    return (
      <div className="App">
        <h1>Coffee Vending Machine</h1>
        <h3>There is (..) left</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>How much do you want ?</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Button variant="primary" type="submit" /*onClick={(event) => this.purchase()}*/>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
