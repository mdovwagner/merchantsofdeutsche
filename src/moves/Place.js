import { INVALID_MOVE } from 'boardgame.io/core';
import { CheckEndTurn } from './CheckEndTurn';

export function Place({G, ctx, events}, edge, type, i) {
    if (G.players[ctx.currentPlayer].active[type] == 0) {
        return INVALID_MOVE;
    }
    G.board.roads[edge].houses.player[i] = parseInt(ctx.currentPlayer);
    G.board.roads[edge].houses.type[i] = type;

    // Remove one from Active supply
    G.players[ctx.currentPlayer].active[type] -= 1;
    
    CheckEndTurn({ G, ctx, events });
}