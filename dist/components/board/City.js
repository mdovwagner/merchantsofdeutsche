import { Paper, Typography } from '@mui/material';
import React from 'react';
import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';
import { Office } from './Office';
import { Trader } from './Trader';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function City(props) {
  const x = 50;
  const y = 40;
  const yellowCities = ["Groningen", "Coellen", "Stade", "Lubeck", "Gottingen", "Halle"];
  let handleClick = (event, cityName) => {
    if (yellowCities.includes(cityName)) {
      props.handleSpecial(cityName);
    }
  };
  const labelStyle = {
    fill: props.city.color
  };
  const textStyle = {
    fontFamily: "Gamja Flower",
    strokeWidth: 0
  };
  const isSpecial = yellowCities.includes(props.city.id);
  const fgStyle = {
    fill: isSpecial ? "#FFDF00" : props.city.color,
    cursor: isSpecial ? "pointer" : "default"
  };
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
  const numOffices = props.city.offices.length;
  return /*#__PURE__*/_jsxs("div", {
    style: {
      position: 'absolute',
      top,
      left
    },
    children: [/*#__PURE__*/_jsxs("svg", {
      width: 120,
      height: 120 //onClick={(event) => { props.selectCity(props.city.id) }}
      // onMouseEnter={e => props.highlightCity(props.city.id)}
      // onMouseLeave={e => unhighlightCity(props.city.id)}
      ,
      style: {
        strokeWidth: 2,
        stroke: "black"
      },
      children: [/*#__PURE__*/_jsx("defs", {
        children: /*#__PURE__*/_jsx("style", {
          type: "text/css",
          children: "@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Gamja+Flower|Xanh+Mono');"
        })
      }), /*#__PURE__*/_jsx("rect", {
        rx: "5",
        style: fgStyle,
        x: x - numOffices * 15,
        y: y - 30,
        width: numOffices * 30,
        height: 40,
        onClick: event => {
          handleClick(event, props.city.id);
        }
      }), /*#__PURE__*/_jsx("rect", {
        x: x - textWidth / 2,
        y: y + 10,
        width: textWidth,
        height: "20",
        style: labelStyle,
        children: props.city.id
      }), /*#__PURE__*/_jsx("text", {
        x: x,
        y: y + 25,
        textAnchor: "middle",
        style: textStyle,
        children: props.city.id
      })]
    }), props.city.offices.map((office, i) => /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Office, {
        office: office,
        i: i,
        board: props.board,
        city: props.city,
        numOffices: props.city.offices.length,
        dragHandler: props.claimOffice,
        hasGold: props.city.gold === office.color
      })
    }, "Of" + i)), props.city.offices.map((office, i) => /*#__PURE__*/_jsx("div", {
      style: {
        position: 'absolute',
        top: 23,
        left: 33 + numOffices * -15 + 15 + i * 30
      },
      children: /*#__PURE__*/_jsx(Trader, {
        source: "city",
        edge: null,
        i: i,
        x: 0,
        y: 0,
        length: length,
        player: players[i],
        type: types[i],
        currentPlayer: props.currentPlayer
      })
    }, "OfficeT" + i))]
  }, "city" + props.index);
}