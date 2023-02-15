import { Button, Paper } from '@mui/material';
import React from 'react';
import "./styles/base.css"
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
export default function ActionBar(props) {

    let message = "Draw a Card";
    let buttons = []
    const hStyle = {
        // position: "fixed",
        backgroundColor: (props.myTurn) ? "gold" : "tan",
        opacity: "100%",
        bottom: 0,
        position: 'absolute', top: 830,

    }

    if (props.playerID !== props.currentPlayer) {
        message = "Wait for your turn...";
        buttons = [<Button key="timer" variant="contained" color="primary" onClick={props.alertPlayer} endIcon={<HourglassEmptyIcon />}>
            David Green taking too long...
        </Button>]
    } else if (props.activePlayers !== null) {
        let stage = props.activePlayers[props.currentPlayer];
        switch (stage) {
            case "collect":
                message = "Collect up to " + props.incomeRemaining + " traders from Inactive Supply";
                buttons = [<Button key="undo" variant="contained" color="primary" onClick={null} endIcon={<UndoIcon />}>
                    Undo
                </Button>,
                <Button key="done" variant="contained" color="primary" onClick={props.endCollect} endIcon={<DoneIcon />}>
                    Done
                </Button>]
                break;
            case "play":
                message = "Play a Card";
                buttons = [<Button key="delete" variant="contained" color="primary" onClick={props.trashRoute} endIcon={<DeleteIcon />}>
                    Trash Route
                </Button>]
                break;
            case "move":
                message = "Move up to "+props.liberRemaining+" traders";
                buttons = [<Button key="undo" variant="contained" color="primary" onClick={null} endIcon={<UndoIcon />}>
                    Undo
                </Button>,
                <Button key="done" variant="contained" color="primary" onClick={props.endMove} endIcon={<DoneIcon />}>
                    Done
                </Button>]
                break;
            case "claim":
                message = "Drag a Trader to an Office to claim it OR click on a yellow city to gain that ability";
                buttons = [<Button key="done" variant="contained" color="primary" onClick={props.endStage} endIcon={<DoneIcon />}>
                    Done
                </Button>]
                break;
            default:
                message = "Choose an Action: "
                buttons = [<Button key="collect" variant="contained" color="primary"  onClick={(_) => { props.changeStage("collect") }} 
                                                                                   endIcon={<PaidOutlinedIcon />}>Collect</Button>,
                           <Button key="place" variant="contained" color="primary"  endIcon={<PlaceOutlinedIcon />}>Place</Button>,
                           <Button key="move" variant="contained" color="primary"  onClick={(_) => { props.changeStage("move") }} 
                                                                                   endIcon={<ZoomOutMapOutlinedIcon />}>Move</Button>,
                           <Button key="displace" variant="contained" color="primary"  endIcon={<WrongLocationOutlinedIcon />}>Displace</Button>,
                           <Button key="claim" variant="contained" color="primary" onClick={(_) => { props.changeStage("claim") }} 
                                                                                    endIcon={<AddCircleOutlineOutlinedIcon />}>Claim</Button>,
                           <Button key="endTurn" variant="contained" color="primary"  endIcon={<DoneIcon />}>End Turn</Button>,

                ]
                break;
        }
    }
    // End Game
    if (props.gameover) {
        message = "Winner: Player" + props.gameover.winner;
    }
    return (

        <Paper class="section" style={hStyle} className="header">
            <Button disableRipple>{message}</Button>
            {buttons}
        </Paper>
    );
}