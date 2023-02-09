import { Button, Grid, Paper, Stack } from "@mui/material";
import { Trader } from "./board/Trader";

export default function PlayerBoard(props) {
    const player = props.players[props.currentPlayer];

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
                    <Trader source={"active"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"trader"}/>
                )}
                {activeMerchantSupply.map((_, i) => 
                    <Trader source={"active"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"merchant"}/>
                )}
            </Paper>
            <Paper className="Mat">
                {/* <svg width={width+4} height={height+4}>
                    <rect x={2} y={2} width={width} height={height} style={fgStyle} />
                </svg> */}
                <Paper>

                </Paper>
            </Paper>
            <Paper className="PlayerButtons">
                <Button onClick={(event) => { props.collectIncome("trader") }}>Collect</Button>
                <Button>Place</Button>
                <Button>Move</Button>
                <Button>Claim</Button>
                <Button>End Turn</Button>
            </Paper>
            <Paper style={{ display: 'flex' }} className="InactiveSupply">
                {inactiveTraderSupply.map((_, i) =>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"trader"} />
                )}
                {inactiveMerchantSupply.map((_, i) =>
                    <Trader source={"inactive"} edge={null} i={i} x={10} y={0} length={10} player={player.id} type={"merchant"} />
                )}
            </Paper>
        </Stack>
    );
}