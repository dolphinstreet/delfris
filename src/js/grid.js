
class gameBoard {
    constructor(context) {
        this.context = context;
        this.currentPiece = null;
        this.grid = this.makeaAGrid()
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

    detectCollision(x, y) {
        const shape = this.currentPiece.shape

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                const shapeCellNotEmpty = shape[i][j] > 0
                if (shapeCellNotEmpty) { // if there's a block in the shape
                    const shapeCellXInGrid = x + j
                    const shapeCellYInGrid = y + i
                    const withinBounds = shapeCellXInGrid < columns && shapeCellYInGrid < rows && shapeCellXInGrid>=0

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
        for (let i = 0; i < this.grid.length; i++) { // go trought the entire grid 
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j]
                this.context.fillStyle = colors[cell] // take the colors set up in the constants.js
                this.context.fillRect(j, i, 1, 1) ////draws a rectangle that is filled according to the current fillStyle (x,y,width,height)
            }
        }
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
                
                alert("game over")
                this.grid = this.makeaAGrid(); // restart game
            }
            this.currentPiece = null;
        } else {
            this.currentPiece.y += 1; // move the pieces down of 1 line
        }
        this.renderGame()
    }

    move(rightOrLeft){
        if (this.currentPiece=== null){return}
        
            const currentPieceColumn = this.currentPiece.x
            const currentPieceRow = this.currentPiece.y

            if (rightOrLeft){
                if(!this.detectCollision(currentPieceColumn+1,currentPieceRow)){ // if no collision in sight move right
                    this.currentPiece.x +=1
                    console.log("right")
                    

                }
            }else{
                if(!this.detectCollision(currentPieceColumn-1,currentPieceRow)){  // if no collision in sight move left
                    this.currentPiece.x -=1
                    console.log("left")
                }
            }
            this.renderGame()
        
    } //&& currentPieceColumn-1>=0

    //rotate()
}
