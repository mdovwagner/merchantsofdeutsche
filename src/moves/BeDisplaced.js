import { CheckEndTurn } from "./CheckEndTurn";



export function BeDisplaced({ G, ctx, events, playerID }, edge, type, i) {
    console.log("Be Displaced");

    G.board.roads[edge].houses.player[i] = parseInt(playerID);
    G.board.roads[edge].houses.type[i] = type;

    // Remove one from Inactive supply
    G.players[playerID].inactive[type] -= 1;


    events.endStage();
    events.setActivePlayers({currentPlayer: "normal"});
    CheckEndTurn({G, ctx, events});
}