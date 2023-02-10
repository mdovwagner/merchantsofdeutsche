import React from 'react';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

import { cities } from '../../static/cities';
import { edgeLookup, edges } from '../../static/edges';
import { playerColors, priviledgeColors } from '../../static/playerColors';
import { ItemTypes } from '../../static/constants';

export function Trader(props) {


    // Draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TRADER,
        item: {
            source: props.source,
            type: props.type,
            edge: props.edge,
            i: props.i
        },
        canDrag: () => canMoveTrader(),
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    let canMoveTrader = () => {
        // console.log(props.source)
        // console.log(props.i)
        // console.log(props.isMyTurn);
        // console.log(props.player, props.currentPlayer);
        return true; // BUG Why is props.player becomming null?
    }

    // Droppable (For Displacing)
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.TRADER,
            drop: (item, monitor) => dragHandler(item, props.edge, props.type, props.i),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [props.edge, props.type, props.i]
    )

    let dragHandler = (it, e, t, i) => {
        if (e !== null) {
            console.log("DISPLACE ME");
            props.displace(it, e, t, i);
        }
    }

    const radius = 15;
    const length = radius * 1.4 / 2;
    let x = props.x;
    let y = props.y;
    let fill = (props.player !== null) ? playerColors[props.player].color : "#B99976"
    

    return (<div ref={drop}><div
        ref={drag}
        style={{ strokeWidth: 2, 
                 stroke: "black", 
                 opacity: isDragging ? 0 : 1, 
                 cursor: 'grab',
                 position: 'relative',
                 visibility: (props.player !== null) ? "visible" : "hidden",
                 zIndex: 2
                }}
    >   <svg width={radius*2+4} height = {radius*2+4}>
        {(props.type === "merchant") ? (
        <ellipse cx={radius + 2} cy={radius + 2} rx={radius} ry={radius}  fill={fill} />
        ) :
        (<rect x={6.5} y={6.5} width={length * 2} height={length * 2}  fill={fill} />
        )
            }
        </svg>
        </div>
        </div>
    );
    

}

