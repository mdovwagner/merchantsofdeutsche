export const edges = [


    // Hansa
    { id: 0, source: 'Groningen', target: 'Emden', houses: 3, type: 'edge'},
    { id: 1, source: 'Emden', target: 'Osnabruck', houses: 3, type: 'edge'},
    { id: 2, source: 'Kampen', target: 'Osnabruck', houses: 4, type: 'edge'},
    { id: 3, source: 'Kampen', target: 'Arnheim', houses: 3, type: 'edge'},
    { id: 4, source: 'Arnheim', target: 'Munster', houses: 3, type: 'edge'},
    { id: 5, source: 'Arnheim', target: 'Duisburg', houses: 3, type: 'edge'},
    { id: 6, source: 'Duisburg', target: 'Dortmund', houses: 2, type: 'edge'},
    { id: 7, source: 'Osnabruck', target: 'Bremen', houses: 3, type: 'edge'},
    { id: 8, source: 'Munster', target: 'Minden', houses: 3, type: 'edge'},
    { id: 9, source: 'Dortmund', target: 'Paderborn', houses: 3, type: 'edge'},
    { id:10, source: 'Coellen', target: 'Warburg', houses: 4, type: 'edge'},
    { id:11, source: 'Bremen', target: 'Minden', houses: 3, type: 'edge'},
    { id:12, source: 'Minden', target: 'Paderborn', houses: 3, type: 'edge'},
    { id:13, source: 'Paderborn', target: 'Warburg', houses: 3, type: 'edge'},
    { id:14, source: 'Bremen', target: 'Hannover', houses: 3, type: 'edge'},
    { id:15, source: 'Paderborn', target: 'Hildesheim', houses: 3, type: 'edge'},
    { id:16, source: 'Stade', target: 'Hamburg', houses: 3, type: 'edge'},
    { id:17, source: 'Bremen', target: 'Hamburg', houses: 4, type: 'edge'},
    { id:18, source: 'Hamburg', target: 'Lubeck', houses: 3, type: 'edge'},
    { id:19, source: 'Hamburg', target: 'Luneburg', houses: 4, type: 'edge'},
    { id:20, source: 'Hannover', target: 'Luneburg', houses: 3, type: 'edge'},
    { id:21, source: 'Luneburg', target: 'Perleberg', houses: 3, type: 'edge'},
    { id:22, source: 'Perleberg', target: 'Stendal', houses: 3, type: 'edge'},
    { id:23, source: 'Minden', target: 'Brunswick', houses: 4, type: 'edge'},
    { id:24, source: 'Brunswick', target: 'Stendal', houses: 4, type: 'edge'},
    { id:25, source: 'Hildesheim', target: 'Goslar', houses: 3, type: 'edge'},
    { id:26, source: 'Stendal', target: 'Magdeburg', houses: 3, type: 'edge'},
    { id:27, source: 'Goslar', target: 'Magdeburg', houses: 2, type: 'edge'},
    { id:28, source: 'Goslar', target: 'Quedlinburg', houses: 4, type: 'edge'},
    { id:29, source: 'Gottingen', target: 'Quedlinburg', houses: 3, type: 'edge'},
    { id:30, source: 'Quedlinburg', target: 'Halle', houses: 4, type: 'edge'},
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