import { cities } from '../static/cities.js';
import { edgeLookup, edges } from '../static/edges.js';

function BoardModel() {


    var cityStates = {};
    Object.values(cities).forEach((city) =>{
        cityStates[city.id] = {player: null, type: null};
        cityStates[city.id].player = Array(city.offices.length).fill(null);
        cityStates[city.id].type = Array(city.offices.length).fill("");
    });

    var roadStates = {};
    Object.values(edges).forEach((edge) => {
        roadStates[edge.source + edge.target] = {}
        roadStates[edge.source + edge.target]["houses"] = {}
        roadStates[edge.source + edge.target]["houses"]["player"] = Array(edge.houses).fill(null);
        roadStates[edge.source + edge.target]["houses"]["type"] = Array(edge.houses).fill("");
        roadStates[edge.source + edge.target]["source"] = edge.source
        roadStates[edge.source + edge.target]["target"] = edge.target
    });

    return (
        {
            cities: cityStates,
            roads: roadStates
        }
    );
}

export default BoardModel