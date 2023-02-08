import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';
import { Trader } from './Trader';




export class Edge extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const edgeStyle = {
            strokeWidth: 2,
            stroke: "black"
        }
        const fgStyle = {
            fill: "#B99976",
            strokeWidth: 2,
            stroke: "black"
        }
        const houseStyle = {
            strokeWidth: 2,
            stroke: "black"
        }

        let players = this.props.board.roads[this.props.edge.source + this.props.edge.target].houses.player.map((p) => {
            return p;
        })
        let fills = players.map((p) => {
            return (p) ? playerColors[p].color : "#B99976";
        })

        let x1 = cities[this.props.edge.source].x;
        let y1 = cities[this.props.edge.source].y;
        let x2 = cities[this.props.edge.target].x;
        let y2 = cities[this.props.edge.target].y;

        let midX = (x1 + x2) / 2; // x1 + (x2-x1) / 2
        let midY = (y1 + y2) / 2;
        let margin = 0.2;
        let x1m = x1 + margin * (x2 - x1)
        let y1m = y1 + margin * (y2 - y1)
        let x2m = x2 - margin * (x2 - x1)
        let y2m = y2 - margin * (y2 - y1)
        const numbers = Array.from({ length: this.props.edge.houses }, (_, index) => index);
        const xs = numbers.map((n) => x1m + (x2m - x1m) * (n + 0.5) / this.props.edge.houses);
        const ys = numbers.map((n) => y1m + (y2m - y1m) * (n + 0.5) / this.props.edge.houses);

        const radius = 15;
        const length = radius * 1.4 / 2;

        // const xsInside = 
        
        return (<div key={"Edge" + this.props.index} 
            style={{ position: 'absolute', top: y1, left: x1}}
            >
            <svg width={x2-x1+53} height={y2-y1+43}>
            <line x1={50} y1={40} x2={x2-x1+50} y2={y2-y1+40} style={edgeStyle}  />
            </svg>
            {numbers.map((n, i) =>
                <div key={"n"+i}
                    style={{ position: 'absolute', top: ys[n]-y1, left: xs[n]-x1}}
                    >
                    <svg >
                    <ellipse style={fgStyle} cx={50} cy={40} rx={radius} ry={radius} />
                    </svg>
                
                </div>
            )}
            {numbers.map((n, i) => 
                <div key={"T" + i} style={{ position: 'absolute', top: ys[n] - y1, left: xs[n] - x1 }}
                    onClick={(event) => { this.props.handleClick(this.props.edge, "trader", n) }}>
                <Trader 
                    x={50-2}
                    y={40-2}
                    length={length}
                    player={players[n]}
                />
            </div>
            )}
        </div>

        );
    }

}