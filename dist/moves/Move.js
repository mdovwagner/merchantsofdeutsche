import { INVALID_MOVE } from 'boardgame.io/core';
import { getLiber } from '../static/boardProgression';
import { CheckEndTurn } from './CheckEndTurn';
export function StartMove({
  G,
  ctx,
  events
}) {
  // Clicked on "Move"
  const currentPlayer = G.players[ctx.currentPlayer];
  currentPlayer.liberRemaining = getLiber[currentPlayer.liber];
}
export function EndMove({
  G,
  ctx,
  events
}) {
  // Clicked on "Done" in Move
  const currentPlayer = G.players[ctx.currentPlayer];
  currentPlayer.liberRemaining = getLiber[currentPlayer.liber];
  events.setStage("normal");
  CheckEndTurn({
    G,
    ctx,
    events
  });
}
export function Move({
  G,
  ctx,
  events
}, e1, i1, e2, i2) {
  const player = G.board.roads[e1].houses.player[i1];
  const currentPlayer = G.players[ctx.currentPlayer];
  if (currentPlayer.liberRemaining > 0) {
    G.board.roads[e1].houses.player[i1] = null;
    G.board.roads[e2].houses.player[i2] = player;
    G.board.roads[e2].houses.type[i2] = G.board.roads[e1].houses.type[i1];
    G.board.roads[e1].houses.type[i1] = "";
    currentPlayer.liberRemaining -= 1;
  }
  if (currentPlayer.liberRemaining === 0) {
    currentPlayer.liberRemaining = getLiber[currentPlayer.liber];
    events.setStage("normal");
    CheckEndTurn({
      G,
      ctx,
      events
    });
  }
}