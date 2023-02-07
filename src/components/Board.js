import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';

import { City } from './City';
import { Edge } from './Edge';

const data = {
    nodes: Object.values(cities),
    links: edges
}

export class Board extends React.Component {

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element

        this.state = { selectedOnEdges: {"KampenOsnabruck": 1}, selectedOnCities: {} };



        this.cityRefs = {}
        for (let city in cities) {
            this.cityRefs[city] = React.createRef();
        }
        this.edgeRefs = {}
        for (let edge in edges) {
            this.edgeRefs[edges[edge].source + "." + edges[edge].target] = React.createRef();
        }
    }


    handleEdgeClick = (edge, i) => {
        // If current action
        this.props.playCube(edge.source + edge.target, i);
    }


    highlightCity(city) {
        Object.values(this.cityRefs).forEach(ref => {
            ref.current.style.opacity = "100%";
            ref.current.style.stroke = 2;
        });
        // this.props.selectedCities.forEach(sel => {
        //     this.cityRefs[sel].current.style.opacity = "100%";
        // })
        Object.values(this.edgeRefs).forEach(ref => {
            ref.current.style.opacity = "0%";
        });
        this.cityRefs[city].current.style.opacity = "100%"
        this.cityRefs[city].current.style.strokeWidth = 4
        Object.keys(edgeLookup[city]).forEach(neighbor => {
            this.cityRefs[neighbor].current.style.opacity = "100%";
        });

        let neighborEdges1 = Object.keys(edgeLookup[city]).map(neighbor => neighbor + "." + city);
        let neighborEdges2 = Object.keys(edgeLookup[city]).map(neighbor => city + "." + neighbor);
        let neighborEdges = neighborEdges1.concat(neighborEdges2).filter(edge => (edge in this.edgeRefs));
        neighborEdges.forEach(edge => {
            this.edgeRefs[edge].current.style.opacity = "100%";
        })
    }

    unhighlightCity(city) {
        Object.values(this.cityRefs).forEach(ref => {
            ref.current.style.opacity = "100%";
            ref.current.style.strokeWidth = 2;
        });
        Object.values(this.edgeRefs).forEach(ref => {
            ref.current.style.opacity = "100%";
        });
    }



    renderBackground() {
        const bgStyle = {
            fill: "magenta"
        }
        return (
            <svg>
                {/* <path d="M 77 19 Q 150 -1 218 16 Q 236 52 207 84 Q 160 94 134 121 Q 94 190 72 265 Q 72 265 72 265 Q 103 312 105 334 Q 100 365 69 369 L 10 367 Q -5 264 10 154 Q 25 67 77 19 Z"
                    style={{fill: "magenta"}}
                />
                <path d="M 207 84 Q 160 94 134 121 Q 94 190 72 265 Q 115 231 166 243 Q 168.5 287.5 157 310 Q 138.5 333 106 334 Q 107.5 350 109 366 Q 242 376 250 276 Q 293 102 207 84 Z"
                    style={{fill: "green"}}
                /> */}
            </svg>
        );
    }

    render() {
        console.log(this.state);
        let scale = 1;
        // const myStage = (this.props.myTurn && (this.props.stage === "score" || this.props.stage === "place"));
        // const oStyle = {
        //     opacity: (this.props.myTurn) ? "100%" : "70%",
        //     borderColor: (myStage) ? "black" : "#987554"
        // }
        const oStyle = {
            opacity: "100%",
            borderColor: "black"
        }

        return (<Paper class="section" style={oStyle}>
            <svg width={650 * scale} height={450 * scale} viewBox="0 0 650 470" >
                <defs>
                    <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Gamja+Flower|Xanh+Mono');</style>
                </defs>
                {this.renderBackground()}
                {/* Edges */}
                {Object.values(edges).map((edge, i) =>
                    <Edge
                        ref={this.edgeRefs[edge.source + "." + edge.target]}
                        board = {this.props.board}
                        edge = {edge}
                        index = {i}
                        // playCube = {this.props.playCube}
                        handleClick = {this.handleEdgeClick}
                    />
                )}
                {/* Nodes */}
                {Object.values(cities).map((city, i) =>
                    <City 
                        ref={this.cityRefs[city.id]}
                        board = {this.props.board}
                        city = {city}
                        index = {i}
                    />
                )}
            </svg>
        </Paper>)

    }
}