// DOM - Document object model. It is a structured representation fo HTML. 
// used to connect scripts like JS to webpages. For each html elemnet there is
// object in DOM to which we cna inetract using JS code.

var scores, roundScores, activePlayer, dice, gamePlaying; 



function init()
{
    scores = [0, 0]
    roundScores = 0
    activePlayer = 0
    dice1 = 0
    dice2 = 0
    gamePlaying = true
    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.getElementById("dice-1").style.display = "none"
    document.getElementById("dice-2").style.display = "none"
}

function nextPlayer()
{
    var scoreDOM = document.querySelector('#current-' + activePlayer)

    scoreDOM.textContent = 0
    activePlayer === 0 ? activePlayer =  1 : activePlayer = 0
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
    roundScores = 0
}

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if(gamePlaying == true)
    {
        var dice1 = Math.ceil(Math.random() * 6)
        var dice2 = Math.ceil(Math.random() * 6)
        //var diceDOM1 = document.querySelector('.dice')
        //var diceDOM2 = document.querySelector('.dice')
        document.getElementById("dice-1").style.display = "block"
        document.getElementById("dice-2").style.display = "block"
        var scoreDOM = document.querySelector('#current-' + activePlayer)

        //diceDOM.style.display = 'block'
        document.getElementById("dice-1").src = 'dice-' + dice1 + '.png'
        document.getElementById("dice-2").src = 'dice-' + dice2 + '.png'

        if(dice1 !== 1 && dice2 != 1)
        {
            roundScores += dice1 + dice2
            scoreDOM.textContent = roundScores
        }
        else
        {
            nextPlayer()
        }
        console.log(activePlayer)
    }
})

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(gamePlaying == true)
    {
        var totalScore = document.querySelector('#score-' + activePlayer)
        var scoreLimit = document.querySelector(".scoreLimit").value

        if(!scoreLimit)
        {
            scoreLimit = 100
        }
        // Add current score to the global score    
        scores[activePlayer] += roundScores

        // Update the UI 
        totalScore.textContent = scores[activePlayer]
        //Check if player won the game
        if(scores[activePlayer] >= scoreLimit)
        {
            gamePlaying = false
            document.getElementById("dice-1").style.display = "none"
            document.getElementById("dice-2").style.display = "none"
            document.querySelector('#name-' + activePlayer).textContent = "Winner!"
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        }
        else
        {
            nextPlayer()
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', init)

init()