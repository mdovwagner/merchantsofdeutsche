import { CheckEndTurn } from "./CheckEndTurn";

export function Claim({ G, ctx, events }, city, edge, office, i) {
    console.log("Claim " + city);

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