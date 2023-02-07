




function setupGame(ctx) {


    return {
        cells: Array(9).fill(null) 

    };
}

const turns = {
    
}

export const MerchantsOfDeutsche = {
    name: 'MerchantsOfDeutsche',
    setup: setupGame,

    moves: {
        clickCell: ({ G, playerID }, id) => {
            G.cells[id] = playerID;
        },
        // drawCard: drawCard,
        // endMessage: endMessage
    },

    turn: turns,
    minPlayers: 3,
    maxPlayers: 4,


    // endIf: (G, ctx) => {
    //     if (isLastTurn(G, ctx)) {
    //         console.log("Game Over");
    //         return { winner: getWinner(G, ctx) };
    //     }
    //   },
};