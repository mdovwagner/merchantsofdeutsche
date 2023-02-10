import { Button, Grid, Paper, Stack } from "@mui/material";
import { Trader } from "./board/Trader";

export default function PlayerBoard(props) {
    console.log(props.playerID);
    const player = props.players[props.playerID];

    const fgStyle = {
        fill: "#B99976",
        strokeWidth: 2,
        stroke: "black"
    }

    const width = 500;
    const height = 200;
    const activeTraderSupply = Array(player.active.trader).fill(null);
    const inactiveTraderSupply = Array(player.inactive.trader).fill(null);
    const activeMerchantSupply = Array(player.active.merchant).fill(null);
    const inactiveMerchantSupply = Array(player.inactive.merchant).fill(null);

    return (
        <Stack style={{ position: 'absolute', top:350}}>
            <Paper>
                Actions Remaining = {player.actionsRemaining}
            </Paper>
            <hr />
            <Paper style={{display: 'flex'}} className="ActiveSupply">
                {activeTraderSupply.map((_, i) => 
                <div key={"activeT"+i}>
                    <Trader source={"active"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"trader"}currentPlayer={props.currentPlayer}/>
                </div>
                )}
                {activeMerchantSupply.map((_, i) => 
                <div key={"activeM"+i}>
                    <Trader source={"active"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"merchant"}currentPlayer={props.currentPlayer}/>
                </div>
                )}
            </Paper>
            <Grid className="Mat" container spacing={2} >
                    <Grid item xs={6}>Keys: {player.keys}</Grid>
                    <Grid item xs={6}>Actiones: {player.actiones}</Grid>
                    <Grid item xs={4}>Privilegium: {player.privilegium}</Grid>
                    <Grid item xs={4}>Liber Sophiae: {player.liber}</Grid>
                    <Grid item xs={4}>Money Bags: {player.income}</Grid>
                </Grid>
            <Paper className="PlayerButtons">
                <Button onClick={(event) => { props.collectIncome("trader") }}>Collect</Button>
                <Button>Place</Button>
                <Button>Move</Button>
                <Button>Claim</Button>
                <Button>End Turn</Button>
            </Paper>
            <Paper style={{ display: 'flex' }} className="InactiveSupply">
                {inactiveTraderSupply.map((_, i) =>
                <div key={"inactiveT"+i}>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"trader"} currentPlayer={props.currentPlayer}/>
                </div>
                )}
                {inactiveMerchantSupply.map((_, i) =>
                <div key={"inactiveM"+i}>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"merchant"} currentPlayer={props.currentPlayer}/>
                </div>
                )}
            </Paper>
        </Stack>
    );
}