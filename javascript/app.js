"use strict";

/*Board Construction Initialization*/
var arrayIcons = ["3d_rotation","fingerprint","delete","delete","bug_report","extension","extension","android",
                  "card_giftcard","fingerprint","face","face","card_giftcard","3d_rotation","android","bug_report"];
var arraySpan = ["#span-9","#span-10","#span-11","#span-4","#span-5", "#span-13","#span-7","#span-14",
                  "#span-1","#span-2","#span-3","#span-12","#span-6", "#span-8","#span-15","#span-16"];
/*
var arrayIcons = ["3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation",
                  "3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation"];*/

var randomNumber = 0;
var arrayIconsRandom = new Array(16);
/*Creating random numbers using this forLoop and Math function*/
for (let iLoop=arrayIcons.length-1; iLoop>= 0; iLoop--) {
  randomNumber = Math.floor(Math.random()*iLoop);
  arrayIconsRandom[iLoop] = arrayIcons[randomNumber];
  arrayIcons.splice(randomNumber,1); /*to make sure it will keep the same elements-so remove the used element*/
}
/*Game Grid Initialization*/
for (let iLoop = 15; iLoop >= 0; iLoop--) {
  document.querySelector(arraySpan[iLoop]).textContent = arrayIconsRandom[iLoop];
  arrayIcons.splice(iLoop,1);
  arraySpan.splice(iLoop,1);
}

/*Game functions variables*/
var flipIndex = 0; /*track the number of flip cards*/
var arrayIconsFlipped = ["none", "none-1"]; /*store the name of icons to compare*/
var arraySpanIdFlipped = new Array(2); /*store the id of span elements flipped*/
var arrayDivIdFlipped = new Array(2); /*store the div of elements flipped*/
var flipCorrectIndex = 0; /*to track the end of the game*/
var flipMissIndex = 0; /*to track misses*/
var start_time = Date.now(); /*game start with the first click*/
var runTime = 0;
var runMinutes = 0;

/*Timer Funcion*/
function runTimer(){
    runTime = Date.now() - start_time ;
    var timeElapsedMillisec = Math.floor(runTime/1000);
    document.querySelector("#spanTimerM").textContent = Math.floor(timeElapsedMillisec / 60);
    document.querySelector("#spanTimerS").textContent =  timeElapsedMillisec - (Math.floor(timeElapsedMillisec / 60)*60 );
};

/*Effect change of Element*/
function effect() {
  document.getElementById(arrayDivIdFlipped[0]).classList.add("effect");
  document.getElementById(arrayDivIdFlipped[1]).classList.add("effect");
}

/*Effect change of Element*/
function effectCorrect() {
  document.getElementById(arrayDivIdFlipped[0]).classList.add("effectCorrect");
  document.getElementById(arrayDivIdFlipped[1]).classList.add("effectCorrect");
}

/*reset to restart the round NOT THE GAME*/
function reset() {
  /*reseting counting and arrays*/
  flipIndex = 0;
  arrayIconsFlipped.splice(0,2);
  arraySpanIdFlipped.splice(0,2);
  arrayDivIdFlipped.splice(0,2);
  /*Game start again! Done to avoid more than two cards flipped at once*/
  document.querySelector("#grid-container").addEventListener("click", runGame, true);
}

/*Cards do not match*/
function redoFlip () {
  flipMissIndex++;
  document.querySelector("#spanMiss").textContent = flipMissIndex;
  document.getElementById(arrayDivIdFlipped[0]).classList.remove("effect");
  document.getElementById(arrayDivIdFlipped[1]).classList.remove("effect");
  document.getElementById(arraySpanIdFlipped[0]).classList.toggle("material-icons");
  document.getElementById(arraySpanIdFlipped[0]).classList.toggle("hide");
  document.getElementById(arraySpanIdFlipped[1]).classList.toggle("material-icons");
  document.getElementById(arraySpanIdFlipped[1]).classList.toggle("hide");
  setTimeout(reset(),1000);
}
/*Cards match*/
function matchCards () {
  flipCorrectIndex++;
  document.querySelector("#spanHits").textContent = flipCorrectIndex;
  effectCorrect();
  reset();
}

function showCards() {
  document.getElementById(arraySpanIdFlipped[flipIndex]).classList.toggle("material-icons"); /*display element*/
  document.getElementById(arraySpanIdFlipped[flipIndex]).classList.toggle("hide"); /*display element*/
  document.getElementById(arrayDivIdFlipped[flipIndex]).classList.toggle("effectRotate");

  flipIndex++;

  if (flipIndex == 2)
  {

    if(arrayIconsFlipped[0] === arrayIconsFlipped[1])
    {
      matchCards ();
      if (flipCorrectIndex == 8)
      {
        setTimeout(location.reload(),3000);
        /*location.reload(); /*restart the game*/
      }
    } else
    {
      document.querySelector("#grid-container").removeEventListener("click", runGame, true); /*prevent the user from selecting the same card twice*/
      effect();
      setTimeout(redoFlip,1000);
    }
  }

}

setInterval(runTimer, 1000); /*Start game timer*/

/*game functionality/logic function*/
function runGame (evt) {
  arrayIconsFlipped[flipIndex] = evt.target.textContent; /*get the name of element flipped*/
  arraySpanIdFlipped[flipIndex] = evt.target.children[0].id; /*get the span of element flipped*/
  arrayDivIdFlipped[flipIndex] = evt.path[0].id; /*get the div of element flipped*/
  document.getElementById(arrayDivIdFlipped[flipIndex]).classList.toggle("effectRotate");
  setTimeout(showCards,500);
}

/*button functionality*/
document.querySelector("#buttonRestart").addEventListener("click", function(){
  location.reload()
});

/*Game start at first click*/
document.querySelector("#grid-container").addEventListener("click", runGame, true);
