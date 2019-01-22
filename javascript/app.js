"use strict";

/*Board Construction Initialization*/
class Board {
	constructor(numberOfCards) {
		this.totalCards = numberOfCards;
		this.standardNumberofCards = 16;
		this.randomNumber = 0;
		this.arrayIconsRandom = new Array();
		this.arrayIcons = new Array();
		this.arraySpan = new Array();
		this.containerIcons = new Array("format_shapes", "bubble_chart", "border_right", "attach_money",
			"graphic_eq", "waves", "delete_sweep", "duo",
			"contact_phone", "business", "sort_by_alpha", "snooze",
			"queue_music", "note", "library_books", "games",
			"apps", "rate_review", "satellite", "terrain",
			"traffic", "tram", "zoom_out_map", "local_see",
			"fastfood", "flight", "hotel", "layers",
			"directions", "grain", "flash_auto", "collections",
			"3d_rotation", "fingerprint", "delete", "bug_report",
			"card_giftcard", "extension", "android", "face",
			"schedule", "rowing", "restore_page", "room",
			"pets", "pan_tool", "motorcycle", "language",
			"invert_colors", "line_weight", "loyalty", "backup",
			"scanner", "school", "router", "ring_volume",
			"report_problem", "repeat_one", "all_out", "radio_button_checked");
		/*Setting the Board*/
		numberOfCards > 16 ? document.querySelector("#grid-container").classList.add("wide") :
			document.querySelector("#grid-container").classList.remove("wide")
		this.updateHtmlElements();
		this.genArrayIcons();
		this.genSpanArray();
		this.genRandom(); /*generate an array of random numbers*/
		this.gridInit(); /*write the respective cards to the board*/
	};
	genArrayIcons() {
		/*do not let the game repetitive with the same icons*/
		this.arrayIcons = this.containerIcons.splice(Math.floor(Math.random() * (this.containerIcons.length - (this.totalCards / 2))), this.totalCards / 2);
		for (let index = (this.totalCards / 2); index < this.totalCards; index++) {
			this.arrayIcons[index] = this.arrayIcons[index - (this.totalCards / 2)];
		};
	}
	genSpanArray() {
		let getSpan;
		for (let index = 0; index <= this.totalCards - 1; index++) {
			getSpan = "#span-" + index;
			this.arraySpan[index] = getSpan;
		};
	}
	/*Creating random numbers array (arraysIconsRandom) using this forLoop and Math function*/
	genRandom() {
		/*from ES6 you can instead write: genRandom : function () write as it written*/
		/*this.arrayIcons = arrayIcons;Only for testing*/
		for (let iLoop = this.arrayIcons.length - 1; iLoop >= 0; iLoop--) {
			this.randomNumber = Math.floor(Math.random() * iLoop);
			this.arrayIconsRandom[iLoop] = this.arrayIcons[this.randomNumber];
			this.arrayIcons.splice(this.randomNumber, 1); /*to make sure it will keep the same elements-so remove the used element*/
		};
	}
	/*Check how many cards we need and then increase the board*/
	updateHtmlElements() {
		let numbersOfDivs = document.body.children["grid-container"].children.length;
		/*Adding or removing div*/
		const fragment = document.createDocumentFragment(); // ← uses a DocumentFragment instead of a <div>
		for (let i = 0; i < (this.totalCards - this.standardNumberofCards); i++) {
			const newElementDiv = document.createElement("div");
			const newElementSpan = document.createElement("span");
			/*newElement.innerText = 'This is paragraph number ' + i;*/
			newElementDiv.setAttribute("id", "div-" + (this.standardNumberofCards + i))
			newElementSpan.setAttribute("id", "span-" + (this.standardNumberofCards + i))
			newElementSpan.setAttribute("class", "hide icon-size")
			fragment.appendChild(newElementDiv);
			newElementDiv.appendChild(newElementSpan);
		};
		document.getElementById("grid-container").appendChild(fragment); // reflow and repaint here -- once!
		for (let i = 0; i < (numbersOfDivs - this.standardNumberofCards); i++) {
			let remElement = document.getElementById("div-" + (this.standardNumberofCards + i));
			remElement.parentNode.removeChild(remElement);
		};
	}
	/*Game Grid Initialization: passing the random Array (arrayIconsRandom) to the Grid (arraySpan)*/
	gridInit() {
		for (let iLoop = this.totalCards - 1; iLoop >= 0; iLoop--) {
			document.querySelector(this.arraySpan[iLoop]).textContent = this.arrayIconsRandom[iLoop];
			this.arrayIcons.splice(iLoop, 1);
			this.arraySpan.splice(iLoop, 1);
		};
	}
}
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
		let timeElapsedMillisec = Math.floor(this.runTime / 1000);
		document.querySelectorAll(".span-timer-m").forEach(function(val){
			val.textContent = Math.floor(timeElapsedMillisec / 60);
		});
		document.querySelectorAll(".span-timer-s").forEach(function(val){
			val.textContent = timeElapsedMillisec - (Math.floor(timeElapsedMillisec / 60) * 60);
		});

	}
};
/*Game*/
class Game {
	constructor(numberOfCards) {
		/*Game variables*/
		this.flagMusicTurnOff = false;
		this.flagstartTimer = false;
		oBoardInit = new Board(numberOfCards);
		/*Initialization*/
		this.flipIndex = 0; /*track the flip cards*/
		this.flipped = 0; /*track the number of flip cards*/
		this.arrayIconsFlipped = new Array("none", "none-1"); /*store the name of icons to compare*/
		this.arraySpanIdFlipped = new Array(2); /*store the id of span elements flipped*/
		this.arrayDivIdFlipped = new Array(2); /*store the div of elements flipped*/
		this.arrayIdStars = new Array(".star1", ".star2", ".star3");
		this.starRemoved = new Array(".star8",".star7", ".star6", ".star5", ".star4");
		this.arrayIdStarsBlack = new Array(".star8b",".star7b", ".star6b", ".star5b", ".star4b");
		this.starRemovedBlack = new Array(".star1b", ".star2b", ".star3b");
		this.starIndex = 0; /*track number in the array (arrayIdStars)*/
		this.flipCorrectIndex = 0; /*to track the end of the game*/
		this.flipMissIndex = 0; /*to track misses*/
		this.destructor(); /*reset/restart the game*/
	}
	destructor() {
		/*Total Reset for oMemoryGame*/
		/*Restart Hits, Miss and Flippped*/

		document.querySelectorAll(".span-flipped").forEach(function(val){
			val = 0;
		});
		document.querySelectorAll(".span-hits").forEach(function(val){
			val = 0;
		});
		document.querySelectorAll(".span-miss").forEach(function(val){
			val = 0;
		});


		/*restart music buttons*/
		document.querySelector("#buttonTurnMusicOn").classList.add("active");
		document.querySelector("#buttonTurnMusicOff").classList.remove("active");
		/*Reseting the grid board*/
		let container = document.querySelector("#grid-container");
		let listSpans = container.querySelectorAll("span");
		let listDivs = container.querySelectorAll("div");
		for (let i = 0; i < listSpans.length; i++) {
			listSpans[i].classList.add("hide");
			listSpans[i].classList.remove("material-icons");
			listDivs[i].classList.remove("effect-correct");
		}
		/*Reseting the stars*/
		/*yellow stars*/
		let containerStars = document.querySelector(".container-stars");
		let index = 1;
		containerStars.querySelectorAll("img").forEach(function(star){

			if (index <= 3) {
				star.classList.remove("hide"); /*show yellow stars*/
			} else if (index <= 11) {
				star.classList.add("hide"); /*hide yellow & black stars*/
			} else {
				star.classList.remove("hide"); /*show black stars*/
			}
			index++;
		});
		console.log(index);
		/*restart body timer*/
		document.querySelectorAll(".span-timer-m").forEach(function(val){
			val.textContent = 0;
		});

		document.querySelectorAll(".span-timer-s").forEach(function(val){
			val.textContent = 0;
		});

	}
	/*Effect change of Element*/
	effectError() {
		document.querySelector("#musicError").play();
		document.getElementById(this.arrayDivIdFlipped[0]).classList.add("effect-error");
		document.getElementById(this.arrayDivIdFlipped[1]).classList.add("effect-error");
	}
	/*Effect change of Element*/
	effectCorrect() {
		document.getElementById(this.arrayDivIdFlipped[0]).classList.add("effect-correct");
		document.getElementById(this.arrayDivIdFlipped[1]).classList.add("effect-correct");
	}
	/*reset to restart the round NOT THE GAME*/
	reset() {
		this.flipIndex = 0;
		this.arrayIconsFlipped.splice(0, 2);
		this.arraySpanIdFlipped.splice(0, 2);
		this.arrayDivIdFlipped.splice(0, 2);
		/*Game start again! Done to avoid more than two cards flipped at once*/
		document.querySelector("#grid-container").addEventListener("click", runGame, true);
	}
	/*Cards do not match*/
	redoFlip() {
		/*VERY important:
		t's because this in the setTimeout handler is referring to window.*/
		setTimeout(() => {
			this.flipMissIndex++;
			if ((this.flipMissIndex % 2 === 0) && (this.arrayIdStars.length > 0)) {
				/*I want always 1 star there*/
				/*for yellow star*/
				this.starIndex = this.arrayIdStars.length - 1; /*maybe copy it below*/
				document.querySelector(this.arrayIdStars[this.starIndex]).classList.add("hide");
				/*document.getElementById(this.arrayIdStars[this.starIndex]).classList.add("hide");*/
				this.starRemoved[this.starRemoved.length] = this.arrayIdStars.pop();
				/*for black star*/
				this.starIndex = this.starRemovedBlack.length - 1; /*e.x.: get star4b*/
				/*document.getElementById(this.starRemovedBlack[this.starIndex]).classList.remove("hide");*/
				document.querySelector(this.starRemovedBlack[this.starIndex]).classList.remove("hide");
				this.arrayIdStarsBlack[this.arrayIdStarsBlack.length] = this.starRemovedBlack.pop();
			}
			const local_object = this;
			document.querySelectorAll(".span-miss").forEach(function(val){
				val.textContent = local_object.flipMissIndex;
			});
			document.getElementById(this.arrayDivIdFlipped[0]).classList.remove("effect-error");
			document.getElementById(this.arrayDivIdFlipped[1]).classList.remove("effect-error");
			document.getElementById(this.arraySpanIdFlipped[0]).classList.toggle("material-icons");
			document.getElementById(this.arraySpanIdFlipped[0]).classList.toggle("hide");
			document.getElementById(this.arraySpanIdFlipped[1]).classList.toggle("material-icons");
			document.getElementById(this.arraySpanIdFlipped[1]).classList.toggle("hide");
			this.reset();
		}, 1000);
	}
	/*Cards match*/
	matchCards() {
		this.flipCorrectIndex++;
		if (this.starRemoved.length >= 1) {
			document.querySelector(this.starRemoved[this.starRemoved.length - 1]).classList.remove("hide");
			this.arrayIdStars.push(this.starRemoved.pop());
			/*document.getElementById(this.arrayIdStarsBlack[this.arrayIdStarsBlack.length - 1]).classList.add("hide");*/
			document.querySelector(this.arrayIdStarsBlack[this.arrayIdStarsBlack.length - 1]).classList.add("hide");
			/*for black star*/
			document.querySelector(this.arrayIdStarsBlack[this.arrayIdStarsBlack.length - 1]).classList.add("hide");
			this.starRemovedBlack[this.starRemovedBlack.length] = this.arrayIdStarsBlack.pop();
		}
		const local_object = this; /*important here*/
		document.querySelectorAll(".span-hits").forEach(function(val) {
			val.textContent = local_object.flipCorrectIndex;
		});

		this.effectCorrect();
		this.reset();
	}
	/*Win the game*/
	winGame() {
		clearTimeout(oTimer.elapsedTimer);
		document.querySelector("#musicBackground").pause();
		document.querySelector("#musicWin").play();

		/*I want to show the number of stars that he has*/
		let numberOfYellowStars = this.arrayIdStars.length; /*I got the number*/
		let containerStars = document.querySelector(".container-stars-sidenav"); /*I get the sidenav container*/
		let listStars = containerStars.querySelectorAll("img"); /*list*/
		for (let i = 0; i < numberOfYellowStars; i++) {
			listStars[i].classList.remove("hide"); /*showing*/
		};

		document.getElementById("id-sidenav-win").classList.toggle("open");
		document.getElementById("id-hamburger-win").classList.toggle("open");

	}

