import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

import { cities } from '../static/cities';
import { edgeLookup, edges } from '../static/edges';
import { playerColors, priviledgeColors } from '../static/playerColors';
import { ItemTypes } from '../static/constants';

export function Trader(props) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TRADER,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))


    let length = props.length;
    let x = props.x;
    let y = props.y;
    let fill = (props.player) ? playerColors[props.player].color : "#B99976"
    

    return (<div
        ref={drag}
        style={{ strokeWidth: 2, 
                 stroke: "black", 
                 opacity: isDragging ? 0.5 : 1, 
                 cursor: 'grab',
                 position: 'absolute', top: (y-length), left: (x-length),
                 zIndex: 1
                }}
    >   <svg width={length*2+4} height = {length*2+4}>
        <rect x={2} y={2} width={length * 2} height={length * 2}  fill={fill} />
        </svg>
        </div>
    );
    

}

