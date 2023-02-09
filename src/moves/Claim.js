import { CheckEndTurn } from "./CheckEndTurn";

export function Claim({ G, ctx, events }, city, office, i) {
    console.log(city);
    G.board.cities[city].player[i] = ctx.currentPlayer; 
    G.board.cities[city].type[i] = office.type; 

    CheckEndTurn({ G, ctx, events });
}