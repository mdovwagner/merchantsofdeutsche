import { Paper, Typography } from '@mui/material';
import React from 'react';
import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';
import { City } from './City';
import { Edge } from './Edge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const data = {
  nodes: Object.values(cities),
  links: edges
};
export function Board(props) {
  // this.cityRefs = {}
  // for (let city in cities) {
  //     this.cityRefs[city] = React.createRef();
  // }
  // this.edgeRefs = {}
  // for (let edge in edges) {
  //     this.edgeRefs[edges[edge].source + "." + edges[edge].target] = React.createRef();
  // }

  let handleEdgeClick = (edge, type, i) => {
    // If current action
    props.playCube(edge.source + edge.target, type, i);
  };
  let highlightCity = city => {
    Object.values(this.cityRefs).forEach(ref => {
      ref.current.style.opacity = "100%";
      ref.current.style.stroke = 2;
    });
    // props.selectedCities.forEach(sel => {
    //     this.cityRefs[sel].current.style.opacity = "100%";
    // })
    Object.values(this.edgeRefs).forEach(ref => {
      ref.current.style.opacity = "0%";
    });
    this.cityRefs[city].current.style.opacity = "100%";
    this.cityRefs[city].current.style.strokeWidth = 4;
    Object.keys(edgeLookup[city]).forEach(neighbor => {
      this.cityRefs[neighbor].current.style.opacity = "100%";
    });
    let neighborEdges1 = Object.keys(edgeLookup[city]).map(neighbor => neighbor + "." + city);
    let neighborEdges2 = Object.keys(edgeLookup[city]).map(neighbor => city + "." + neighbor);
    let neighborEdges = neighborEdges1.concat(neighborEdges2).filter(edge => edge in this.edgeRefs);
    neighborEdges.forEach(edge => {
      this.edgeRefs[edge].current.style.opacity = "100%";
    });
  };
  let unhighlightCity = city => {
    Object.values(this.cityRefs).forEach(ref => {
      ref.current.style.opacity = "100%";
      ref.current.style.strokeWidth = 2;
    });
    Object.values(this.edgeRefs).forEach(ref => {
      ref.current.style.opacity = "100%";
    });
  };
  let renderBackground = () => {
    const bgStyle = {
      fill: "magenta"
    };
    return /*#__PURE__*/_jsx("svg", {});
  };
  let scale = 1;
  // const myStage = (props.myTurn && (props.stage === "score" || props.stage === "place"));
  // const oStyle = {
  //     opacity: (props.myTurn) ? "100%" : "70%",
  //     borderColor: (myStage) ? "black" : "#987554"
  // }
  const oStyle = {
    background: "tan",
    border: 3,
    borderColor: "#987554",
    /* border-color: #664229; */
    borderRadius: 3,
    position: 'absolute',
    top: 55,
    opacity: 70
  };
  return /*#__PURE__*/_jsx(Paper, {
    className: "section",
    style: oStyle,
    children: /*#__PURE__*/_jsxs("div", {
      children: [Object.values(edges).map((edge, i) => /*#__PURE__*/_jsx(Edge, {
        board: props.board,
        edge: edge,
        index: i,
        moveTrader: props.moveTrader,
        displace: props.displace
        // playCube = {props.playCube}
        ,
        handleClick: handleEdgeClick,
        currentPlayer: props.currentPlayer
      }, "E" + i)), Object.values(cities).map((city, i) => /*#__PURE__*/_jsx(City, {
        board: props.board,
        city: city,
        index: i,
        claimOffice: props.claimOffice,
        handleSpecial: props.handleSpecial,
        currentPlayer: props.currentPlayer
      }, "C" + i))]
    })
  });
}