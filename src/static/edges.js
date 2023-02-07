export const edges = [


    // Hansa
    { id: 0, source: 'Groningen', target: 'Emden', houses: 3, type: 'edge'},
    { id: 1, source: 'Emden', target: 'Osnabruck', houses: 3, type: 'edge'},
    { id: 2, source: 'Kampen', target: 'Osnabruck', houses: 4, type: 'edge'},

]

export function getEdgeLookup() {
    let edgeLookup = {}
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        if (!(edge.source in edgeLookup)) {
            edgeLookup[edge.source] = {}
        }
        if (!(edge.target in edgeLookup)) {
            edgeLookup[edge.target] = {}
        }
        edgeLookup[edge.source][edge.target] = edge.handleText || 0
        edgeLookup[edge.target][edge.source] = edge.handleText || 0
    }
    return edgeLookup
}

export const edgeLookup = getEdgeLookup()