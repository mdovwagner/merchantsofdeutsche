function PlayerModel(i) {
  return {
    id: -1,
    // ID Assigned by game

    // PlayerBoard items
    actiones: 0,
    keys: 0,
    privilegium: 0,
    income: 0,
    liber: 0,
    //Other
    score: 0,
    actionsRemaining: 2,
    liberRemaining: 2,
    incomeRemaining: 3,
    displacedRemaing: 2,
    currentBonus: "",
    prevBonuses: [],
    active: {
      trader: 5,
      merchant: 2
    },
    inactive: {
      trader: 4,
      merchant: 1
    },
    message: {
      valid: false,
      text: "",
      type: "info" // error, warning, info, success  
    }
  };
}

export default PlayerModel;