
const canvas = document.querySelector("canvas")
let context = canvas.getContext("2d") 
let intervalId = null;

context.scale(blockSize,blockSize) 

let gameModel = new gameBoard(context);

let score = 0;

intervalId =setInterval(() => {
    newGame()
},500)


let bag = []
let bagOfShapes = structuredClone(SHAPES)
bagOfShapes.shift()

function getTetromino(){
    if (bag.length===0){
        bagOfShapes = structuredClone(SHAPES)
        bagOfShapes.shift()
        for (let i = bagOfShapes.length; i>0; i--){
            let randomIndex = Math.floor(Math.random() * i);                          
            bag.push(bagOfShapes[randomIndex]);
            bagOfShapes.splice(randomIndex,1)
        } 
    }
    return bag.shift()  // return first element of bag
}


let newGame = (() => {
    completedLine()  // check if there are any completed Lines now
    if (gameModel.currentPiece === null){
       const newTetromino = new Tetromino (getTetromino().matrix,context)
        gameModel.currentPiece = newTetromino;
        gameModel.fallingDown()
    } else {
        gameModel.fallingDown()
    }


})


let completedLine = (() => {
    const filledLine = ((row) => {
        for (let element of row) { // for loop for arrays, check every cell of the row
            if (element === 0) {  // if there's an empty cell then it's not a complete line
                return false
            }
        }
        return true
    })

    for (let i = 0; i < gameModel.grid.length; i++) {
        if (filledLine(gameModel.grid[i])) {  // check every row of the grid
            gameModel.grid.splice(i, 1) // completed row : remove it
            gameModel.grid.unshift([0,0,0,0,0,0,0,0,0,0]) // add an empty array instead
        }
    }    
})

window.addEventListener('keydown', (event) => {
    event.preventDefault()
    switch (event.code) {
        
        case 'ArrowLeft':
            gameModel.move(false)
            break;
    
        case 'ArrowRight':
            gameModel.move(true)
            break;

        case 'ArrowUp':
            gameModel.rotate()
            break;

        case 'ArrowDown':
            gameModel.fallingDown()
            break;
        
        case "Space":
            gameModel.hardDrop()
            break;
    }
} )
