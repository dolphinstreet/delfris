
class gameBoard {
    constructor(context) {
        this.context = context;
        this.bag = []
        this.currentPiece = null;
        this.nextPiece = this.randomGenerator();
        this.grid = this.makeaAGrid()
    }

    randomGenerator() {
        if (this.bag.length === 0) {
            const bagOfShapes = structuredClone(SHAPES)
            bagOfShapes.shift()

            for (let i = bagOfShapes.length; i>0; i--) {
                let randomIndex = Math.floor(Math.random() * i);
                this.bag.push(bagOfShapes[randomIndex])
                bagOfShapes.splice(randomIndex, 1)
            }
        }
        return this.bag.shift()  // return first element of bag
    }

    shiftPiece() {
        const newTetromino = new Tetromino (this.nextPiece.matrix, this.context)
        gameModel.nextPiece = this.randomGenerator()
        gameModel.currentPiece = newTetromino;
    }

    drawGrid(){
        for (let i=blockSize; i<blockSize*columns; i+=blockSize){
        //console.log(i, blockSize * rows)
        this.context.beginPath();
        this.context.strokeStyle = 'red'
        this.context.moveTo(i, 0);
        this.context.lineTo(i, blockSize*rows);
        this.context.stroke();
        context.lineWidth = 5;
        }
    }

    makeaAGrid() {
        let grid = []
        for (let i = 0; i < rows; i++) {
            grid.push([])
            for (let j = 0; j < columns; j++) {
                grid[grid.length - 1].push(0)
            }
        }
        return grid
    }

    detectCollision(x, y, shape = this.currentPiece.shape) {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                const shapeCellNotEmpty = shape[i][j] > 0
                if (shapeCellNotEmpty) { // if there's a block in the shape
                    const shapeCellXInGrid = x + j
                    const shapeCellYInGrid = y + i
                    const withinBounds = shapeCellXInGrid < columns && shapeCellYInGrid < rows && shapeCellXInGrid >= 0

                    if (withinBounds) { // if it's inside the board
                        if (this.grid[shapeCellYInGrid][shapeCellXInGrid] > 0) { // if the cell is already occupied then
                            return true // it's a collision
                        }
                    } else {
                        return true  // when it touches the ground it's a collision
                    }
                }
            }
        }
        return false // no collision detected
    }


    renderGame() {
        if (this.nextPiece) {  // if there is a piece falling, render it
            let nextOneMatrix = this.nextPiece.matrix;

            nextOneMatrix.forEach((row) =>{
                while(row.length<4){
                    if(row.length%2){
                        row.unshift(0)
                    }else{
                        row.push(0)
                    }
                }
            })
            while(nextOneMatrix.length<4){
                nextOneMatrix[nextOneMatrix.length%2 ? "unshift" : "push"]([0,0,0,0])
            }

            nextOneMatrix = nextOneMatrix.flat()

            for(let i=0; i<cellesNext.length;i++){
                cellesNext[i].style.backgroundColor= nextOneMatrix[i] ? this.nextPiece.color : "transparent"
            }
        }

        for (let i = 0; i < this.grid.length; i++) { // go through the entire grid 
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j]
                this.context.fillStyle = SHAPES[cell].color // take the colors set up in the constants.js
                this.context.fillRect(j, i, 1, 1) ////draws a rectangle that is filled according to the current fillStyle (x,y,width,height)
                this.context.strokeStyle = '#3b43372b'
                this.context.lineWidth = 0.005
                this.context.strokeRect(j, i, 1, 1)
            }
        }
        this.drawGrid()
        if (this.currentPiece !== null) {  // if there is a piece falling, render it
            this.currentPiece.renderPiece()
        }
    }


    fallingDown() {
        if (this.currentPiece === null) {
            this.renderGame()
            return

        } else if (this.detectCollision(this.currentPiece.x, this.currentPiece.y + 1)) {// if moving down there will be a collision
            const shape = this.currentPiece.shape
            const currentPieceColumn = this.currentPiece.x
            const currentPieceRow = this.currentPiece.y

            shape.map((row, rowIndex) => {
                row.map((cell, cellIndex) => {
                    const shapeCellX = currentPieceColumn + cellIndex
                    const shapeCellY = currentPieceRow + rowIndex
                    const withinBounds = shapeCellX < columns && shapeCellY < rows;

                    if (shapeCellX >= 0 && withinBounds && cell > 0) {
                        this.grid[shapeCellY][shapeCellX] = shape[rowIndex][cellIndex]  //  replace
                    }
                })
            })

            if (this.currentPiece.y === 0) { // check if game is finished
                this.gameOver()
                 // restart game
            }
            this.currentPiece = null;
        } else {
            this.currentPiece.y += 1; // move the pieces down of 1 line
        }
        this.renderGame()
    }

    move(rightOrLeft){
        if (this.currentPiece=== null){
            return
        }
            const currentPieceColumn = this.currentPiece.x
            const currentPieceRow = this.currentPiece.y

            if (rightOrLeft){
                if(!this.detectCollision(currentPieceColumn+1,currentPieceRow)){ // if no collision in sight move right
                    this.currentPiece.x +=1
                }
            }else{
                if(!this.detectCollision(currentPieceColumn-1,currentPieceRow)){  // if no collision in sight move left
                    this.currentPiece.x -=1
                }
            }
            this.renderGame()
    }

    rotate(){

        if(this.currentPiece!== null){   
            let rotatedCurrent = structuredClone(this.currentPiece.shape)
            let x = this.currentPiece.x
            let y = this.currentPiece.y

            for (let i = 0; i < rotatedCurrent.length; i++) {
              for (let j = 0; j < i; j++) {
                let temp = rotatedCurrent[i][j];
                rotatedCurrent[i][j] = rotatedCurrent[j][i];  // inverse row with columns
                rotatedCurrent[j][i] = temp;
              }
            }
            rotatedCurrent.forEach(row =>row.reverse())  
            
            if(!this.detectCollision(x, y, rotatedCurrent)){
                this.currentPiece.shape=rotatedCurrent
            }
           
        }
       
        this.renderGame() 
    }

    hardDrop() {
        if (this.currentPiece !== null){
            let hardDrop = 0;
            while(!this.detectCollision(this.currentPiece.x, this.currentPiece.y+1)) {
                this.currentPiece.y++
                hardDrop++
            }
            score += hardDrop * 2;
        }
    }
    gameOver(){
        gameOverPopUp()
        
        this.grid = this.makeaAGrid();
        

    }
   
}
