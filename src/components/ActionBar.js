import { Button, Paper } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SyncIcon from '@mui/icons-material/Sync';


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
            case "draw":
                message = "Draw a Card or ";
                buttons = [<Button key="admin" variant="contained" color="primary" onClick={props.administrator} endIcon={<SyncIcon />}>
                    Administrator
                </Button>]
                break;
            case "play":
                message = "Play a Card";
                buttons = [<Button key="delete" variant="contained" color="primary" onClick={props.trashRoute} endIcon={<DeleteIcon />}>
                    Trash Route
                </Button>]
                break;
            case "score":
                message = "Score a Route";
                buttons = [<Button key="score" variant="contained" color="primary" onClick={props.scoreCards} endIcon={<SendIcon />}>
                    Score
                </Button>,
                <Button key="done" variant="contained" color="primary" onClick={props.endTurn} endIcon={<DoneIcon />}>
                    End Turn
                </Button>]
                break;
            case "place":
                message = "Place Houses";
                buttons = [<Button key="done" variant="contained" color="primary" onClick={props.endTurn} endIcon={<DoneIcon />}>
                    Done
                </Button>]
                break;
        }
    }
    // End Game
    if (props.gameover) {
        message = "Winner: Player" + props.gameover.winner;
    }
    return (

        <Paper class="section" style={hStyle}>
            <Button disableRipple>{message}</Button>
            {buttons}
        </Paper>
    );
}