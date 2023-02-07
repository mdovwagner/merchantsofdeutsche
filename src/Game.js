import BoardModel from "./models/BoardModel";
import PlayerModel from "./models/PlayerModel";
import { cities } from './static/cities.js';
import { Place } from './moves/Place.js';
import { Move } from './moves/Move.js';
import { Displace } from './moves/Displace.js';




function setupGame(ctx) {

    const numbers = Array.from({ length: 5 }, (_, index) => index);
    const xs = Object.values(cities).map((n) => 2 + (3 - 4) * (1 + 0.5) / 5);
    let board = new BoardModel();
    board.cities.Groningen[0] = 2 // Player 2 has something in Groningen
    board.cities.Kampen[1] = 1 // Player 2 has something in Groningen
    board.cities.Osnabruck[1] = 3 // Player 2 has something in Groningen

    board.roads.GroningenEmden.houses[1] = 2;
    board.roads.GroningenEmden.houses[2] = 1;

    return {
        board: board,

    };
}

const turns = {
    // onBegin: (G, ctx) => {
    //     G.newTurn = true;
    //     changeMessage(G, ctx, { valid: true, text: "Your turn " + ctx.currentPlayer, type: "info" });
    //     ctx.events.setActivePlayers({ currentPlayer: 'draw', others: 'wait' });
    // },
    stages: {
        
        displace: {
            moves: { Displace }
        }

    },
    // onEnd: (G, ctx) => {
    //     G.players[ctx.currentPlayer].selectedCities = [];
    // }
}

export const MerchantsOfDeutsche = {
    name: 'MerchantsOfDeutsche',
    setup: setupGame,

    moves: {
        // Collect, 
        Place,
        Move, // Hellicopter
        // Claim,
        // endMessage: endMessage
    },

    minPlayers: 3,
    maxPlayers: 5,

    turns: turns


    // endIf: (G, ctx) => {
    //     if (isLastTurn(G, ctx)) {
    //         console.log("Game Over");
    //         return { winner: getWinner(G, ctx) };
    //     }
    //   },
};