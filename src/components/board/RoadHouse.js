import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../static/constants'



export default function RoadHouse(props) {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.TRADER,
            drop: (item, monitor) => dragHandler(item, props.edge, props.i, props.player),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [props.edge, props.i, props.player]
    )

    let dragHandler = (it, e, i ,p) => {
        console.log(it);
        props.dragHandler(it, e, i, p);
    }



    const fgStyle = {
        fill: "#B99976",
        strokeWidth: 2,
        stroke: "black"
    }

    const length = props.length;
    

    return (
        <div
            ref={drop}
            style={{ position: 'absolute', cursor: "pointer", zIndex: 1}}
        >
            <svg width={2*props.radius+4} height={2*props.radius+4}>
                <ellipse style={fgStyle} cx={props.radius+2} cy={props.radius+2} rx={props.radius} ry={props.radius} />
                <rect x={6.5} y={6.5} width={length * 2} height={length * 2} style={fgStyle} />
            </svg>
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }}
                />
            )}

        </div>
    )
}