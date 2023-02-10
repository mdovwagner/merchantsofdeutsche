import { INVALID_MOVE } from 'boardgame.io/core';
import { CheckEndTurn } from "./CheckEndTurn";
import { changeMessage } from "./Message";

export function Claim({ G, ctx, events }, city, edge, office, i) {
    console.log("Claim " + city);
    let player = G.players[ctx.currentPlayer];
    if (player.privilegium !== office.color) {
        changeMessage({G, ctx},{
            valid: true,
            text: "You don't have " + office.color + " priviledge.",
            type: "error"
        });
        return INVALID_MOVE;
    }

    // Loop through houses on edge to check that they are all the curPlayers

    // Make sure they have enough priviledge

    // Make sure the types match of the placed piece

    // ALL GOOD?
    // Check who controlls the city (on both sides) and give them a point 

    // Place the piece in the office

    // Remove the houses from the edge AND add to inactive supply (traders and merchants)




    G.board.cities[city].player[i] = ctx.currentPlayer; 
    G.board.cities[city].type[i] = office.type; 

    CheckEndTurn({ G, ctx, events });
}