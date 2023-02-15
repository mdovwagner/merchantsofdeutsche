import { getIncome } from "../static/boardProgression";
import { CheckEndTurn } from "./CheckEndTurn";

export function EndCollect({ G, ctx, events }) {
    // Clicked on "Done" in Move
    const currentPlayer = G.players[ctx.currentPlayer];
    currentPlayer.incomeRemaining = getIncome[currentPlayer.income];
    events.setStage("normal")
    CheckEndTurn({ G, ctx, events })
}


export function Collect({ G, ctx, events }, type) {
    console.log("Collect a "+type);
    const currentPlayer = G.players[ctx.currentPlayer];

    if (currentPlayer.incomeRemaining > 0) {
        if (currentPlayer.inactive[type] > 0) {
            currentPlayer.active[type] += 1;
            currentPlayer.inactive[type] -= 1;
        }
        currentPlayer.incomeRemaining -= 1;
    }
    if (currentPlayer.incomeRemaining === 0) {
        currentPlayer.incomeRemaining = getIncome[currentPlayer.income];
        events.setStage("normal")
        CheckEndTurn({ G, ctx, events })
    }
}