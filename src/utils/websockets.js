// const ws = require('ws');
// const w = new ws('wss://api.bitfinex.com/ws/v2');

const WebSockets = (callback) => {
  const w = new WebSocket('wss://api.bitfinex.com/ws/v2'); //eslint-disable-line
  const msg = JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
  });

  w.onopen = () => {
    w.send(msg);
  }


  w.onmessage = (response) => {
    // console.log(sresponse);
    if (response.data !== '{"event":"info","version":1.1}') {
      callback(JSON.parse(response.data));
    }
  }

}

export default WebSockets;