	showCards() {
		setTimeout(() => {
			document.getElementById(this.arraySpanIdFlipped[this.flipIndex]).classList.toggle("material-icons"); /*display element*/
			document.getElementById(this.arraySpanIdFlipped[this.flipIndex]).classList.toggle("hide"); /*display element*/
			document.getElementById(this.arrayDivIdFlipped[this.flipIndex]).classList.toggle("effect-rotate");
			this.flipIndex++;
			if (this.flipIndex == 2) {
				if ((this.arrayIconsFlipped[0] === this.arrayIconsFlipped[1]) && (this.arrayDivIdFlipped[0] != this.arrayDivIdFlipped[1])) {
					/*avoid to count at same card*/
					this.matchCards();
					document.querySelector("#musicBackground").pause();
					document.querySelector("#musicMatch").play();
					if (this.flipCorrectIndex == (oBoardInit.totalCards / 2)) {
						this.winGame();
					}
				} else {
					document.querySelector("#grid-container").removeEventListener("click", runGame, true); /*prevent the user from selecting the same card twice*/
					this.effectError();
					this.redoFlip();
				}
			}
		}, 400); /*delay because it takes time to make the animation*/
	}
}
/*Global variables & objects*/
const numberOfCards = 16;
let oBoardInit = new Board;
let oMemoryGame = new Game(numberOfCards);


