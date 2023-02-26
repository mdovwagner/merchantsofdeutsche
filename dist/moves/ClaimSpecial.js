import { INVALID_MOVE } from 'boardgame.io/core';
import { whoControls } from '../models/BoardModel';
import getNext, { getActiones, getIncome, getLiber, getPrivilegium } from '../static/boardProgression';
import { edges } from "../static/edges";
import { CheckEndTurn } from "./CheckEndTurn";
import { changeMessage } from "./Message";
export function ClaimSpecial({
  G,
  ctx,
  events
}, cityName) {
  console.log("ClaimSpecial " + cityName);
  let curPlayer = G.players[ctx.currentPlayer];
  // Loop through houses on edge to check that they are all the curPlayers

  let possibleEdges = edges.filter(e => e.source === cityName || e.target == cityName); // Should be length 1
  const edge = possibleEdges[0];
  let road = G.board.roads[edge.source + edge.target];
  console.log(road);
  let controlAllHouses = true;
  road.houses.player.forEach(p => {
    if (p != ctx.currentPlayer) {
      changeMessage({
        G,
        ctx
      }, {
        valid: true,
        text: "You don't control all the houses",
        type: "error"
      });
      controlAllHouses = false;
    }
  });
  if (!controlAllHouses) {
    return;
  }
  if (cityName === "Coellen") {
    // Can't do anything with Coellen
    return INVALID_MOVE;
  }

  // Check who controlls the city (on both sides) and give them a point 
  let controllers = whoControls(G.board, edge.source + edge.target);
  console.log("Controllers of " + edge.source + edge.target + " =" + controllers);
  controllers.forEach(p => {
    G.players[p].score += 1;
  });

  // Get a new power
  switch (cityName) {
    case "Groningen":
      // Liber
      curPlayer.liber = getNext(getLiber, curPlayer.liber);
      break;
    case "Stade":
      // Privilegium
      curPlayer.privilegium = getNext(getPrivilegium, curPlayer.privilegium);
      break;
    case "Lubeck":
      // income
      curPlayer.income = getNext(getIncome, curPlayer.income);
      break;
    case "Gottingen":
      // income
      curPlayer.actiones = getNext(getActiones, curPlayer.actiones);
      // Updated current actions if player just gained an action
      console.log(getActiones[curPlayer.actiones], getActiones[curPlayer.actiones - 1]);
      curPlayer.actionsRemaining += getActiones[curPlayer.actiones] - getActiones[curPlayer.actiones - 1];
      break;
    case "Halle":
      // income
      curPlayer.keys += 1;
      break;
  }

  // Remove the houses from the edge AND add to inactive supply (traders and merchants)
  for (let i = 0; i < road.houses.player.length; i++) {
    road.houses.player[i] = null;
    road.houses.type[i] = "";
  }
  curPlayer.inactive["trader"] += road.houses.player.length;

  // Get a new trader / merchant to active supply
  curPlayer.active[cityName === "Groningen" ? "merchant" : "trader"] += 1;
  events.setStage("normal");
  CheckEndTurn({
    G,
    ctx,
    events
  });
}