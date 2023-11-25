/* Define global variables */
let dices = 1; //we start with 1 dice unless checkDices is toggles
let theCurrentPlay = [[0,0,0],[0,0,0]]; /* 1st array is for P1, 2nd array is for P2 - [position, moves, score] */
let thePosition = 0;
let thePlayer = 2; //start with no player
let textColor = "";
let weHaveAWinner = false;
//let startPosition = 0;

let p1Image = "<img src='img/ex-p2.gif' class='p1' id='p1'>";
let p2Image = "<img src='img/p1.gif' class='p2' id='p2'>";

let p1ImageA = "<img src='img/ex-p2.gif' class='p1' id='p1a'>";
let p2ImageA = "<img src='img/p1.gif' class='p2' id='p2a'>";

var ladderArrIn = [2,7,8,15,21,28,36,51,71,78,87];
var ladderArrOut = [38,14,31,26,42,84,44,67,91,98,94];

var snakeArrIn = [16,46,49,62,64,74,89,92,95,99];
var snakeArrOut = [6,25,11,19,60,53,68,88,75,80];

const audio = new Audio("audio/move.mp3");
const winning = new Audio("audio/success.mp3");
const up = new Audio("audio/up.mp3");
const down = new Audio("audio/down.mp3");
const error = new Audio("audio/error.mp3");

let theVolumn = 1;
let soundSwitcher = 1;

/* reset the game */
function resetGame(){
    //console.log("Resetting ....");
    location.reload();

} /*End of resetGame function */

function playAudio(){
    audio.play();
}

/* this function will attempt to animate the player piece from the start position to end */
function animatePlayer(thePlayer,fromPosition,toPosition){

    if(toPosition<100){
        for(i=0; i<=(toPosition-fromPosition)-1; i++){

            //console.log(fromPosition+i);
            //setTimeout(playAudio,250*i);
            playAudio();
            let x = fromPosition+i;

            if(thePlayer == 1){
            setTimeout(function(){ document.getElementById("box" + x).innerHTML += p1ImageA },200*i);
            setTimeout(function(){ document.getElementById("p1a").remove() },300*i);
            }

            if(thePlayer == 2){
            setTimeout(function(){ document.getElementById("box" + x).innerHTML += p2ImageA },200*i);
            setTimeout(function(){ document.getElementById("p2a").remove() },300*i);
            }


            //console.log("box" + x);
            
            // if(x % 2 == 0){
            //     setTimeout(document.querySelector("#box" + x).classList.remove("green-l"),100);
            //     setTimeout(document.querySelector("#box" + x).classList.add("blue"),300);

            //     setTimeout(document.querySelector("#box" + x).classList.add("green-l"),300*i);
            //     setTimeout(document.querySelector("#box" + x).classList.remove("blue"),500*i);
            // }else{
            //     document.querySelector("#box" + x).classList.remove("green");
            //     document.querySelector("#box" + x).classList.add("red");

            //     setTimeout(document.querySelector("#box" + x).classList.add("green"),700*i);
            //     setTimeout(document.querySelector("#box" + x).classList.remove("red"),900*i);
            // }
            


        }
    }

} /* End of animatePlayer function */

/* this function will keep updating the logBox on the screen to show events */
function updateLogBox(toaddlog){
    let thelogtext = document.querySelector(".thelog").innerHTML;
    document.querySelector(".thelog").innerHTML = toaddlog + thelogtext;

} /* End of updateLogBox function */

