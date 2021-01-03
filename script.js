const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0
let audios = {
    jumping: 'bipUp.wav',
    overAudio: 'gameOver.wav'
};

function handleKeyUp(event) {   

    if (event.keyCode === 32 && !isJumping) {
        jump();
    }
}

function playAudio(audioName) {

    if (audios[audioName]) {
        const audio = new Audio(audios[audioName]);
        audio.play();
    }
}

function jump() {
    playAudio('jumping')
    isJumping = true

    let upInterval = setInterval (() => {
        if (position >= 150){
            clearInterval(upInterval)

            let downInterval = setInterval (() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position -= 20
                    dino.style.bottom = position +'px'
                }
            }, 20)

        } else {

            position += 20
            dino.style.bottom = position +'px'
        }
    }, 20)
}

function createCactus () {
    const cactus = document.createElement ('div')
    let cactusPosition = 1200
    let randomTime = Math.random () * 6000

    cactus.classList.add ('cactus')
    cactus.style.left = 1200 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval (() => {
     
     if (cactusPosition < -50) {
         clearInterval(leftInterval)
         background.removeChild(cactus)
         
     } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
         // game over
        playAudio('overAudio')
        clearInterval(leftInterval)
        document.body.innerHTML = '<h1 class="game-over"> Fim de jogo</h1>'
  
     } else {
        cactusPosition -= 10
        cactus.style.left = cactusPosition + 'px'
     } 
    }, 20)

    setTimeout (createCactus, randomTime)
}

createCactus() 
document.addEventListener('keydown', handleKeyUp)

