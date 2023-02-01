const rows = 20 
const columns = 10 
const blockSize = 30


const SHAPES = [
    {name: "empty",
    matrix : [],
    color : "rgb(189,192,177)",
    //colorBorder : "rgb(189,192,177)"
    },

    {name: "I",
    matrix : [[0,0,0,0],
             [1,1,1,1],
             [0,0,0,0],     
             [0,0,0,0]],
    color :  "rgb(137,157,62)",
    colorBorder : "rgb(103,152,62)"
    },
    {name: "J",
    matrix : [  [2,0,0],
                [2,2,2],   
                [0,0,0]],
    color : "rgb(86,163,189)",
    colorBorder : "rgb(86,126,189)"
    },
    {name: "L",
    matrix : [  [0,0,3],
                [3,3,3],   
                [0,0,0]],
    color :  "rgb(238,197,67)",
    colorBorder : "rgb(238,168,67)" 
    
    },
    {name: "O",
    matrix :[[4,4],
             [4,4]],
    color :  "rgb(231,128,63)",
    colorBorder : "rgb(231,94,63)"
    },

    {name: "S",
    matrix :[[0,5,5],
             [5,5,0],   
             [0,0,0]],
    color :  "rgb(228,94,87)",
    colorBorder : "rgb(228,56,87)"
    },
    {name: "T",
    matrix :[[0,6,0],
             [6,6,6],   
             [0,0,0]],
    color :  "rgb(140,62,244)",
    colorBorder : "rgb(140,31,244)"
    },
    {name: "Z",
    matrix :[[7,7,0],
             [0,7,7],   
             [0,0,0]],
    color :  "rgb(65,92,212)",
    colorBorder : "rgb(65,63,212)"
    }
]