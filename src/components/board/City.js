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

    const yellowCities = ["Groningen", "Coellen", "Stade", "Lubeck", "Gottingen", "Halle"];
    let handleClick = (event, cityName) => {
        if (yellowCities.includes(cityName)) {
            props.handleSpecial(cityName);
        }
    }


    const labelStyle = {
        fill: props.city.color,
    }
    const textStyle = {
        fontFamily: "Gamja Flower",
        strokeWidth: 0,
    }
    const isSpecial = yellowCities.includes(props.city.id);
    const fgStyle = {
        fill: (isSpecial) ? "#FFDF00" : "#B99976",
        cursor: (isSpecial) ? "pointer" : "default",
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
    const types = props.board.cities[props.city.id].type;
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
        <ellipse style={fgStyle} cx={x} cy={y} rx="40" ry="15" onClick={(event) => { handleClick(event, props.city.id) }} />
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
                style={{ position: 'absolute', top: 23, left: 33 + dx[i] }}>
                <Trader
                    source={"city"}
                    edge={null}
                    i={i}
                    x={0}
                    y={0}
                    length={length}
                    player={players[i]}
                    type={types[i]}
                    currentPlayer={props.currentPlayer}
                />
            </div>
        )}
    </div>
    );

}