/* function to move Current Player */
function movePlayer(p,m,s){ /* receive player number and number of moves */ 
    let player = p;
    let moves = m;
    let position = s;
    
    NewPosition = position + moves;

    //animate the player
    //setTimeout(animatePlayer(player,position,NewPosition),200);
    //animatePlayer(player,position,NewPosition);

    //console.log("Player: " + player + " | Old Position: " + theCurrentPlay[player-1][0] + " Moves: " + moves + " = " + NewPosition);

    theCurrentPlay[player-1][0] = position + moves;

    //update number of moves
    theCurrentPlay[player-1][1]++;
    theCurrentPlay[player-1][2]++;

    /* calculate score based on dividing by moves */
    //theScore = ((Math.round(theCurrentPlay[player-1][2]/theCurrentPlay[player-1][1])*100) /100).toFixed(2);
    theScore = theCurrentPlay[player-1][2]/theCurrentPlay[player-1][1];

    //updating the move score board
    document.querySelector(".p" + player + "score").innerHTML = theScore.toFixed(2);

    //update score

    if(NewPosition<=100){
        /* update position for player */
        if(player == 1){
            if(position > 0){
                document.querySelector("#p1").remove();
                document.querySelector("#box" + position).innerHTML = position;
 
                if(position == theCurrentPlay[1][0]){
                    document.querySelector("#box" + position).innerHTML=p2Image;
                }
            }
            textColor = "bg-primary text-white";
            //setTimeout(function(){ document.querySelector("#box" + NewPosition).innerHTML+=p1Image },1200);
            document.querySelector("#box" + NewPosition).innerHTML+=p1Image;
        }
        else if(player == 2){
            if(position > 0){
                document.querySelector("#p2").remove();
                document.querySelector("#box" + position).innerHTML = position;
                if(theCurrentPlay[0][0] == position){
                    document.querySelector("#box" + position).innerHTML=p1Image;
                }
            }
            textColor = "bg-white text-primary";
            //setTimeout(function(){ document.querySelector("#box" + NewPosition).innerHTML+=p2Image },1200);
            document.querySelector("#box" + NewPosition).innerHTML+=p2Image;
        }

        updateLogBox("<samp class='text-info'><span class='" + textColor +" p-1'>Player " + thePlayer +"</span> Moved to Box <span class='bg-success text-white p-1'>" + NewPosition + "</span></samp><br />");
    
    }

    checkPosition(player,NewPosition,moves);

    audio.play();
    //return position 

} /* End of movePlayer function */

/* function to throw Dice(s) are return value */
function throwDice(p){

    let dice1 = 0;
    let dice2 = 0;
    let whoIsPlaying = p;    
    let addSomeText="";
    let showDouble="";
    /* rolling dice - generate random number from 1 to 12 */
    dice1 = Math.ceil(Math.random()*6); /* for testing use 7 */
    if(dices == 2){
    dice2 = Math.ceil(Math.random()*6);
    }
    if(dice1 == dice2){

        theScore = (theCurrentPlay[whoIsPlaying-1][2] + 1)/theCurrentPlay[whoIsPlaying-1][1]; /* add to score if rolled double */
        document.querySelector(".p" + whoIsPlaying + "score").innerHTML = theScore.toFixed(2);

        showDouble = "<span class='bg-purple text-white p-1'>Nice Double!</span>"
    }

    /* create the dices */
    generatedRoll = dice1 + dice2;
    document.querySelector("#dice1").setAttribute("src","./img/" + dice1 + ".png");
    addSomeText = " <img class='logdice' src='./img/" + dice1 +".png'>";

    if(dices == 2){
        document.querySelector("#dice2").setAttribute("src","./img/" + dice2 + ".png");
        addSomeText += " <img class='logdice' src='./img/" + dice2 +".png'>";
    }

    if(whoIsPlaying == 1){
        nextPlayer = 2;
        textColor = "bg-primary text-white";
    }else{
        nextPlayer = 1;
        textColor = "bg-white text-primary";
    }

    document.querySelector("#main-button").innerText = "Player " + nextPlayer + ": Click to Roll Dice"; //"You rolled a " + generatedRoll + ". Player " + nextPlayer + " click to Roll Dice.";
    updateLogBox("<samp class='text-info'><span class='" + textColor + " p-1'>Player " + whoIsPlaying +"</span> Rolled a <span class='bg-info text-dark p-1'>" + generatedRoll + "</span> " + addSomeText + " " + showDouble + " </samp><br />");
    
    return generatedRoll;

} /* End of throwDice function */


/* this function checks if 1 or 2 dice are activated to use */
function checkDices(){
    if(document.querySelector('#dice-button').checked){
        document.querySelector("#dice2").setAttribute("class","");
        dices = 2;
        updateLogBox("<samp class='text-white'>Double Die: <span class='bg-warning text-dark p-1'>2</span> Dice Activated</samp><br />");
    }else{
        document.querySelector("#dice2").setAttribute("class","invisible");  
        dices = 1;
        updateLogBox("<samp class='text-white'>Single Die: <span class='bg-warning text-dark p-1'>1</span> Die Activated</samp><br />");
    }

} /* End of checkDices function */

