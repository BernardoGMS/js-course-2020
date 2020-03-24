var totalScores, currentScore, currentPlayer, gamePlaying, count6;

initGame();

document.querySelector('.btn-roll').addEventListener('click',function(){

    if (gamePlaying) {

        document.querySelector('#textBoxScore-1').disabled = true;
        var currentDice = Math.floor(Math.random()*6) + 1;

        if (currentDice === 6){
            count6++;
        }

        document.getElementById('dice-1').style.display = 'block';
        document.querySelector('.dice').src = "dice-" + currentDice + ".png"

        if (currentDice !== 1){

            if (count6 === 2){

                totalScores[currentPlayer] = 0;
                document.getElementById('score-' + currentPlayer).textContent = totalScores[currentPlayer];
                nextPlayer();
            }else{

                currentScore += currentDice;
                document.getElementById('current-' + currentPlayer).textContent = currentScore;
            }
        }else {

            nextPlayer();
        }
    }
    
})

document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if (gamePlaying){

        var maxValue = document.querySelector('#textBoxScore-1').value;

        totalScores[currentPlayer] += currentScore;
        document.getElementById('score-' + currentPlayer).textContent = totalScores[currentPlayer];
        
        if (totalScores[currentPlayer] >= maxValue){
            gamePlaying = false;
            document.getElementById('name-' + currentPlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
        }

        nextPlayer();
    }
    
})

document.querySelector('.btn-new').addEventListener('click',initGame);

function nextPlayer() {

    currentScore = 0;
    count6 = 0;
    currentPlayer = (currentPlayer === 1) ? 0 : 1;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
    document.getElementById('dice-1').style.display = 'none';

}

function initGame() {

    gamePlaying = true;
    totalScores = [0,0];
    currentPlayer = 0;
    currentScore = 0;
    count6 = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
    document.getElementById('dice-1').style.display = 'none';
    document.querySelector('#textBoxScore-1').disabled = false;
}