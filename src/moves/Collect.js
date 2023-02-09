
export function Collect({ G, ctx }, type) {
    console.log("Collect");
    const player = G.players[ctx.currentPlayer];
    for (let i = 0; i < player.income; i++) {
        if (player.inactive["trader"] > 0) {
            player.active["trader"] += 1;
            player.inactive["trader"] -= 1;
        }
    }
}