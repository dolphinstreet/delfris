const rows = 20 
const columns = 10 
const blockSize = 30

const shapes = [
    [],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],      //I
        [0,0,0,0]
    ], 

    [
        [2,0,0],
        [2,2,2],        // J
        [0,0,0],
    ],

    [
        [0,0,3],
        [3,3,3],        // L
        [0,0,0],
    ],

    [
        [4,4],          //O
        [4,4],
    ],

    [
        [0,5,5],
        [5,5,0],        // S
        [0,0,0],
    ],

    [
        [0,6,0],
        [6,6,6],        // T
        [0,0,0],
    ],

    [
        [7,7,0],
        [0,7,7],        // Z
        [0,0,0],
    ],

]

const colors = [
    '#000000', // black for empty
    '#4b9dbd', // light blue for I
    '#d89230', // orange for J
    '#3648bc', // blue for L
    '#d5bf5c', // yellow for O
    '#ca4141', // red for S
    '#c751ad', // purple for T
    '#59c574' // green for Z
    
]



