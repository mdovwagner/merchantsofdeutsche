import BoardModel, { whoControls } from "./models/BoardModel";
import PlayerModel from "./models/PlayerModel";
import { cities } from './static/cities.js';
import { Place } from './moves/Place.js';
import { Move, EndMove } from './moves/Move.js';
import { Claim } from './moves/Claim.js';
import { ClaimSpecial } from './moves/ClaimSpecial.js';
import { Collect, EndCollect } from './moves/Collect.js';
import { Displace } from './moves/Displace.js';
import { BeDisplaced } from './moves/BeDisplaced.js';
import { changeMessage, endMessage } from "./moves/Message";
import { getActiones, getIncome, getLiber } from "./static/boardProgression";
function setupGame(ctx) {
  const numbers = Array.from({
    length: 5
  }, (_, index) => index);
  const xs = Object.values(cities).map(n => 2 + (3 - 4) * (1 + 0.5) / 5);
  let board = new BoardModel();

  // Testing
  board.cities.Groningen.player[0] = 2; // Player 2 has something in Groningen
  board.cities.Groningen.type[0] = "merchant"; // Player 2 has something in Groningen
  board.cities.Kampen.player[0] = 0; // Player 2 has something in Groningen
  board.cities.Kampen.type[0] = "trader"; // Player 2 has something in Groningen
  board.cities.Osnabruck.player[0] = 1; // Player 2 has something in Groningen
  board.cities.Osnabruck.type[0] = "trader"; // Player 2 has something in Groningen
  board.cities.Osnabruck.player[2] = 3; // Player 2 has something in Groningen
  board.cities.Osnabruck.type[2] = "trader"; // Player 2 has something in Groningen

  console.log(whoControls(board, "GroningenEmden"));
  console.log(whoControls(board, "KampenOsnabruck"));
  board.roads.GroningenEmden.houses.player[1] = 2;
  board.roads.GroningenEmden.houses.type[1] = "trader";
  board.roads.GroningenEmden.houses.player[2] = 1;
  board.roads.GroningenEmden.houses.type[2] = "trader";
  board.roads.KampenOsnabruck.houses.player[3] = 3;
  board.roads.KampenOsnabruck.houses.type[3] = "merchant";
  let players = {};
  for (let i = 0; i < 4; i++) {
    players[i] = new PlayerModel();
    players[i].id = i;
  }
  return {
    board: board,
    players: players
  };
}
let turns = {
  onBegin: ({
    G,
    ctx,
    events
  }) => {
    // G.newTurn = true;
    // changeMessage(G, ctx, { valid: true, text: "Your turn " + ctx.currentPlayer, type: "info" });
    // ctx.events.setActivePlayers({ currentPlayer: 'draw', others: 'wait' });
    console.log("Begin");
    changeMessage({
      G,
      ctx
    }, {
      valid: true,
      text: "Your turn " + ctx.currentPlayer,
      type: "info"
    });
    G.players[ctx.currentPlayer].actionsRemaining = getActiones[G.players[ctx.currentPlayer].actiones];
    G.players[ctx.currentPlayer].liberRemaining = getLiber[G.players[ctx.currentPlayer].liber];
    G.players[ctx.currentPlayer].incomeRemaining = getIncome[G.players[ctx.currentPlayer].income];
    events.setActivePlayers({
      currentPlayer: 'normal',
      others: "wait"
    });
  },
  stages: {
    displace: {
      moves: {
        BeDisplaced,
        changeMessage,
        endMessage
      }
    },
    collect: {
      moves: {
        Collect,
        EndCollect,
        changeMessage,
        endMessage
      }
    },
    move: {
      moves: {
        Move,
        EndMove,
        changeMessage,
        endMessage
      }
    },
    claim: {
      moves: {
        Claim,
        ClaimSpecial,
        endMessage
      }
    },
    normal: {
      moves: {
        Place,
        Displace,
        changeMessage,
        endMessage
      }
    },
    wait: {
      moves: {
        changeMessage,
        changeMessage,
        endMessage
      }
    }
  }
  // onEnd: (G, ctx) => {
  //     G.players[ctx.currentPlayer].selectedCities = [];
  // }
};

export const MerchantsOfDeutsche = {
  name: 'MerchantsOfDeutsche',
  setup: setupGame,
  moves: {
    // Collect, 
    // Place,
    // Move, // Hellicopter
    // Claim,
    // Displace,
    changeMessage: changeMessage,
    endMessage: endMessage
  },
  minPlayers: 3,
  maxPlayers: 5,
  turn: turns

  // endIf: (G, ctx) => {
  //     if (isLastTurn(G, ctx)) {
  //         console.log("Game Over");
  //         return { winner: getWinner(G, ctx) };
  //     }
  //   },
};