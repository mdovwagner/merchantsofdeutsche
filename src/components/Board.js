import { Paper, Typography } from '@mui/material';
import React from 'react';

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';

const data = {
    nodes: Object.values(cities),
    links: edges
}

export class Board extends React.Component {

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.cityRefs = {}
        for (let city in cities) {
            this.cityRefs[city] = React.createRef();
        }
        this.edgeRefs = {}
        for (let edge in edges) {
            this.edgeRefs[edges[edge].source + "." + edges[edge].target] = React.createRef();
        }
    }

    renderEdge(edge, i) {
        const edgeStyle = {
            strokeWidth: 2,
            stroke: "black"
        }
        const fgStyle = {
            fill: "#B99976",
            strokeWidth: 2, 
            stroke: "black" 
        }
        let x1 = cities[edge.source].x;
        let y1 = cities[edge.source].y;
        let x2 = cities[edge.target].x;
        let y2 = cities[edge.target].y;

        let midX = (x1 + x2) / 2; // x1 + (x2-x1) / 2
        let midY = (y1 + y2) / 2;
        let margin = 0.25;
        const numbers = Array.from({ length: edge.houses }, (_, index) => index);
        const xs = numbers.map((n) => x1 + (x2 - x1) * (n+0.5) / edge.houses);
        const ys = numbers.map((n) => y1 + (y2 - y1) * (n+0.5) / edge.houses);
        
        const radius = 15;
        const length = radius * 1.4 / 2;
        
        return (<svg>
                <line key={"edge" + i} x1={x1} y1={y1} x2={x2} y2={y2} style={edgeStyle} ref={this.edgeRefs[edge.source + "." + edge.target]} />
            {numbers.map((n) => 
            <g>
                <ellipse style={fgStyle} cx={xs[n]} cy={ys[n]} rx={radius} ry={radius} />
                <rect x={xs[n] - length} y={ys[n] - length} width={length*2} height={length*2} style={fgStyle} />
            </g>
            )}
            </svg>

        );
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




    renderOffice(city, office, i, citySelected) {
        let dx = [-45, -25, -5, +15];
        let dy = [-20, -20, -20, -20];
        let move = "translate(" + (city.x + dx[i]) + " " + (city.y + dy[i]) + ") scale(0.2)"
        const officeExists = true;
        // const officeColor = (playerColors[i] || {}).houseBackground
        const officeColor = priviledgeColors[office.color]
        const officeStyle = {
            fill: officeColor,
            strokeWidth: 10,
            stroke: "black",
            visibility: (officeExists) ? "visible" : "hidden"
        }
        return (
            <g transform={move} style={officeStyle}>
                <path d="M 2 2 L 98 2 L 98 98 L 2 98 Z" />
            </g>
        )

    }

    renderCity(city, i) {
        const labelStyle = {
            fill: city.color,
        }
        const textStyle = {
            fontFamily: "Gamja Flower",
            strokeWidth: 0,
        }
        const fgStyle = {
            fill: "#B99976",
        }
        // const citySelected = this.props.selectedCities.includes(city.id);
        // if (citySelected) {
        //     labelStyle['stroke'] = 'orangered'
        //     fgStyle['stroke'] = 'orangered'
        // }
        const citySelected = true;

        let textWidth = city.id.length * 8;

        return (<svg key={"city" + i} //onClick={(event) => { this.props.selectCity(city.id) }}
            // onMouseEnter={e => this.props.highlightCity(city.id)}
            // onMouseLeave={e => this.unhighlightCity(city.id)}
            className="node"
            ref={this.cityRefs[city.id]}
            style={{ strokeWidth: 2, stroke: "black" }}
        >
            {/* <ellipse style={fgStyle} cx={city.x} cy={city.y} rx="40" ry="15" /> */}
            <rect x={city.x - textWidth / 2} y={city.y + 10} width={textWidth} height="20" style={labelStyle}>{city.id}</rect>
            <text x={city.x} y={city.y + 25} textAnchor="middle" style={textStyle}>{city.id}</text>
            {city.offices.map((office, i) => 
                this.renderOffice(city, office, i, citySelected)
            )}
        </svg>
            // <City
            //     selectedCities={this.props.selectedCities}
            //     cityStatus={this.props.cityStatus}
            //     city={city}
            // />
        );
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
                    this.renderEdge(edge, i)
                )}
                {/* Nodes */}
                {Object.values(cities).map((city, i) =>
                    this.renderCity(city, i)
                )}
            </svg>
        </Paper>)

    }
}