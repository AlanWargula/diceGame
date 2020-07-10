/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

/****
1. a player loses his entire score when they roll 2, 6s in a row'
  always save the previous dice roll in a seperate variable
2. and an input field for the final score
  can read the value with the .value property in JS. can use google
3.  add another dice to the game. player loses current score with one of them is a 1 
  css position the 2nd dice

*/

//variables
var score, roundScore, activePlayer, gamePlaying, previousRoll;

init();

//setter
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//getter
// var x = document.querySelector('#score-0').textContent;
// console.log(x);
//dice image disapear
// document.querySelector('.dice').style.display = 'none';

/* sets scores to zero 
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
*/

//receives click from "Roll Dice" and trigger function (internal or external)
//anonymous function is whithin the querySelection
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random Number variable
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;


    //display result and variable
    var diceDOM = document.querySelector(".dice1");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice1 + ".png";

    var diceDOM = document.querySelector(".dice2");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice2 + ".png";

    //update the round score if the rolled number is not a 1
   /* if (dice1 + dice2 === previousRoll) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = '0';
      nextPlayer();
    } 
    */

   if (dice1 === 1 && dice2 === 1) {
    scores[activePlayer] = 0;
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    nextPlayer();
   } else if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += (dice1 + dice2);
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
    // previousRoll = dice1 + dice2;
  }
});
//adding functionality to the "hold score" button
//first, create a listen for clicking the button
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;
    // update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //input score
    var scoreEntry = document.querySelector('.score-entry').value;

    // Undefined, 0, null, or "" are COAERCED to FALSE
    // ANYTHING else is COERCED to true
    if(scoreEntry) {
      winningScore = scoreEntry;
    } else {
      winningScore = 100;
    }
    

    // did they win?
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

//function to swap to next player
function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  /*sets BOTH  "current scores" at zero, there might be a better way to set this*/
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // toggles the graphics on active player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  //dice image disappear


}

// new game button
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";


  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}
