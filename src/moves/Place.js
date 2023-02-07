
export function Place({G, ctx}, edge, i) {
    G.board.roads[edge].houses[i] = ctx.currentPlayer;
    
}