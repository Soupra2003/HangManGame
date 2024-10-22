let letters = document.querySelectorAll('.keyboard button')
const wordDisplay = document.querySelector('.word-display')
const gameModal = document.querySelector('.game-modal')
const guess = document.querySelector('.incorrect_count b')
const hangManImg = document.querySelector('.hangman-box img')


let originalWord , countGuess, myword
let maxGuess = 6

const resetGame  = () =>{
    countGuess=0
    myword = []
    hangManImg.src = `Images/images/hangman-${countGuess}.svg`
    guess.innerText = `${countGuess} / ${maxGuess}`
    letters.forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = originalWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModal.classList.remove('show')

}
const initGame = (button , clickedletter) =>{
    // console.log(button, clickedletter)
    if(originalWord.includes(clickedletter)){
       [...originalWord].forEach((letter,idx)=>{
            if(letter === clickedletter){
                myword.push(letter)
                wordDisplay.querySelectorAll('li')[idx].innerText = letter
            }
       })
    }else{
        console.log(clickedletter,"is not exist in the answer")
        countGuess++
        hangManImg.src = `Images/images/hangman-${countGuess}.svg`
    }
    button.disabled = true
    guess.innerText = `${countGuess} / ${maxGuess}`
     
    if(countGuess === maxGuess){
        return gameOver(false)
    }
    if(myword.length == originalWord.length) return gameOver(true)
}


const gameOver = (isWin)=>{
    setTimeout(()=>{
        const gameModalText = isWin?`You found the word : ` : `The correct word was : `
        gameModal.querySelector('img').src=`Images/images/${isWin ? 'victory' : 'lost'}.gif `
        gameModal.querySelector('h4').innerText=`${isWin ? 'Congrats !' : 'Game Over ! '}`
        gameModal.querySelector('h5').innerHTML = ` ${gameModalText} <b>${originalWord}</b>`
        gameModal.classList.add('show')
    },300)
}

for (const letter of letters) {
    letter.addEventListener('click', (e) => {
        // console.log(letter.textContent);  
        initGame(e.target, letter.textContent)
    });
}

const randomWord = () =>{
    const { word, hint } = word_list[Math.floor(Math.random()* word_list.length)]
    console.log(word)
    originalWord = word
    document.querySelector('.hint-question').innerText = `Hint : ${hint}`
    resetGame()
}

randomWord()
const playAgain = document.querySelector('.play_again')
playAgain.addEventListener('click', randomWord)