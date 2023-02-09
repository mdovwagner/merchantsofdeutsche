import { INVALID_MOVE } from 'boardgame.io/core';
import { CheckEndTurn } from './CheckEndTurn';


export function Move({ G, ctx, events }, e1, i1, e2, i2) {

    const player = G.board.roads[e1].houses.player[i1];

    G.board.roads[e1].houses.player[i1] = null;
    G.board.roads[e2].houses.player[i2] = player;
    G.board.roads[e2].houses.type[i2] = G.board.roads[e1].houses.type[i1];
    G.board.roads[e1].houses.type[i1] = "";
    // if (fromEdges.length !== toEdges.length) return INVALID_MOVE;

    // for (let i = 0; i < fromEdges.length; i++) {
    //     let e1 = fromEdges[i].edge
    //     let i1 = fromEdges[i].i
    //     let e2 = toEdges[i].edge
    //     let i2 = toEdges[i].i

    //     if (G.board.roads[e2].houses[i2] !== null) return INVALID_MOVE; // Can't move to a place with someone
    //     if (G.board.roads[e1].houses[i1] !== ctx.currentPlayer) return INVALID_MOVE; // Can't move from a place without player

    //     G.board.roads[e1].houses[i1] = null;
    //     G.board.roads[e2].houses[i2] = ctx.currentPlayer;
    // }

    CheckEndTurn({G, ctx, events})
}