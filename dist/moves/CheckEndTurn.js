import { getActiones } from "../static/boardProgression";
export function CheckEndTurn({
  G,
  ctx,
  events
}) {
  const player = G.players[ctx.currentPlayer];
  player.actionsRemaining -= 1;
  if (player.actionsRemaining <= 0) {
    player.actionsRemaining = getActiones[player.actiones];
    events.endTurn();
  }
}