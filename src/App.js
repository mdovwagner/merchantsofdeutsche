import { Client } from 'boardgame.io/react';
import { MerchantsOfDeutsche } from './Game';
import { MerchantsOfDeutscheTable } from './components/Table';
// import { SocketIO } from 'boardgame.io/multiplayer'


const MerchantsOfDeutscheClient = Client({
  game: MerchantsOfDeutsche,
  board: MerchantsOfDeutscheTable,
  // multiplayer: SocketIO({ server: 'localhost:8000' }),
});

export default MerchantsOfDeutscheClient;