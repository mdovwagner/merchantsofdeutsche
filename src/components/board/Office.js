import { useDrop } from "react-dnd";
import { ItemTypes } from "../../static/constants";
import { playerColors, priviledgeColors } from "../../static/playerColors";

export function Office(props) {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.TRADER,
            drop: (item, monitor) => dragHandler(item, props.city.id, props.office, props.i),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [props.city.id, props.office, props.i]
    )

    let dragHandler = (it, c, o, i) => {
        console.log(c,o,i);
        props.dragHandler(it, c, o, i);
    }

    const x = 50;
    const y = 40;
    const radius = 15;
    const length = radius * 1.4 / 2;

    let dx = [-45, -25, -5, +15];
    let dy = [-20, -20, -20, -20];
    let move = "translate(" + (x + dx[props.i]) + " " + (y + dy[props.i]) + ")"
    const officeExists = true;
    const officeColor = priviledgeColors[props.office.color]

    const player = props.board.cities[props.city.id].player[props.i];
    const playerColor = (playerColors[player] || {}).color;
    const playerStyle = {
        fill: playerColor,
        visibility: (player) ? "visible" : "hidden"
    }
    const officeStyle = {
        fill: officeColor,
        strokeWidth: 2,
        stroke: "black",
        visibility: (officeExists) ? "visible" : "hidden"
    }
    return (
        <div
            ref={drop}
            key={"Office" + props.i}
            style={{ position: 'absolute', top: 23, left: 33+dx[props.i]}}
        >
            <svg width={2 * radius + 4} height={2 * radius + 4}>
                <rect x={6.5} y={6.5} width={length * 2} height={length * 2} style={officeStyle} />
            </svg>
        </div>
    )


}