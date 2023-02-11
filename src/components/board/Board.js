import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import React from 'react';

import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';

import { City } from './City';
import { Edge } from './Edge';

const data = {
    nodes: Object.values(cities),
    links: edges
}

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        
    }
}))

export function Board(props) {

    let classes = useStyles()

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
    }


    let highlightCity = (city) => {
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

    let unhighlightCity = (city) => {
        Object.values(this.cityRefs).forEach(ref => {
            ref.current.style.opacity = "100%";
            ref.current.style.strokeWidth = 2;
        });
        Object.values(this.edgeRefs).forEach(ref => {
            ref.current.style.opacity = "100%";
        });
    }



    let renderBackground = () => {
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

    let scale = 1;
    // const myStage = (props.myTurn && (props.stage === "score" || props.stage === "place"));
    // const oStyle = {
    //     opacity: (props.myTurn) ? "100%" : "70%",
    //     borderColor: (myStage) ? "black" : "#987554"
    // }
    const oStyle = {
        backgroundColor: "tan",
        border: 3,
        borderColor: "#987554",
        /* border-color: #664229; */
        borderRadius: 3,
        opacity: 70
    }

    return (<Paper className="section" style={oStyle}>
        <div className={classes.root}>
            {Object.values(edges).map((edge, i) =>
                <Edge key={"E" + i}
                    board={props.board}
                    edge={edge}
                    index={i}
                    moveTrader={props.moveTrader}
                    displace={props.displace}
                    // playCube = {props.playCube}
                    handleClick={handleEdgeClick}
                    currentPlayer={props.currentPlayer}
                />
            )}
            {Object.values(cities).map((city, i) =>
                <City key = {"C"+i}
                    board = {props.board}
                    city = {city}
                    index = {i}
                    claimOffice={props.claimOffice}
                    handleSpecial={props.handleSpecial}
                    currentPlayer={props.currentPlayer}
                />
            )}
        </div>
    {/* return (<Paper class="section" style={oStyle}>
        <div className={classes.root}>
        <svg width={650 * scale} height={450 * scale} viewBox="0 0 650 470" >
            <defs>
                <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Gamja+Flower|Xanh+Mono');</style>
            </defs>
            {renderBackground()}
            {Object.values(edges).map((edge, i) =>
                <Edge
                    board = {props.board}
                    edge = {edge}
                    index = {i}
                    // playCube = {props.playCube}
                    handleClick = {handleEdgeClick}
                />
            )}
            {Object.values(cities).map((city, i) =>
                <City 
                    board = {props.board}
                    city = {city}
                    index = {i}
                />
            )}
        </svg>
        </div> */}
    </Paper>)

}