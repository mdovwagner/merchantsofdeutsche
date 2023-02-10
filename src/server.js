// src/server.js
const { Server, Origins } = require('boardgame.io/server');
const { TicTacToe, MerchantsOfDeutsche } = require('./Game');

const server = Server({
    games: [MerchantsOfDeutsche],
    origins: [Origins.LOCALHOST],
});

server.run(8000);
