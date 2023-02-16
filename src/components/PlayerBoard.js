import { Button, Grid, Paper, Stack } from "@mui/material";
import { useDrop } from "react-dnd";
import { getActiones, getIncome, getKeys, getLiber, getPrivilegium } from "../static/boardProgression";
import { ItemTypes } from "../static/constants";
import { playerColors } from "../static/playerColors";
import { Trader } from "./board/Trader";


function drawPlayerRow(array, kind, type, player, currentPlayer) {
    const radius = 15;
    const length = radius * 1.4 / 2;
    const fill = (player.id !== null) ? playerColors[player.id].color : "#B99976"
    const officeStyle = {
        fill: fill,
        strokeWidth: 2,
        stroke: "black",
    }
    return (
        <svg width={120} height={2 * radius + 4}>
        {array.map((k, i) =>
            <g key={"Row" + kind + i}>
                {(player[kind] < i) ? (
                    <g>
                    <rect x={6.5 + 30 * i} y={6.5} width={length * 2} height={length * 2} style={officeStyle} />
                    <text x={6.5 + length/2 + 30 * i} y={12 + length}>{k}</text>
                    </g>
                ) : (<text x={6.5 + length / 2 + 30 * i} y={12 + length}>{k}</text>
                )}
            </g>
        )}
        </svg>
        );
}

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
                <Grid item xs={6} style={{ display: 'flex' }}>
                    Keys: {drawPlayerRow(getKeys, "keys", "trader", player, props.currentPlayer)}
                </Grid>
                <Grid item xs={6} style={{display: 'flex'}}>
                    Actiones: {drawPlayerRow(getActiones, "actiones", "trader", player, props.currentPlayer)}
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    Privilegium: { drawPlayerRow(getPrivilegium, "privilegium", "trader", player, props.currentPlayer)}
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    Liber Sophiae: {drawPlayerRow(getLiber, "liber", "merchant", player, props.currentPlayer)}
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    Money Bags: {drawPlayerRow(getIncome, "income", "trader", player, props.currentPlayer)}
                    </Grid>
            </Grid>
            <Paper style={{ display: 'flex' }} className="InactiveSupply" >
                {inactiveTraderSupply.map((_, i) =>
                <div key={"inactiveT"+i} onClick={(event) => { props.dragHandler({type: "trader"})}}>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"trader"} currentPlayer={props.currentPlayer}/>
                </div>
                )}
                {inactiveMerchantSupply.map((_, i) =>
                <div key={"inactiveM"+i} onClick={(event) => { props.dragHandler({type: "merchant"})}}>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"merchant"} currentPlayer={props.currentPlayer}/>
                </div>
                )}
            </Paper>
        </Stack>
    );
}