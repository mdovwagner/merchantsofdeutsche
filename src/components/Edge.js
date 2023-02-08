import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';




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

        let fills = this.props.board.roads[this.props.edge.source + this.props.edge.target].houses.player.map((p) => {
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

        return (<svg>
            <line key={"edge" + this.props.index} x1={x1} y1={y1} x2={x2} y2={y2} style={edgeStyle}  />
            {numbers.map((n) =>
                <g onClick={(event) => { this.props.handleClick(this.props.edge, "trader", n) }}>
                    <ellipse style={fgStyle} cx={xs[n]} cy={ys[n]} rx={radius} ry={radius} />
                    <rect x={xs[n] - length} y={ys[n] - length} width={length * 2} height={length * 2} style={houseStyle} fill={fills[n]} />
                </g>
            )}
        </svg>

        );
    }

}