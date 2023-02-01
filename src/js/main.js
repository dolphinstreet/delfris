
const canvas = document.querySelector("canvas")
let context = canvas.getContext("2d") 
context.scale(blockSize,blockSize) 

let intervalId = null;
let score = 0;
let linesClearedNow = 0;
let level = 1;
let softDrop = 0;
let hardDrop=0;
let totalLinesCleared =0;

const scoreElement = document.getElementById("score")
const levelElement = document.getElementById("level")
const linesElement = document.getElementById("lines")



let gameModel = new gameBoard(context);


intervalId = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    linesClearedNow=0;
    hardDrop=0;
    softDrop=0;
    newGame()
   
    scoreElement.textContent=score;
    levelElement.textContent=level;
    linesElement.textContent=totalLinesCleared;
    
    
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
    newLevel()
    gameModel.renderGame()
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
        linesClearedNow++;
        totalLinesCleared++;
        if (linesClearedNow===1){ score += 100*level }
        if (linesClearedNow===2){ score += 200*level }
        if (linesClearedNow===3){ score += 500*level }
        if (linesClearedNow===4){ score += 800*level }
        return true
    })

    for (let i = 0; i < gameModel.grid.length; i++) {
        if (filledLine(gameModel.grid[i])) {  // check every row of the grid
            gameModel.grid.splice(i, 1) // completed row : remove it
            gameModel.grid.unshift([0,0,0,0,0,0,0,0,0,0]) // add an empty array instead
        }
    }    
})

let newLevel = (() =>{
    let i = 10;
    if (totalLinesCleared%i===0 && totalLinesCleared>0){
        level++;
        i+=10;
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
            softDrop++; 
            score += softDrop   
            console.log(softDrop)
            
            break;
        
        case "Space":
            gameModel.hardDrop()
            break;
    }
} )
