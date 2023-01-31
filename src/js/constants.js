const rows = 20 
const columns = 10 
const blockSize = 30

let SHAPES = [
    {name: "empty",
    matrix : [],
    color : "rgb(0,0,0)"  // "000000",
    //rotation :     
    
    },

    {name: "I",
    matrix : [[0,0,0,0],
             [1,1,1,1],
             [0,0,0,0],     
             [0,0,0,0]],
    color :  "red"//"#4b9dbd",
    //rotation :     
    
    },
    {name: "J",
    matrix : [  [2,0,0],
                [2,2,2],   
                [0,0,0]],
    color :  "yellow"//"#d89230",
    //rotation :     
    
    },
    {name: "L",
    matrix : [  [0,0,3],
                [3,3,3],   
                [0,0,0]],
    color :  "green"//"#3648bc",
    //rotation :     
    
    },
    {name: "O",
    matrix :[[4,4],
             [4,4]],
    color :  "blue"//"#d5bf5c",
    //rotation :     
    
    },
    {name: "S",
    matrix :[[0,5,5],
             [5,5,0],   
             [0,0,0]],
    color :  "orange"//"#ca4141",
    //rotation :     
    
    },
    {name: "T",
    matrix :[[0,6,0],
             [6,6,6],   
             [0,0,0]],
    color :  "purple"//"#c751ad",
    //rotation :     
    
    },
    {name: "Z",
    matrix :[[7,7,0],
             [0,7,7],   
             [0,0,0]],
    color :  "pink"//"#59c574",
    //rotation :     
    
    }
]