/*Main Function Important To Track Mouse Event*/
function runGame(evt) {

	if (!oMemoryGame.flagstartTimer) {
		oTimer.startTimer(); /*Start game timer*/
		oMemoryGame.flagstartTimer = true;
	}
	oMemoryGame.flipped++;
	document.querySelectorAll(".span-flipped").forEach(function(val){
		val.textContent = oMemoryGame.flipped;
	});

	oMemoryGame.flagMusicTurnOff === false ? document.querySelector("#musicBackground").play() : document.querySelector("#musicBackground").pause()

	oMemoryGame.arrayIconsFlipped[oMemoryGame.flipIndex] = evt.target.textContent; /*get the name of element flipped*/
	if (evt.target.children.length != 0) {
		/*avoid errors when clicking at same element*/
		oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex] = evt.target.children[0].id; /*get the span of element flipped*/
		/*oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.path[0].id; /*get the div of element flipped: WORKS ONLY IN GOOGLE CHROME*/
		oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.target.id; /*this works in IE, Google Chrome and Firefox*/
		document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
		oMemoryGame.showCards();
	}
}

/*GAME START AT FIRST CLICK*/
document.querySelector("#grid-container").addEventListener("click", runGame, true);

/*Homepage Buttons*/
/*Button refresh page*/
document.querySelector("#buttonRestart").addEventListener("click", function() {
	location.reload();
});
/*Button turn music off*/
document.querySelector("#buttonTurnMusicOff").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = true;
	document.querySelector("#musicBackground").pause();
	document.querySelector("#buttonTurnMusicOn").classList.remove("active");
	document.querySelector("#buttonTurnMusicOff").classList.add("active");
})
/*Button turn music on*/
document.querySelector("#buttonTurnMusicOn").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = false;
	document.querySelector("#musicBackground").play();
	document.querySelector("#buttonTurnMusicOn").classList.add("active");
	document.querySelector("#buttonTurnMusicOff").classList.remove("active");
})
/*Button button zoomIn*/
document.querySelector("#buttonZoomIn").addEventListener("click", function() {
	document.body.style.zoom = 1.0; /*this line is compatible only with chrome and edge*/
	document.querySelector("body").classList.add("zoomIn");
	document.querySelector("body").classList.remove("zoomOut");
});
/*Button zoomOut*/
document.querySelector("#buttonZoomOut").addEventListener("click", function() {
  document.body.style.zoom = 0.7; /*this line is compatible only with chrome and edge*/
	document.querySelector("body").classList.add("zoomOut");
	document.querySelector("body").classList.remove("zoomIn");
});
/*Button increase board and restart game*/
document.querySelector("#buttonLevelHard").addEventListener("click", function() {
	/*location.reload();*/
	clearTimeout(oTimer.elapsedTimer);
	if (oBoardInit.totalCards === 16) {
		oMemoryGame = new Game(24);
	} else if (oBoardInit.totalCards === 24) {
		oMemoryGame = new Game(32);
	} else if (oBoardInit.totalCards === 32) {
		oMemoryGame = new Game(40);
	} else if (oBoardInit.totalCards === 40){
		oMemoryGame = new Game(48);
	} else {
		oMemoryGame = new Game(56);
	}
});
/*Button decrease board and restart game*/
document.querySelector("#buttonLevelEasy").addEventListener("click", function() {
	/*location.reload();*/
	clearTimeout(oTimer.elapsedTimer);
	if (oBoardInit.totalCards === 56) {
		oMemoryGame = new Game(48);
	} else if (oBoardInit.totalCards === 48) {
		oMemoryGame = new Game(40);
	} else if (oBoardInit.totalCards === 40) {
		oMemoryGame = new Game(32);
	} else if (oBoardInit.totalCards === 32) {
		oMemoryGame = new Game(24);
	} else {
		oMemoryGame = new Game(16);
	}
});

/*sidenav*/
function openNav() {
  document.getElementById("id-sidenav-win").classList.toggle("open");
  document.getElementById("id-hamburger-win").classList.toggle("open");
}
function closeNav() {
  document.getElementById("id-sidenav-win").classList.toggle("open");
  document.getElementById("id-hamburger-win").classList.toggle("open");
}
/*Button refresh page*/
document.querySelector("#b-restart").addEventListener("click", function() {
	location.reload();
});
/*Button close side nav*/
document.querySelector("#b-cancel").addEventListener("click", function() {
	document.getElementById("id-sidenav-win").classList.toggle("open");
	document.getElementById("id-hamburger-win").classList.toggle("open");
});
