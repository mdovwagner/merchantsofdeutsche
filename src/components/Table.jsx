import React from 'react';
import { Board } from './board/Board';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './styles/base.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Dialog, Snackbar, Stack } from '@mui/material';
import { DialogContent } from '@mui/material';
import PlayerBoard from './PlayerBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { playerColors } from '../static/playerColors';

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});
export function MerchantsOfDeutscheTable({ctx, G, moves, playerID}) {

    console.log(ctx);
    let playCube = (edge, type, i) => {
        console.log("Place " + edge + i + " " + type);
        moves.Place(edge, type, i);
    }

    let moveTrader = (item, edge, i, player) => {
        // console.log(props)
        if (item.source === "edge") {
            console.log("from Edge " + item.edge.source + item.edge.target)
            console.log("to Edge " + edge.source + edge.target)
            moves.Move(item.edge.source+item.edge.target, item.i,edge.source+edge.target, i);
        } else if (item.source === "active") {
            playCube(edge.source + edge.target, item.type, i)
        } else if (item.source === "inactive") {
            console.log("CANNOT MOVE FROM INACTIVE SUPPLY");
            moves.BeDisplaced(edge.source+edge.target, item.type, i);
        }
        // moves.Move([{edge: item.source+item.target, i:item.i}],[{edge: edge, i: i}])
    };

    let claimOffice = (item, city, office, i) => {
        console.log("Claim "+ office.color + " " + city);
        moves.Claim(city, office, i);
    }

    let collectIncome = (type) => {
        moves.Collect(type);
    }

    let displace = (item, edge, type, i) => {
        console.log("Displace "+ edge.source+edge.target+i);
        moves.Displace(edge.source+edge.target, item.type, i);
    }

    const isMyTurn = ctx.currentPlayer === playerID;
    const playerColor = playerColors[playerID];


    return (
        // <ThemeProvider theme={theme}>
        <Stack style={{ position: 'relative'}}>
        <DndProvider backend={HTML5Backend}>
            <Paper>
                {(isMyTurn) ? 
                <div className="section">My Turn</div> : <div></div>}
            </Paper>
            <Paper >
            <Board 
                board={G.board} 
                playCube = {playCube}
                moveTrader = {moveTrader}
                displace={displace}
                claimOffice = {claimOffice}
                currentPlayer={ctx.currentPlayer}
                />
            </Paper>
            <Paper >
            <PlayerBoard 
                players={G.players}
                playerID={playerID}
                currentPlayer={ctx.currentPlayer}
                collectIncome={collectIncome}
            />
            </Paper>
        </DndProvider>
        </Stack>
        // </ThemeProvider>
    );
}

