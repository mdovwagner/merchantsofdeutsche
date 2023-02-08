
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
            actionsRemaining: 0,
            currentBonus: "",
            prevBonuses: [],
            active: {traders: 0, merchants: 0},
            inactive: {traders: 0, merchants: 0},
        }
    )

}

export default PlayerModel