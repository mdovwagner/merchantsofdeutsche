import { Button, ButtonGroup, Paper, Tabs, Tab, ToggleButtonGroup } from '@mui/material';
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

    const [action, setAction] = React.useState("normal");

    const handleAction = (event, newAction) => {
        // setAction(newAction);
        props.changeStage(newAction);
    };
    
    let message = "Draw a Card";
    let buttons = []
    const hStyle = {
        // position: "fixed",
        backgroundColor: (props.myTurn) ? "gold" : "tan",
        opacity: "100%",
        // bottom: 0,
        // position: 'absolute', top: 830,
        position: 'sticky',
        top: 0,
        zIndex: 5,
        width: "100%",
        display: "flex"
        
    }
    let stage = props.activePlayers[props.playerID];

    if (props.playerID !== props.currentPlayer) {
        if (stage === "displace") {
            message = "Play up to "+ props.displacedRemaining + " traders from the Inactive Supply";
            buttons = [];
        } else {
            message = "Wait for your turn...";
            buttons = [<Button key="timer" variant="contained" color="primary" onClick={props.alertPlayer} endIcon={<HourglassEmptyIcon />}>
                Taking too long...
            </Button>]
        }
    } else if (props.activePlayers !== null) {
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
            case "wait":
                message = "Wait for Player to React to Displacement";
                buttons = []
                break;
            default:
                message = ""
                buttons = [

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
            <div>
            <Tabs color="primary" value={stage}
                onChange={handleAction} aria-label="tabs">
                <Tab value="collect" label="collect" icon={<PaidOutlinedIcon />} />
                <Tab value="normal" label="place" icon={<PlaceOutlinedIcon />} />
                <Tab value="move" label="move"  icon={<ZoomOutMapOutlinedIcon />} />
                <Tab value="displace" label="displace" icon={<WrongLocationOutlinedIcon />} disabled/>
                <Tab value="claim" label="claim" icon={<AddCircleOutlineOutlinedIcon />} />
                <Tab value="endTurn" label="endTurn" icon={<DoneIcon />} />
            </Tabs>
            <Button disableRipple>{message}</Button>
            {buttons}
            </div>
            <div>
                Actions Remaining = {props.player.actionsRemaining} | Score = {props.player.score}
            </div>
        </Paper>
    );
}