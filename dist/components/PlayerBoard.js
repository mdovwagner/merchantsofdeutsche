import { Button, Grid, Paper, Stack } from "@mui/material";
import { useDrop } from "react-dnd";
import { getActiones, getIncome, getKeys, getLiber, getPrivilegium } from "../static/boardProgression";
import { ItemTypes } from "../static/constants";
import { playerColors } from "../static/playerColors";
import { Trader } from "./board/Trader";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function drawPlayerRow(array, kind, type, player, currentPlayer) {
  const radius = 15;
  const length = radius * 1.4 / 2;
  const fill = player.id !== null ? playerColors[player.id].color : "#B99976";
  const officeStyle = {
    fill: fill,
    strokeWidth: 2,
    stroke: "black"
  };
  return /*#__PURE__*/_jsx("svg", {
    width: 120,
    height: 2 * radius + 4,
    children: array.map((k, i) => /*#__PURE__*/_jsx("g", {
      children: player[kind] < i ? /*#__PURE__*/_jsxs("g", {
        children: [/*#__PURE__*/_jsx("rect", {
          x: 6.5 + 30 * i,
          y: 6.5,
          width: length * 2,
          height: length * 2,
          style: officeStyle
        }), /*#__PURE__*/_jsx("text", {
          x: 6.5 + length / 2 + 30 * i,
          y: 12 + length,
          children: k
        })]
      }) : /*#__PURE__*/_jsx("text", {
        x: 6.5 + length / 2 + 30 * i,
        y: 12 + length,
        children: k
      })
    }, "Row" + kind + i))
  });
}
export default function PlayerBoard(props) {
  const [{
    isOver
  }, drop] = useDrop(() => ({
    accept: ItemTypes.TRADER,
    drop: (item, monitor) => dragHandler(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }), []);
  let dragHandler = it => {
    props.dragHandler(it);
  };
  let stage = props.activePlayers[props.playerID];
  const player = props.players[props.playerID];
  const isMyTurn = props.playerID == props.currentPlayer || stage === "displace";
  const fgStyle = {
    fill: "#B99976",
    strokeWidth: 2,
    stroke: "black"
  };
  const width = 500;
  const height = 200;
  const activeTraderSupply = Array(player.active.trader).fill(null);
  const inactiveTraderSupply = Array(player.inactive.trader).fill(null);
  const activeMerchantSupply = Array(player.active.merchant).fill(null);
  const inactiveMerchantSupply = Array(player.inactive.merchant).fill(null);
  return /*#__PURE__*/_jsxs(Stack, {
    style: {
      position: 'absolute',
      top: 630
    },
    children: [/*#__PURE__*/_jsxs(Paper, {
      children: ["Score: ", player.score, ",  Actions Remaining = ", player.actionsRemaining]
    }), /*#__PURE__*/_jsx("hr", {}), /*#__PURE__*/_jsxs(Paper, {
      style: {
        display: 'flex'
      },
      className: "ActiveSupply",
      ref: drop,
      children: [activeTraderSupply.map((_, i) => /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Trader, {
          source: "active",
          edge: null,
          i: i,
          x: 10,
          y: 0,
          length: 10,
          player: player.id,
          type: "trader",
          currentPlayer: props.currentPlayer,
          isMyTurn: isMyTurn
        })
      }, "activeT" + i)), activeMerchantSupply.map((_, i) => /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Trader, {
          source: "active",
          edge: null,
          i: i,
          x: 10,
          y: 0,
          length: 10,
          player: player.id,
          type: "merchant",
          currentPlayer: props.currentPlayer,
          isMyTurn: isMyTurn
        })
      }, "activeM" + i))]
    }), /*#__PURE__*/_jsxs(Grid, {
      className: "Mat",
      container: true,
      spacing: 2,
      children: [/*#__PURE__*/_jsxs(Grid, {
        item: true,
        xs: 6,
        style: {
          display: 'flex'
        },
        children: ["Keys: ", drawPlayerRow(getKeys, "keys", "trader", player, props.currentPlayer)]
      }), /*#__PURE__*/_jsxs(Grid, {
        item: true,
        xs: 6,
        style: {
          display: 'flex'
        },
        children: ["Actiones: ", drawPlayerRow(getActiones, "actiones", "trader", player, props.currentPlayer)]
      }), /*#__PURE__*/_jsxs(Grid, {
        item: true,
        xs: 4,
        style: {
          display: 'flex'
        },
        children: ["Privilegium: ", drawPlayerRow(getPrivilegium, "privilegium", "trader", player, props.currentPlayer)]
      }), /*#__PURE__*/_jsxs(Grid, {
        item: true,
        xs: 4,
        style: {
          display: 'flex'
        },
        children: ["Liber Sophiae: ", drawPlayerRow(getLiber, "liber", "merchant", player, props.currentPlayer)]
      }), /*#__PURE__*/_jsxs(Grid, {
        item: true,
        xs: 4,
        style: {
          display: 'flex'
        },
        children: ["Money Bags: ", drawPlayerRow(getIncome, "income", "trader", player, props.currentPlayer)]
      })]
    }), /*#__PURE__*/_jsxs(Paper, {
      style: {
        display: 'flex'
      },
      className: "InactiveSupply",
      children: [inactiveTraderSupply.map((_, i) => /*#__PURE__*/_jsx("div", {
        onClick: event => {
          props.dragHandler({
            type: "trader"
          });
        },
        children: /*#__PURE__*/_jsx(Trader, {
          source: "inactive",
          edge: null,
          i: i,
          x: 10,
          y: 0,
          length: 10,
          player: player.id,
          type: "trader",
          currentPlayer: props.currentPlayer,
          isMyTurn: isMyTurn
        })
      }, "inactiveT" + i)), inactiveMerchantSupply.map((_, i) => /*#__PURE__*/_jsx("div", {
        onClick: event => {
          props.dragHandler({
            type: "merchant"
          });
        },
        children: /*#__PURE__*/_jsx(Trader, {
          source: "inactive",
          edge: null,
          i: i,
          x: 10,
          y: 0,
          length: 10,
          player: player.id,
          type: "merchant",
          currentPlayer: props.currentPlayer,
          isMyTurn: isMyTurn
        })
      }, "inactiveM" + i))]
    })]
  });
}