
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
let hardDrop = 0;
let totalLinesCleared = 0;
let speed = 1000;
let timeoutID = null;
let nextTetromino = null;


let gameModel = new gameBoard(context);


function gameLoop(){
    timeoutID = setTimeout(() => {
        if (paused){
            clearTimeout(timeoutID)
            return
        }
        linesClearedNow = 0;
        hardDrop = 0;
        softDrop = 0;
        
        completedLine()  // check if there are any completed Lines now
        newLevel()
        renderGame()


        scoreElement.textContent = score;
        levelElement.textContent = level;
        linesElement.textContent = totalLinesCleared;

        gameLoop()
    }, speed)
}


let renderGame = (() => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    
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

function speedForLevel(level) {
    switch(level){
        case 1: return 1000
        case 2: return 500
        case 3: return 400
        case 4: return 300
        case 5: return 250
        case 6: return 200
        case 7: return 150
        case 7: return 100
        case 8: return 90
        case 9: return 80
        case 10: return 70
        case 11: return 60
        default: return 50
    }
}

let newLevel = (() => {
    if (totalLinesCleared >= level * 10 && totalLinesCleared > 0) { 
        speed = speedForLevel(level)
        level++
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

