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

export class MerchantsOfDeutscheTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.G)
        this.boardOpen = false;
        this.board = React.createRef();
    }

    playCube = (edge, type, i) => {
        console.log("Place " + edge + i + " " + type);
        this.props.moves.Place(edge, type, i);
    }

    render() {
        return (
            <DndProvider debugMode={true} backend={HTML5Backend}>
                <Board 
                    board={this.props.G.board} 
                    playCube = {this.playCube}
                />
            </DndProvider>
        );
    }
}

