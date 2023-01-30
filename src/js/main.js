
const canvas = document.querySelector("canvas")
let context = canvas.getContext("2d") 
let intervalId = null;

context.scale(blockSize,blockSize) 

document.addEventListener("keydown")


let gameModel = new gameBoard(context);

let score = 0;

intervalId =setInterval(() => {
    newGame()
},500)

//let randomGenerator = {
//    bag : [],
//    getTetromino(){
//        if (this.bag.length===0){
//            this.bag=this.generateNewBag()
//        }
//        return this.bag.shift()
//    },
//    generateNewBag(){
//        let tetrominos = shapes;
//        let bag = []
//
//        for (let i = 7; i>0; i--){
//            let tetrominoIndex = Math.floor(Math.random() * i);
//            bag.push(tetrominos[tetrominoIndex]);
//            tetrominos.splice(tetrominoIndex,1)
//        } 
//       return bag
//    };
//}


let newGame = (() => {
    completedLine()  // check if there are any completed Lines now
    if (gameModel.currentPiece === null){
        const random = Math.round(Math.random()*6) + 1 
        const newTetromino = new Tetromino (shapes[random],context) // choose a random piece
        gameModel.currentPiece = newTetromino; // set the current piece to the new random one
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