/* function to switch on and off audio */
function checkMute(){
    // if(document.querySelector('#mute-toggle').checked){
    //     theVolumn = 0;
    //     audio.volume = theVolumn;
    //     winning.volume = theVolumn;
    //     up.volume = theVolumn;
    //     down.volume = theVolumn;
    //     error.volume= theVolumn;
    // }else{
    //     theVolumn = 1;
    //     audio.volume = theVolumn;
    //     winning.volume = theVolumn;
    //     up.volume = theVolumn;
    //     down.volume = theVolumn;
    //     error.volume= theVolumn;  
    // }

    if(soundSwitcher == 1){
        soundSwitcher = 2;
        theVolumn = 0;
        document.querySelector('#sound-button').innerHTML = "<i class='bi bi-volume-down'></i> LOW";
        document.querySelector('#sound-button').classList.replace("btn-primary","btn-warning");
        audio.volume = 1;
    }else if(soundSwitcher == 2){
        soundSwitcher = 0;
        theVolumn = 0;
        document.querySelector('#sound-button').innerHTML = "<i class='bi bi-volume-mute'></i> UNMUTE";
        document.querySelector('#sound-button').classList.replace("btn-warning","btn-danger");
        audio.volume = 0;
    }else if(soundSwitcher == 0){
        soundSwitcher = 1;
        theVolumn = 1;
        document.querySelector('#sound-button').innerHTML = "<i class='bi bi-volume-up'></i> ON";
        document.querySelector('#sound-button').classList.replace("btn-danger","btn-primary");
        audio.volume = 0.5;
    }
    winning.volume = theVolumn;
    up.volume = theVolumn;
    down.volume = theVolumn;
    error.volume= theVolumn;

} /* end of checkMute funtion */

/* this function will start the game from the main-button */
function startGame(){
    /* start game will run once as it is bound to the .start-button class */
    document.querySelector("#main-button").innerText = "Player 1: Click to Roll Dice";
    document.querySelector("#main-button").setAttribute("class","btn btn-lg btn-primary main-button2");
    document.querySelector("#main-button").removeEventListener('click',startGame); /* remove listener binding on main button */
    document.getElementById('dice-button').setAttribute("disabled", "true");

    /* click to roll the dice */
    document.querySelector("#main-button").addEventListener('click',function(){

        /* switch between players */
        if(thePlayer == 1){
        thePlayer = 2;
        thePosition = theCurrentPlay[1][0];
        }else if(thePlayer == 2 || thePlayer == 0){
        thePlayer = 1;
        thePosition = theCurrentPlay[0][0];
        }

        let x = throwDice(thePlayer);
        
        movePlayer(thePlayer,x,thePosition);

    });
    updateLogBox("<samp class='bg-success p-1'>New Game Started</samp><br />");

} /* End of startGame function */

 /* click to start - this will change the button to ask Player 1 to roll the dice*/
 document.querySelector(".start-button").addEventListener('click',startGame);

/* this will make the spacebar or enter to roll the dice for each player accordingly / aka click the main-button */
var link = document.getElementById("main-button");
document.onkeydown = function (event) {

    if(thePlayer == 1){
        if (event.keyCode == 13) { /* enter button for player 2 */
            if(weHaveAWinner != true){
                link.click();
            }
        }
    }
    if(thePlayer == 2){
        if (event.keyCode == 32) { /* spacebar for player 1 */
            if(weHaveAWinner != true){
                link.click();
            }
        }
    }
}; /* keydown action */

 /* change number of dice */
document.querySelector("#dice-button").addEventListener('change',()=> checkDices());

/* change mute button */
//document.querySelector("#mute-toggle").addEventListener('change',()=> checkMute());
document.querySelector("#sound-button").addEventListener('click',()=> checkMute());

/* reset the game button */
document.querySelector(".end-button").addEventListener('click',resetGame);

/* DOM */
document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    
})