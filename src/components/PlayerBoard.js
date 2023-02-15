import { Button, Grid, Paper, Stack } from "@mui/material";
import { useDrop } from "react-dnd";
import { getActiones, getIncome, getKeys, getLiber, getPrivilegium } from "../static/boardProgression";
import { ItemTypes } from "../static/constants";
import { Trader } from "./board/Trader";

export default function PlayerBoard(props) {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.TRADER,
            drop: (item, monitor) => dragHandler(item),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    )

    let dragHandler = (it) => {
        props.dragHandler(it);
    }

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
        <Stack style={{ position: 'absolute', top:630}}>
            <Paper>
                Score: {player.score},  Actions Remaining = {player.actionsRemaining}
            </Paper>
            <hr />
            <Paper style={{display: 'flex'}} className="ActiveSupply" ref={drop}>
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
                    <Grid item xs={6}>Keys: {getKeys[player.keys]}</Grid>
                    <Grid item xs={6}>Actiones: {getActiones[player.actiones]}</Grid>
                    <Grid item xs={4}>Privilegium: {getPrivilegium[player.privilegium]}</Grid>
                    <Grid item xs={4}>Liber Sophiae: {getLiber[player.liber]}</Grid>
                    <Grid item xs={4}>Money Bags: {getIncome[player.income]}</Grid>
                </Grid>
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