/* This function will check the position of the player toward a snake or ladder box & update accordingly */
function checkPosition(pNumb,currentPos,theMoves) {

let pImage = "";
let otherpImage = "";
let otherPlayerPosition = 0;
let textColor = "";
let checkingMoves = theMoves;

if(pNumb == 1){
    pImage = "<img src='img/ex-p2.gif' class='p1' id='p1'>";
    otherpImage = "<img src='img/p1.gif' class='p2' id='p2'>";
    otherPlayerPosition = theCurrentPlay[1][0]; //Player2 position
    textColor = "bg-primary text-white";
}else{
    pImage = "<img src='img/p1.gif' class='p2' id='p2'>";
    otherpImage = "<img src='img/ex-p2.gif' class='p1' id='p1'>";
    otherPlayerPosition = theCurrentPlay[0][0]; //Player1 position
    textColor = "bg-white text-primary";
}

let ladderMsg = "<samp class='bg-success text-white p-1'>Ladder " + currentPos + " <span class='" + textColor + " p-1'>Player" + pNumb + "</span> going UP ";
let snakeMsg = "<samp class='bg-danger text-white p-1'>Snake " + currentPos + " <span class='" + textColor + " p-1'>Player" + pNumb + "</span> got stung & going DOWN "; 

//check if player is on a ladder and change the location based on the ladder In and Out Array
for (let i=0; i<ladderArrIn.length; i++){
    
    let bn = ladderArrIn[i]; //box number
    let bnI = ladderArrIn.indexOf( bn ); //box number Index
    let NbV = ladderArrOut[bnI]; //new box value from ladder Out array

    if(currentPos == bn){
        document.querySelector("#box" + bn).innerHTML = bn;
        document.querySelector("#box" + NbV).innerHTML = pImage;
        currentPos = NbV;

        if(currentPos == otherPlayerPosition){
            document.querySelector("#box" + currentPos).innerHTML = pImage + " " + otherpImage;
        }
    
        theCurrentPlay[pNumb-1][0] = currentPos;
        theScore = (theCurrentPlay[pNumb-1][2] + 2)/theCurrentPlay[pNumb-1][1]; /* adding to score */
        document.querySelector(".p" + pNumb + "score").innerHTML = theScore.toFixed(2);
        
        up.play();
        updateLogBox(ladderMsg + "to Box <span class='bg-success text-white p-1'>" + currentPos + "</span></samp><br />");
      
    }
    document.querySelector("#box" + bn).innerHTML = bn;
    //setTimeout(function(){ document.querySelector("#box" + bn).innerHTML = bn  },1250);
} //end checking for ladders

//check if player is on a snake head
for (let i=0; i<snakeArrIn.length; i++){
    
    let bn = snakeArrIn[i]; //box number
    let bnI = snakeArrIn.indexOf( bn ); //box number Index
    let NbV = snakeArrOut[bnI]; //new box value from ladder Out array

    if(currentPos == bn){
        document.querySelector("#box" + bn).innerHTML = bn;
        //setTimeout(function(){ document.querySelector("#box" + bn).innerHTML = bn },1250);
        document.querySelector("#box" + NbV).innerHTML = pImage;
        //setTimeout(function(){ document.querySelector("#box" + NbV).innerHTML = pImage },1250);
        currentPos = NbV;

        if(currentPos == otherPlayerPosition){
            document.querySelector("#box" + currentPos).innerHTML = pImage + " " + otherpImage;
            //setTimeout(function(){ document.querySelector("#box" + currentPos).innerHTML = pImage + " " + otherpImage },1250);
        }
    
        theCurrentPlay[pNumb-1][0] = currentPos;
        theScore = (theCurrentPlay[pNumb-1][2] - 2)/theCurrentPlay[pNumb-1][1]; /* subtracting from score */
        document.querySelector(".p" + pNumb + "score").innerHTML = theScore.toFixed(2);

        down.play();
        updateLogBox(snakeMsg + "to Box <span class='bg-danger text-white p-1'>" + currentPos + "</span></samp><br />");
    }
} //end checking for snakes

/* check for win */
if(currentPos == 100){
    //checklast = currentPos - checkingMoves;
    
    //document.querySelector("#box100").innerHTML=pImage;
    document.querySelector("#main-button2").innerText = "Player " + pNumb  + " You Won! Congratulations!";
    document.querySelector("#main-button").style.display = 'none';
    document.querySelector("#main-button2").style.display = 'block';

    theScore = (theCurrentPlay[pNumb-1][2] + 10)/theCurrentPlay[pNumb-1][1]; /* give winning points */
    document.querySelector(".p" + pNumb + "score").innerHTML = theScore.toFixed(2);

    weHaveAWinner = true;
    winning.play();
    setTimeout(function(){ document.querySelector(".end-button").innerHTML = "Click here to Reset the Game" }, 4000);

    
    //document.$('#exampleModal').modal('show');
    //document.querySelector("#main-button").setAttribute("class","btn btn-primary");
    
    updateLogBox("<samp class='bg-success text-white p-1'>Congratulations <span class='" + textColor + " p-1'>Player" + pNumb + "</span> - You Won!</samp><br />");
}

if(currentPos > 100){
    //currentPos = currentPos - checkingMoves;
    //document.querySelector("#box" + currentPos).innerHTML="<img src='img/ex-p2.gif' class='p1' id='p1'>";
    error.play();
    updateLogBox("<samp class='bg-warning text-dark'><span class='" + textColor + " p-1'>Player " + pNumb + "</span><span class='bg-warning text-dark p-1'> needs another roll to win. Try again!</span></samp><br />");

    theCurrentPlay[pNumb-1][0] = currentPos - checkingMoves;


} /* end of checkPosition function */



return currentPos;

}

