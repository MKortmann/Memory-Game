"use strict";

/*Board Construction Initialization*/
var arrayIcons = ["3d_rotation","fingerprint","delete","delete","bug_report","extension","extension","android",
                  "card_giftcard","fingerprint","face","face","card_giftcard","3d_rotation","android","bug_report"];
var arraySpan = ["#span-9","#span-10","#span-11","#span-4","#span-5", "#span-13","#span-7","#span-14",
                  "#span-1","#span-2","#span-3","#span-12","#span-6", "#span-8","#span-15","#span-16"];

/*var arrayIcons = ["3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation",
                  "3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation"];*/

var randomNumber = 0;
var arrayIconsRandom = new Array(16);
/*Creating random numbers using this forLoop and Math function*/
for (let iLoop=arrayIcons.length-1; iLoop>= 0; iLoop--) {
  randomNumber = Math.floor(Math.random()*iLoop);
  arrayIconsRandom[iLoop] = arrayIcons[randomNumber];
  arrayIcons.splice(randomNumber,1); /*to make sure it will keep the same elemtens*/
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
var arraySpanIdFlipped = new Array(2); /*store the id of elements flipped*/
var flipCorrectIndex = 0;
var flipMissIndex = 0;
var start_time = Date.now(); /*getting the start-time*/
var flagRedoFunction = false;

/*Timer Funcion*/
function myTimer3(){

    var stop_time = Date.now();
    var diff = stop_time-start_time;

    if(diff/1000 > 5){

    /*DisplayReactionTime.innerText = "The reaction time was: " + (diff/1000) + " seconds";*/
    alert( "You win and it takes: " + diff/60000 + " minutes" ) ;

    }

};

/*Reset function*/
function redoFlip () {
  flipMissIndex++;
  document.querySelector("#spanMiss").textContent = flipMissIndex;
  console.log(arraySpanIdFlipped[0]);
  console.log(arraySpanIdFlipped[1]);
  document.getElementById(arraySpanIdFlipped[0]).classList.toggle("material-icons");
  document.getElementById(arraySpanIdFlipped[0]).classList.toggle("hide");
  document.getElementById(arraySpanIdFlipped[1]).classList.toggle("material-icons");
  document.getElementById(arraySpanIdFlipped[1]).classList.toggle("hide");
  reset();

}

function matchCards () {
  flipCorrectIndex++;
  document.querySelector("#spanHits").textContent = flipCorrectIndex;
  console.log(flipCorrectIndex);
  reset();
}

function reset() {
  /*reseting counting and arrays*/
  flipIndex = 0;
  arrayIconsFlipped.splice(0,2);
  arraySpanIdFlipped.splice(0,2);
}


/*Game flip function*/
document.querySelector("#grid-container").addEventListener("click", function(evt){

  arrayIconsFlipped[flipIndex] = evt.target.textContent;
  arraySpanIdFlipped[flipIndex] = evt.target.children[0].id;
  document.getElementById(arraySpanIdFlipped[flipIndex]).classList.toggle("material-icons");
  document.getElementById(arraySpanIdFlipped[flipIndex]).classList.toggle("hide");
  flipIndex++;

  if (flipIndex == 2)
  {

    if(arrayIconsFlipped[0] === arrayIconsFlipped[1])
    {
      matchCards ();

      if (flipCorrectIndex == 8)
      { myTimer3();
        alert("You Win! Congratulations");
      }

    } else
    {
      setTimeout(redoFlip,1000);
      /*the problem of setTimeOut is that it will be reset after 3 ms*/
    }



  }

});


/*

document.querySelector("#grid-container").addEventListener("click", function(evt){
/*if(evt.target.nodeName === "SPAN") {
  console.log(evt.target.textContent); /*show the symbol name
  console.log(evt.currentTarget.nodeName.toLowerCase()); /*div
  console.log(evt.target.children); /*get the hole element
  console.log(evt.target.children[0]); /*the the span with id and class
  console.log(evt.target.children[0].id); /*get the id
console.log(evt);
  console.log(evt.path[0].id); /*get the div
});*/
