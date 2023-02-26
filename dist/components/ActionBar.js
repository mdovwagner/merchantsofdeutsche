import { Button, ButtonGroup, Paper, Tabs, Tab, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import "./styles/base.css";
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SyncIcon from '@mui/icons-material/Sync';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ActionBar(props) {
  const [action, setAction] = React.useState("normal");
  const handleAction = (event, newAction) => {
    // setAction(newAction);
    props.changeStage(newAction);
  };
  let message = "Draw a Card";
  let buttons = [];
  const hStyle = {
    // position: "fixed",
    backgroundColor: props.myTurn ? "gold" : "tan",
    opacity: "100%",
    // bottom: 0,
    // position: 'absolute', top: 830,
    position: "fixed",
    top: 0,
    zIndex: 5,
    width: "100%"
  };
  let stage = props.activePlayers[props.playerID];
  if (props.playerID !== props.currentPlayer) {
    if (stage === "displace") {
      message = "Play up to " + props.displacedRemaining + " traders from the Inactive Supply";
      buttons = [];
    } else {
      message = "Wait for your turn...";
      buttons = [/*#__PURE__*/_jsx(Button, {
        variant: "contained",
        color: "primary",
        onClick: props.alertPlayer,
        endIcon: /*#__PURE__*/_jsx(HourglassEmptyIcon, {}),
        children: "David Green taking too long..."
      }, "timer")];
    }
  } else if (props.activePlayers !== null) {
    switch (stage) {
      case "collect":
        message = "Collect up to " + props.incomeRemaining + " traders from Inactive Supply";
        buttons = [/*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: null,
          endIcon: /*#__PURE__*/_jsx(UndoIcon, {}),
          children: "Undo"
        }, "undo"), /*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: props.endCollect,
          endIcon: /*#__PURE__*/_jsx(DoneIcon, {}),
          children: "Done"
        }, "done")];
        break;
      case "play":
        message = "Play a Card";
        buttons = [/*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: props.trashRoute,
          endIcon: /*#__PURE__*/_jsx(DeleteIcon, {}),
          children: "Trash Route"
        }, "delete")];
        break;
      case "move":
        message = "Move up to " + props.liberRemaining + " traders";
        buttons = [/*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: null,
          endIcon: /*#__PURE__*/_jsx(UndoIcon, {}),
          children: "Undo"
        }, "undo"), /*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: props.endMove,
          endIcon: /*#__PURE__*/_jsx(DoneIcon, {}),
          children: "Done"
        }, "done")];
        break;
      case "claim":
        message = "Drag a Trader to an Office to claim it OR click on a yellow city to gain that ability";
        buttons = [/*#__PURE__*/_jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: props.endStage,
          endIcon: /*#__PURE__*/_jsx(DoneIcon, {}),
          children: "Done"
        }, "done")];
        break;
      case "wait":
        message = "Wait for Player to React to Displacement";
        buttons = [];
        break;
      default:
        message = "";
        buttons = [];
        break;
    }
  }
  // End Game
  if (props.gameover) {
    message = "Winner: Player" + props.gameover.winner;
  }
  return /*#__PURE__*/_jsxs(Paper, {
    class: "section",
    style: hStyle,
    className: "header",
    children: [/*#__PURE__*/_jsxs(Tabs, {
      color: "primary",
      value: stage,
      onChange: handleAction,
      "aria-label": "tabs",
      children: [/*#__PURE__*/_jsx(Tab, {
        value: "collect",
        label: "collect",
        icon: /*#__PURE__*/_jsx(PaidOutlinedIcon, {})
      }), /*#__PURE__*/_jsx(Tab, {
        value: "normal",
        label: "place",
        icon: /*#__PURE__*/_jsx(PlaceOutlinedIcon, {})
      }), /*#__PURE__*/_jsx(Tab, {
        value: "move",
        label: "move",
        icon: /*#__PURE__*/_jsx(ZoomOutMapOutlinedIcon, {})
      }), /*#__PURE__*/_jsx(Tab, {
        value: "displace",
        label: "displace",
        icon: /*#__PURE__*/_jsx(WrongLocationOutlinedIcon, {}),
        disabled: true
      }), /*#__PURE__*/_jsx(Tab, {
        value: "claim",
        label: "claim",
        icon: /*#__PURE__*/_jsx(AddCircleOutlineOutlinedIcon, {})
      }), /*#__PURE__*/_jsx(Tab, {
        value: "endTurn",
        label: "endTurn",
        icon: /*#__PURE__*/_jsx(DoneIcon, {})
      })]
    }), /*#__PURE__*/_jsx(Button, {
      disableRipple: true,
      children: message
    }), buttons]
  });
}