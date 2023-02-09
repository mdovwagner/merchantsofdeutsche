
function PlayerModel(i) {


    
    return (
        {
            id: -1, // ID Assigned by game

            // PlayerBoard items
            actiones: 2,
            keys: 1,
            privilegium: "white",
            income: 3,
            liber: 2,

            //Other
            score: 0,
            actionsRemaining: 2,
            currentBonus: "",
            prevBonuses: [],
            active: {trader: 5, merchant: 2},
            inactive: {trader: 4, merchant: 1},
        }
    )

}

export default PlayerModel