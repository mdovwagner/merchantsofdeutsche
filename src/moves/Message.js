
export function endMessage({G, ctx}, playerID = -1) {
    console.log("End Message");
    if (playerID === -1) playerID = ctx.currentPlayer;
    G.players[playerID].message.valid = false;
}

export function changeMessage({G, ctx}, M, playerID = -1) {
    console.log("Change Message to ", M);
    if (playerID === -1) playerID = ctx.currentPlayer;
    G.players[playerID].message.valid = M.valid;
    G.players[playerID].message.text = M.text;
    G.players[playerID].message.type = M.type;
}