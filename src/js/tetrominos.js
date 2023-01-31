class Tetromino {
    constructor (shape, context) {
        this.shape = shape;
        this.context = context; // method of the canvas
        this.x=Math.floor(columns/2 - (this.shape.length)/2) // begin in the very center of the board (for every piece)
        this.y=0 // begin at 1st line of the board
    }

    renderPiece(){
        this.shape.map((row, indexRow) => {
            row.map((cell, indexCell) => {
                if (cell > 0) {  // if there's a tetraminos
                    this.context.fillStyle = colors[cell] 
                    this.context.fillRect(this.x + indexCell, this.y + indexRow, 1, 1) //draws a rectangle that is filled according to the current fillStyle.
                }
            })
        })
    }
}