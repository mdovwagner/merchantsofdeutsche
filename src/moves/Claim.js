import { INVALID_MOVE } from 'boardgame.io/core';
import { cities } from '../static/cities';
import { CheckEndTurn } from "./CheckEndTurn";
import { changeMessage } from "./Message";

export function Claim({ G, ctx, events }, city, edge, type, office, i) {
    console.log("Claim " + city);
    let player = G.players[ctx.currentPlayer];

    let staticCity = cities[city];
    let staticOffice = cities[city].offices[i];
    

    // Loop through houses on edge to check that they are all the curPlayers
    let road = G.board.roads[edge];
    console.log(road);
    let controlAllHouses = true;
    road.houses.player.forEach(p => {
        if (p != ctx.currentPlayer) {
            changeMessage({ G, ctx }, {
                valid: true,
                text: "You don't control all the houses",
                type: "error"
            });
            controlAllHouses = false;
        }
    });
    if (!controlAllHouses) {
        return;
    }

    // Make sure they have enough priviledge
    if (player.privilegium !== staticOffice.color) {
        changeMessage({ G, ctx }, {
            valid: true,
            text: "You don't have " + office.color + " priviledge.",
            type: "error"
        });
        return;
    }

    // Make sure the types match of the placed piece
    if (staticOffice.type !== type) {
        changeMessage({ G, ctx }, {
            valid: true,
            text: "Claimed with a " + type,
            type: "error"
        });
        return;
    }

    // ALL GOOD?
    // Check who controlls the city (on both sides) and give them a point 

    // Place the piece in the office
    G.board.cities[city].player[i] = ctx.currentPlayer; 
    G.board.cities[city].type[i] = type; 

    // Remove the houses from the edge AND add to inactive supply (traders and merchants)
    for (let i = 0; i < road.houses.player.length; i++) {
        road.houses.player[i] = null;
        road.houses.type[i] = "";
    }
    player.inactive["trader"] += road.houses.player.length - 1;




    CheckEndTurn({ G, ctx, events });
}