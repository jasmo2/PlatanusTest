import React, { Component } from 'react';
import logo from './logo.svg';
import WebSockets from './utils/websockets';

import './App.css';
function validData(data){
  let validData = true;
  // debugger
  for (let el of data) {
    if (el === 'hb') {
      validData = false;
    }
  }
  if (validData){
    
  }
}
class App extends Component {
  componentWillMount() {
    WebSockets((response) => validData(response));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
