import { CheckEndTurn } from "./CheckEndTurn";
export function BeDisplaced({
  G,
  ctx,
  events,
  playerID
}, edge, type, i) {
  console.log("Be Displaced");
  const displacedPlayer = G.players[playerID];
  if (displacedPlayer.displacedRemaining > 0) {
    G.board.roads[edge].houses.player[i] = parseInt(playerID);
    G.board.roads[edge].houses.type[i] = type;

    // Remove one from Inactive supply
    displacedPlayer.inactive[type] -= 1;
    displacedPlayer.displacedRemaining -= 1;
  }
  if (displacedPlayer.displacedRemaining === 0) {
    events.setStage("normal");
    events.setActivePlayers({
      currentPlayer: "normal",
      others: "wait"
    });
    CheckEndTurn({
      G,
      ctx,
      events
    });
  }
}