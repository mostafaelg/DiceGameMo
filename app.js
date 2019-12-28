//Variables Declaring
var dice,
    diceDom,
    lastDice,
    roundScore,
    currentPlayer,
    score,
    gameStatus,
    winningScore;

//Variables Init
diceDom = document.querySelector('.dice');
init();


//next player function
var nextPalyer = function () {

        document.querySelector('#current-' + currentPlayer).textContent = '0';
        roundScore = 0;
        currentPlayer === 0? currentPlayer = 1 : currentPlayer = 0;
        diceDom.style.display = 'none';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

};

//init Function
function init () {
    score = [0,0];
    currentPlayer = 0;
    roundScore = 0;
    gameStatus = true;
    diceDom.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}


//Roll Button 
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gameStatus == true){
        dice = Math.floor(Math.random() * 6) +  1;
        var diceImg = ["dice-1.png", "dice-2.png", "dice-3.png", "dice-4.png", "dice-5.png", "dice-6.png"];
        diceDom.style.display = 'block';
        diceDom.src = diceImg[dice - 1];
        if(dice == 6 && lastDice == 6){
            score[currentPlayer] = 0;
            document.getElementById('score-' + currentPlayer).textContent = '0';
            nextPalyer();
        }
        else if(dice - 1 !== 0){
            roundScore += dice;
            document.querySelector('#current-' + currentPlayer).textContent = roundScore;
        }
        else{
            nextPalyer();
        }
        lastDice = dice;
    }

});


//Hold  Button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gameStatus == true){
        score[currentPlayer] += roundScore;
        document.getElementById('score-' + currentPlayer).textContent = score[currentPlayer];
        var input = document.querySelector('.win-score input').value;
        if (input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        if(score[currentPlayer] >= winningScore){
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            //document.querySelector('#palyer-' + currentPlayer + '-panel .player-name').style.color = 'red';
            //document.querySelector('#palyer-' + currentPlayer + '-panel').classList.remove('active');
            diceDom.style.display = 'none';
            gameStatus = false;
        }
        else{
            nextPalyer();
        }
    }
});

//New Game Button
document.querySelector('.btn-new').addEventListener('click', function () {

    document.querySelector('#name-' + currentPlayer).textContent = 'Player ' + (currentPlayer+1);
    init();
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
});

