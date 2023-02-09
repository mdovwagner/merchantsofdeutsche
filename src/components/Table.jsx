import React from 'react';
import { Board } from './Board';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, Dialog, Snackbar } from '@mui/material';
import { DialogContent } from '@mui/material';

const theme = createTheme({
    palette: {
        secondary: {
            main: "#D2B48C",
        },
        primary: {
            main: "#664229",
        },
        disabled: {
            main: "#E5D3B3"
        }
    },
});
export function MerchantsOfDeutscheTable({ctx, G, moves}) {

    console.log(G.board.roads);
    let playCube = (edge, type, i) => {
        console.log("Place " + edge + i + " " + type);
        moves.Place(edge, type, i);
    }

    let moveTrader = (item, edge, i, player) => {
        // console.log(props)
        console.log("from Edge " + item.edge.source + item.edge.target)
        console.log("to Edge " + edge.source + edge.target)
        // moves.Move([{edge: item.source+item.target, i:item.i}],[{edge: edge, i: i}])
        moves.Move(item.edge.source+item.edge.target, item.i,edge.source+edge.target, i);
    };

    let claimOffice = (item, city, office, i) => {
        console.log("Claim "+ office.color + " " + city);
        moves.Claim(city, office, i);
    }


    return (
        <div>
        <DndProvider backend={HTML5Backend}>
            <Board 
                board={G.board} 
                playCube = {playCube}
                moveTrader = {moveTrader}
                claimOffice = {claimOffice}
            />
        </DndProvider>
        </div>
    );
}

