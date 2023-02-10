import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer'
import { MerchantsOfDeutsche } from './Game';
import { MerchantsOfDeutscheTable } from './components/Table';
import { SocketIO } from 'boardgame.io/multiplayer'
import React from 'react';


const MerchantsOfDeutscheClient = Client({
  game: MerchantsOfDeutsche,
  board: MerchantsOfDeutscheTable,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <MerchantsOfDeutscheClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;