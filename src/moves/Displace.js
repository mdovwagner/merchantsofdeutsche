import { INVALID_MOVE } from 'boardgame.io/core';
import { CheckEndTurn } from "./CheckEndTurn";



export function Displace({ G, ctx, events }, edge, type, i) {
    // G.board.roads[edge].houses[i] = ctx.currentPlayer;
    console.log("Displace", edge, i);

    let curPlayer = G.players[ctx.currentPlayer];

    if (curPlayer.active["merchant"] + curPlayer.active["trader"] <= 1) {
        return INVALID_MOVE;
    }
    if (type === "merchant" && curPlayer.active["merchant"] + curPlayer.active["trader"] <= 2) {
        return INVALID_MOVE;
    }
    const displacedPlayerID = G.board.roads[edge].houses.player[i];
    console.log(displacedPlayerID);

    if (displacedPlayerID == ctx.currentPlayer) {
        // CANNOT DISPLACE SELF
        return INVALID_MOVE;
    }


    const displacedType = G.board.roads[edge].houses.type[i];

    // Place the cube where it should go
    G.board.roads[edge].houses.player[i] = parseInt(ctx.currentPlayer);
    G.board.roads[edge].houses.type[i] = type;
    
    // Remove two from Active supply
    curPlayer.active["trader"] -= 2;
    
    // Add one (the extra) to Inactive supplu
    curPlayer.inactive["trader"] += 1;

    if (type === "merchant") {
        curPlayer.active["trader"] -= 1;
        curPlayer.inactive["trader"] += 1;
    }

    // Move opponents' cube back to inactive supply (BUG can move other)
    // TODO: Change to it's own area in the corner of the screen?
    G.players[displacedPlayerID].inactive[displacedType] += 1;
    G.players[displacedPlayerID].displacedRemaining = (type === "merchant") ? 3 : 2;

    events.setActivePlayers({ currentPlayer: "wait", others: 'displace' });
    
    

}