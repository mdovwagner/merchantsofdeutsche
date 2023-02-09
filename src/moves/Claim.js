
export function Claim({ G, ctx }, city, office, i) {
    console.log(city);
    G.board.cities[city].player[i] = ctx.currentPlayer; 
    G.board.cities[city].type[i] = office.type; 
}