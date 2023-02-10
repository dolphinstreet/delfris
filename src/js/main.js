
const canvas = document.querySelector("canvas")
const scoreElement = document.getElementById("score")
const levelElement = document.getElementById("level")
const linesElement = document.getElementById("lines")
const nextElement = document.getElementById("next")
const nextDiv = document.getElementById("next")
const colNext = 4
const rowNext = 4
let cellesNext = []


let context = canvas.getContext("2d") 
context.scale(blockSize,blockSize) 
let intervalId = null;
let score = 0;
let linesClearedNow = 0;
let level = 1;
let softDrop = 0;
let hardDrop=0;
let totalLinesCleared=0;
let speed = 1000;
let timeoutID=null;
let nextTetromino=null;


let gameModel = new gameBoard(context);


function startGame(){
    timeoutID = setTimeout(() =>{

    if (paused){
        clearTimeout(timeoutID)
        return
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    linesClearedNow=0;
    hardDrop=0;
    softDrop=0;
    newGame()

    scoreElement.textContent=score;
    levelElement.textContent=level;
    linesElement.textContent=totalLinesCleared;

    startGame()
    
    
    },speed)
}


let newGame = (() => {
    completedLine()  // check if there are any completed Lines now
    newLevel()
    
    gameModel.renderGame()
    if (gameModel.currentPiece === null){
        gameModel.shiftPiece()
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
    const speedForLevel = [
            1000,
            500,
            400,
            300,
            250,
            200,
            150,
            100,
            90,
            80,
            70,
            60,
            50
    ]

    if (totalLinesCleared === level*10 && totalLinesCleared > 0){
        if (level <= speedForLevel.length) {
            speed = speedForLevel(level++)
        }
    }
})


createGrid()


function createGrid(){
    for (let i=0; i<colNext*rowNext; i++){
        createCell()
    }
}

function createCell(){
    const div = document.createElement("div")
    div.classList.add("cellNext")
    nextDiv.append(div)
    cellesNext.push(div)
    // console.log("cellesnext", cellesNext)
}

