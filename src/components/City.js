import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';


export class City extends React.Component {

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.x = 50;
        this.y = 40;
    }

   




    renderOffice(office, i, citySelected) {
        let dx = [-45, -25, -5, +15];
        let dy = [-20, -20, -20, -20];
        let move = "translate(" + (this.x + dx[i]) + " " + (this.y + dy[i]) + ") scale(0.2)"
        const officeExists = true;
        const officeColor = priviledgeColors[office.color]

        const player = this.props.board.cities[this.props.city.id].player[i];
        const playerColor = (playerColors[player] || {}).color;
        const playerStyle = {
            fill: playerColor,
            visibility: (player) ? "visible" : "hidden"
        }
        const officeStyle = {
            fill: officeColor,
            strokeWidth: 10,
            stroke: "black",
            visibility: (officeExists) ? "visible" : "hidden"
        }
        return (
            <g key={"Office"+i} transform={move} >
                <path style={officeStyle} d="M 2 2 L 98 2 L 98 98 L 2 98 Z" />
                <path style={playerStyle} d="M 15 15 L 85 15 L 85 85 L 15 85 Z" />
            </g>
        )

    }

    render() {
        const labelStyle = {
            fill: this.props.city.color,
        }
        const textStyle = {
            fontFamily: "Gamja Flower",
            strokeWidth: 0,
        }
        const fgStyle = {
            fill: "#B99976",
        }
        // const citySelected = this.props.selectedCities.includes(this.props.city.id);
        // if (citySelected) {
        //     labelStyle['stroke'] = 'orangered'
        //     fgStyle['stroke'] = 'orangered'
        // }
        const citySelected = true;

        let textWidth = this.props.city.id.length * 8;
        const top = this.props.city.y;
        const left = this.props.city.x;
        return (
            <div key={"city" + this.props.index} style={{ position: 'absolute', top, left }}>
            <svg  width={105} height={120}//onClick={(event) => { this.props.selectCity(this.props.city.id) }}
            // onMouseEnter={e => this.props.highlightCity(this.props.city.id)}
            // onMouseLeave={e => this.unhighlightCity(this.props.city.id)}
            style={{ strokeWidth: 2, stroke: "black" }}
        >
            <defs>
                <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Gamja+Flower|Xanh+Mono');</style>
            </defs>
            <ellipse style={fgStyle} cx={this.x} cy={this.y} rx="40" ry="15" />
            <rect x={this.x - textWidth / 2} y={this.y + 10} width={textWidth} height="20" style={labelStyle}>{this.props.city.id}</rect>
            <text x={this.x} y={this.y + 25} textAnchor="middle" style={textStyle}>{this.props.city.id}</text>
            {this.props.city.offices.map((office, i) =>
                this.renderOffice(office, i, citySelected)
            )}
        </svg>
        </div>
        );
    }

}