import React from 'react';
import { Board } from './Board';

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
        this.boardOpen = false;
        this.board = React.createRef();
    }

    render() {
        return (
            <Board />
        );
    }
}

