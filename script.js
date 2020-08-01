const boxes = document.querySelectorAll('[data-cell]')
const container = document.getElementById('container')
let circleTurn
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('notification')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()

restartButton.addEventListener('click', startGame)


function startGame()
{
    circleTurn = false;
    boxes.forEach(box=>{
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, { once: true })
        box.addEventListener('click', handleClick, {once: true})
    })
    setHoverClass();
    winningMessageElement.classList.remove('show')
}

function handleClick(e)
{
    const cell = e.target
    const currentClass =  circleTurn ? CIRCLE_CLASS : X_CLASS  
    placeMark(cell,currentClass) 

    if(checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else{
        swapTurns();
        setHoverClass();
    }
}

function endGame(draw)
{
    if(draw){
        winningMessageTextElement.innerText="Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's Wins" : "X's Wins" }`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...boxes].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }

function placeMark(cell,currentClass)
{
    cell.classList.add(currentClass)
}

function swapTurns()
{
    circleTurn = !circleTurn
}

function setHoverClass(){
    container.classList.remove(X_CLASS)
    container.classList.remove(CIRCLE_CLASS)

    if(circleTurn)
    {
        container.classList.add(CIRCLE_CLASS)
    } else{
        container.classList.add(X_CLASS)
    }
}

function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return boxes[index].classList.contains(currentClass)
        })
      })
    }
