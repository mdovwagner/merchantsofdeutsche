import React, { useState } from 'react';
import { Board } from './board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/base.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Dialog, Snackbar, Stack } from '@mui/material';
import { DialogContent } from '@mui/material';
import PlayerBoard from './PlayerBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { playerColors } from '../static/playerColors';
import SnackbarDialog from './SnackBardDialog';
import ActionBar from './ActionBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});
export function MerchantsOfDeutscheTable({
  ctx,
  G,
  moves,
  events,
  playerID
}) {
  let endMessage = () => {
    moves.endMessage(playerID);
  };
  let alertPlayer = () => {
    moves.changeMessage({
      valid: true,
      text: "You're taking too long. Stop being a David Green",
      type: "warning"
    });
  };
  let playCube = (edge, type, i) => {
    console.log("Place " + edge + i + " " + type);
    moves.Place(edge, type, i);
  };
  let moveTrader = (item, edge, i, player) => {
    // console.log(props)
    if (item.source === "edge") {
      console.log("from Edge " + item.edge.source + item.edge.target);
      console.log("to Edge " + edge.source + edge.target);
      // setFromMoves(oldMoves => [...oldMoves, {edge: item.edge.source + item.edge.target, i: item.i}]);
      // setToMoves(oldMoves => [...oldMoves, {edge: edge.source + edge.target, i: i}]);
      // console.log("New From Moves", fromMoves);
      // console.log("New To Moves", toMoves);
      moves.Move(item.edge.source + item.edge.target, item.i, edge.source + edge.target, i);
    } else if (item.source === "active") {
      playCube(edge.source + edge.target, item.type, i);
    } else if (item.source === "inactive") {
      console.log("CANNOT MOVE FROM INACTIVE SUPPLY");
      moves.BeDisplaced(edge.source + edge.target, item.type, i);
    }
    // moves.Move([{edge: item.source+item.target, i:item.i}],[{edge: edge, i: i}])
  };

  let claimOffice = (item, city, office, i) => {
    if (item.source === "edge") {
      console.log("ITEM", item);
      console.log("Claim " + office.color + office.type + +item.type + " " + city);
      moves.Claim(city, item.edge.source + item.edge.target, item.type, office, i);
    } else {
      moves.changeMessage({
        valid: true,
        text: "Can't claim office from " + item.source + " supply",
        type: "error"
      });
    }
  };
  let claimSpecial = cityName => {
    console.log("Claim Power from " + cityName);
    moves.ClaimSpecial(cityName);
  };
  let collectIncome = item => {
    moves.Collect(item.type);
  };
  let displace = (item, edge, type, i) => {
    console.log("Displace " + edge.source + edge.target + i);
    moves.Displace(edge.source + edge.target, item.type, i);
  };
  let changeStage = stage => {
    console.log("Start " + stage);
    events.setStage(stage);
  };
  let endStage = () => {
    console.log("End Stage");
    events.setStage("normal");
  };
  let endMove = () => {
    console.log("End Move");
    moves.EndMove();
  };
  let endCollect = () => {
    console.log("End Collect");
    moves.EndCollect();
  };
  const [fromMoves, setFromMoves] = useState([]);
  const [toMoves, setToMoves] = useState([]);
  const myTurn = ctx.currentPlayer === playerID;
  let player = G.players[playerID];
  const playerColor = playerColors[playerID];
  return (
    /*#__PURE__*/
    // <ThemeProvider theme={theme}>
    _jsxs(Stack, {
      style: {
        position: 'relative'
      },
      children: [/*#__PURE__*/_jsxs(DndProvider, {
        backend: HTML5Backend,
        children: [/*#__PURE__*/_jsx(ActionBar, {
          currentPlayer: ctx.currentPlayer,
          playerID: playerID,
          activePlayers: ctx.activePlayers
          // scoreCards={this.scoreCards} endTurn={this.endTurn}
          // trashRoute={this.trashRoute}
          ,
          alertPlayer: alertPlayer,
          gameover: ctx.gameover,
          changeStage: changeStage,
          endStage: endStage,
          myTurn: myTurn,
          liberRemaining: player.liberRemaining,
          incomeRemaining: player.incomeRemaining,
          displacedRemaining: player.displacedRemaining,
          endMove: endMove,
          endCollect: endCollect
        }), /*#__PURE__*/_jsx(Paper, {
          children: /*#__PURE__*/_jsx(Board, {
            board: G.board,
            playCube: playCube,
            moveTrader: moveTrader,
            displace: displace,
            claimOffice: claimOffice,
            handleSpecial: claimSpecial,
            currentPlayer: ctx.currentPlayer
          })
        }), /*#__PURE__*/_jsx(Paper, {
          children: /*#__PURE__*/_jsx(PlayerBoard, {
            players: G.players,
            playerID: playerID,
            currentPlayer: ctx.currentPlayer,
            activePlayers: ctx.activePlayers,
            dragHandler: collectIncome
          })
        })]
      }), /*#__PURE__*/_jsx(SnackbarDialog, {
        playerID: playerID,
        message: player.message,
        endMessage: endMessage
      })]
    })
    // </ThemeProvider>
  );
}