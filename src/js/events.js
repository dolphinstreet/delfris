const startScreen = document.querySelector("#start-screen")

const startButon = document.querySelector(".btn-start")
const playButton = document.querySelector(".btn-pause")
let paused = false;

const settingsButton = document.querySelector(".btn-settings")
const settingsModal = document.querySelector(".settings")

const volumeInput = document.querySelector(".volume");
const volumeIcon = document.querySelector(".volume-icon")
const audio = new Audio ("./assets/sound/tetris.mp3")
const closeButton = document.querySelector(".fa-x")
audio.loop= true;

const gameOverModal = document.querySelector(".game-over")
const playAgainButton = document.querySelector(".btn-again")
const scoreElementEnd = document.getElementById("score-end")



startButon.addEventListener("click",() =>{
    startScreen.remove()
    startGame()
})

playButton.addEventListener("click" , ()=>{
    if (playButton.classList.contains("btn-pause")){
        paused=true;
        playButton.textContent="RESUME"
        playButton.classList.remove("btn-pause")
        playButton.classList.add("btn-play")
        canvas.style.visibility="hidden"
        audio.pause()
    }else{
        paused=false;
        playButton.textContent="PAUSE"
        playButton.classList.add("btn-pause")
        playButton.classList.remove("btn-play")
        canvas.style.visibility="visible"
        audio.play()

        startGame()
       

    }
})


if(!paused){
    window.addEventListener('keydown', (event) => {
        switch (event.code) {
            
            case 'ArrowLeft':
                event.preventDefault()
                gameModel.move(false)
                break;
        
            case 'ArrowRight':
                event.preventDefault()
                gameModel.move(true)
                break;
        
            case 'ArrowUp':
                event.preventDefault()
                gameModel.rotate()
                break;
        
            case 'ArrowDown':
                event.preventDefault()
                gameModel.fallingDown()
                softDrop++; 
                score += softDrop   
                break;
            
            case "Space":
                event.preventDefault()
                gameModel.hardDrop()
                break;
        }
    })
}
    
settingsButton.addEventListener("click", () =>{
    settingsModal.showModal()
    audio.play()
})


volumeInput.addEventListener('change',volumeSet);
volumeInput.addEventListener('input',volumeSet);

function volumeSet() {
audio.volume=volumeInput.value;
    
    if (audio.volume==0) {  
        volumeIcon.classList.remove("fa-volume-low"); 
        volumeIcon.classList.add("fa-volume-xmark");

    }else{ 
        volumeIcon.classList.add("fa-volume-low"); 
        volumeIcon.classList.remove("fa-volume-xmark"); 
    }

    if (audio.volume > 0.6) { 
       volumeIcon.classList.remove("fa-volume-low"); 
        volumeIcon.classList.add("fa-volume-high"); 
    } else {
        volumeIcon.classList.add("fa-volume-low"); 
        volumeIcon.classList.remove("fa-volume-high"); 
    }
}

closeButton.addEventListener("click", ()=>{
    settingsModal.close()
})

function gameOverPopUp(){
    gameOverModal.showModal()
    paused=true;
    scoreElementEnd.textContent=score;
}

playAgainButton.addEventListener("click", ()=>{
    gameOverModal.close()
    paused=false;
    speed=1000;
    score=0;
    level=1;
    totalLinesCleared=0;
    startGame()
})


