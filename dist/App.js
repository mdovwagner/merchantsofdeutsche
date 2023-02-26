import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { MerchantsOfDeutsche } from './Game';
import { MerchantsOfDeutscheTable } from './components/Table';
import { SocketIO } from 'boardgame.io/multiplayer';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MerchantsOfDeutscheClient = Client({
  game: MerchantsOfDeutsche,
  board: MerchantsOfDeutscheTable,
  multiplayer: SocketIO({
    server: 'localhost:8000'
  })
});
class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      playerID: null
    };
  }
  render() {
    if (this.state.playerID === null) {
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          children: "Play as"
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => this.setState({
            playerID: "0"
          }),
          children: "Player 0"
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => this.setState({
            playerID: "1"
          }),
          children: "Player 1"
        })]
      });
    }
    return /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(MerchantsOfDeutscheClient, {
        playerID: this.state.playerID
      })
    });
  }
}
export default App;