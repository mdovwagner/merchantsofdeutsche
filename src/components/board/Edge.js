import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';
import RoadHouse from './RoadHouse';
import { Trader } from './Trader';




export function Edge(props) {

    let handleClick = (event, edge, n) => {

        event.stopPropagation();

        // In that case, event.ctrlKey does the trick.
        if (event.shiftKey) {
            console.log("Shift+click has just happened!");
        }
        let type = (event.shiftKey) ? "merchant" : "trader";

        props.handleClick(edge, type, n);
    }

    
    const edgeStyle = {
        strokeWidth: 2,
        stroke: "black"
    }
    const fgStyle = {
        fill: "#B99976",
        strokeWidth: 2,
        stroke: "black"
    }

    let players = props.board.roads[props.edge.source + props.edge.target].houses.player.map((p) => {
        return p;
    })
    let types = props.board.roads[props.edge.source + props.edge.target].houses.type.map((t) => {
        return t;
    })
    let fills = players.map((p) => {
        return (p) ? playerColors[p].color : "#B99976";
    })

    let x1 = cities[props.edge.source].x;
    let y1 = cities[props.edge.source].y;
    let x2 = cities[props.edge.target].x;
    let y2 = cities[props.edge.target].y;

    let midX = (x1 + x2) / 2; // x1 + (x2-x1) / 2
    let midY = (y1 + y2) / 2;
    let margin = 0.2;
    let x1m = x1 + margin * (x2 - x1)
    let y1m = y1 + margin * (y2 - y1)
    let x2m = x2 - margin * (x2 - x1)
    let y2m = y2 - margin * (y2 - y1)
    const numbers = Array.from({ length: props.edge.houses }, (_, index) => index);
    const xs = numbers.map((n) => x1m + (x2m - x1m) * (n + 0.5) / props.edge.houses);
    const ys = numbers.map((n) => y1m + (y2m - y1m) * (n + 0.5) / props.edge.houses);

    const radius = 15;
    const length = radius * 1.4 / 2;

    // const xsInside = 
    
    return (<div key={"Edge" + props.index} 
        style={{ position: 'absolute', top: y1, left: x1}}
        >
        <svg width={x2-x1+53} height={y2-y1+43}>
        <line x1={50} y1={40} x2={x2-x1+50} y2={y2-y1+40} style={edgeStyle}  />
        </svg>
        {numbers.map((n, i) =>
            <div key={"n"+i}
                className="RoadDive"
                style={{ position: 'absolute', top: ys[n]-y1+23, left: xs[n]-x1+33}}
                onClick={(event) => { handleClick(event, props.edge, n) }}
                >
                <RoadHouse
                    edge={props.edge}
                    i={n}
                    player={players[n]}
                    dragHandler={props.moveTrader}
                    radius={radius}
                    length={length}
                />
            
            </div>
        )}
        {numbers.map((n, i) => 
            <div key={"T" + i} style={{ position: 'absolute', top: ys[n] - y1+23, left: xs[n] - x1 +33}}
                >
            <Trader 
                source={"edge"}
                edge={props.edge}
                i={n}
                x={0}
                y={0}
                length={length}
                player={players[n]}
                type={types[n]}
            />
        </div>
        )}
    </div>

    );

}