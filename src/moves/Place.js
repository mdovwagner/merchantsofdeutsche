
export function Place({G, ctx}, edge, type, i) {
    G.board.roads[edge].houses.player[i] = ctx.currentPlayer;
    G.board.roads[edge].houses.type[i] = type;
    
}