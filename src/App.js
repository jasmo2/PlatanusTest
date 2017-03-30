import React, { Component } from 'react';
import logo from './logo.svg';
import WebSockets from './utils/websockets';

import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: 'BID',
      priceDiferences: '0',
      bid_size: 'BID_SIZE',
      ask: 'ASK',
      ask_size: 'ASK_SIZE',
    }
  }
  validData(data){
    let validData = true;
    // debugger
    for (let el of data) {
      if (el === 'hb') {
        validData = false;
      }
    }
    if (validData){
      // data[0] // ignore
      // data[1] = BID  // float Price of last highest bid
      // data[2] = BID_SIZE // float Size of the last highest bid
      // data[3] = ASK // float Price of last lowest ask
      // data[4] = ASK_SIZE // float Size of the last lowest ask
      // data[5] // ignore
      console.log('DataValid');
      console.log(`bid: ${data[1]} ask: ${data[3]}`);
      this.setState({
        ask: data[3],
        ask_size: data[4],
        bid: data[1],
        bid_size: data[2],
        priceDiferences: (data[1] - data[3]) //(La diferencia entre BID y ASK.)
      });

    }
  }
  componentWillMount() {
    WebSockets((response) => this.validData.bind(this)(response));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          BID = {this.state.bid}
        </p>
        <p className="App-intro">
          ASK {this.state.ask}
        </p>
        <hr/>
          <p className="App-intro">
            Dispuestas a Comprar = {this.state.bid_size}
          </p>
          <p className="App-intro">
            Dispuestos a vender {this.state.ask_size}
          </p>
        <hr/>
        <p className="App-intro">
          Diferencia entre Precios: {this.state.priceDiferences}
        </p>
        <hr/>
        <p className="App-intro">
          Diferencia entre Precios:
        </p>
      </div>
    );
  }
}

export default App;
