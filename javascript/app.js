"use strict";

/*Board Construction Initialization*/
/*Array below is only to test fast the end of the game*/
let arrayIcons = ["3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation",
              "3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation","3d_rotation"];

let oBoardInit = {
  randomNumber: 0,
  arrayIconsRandom: new Array(16),
  arrayIcons: new Array ("3d_rotation","fingerprint","delete","delete",
                          "bug_report","extension","extension","android",
                          "card_giftcard","fingerprint","face","face",
                          "card_giftcard","3d_rotation","android","bug_report"),
  arraySpan: new Array ("#span-9","#span-10","#span-11","#span-4",
                         "#span-5","#span-13","#span-7","#span-14",
                         "#span-1","#span-2","#span-3","#span-12",
                         "#span-6","#span-8","#span-15","#span-16"),
  /*Creating random numbers array (arraysIconsRandom) using this forLoop and Math function*/
  genRandom() { /*from ES6 you can instead write: genRandom : function () write as it written*/
    /*this.arrayIcons = arrayIcons;Only for testing*/
    for (let iLoop=this.arrayIcons.length-1; iLoop>= 0; iLoop--) {
      this.randomNumber = Math.floor(Math.random()*iLoop);
      oBoardInit.arrayIconsRandom[iLoop] = this.arrayIcons[this.randomNumber];
      this.arrayIcons.splice(this.randomNumber,1);/*to make sure it will keep the same elements-so remove the used element*/
    };
  },
  /*Game Grid Initialization: passing the random Array (arrayIconsRandom) to the Grid (arraySpan)*/
  gridInit() {
    for (let iLoop = 15; iLoop >= 0; iLoop--) {
      document.querySelector(this.arraySpan[iLoop]).textContent = this.arrayIconsRandom[iLoop];
      this.arrayIcons.splice(iLoop,1);
      this.arraySpan.splice(iLoop,1);
    };
  }
};

/*oTimer Literal Object*/
let oTimer = {

 timeNow: 0,
 timeGameStart: 0,
 runTime: 0,
 elapsedTimer: 0,

 /*Start Timer*/
 startTimer() {
    this.timeGameStart = Date.now();
    this.elapsedTimer = setInterval(this.displayTimer, 1000); /*Start game timer*/
  },

/*Calculate and write the timer*/
 displayTimer() {
    this.runTime = Date.now() - oTimer.timeGameStart;
    let timeElapsedMillisec = Math.floor(this.runTime/1000);
    document.querySelector("#span-timer-m").textContent = Math.floor(timeElapsedMillisec / 60);
    document.querySelector("#span-timer-s").textContent =  timeElapsedMillisec - (Math.floor(timeElapsedMillisec / 60)*60 );
  }

};

let oMemoryGame = {
  /*Game functions variables*/
  flipIndex: 0, /*track the number of flip cards*/
  arrayIconsFlipped: new Array("none", "none-1"),/*store the name of icons to compare*/
  arraySpanIdFlipped: new Array(2), /*store the id of span elements flipped*/
  arrayDivIdFlipped: new Array(2), /*store the div of elements flipped*/
  flipCorrectIndex: 0, /*to track the end of the game*/
  flipMissIndex: 0, /*to track misses*/
  /*Effect change of Element*/
  effectError() {
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.add("effect-error");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.add("effect-error");
  },
  /*Effect change of Element*/
  effectCorrect() {
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.add("effect-correct");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.add("effect-correct");
  },
  /*reset to restart the round NOT THE GAME*/
  reset() {
    oMemoryGame.flipIndex = 0;
    oMemoryGame.arrayIconsFlipped.splice(0,2);
    oMemoryGame.arraySpanIdFlipped.splice(0,2);
    oMemoryGame.arrayDivIdFlipped.splice(0,2);
    /*Game start again! Done to avoid more than two cards flipped at once*/
    document.querySelector("#grid-container").addEventListener("click", runGame, true);
  },
  /*Cards do not match*/
  redoFlip() {
    oMemoryGame.flipMissIndex++;
    document.querySelector("#span-miss").textContent = oMemoryGame.flipMissIndex;
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.remove("effect-error");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.remove("effect-error");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[0]).classList.toggle("material-icons");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[0]).classList.toggle("hide");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[1]).classList.toggle("material-icons");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[1]).classList.toggle("hide");
    oMemoryGame.reset();
  },
/*Cards match*/
  matchCards() {
    this.flipCorrectIndex++;
    document.querySelector("#span-hits").textContent = this.flipCorrectIndex;
    this.effectCorrect();
    this.reset();
  },
  showCards() {
    document.getElementById(oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex]).classList.toggle("material-icons"); /*display element*/
    document.getElementById(oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex]).classList.toggle("hide"); /*display element*/
    document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
    oMemoryGame.flipIndex++;

    if (oMemoryGame.flipIndex == 2) {

      if( (oMemoryGame.arrayIconsFlipped[0] === oMemoryGame.arrayIconsFlipped[1]) && (oMemoryGame.arrayDivIdFlipped[0] != oMemoryGame.arrayDivIdFlipped[1]) ) { /*avoid to count at same card*/
        oMemoryGame.matchCards ();
        if (oMemoryGame.flipCorrectIndex == 8) {
          clearTimeout(oTimer.elapsedTimer);
          /*location.reload(); /*restart the game*/
        }
      } else {
        document.querySelector("#grid-container").removeEventListener("click", runGame, true); /*prevent the user from selecting the same card twice*/
        oMemoryGame.effectError();
        setTimeout(oMemoryGame.redoFlip,1000);
      }
    }
  },
}

/*STARTING THE GAME*/

oBoardInit.genRandom(); /*generate an array of random numbers*/
oBoardInit.gridInit(); /*write the respective cards to the board*/

oTimer.startTimer(); /*Start game timer*/

function runGame(evt) {
  oMemoryGame.arrayIconsFlipped[oMemoryGame.flipIndex] = evt.target.textContent; /*get the name of element flipped*/
  if( evt.target.children.length != 0 ) { /*avoid errors when clicking at same element*/
    oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex] = evt.target.children[0].id; /*get the span of element flipped*/
    /*oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.path[0].id; /*get the div of element flipped: WORKS ONLY IN GOOGLE CHROME*/
    oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.target.id; /*this works in IE, Google Chrome and Firefox*/
    document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
    setTimeout(oMemoryGame.showCards,500);
  }
}

/*Game start at first click*/
document.querySelector("#grid-container").addEventListener("click", runGame, true);

/*button refresh page*/
document.querySelector("#buttonRestart").addEventListener("click", function(){
  location.reload()
});
