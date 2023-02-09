import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';
import { Office } from './Office';
import { Trader } from './Trader';


export function City(props) {


    const x = 50;
    const y = 40;

    let renderOffice = (office, i, citySelected) => {
        let dx = [-45, -25, -5, +15];
        let dy = [-20, -20, -20, -20];
        let move = "translate(" + (x + dx[i]) + " " + (y + dy[i]) + ") scale(0.2)"
        const officeExists = true;
        const officeColor = priviledgeColors[office.color]

        const player = props.board.cities[props.city.id].player[i];
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


    const labelStyle = {
        fill: props.city.color,
    }
    const textStyle = {
        fontFamily: "Gamja Flower",
        strokeWidth: 0,
    }
    const fgStyle = {
        fill: "#B99976",
    }
    // const citySelected = props.selectedCities.includes(props.city.id);
    // if (citySelected) {
    //     labelStyle['stroke'] = 'orangered'
    //     fgStyle['stroke'] = 'orangered'
    // }
    const citySelected = true;

    let textWidth = props.city.id.length * 8;
    const top = props.city.y;
    const left = props.city.x;
    const radius = 15;
    const length = radius * 1.4 / 2;

    const players = props.board.cities[props.city.id].player;
    let dx = [-45, -25, -5, +15];

    return (
        <div key={"city" + props.index} style={{ position: 'absolute', top, left }}>
        <svg  width={105} height={120}//onClick={(event) => { props.selectCity(props.city.id) }}
        // onMouseEnter={e => props.highlightCity(props.city.id)}
        // onMouseLeave={e => unhighlightCity(props.city.id)}
        style={{ strokeWidth: 2, stroke: "black" }}
    >
        <defs>
            <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Gamja+Flower|Xanh+Mono');</style>
        </defs>
        <ellipse style={fgStyle} cx={x} cy={y} rx="40" ry="15" />
        <rect x={x - textWidth / 2} y={y + 10} width={textWidth} height="20" style={labelStyle}>{props.city.id}</rect>
        <text x={x} y={y + 25} textAnchor="middle" style={textStyle}>{props.city.id}</text>
        </svg>
        {props.city.offices.map((office, i) =>
            <div key={"Of"+i}>
            <Office 
                office={office}
                i={i}
                board={props.board}
                city={props.city}
                dragHandler={props.claimOffice}

            />
            </div>
        )}
        {props.city.offices.map((office, i) =>
            <div key={"OfficeT" + i}
                style={{ position: 'absolute', top: 0, left: 0 + dx[i] }}>
                <Trader
                    edge={null}
                    i={i}
                    x={50 - 2}
                    y={40 - 2}
                    length={length}
                    player={players[i]}
                />
            </div>
        )}
    </div>
    );

}