"use strict";
/**
 * The code is composed and written in the order below:
 * PART 1: INITIALIZATION/SETUP/LOGIC:
 * Class Board: create the board with cards
 * oTimer: literal object that counter the running timeout
 * Class Game: implement the game logic like flip cards...
 * PART 2: GAME START WITH MOUSE CLICK:
 * A global function: function runGame(evt) is called at first
 * mouse click on the board of cards. The function tracks the mouse
 * event through evt.
 * PART 3: GAME EXTRA INTERACTION (BUTTONS, ZOOM IN...)
 * In the end you have a simple implementation for the HTML elements as
 * buttons: zoom in, sidenav, increase board, restart...
 * @summary Memory Game concise functionality description.
 */
/**
 * Creates a new game BOARD with the respective
 * amount of cards.
 * @class
 */
class Board {
	/**
	* @description Represent the board of cards
	* @constructor
	* @param {number} numberOfCards - The number of cards the board has. It can
	be from 16 (standard) up to 56 cards! In fact, it can expand up to 2x times
  the size of the this.containerIcons array. However, I keep it fixed to 56.*/
	constructor(numberOfCards) {
		this.totalCards = numberOfCards;
		this.standardNumberofCards = 16;
		this.randomNumber = 0;
		this.arrayIconsRandom = new Array();
		this.arrayIcons = new Array();
		this.arraySpan = new Array();
		/*this.containerIcons = new Array("format_shapes", "bubble_chart", "border_right", "attach_money",
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
			"report_problem", "repeat_one", "all_out", "radio_button_checked");*/
		this.containerIcons = new Array("face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face",
			"face", "face", "face", "face");
		/**Get random set of cards of the containerIcons*/
		this.genArrayIcons();
		/**Populate the arraySpan (number of spans = cards)*/
		this.genSpanArray();
		/**Creating a random array (arraysIconsRandom).*/
		this.genRandom();
		/**in accord with the number of cards*/
		this.updateHtmlElements();
		/**update/write the respective cards to the board*/
		this.gridInit();
	};
	/**Get random cards of the containerIcons in accord of the number of cards
	The idea is not to let the game repetitive with always the same icons*/
	/*In ES6 you can instead of write: genArrayIcons : function ()
	|write it as done below:*/
	genArrayIcons() {
		/**localRandomNumber get a random start position from the containerIcons*/
		const localRandomNumber = Math.floor(Math.random() * (this.containerIcons.length - (this.totalCards / 2)));
		/**Populates the array (arrayIcons) with 8 followed items from the containerIcons*/
		this.arrayIcons = this.containerIcons.splice(localRandomNumber, this.totalCards / 2);
		/**Duplicate the arrayIcons*/
		for (let index = (this.totalCards / 2); index < this.totalCards; index++) {
			this.arrayIcons[index] = this.arrayIcons[index - (this.totalCards / 2)];
		};
	}
	/**Populate the arraySpan (number of spans = cards), It will be used to access
	the correct card*/
	genSpanArray() {
		let getSpan;
		for (let index = 0; index <= this.totalCards - 1; index++) {
			getSpan = "#span-" + index;
			this.arraySpan[index] = getSpan;
		};
	}
	/**Creating a random array (arraysIconsRandom). It will be randomly populate
  through from the arrayIcons-> this.randomNumber.*/
	genRandom() {
		for (let iLoop = this.arrayIcons.length - 1; iLoop >= 0; iLoop--) {
			this.randomNumber = Math.floor(Math.random() * iLoop);
			this.arrayIconsRandom[iLoop] = this.arrayIcons[this.randomNumber];
			/**to make sure it will keep the same elements-so remove the used one*/
			this.arrayIcons.splice(this.randomNumber, 1);
		};
	}
	/**Check how many cards we need and then increase or decrease the board*/
	updateHtmlElements() {
		/**important to use labels as "grid-container" instead of numbers because
		the number will change with the number of elements in HTML.
		let numbersOfDivs = document.body.children["grid-container"].children.length;*/
		let numbersOfDivs = document.body.children["main"].children["grid-container"].children.length;
		/**ADDING div/span. Plus the respective class attribute*/
		/**VERY IMPORTANT!!!: IF YOU ALWAYS to add the new ones and delete the
		old divs. If NOT you will receive an error:
		Uncaught TypeError: Cannot read property textContent of null at exactly this
		point of the code: .textContent in the function gritInit.
		I think this is due to the browser that is unable to syncronize
		with my HTML elements added before! This is a very special case!!!*/
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < (this.totalCards - this.standardNumberofCards); i++) {
			const newElementDiv = document.createElement("div");
			const newElementSpan = document.createElement("span");
			newElementDiv.setAttribute("id", "div-" + (this.standardNumberofCards + i))
			newElementSpan.setAttribute("id", "span-" + (this.standardNumberofCards + i))
			newElementSpan.setAttribute("class", "hide icon-size")
			fragment.appendChild(newElementDiv);
			newElementDiv.appendChild(newElementSpan);
		};
		/** reflow and repaint here -- once (Optimized)!*/
		document.getElementById("grid-container").appendChild(fragment);
		/**REMOVING div/span.*/
		for (let i = 0; i < (numbersOfDivs - this.standardNumberofCards); i++) {
			let remElement = document.getElementById("div-" + (this.standardNumberofCards + i));
			remElement.parentNode.removeChild(remElement);
		};
	}
	/**Game Grid Initialization: passing the random Array (arrayIconsRandom) to
  the Grid (arraySpan)*/
	gridInit() {
		/**Setting the #grid-container layout in accord of the number of cards*/
		this.totalCards > 16 ? document.querySelector("#grid-container").classList.add("wide") :
			document.querySelector("#grid-container").classList.remove("wide")
		for (let iLoop = this.totalCards - 1; iLoop >= 0; iLoop--) {
			document.querySelector(this.arraySpan[iLoop]).textContent = this.arrayIconsRandom[iLoop];
		};
	}
}
/**
 * Randomly change the music source
 * @class
 */
let oMusic = {
  arrayMusic: new Array("./sounds/background-music.mp3",
"./sounds/background-music-2.mp3",
"./sounds/background-music-3.mp3",
"./sounds/background-music-4.mp3",
"./sounds/background-music-5.mp3",
"./sounds/background-music-6.mp3",
"./sounds/background-music-7.mp3",
"./sounds/background-music-8.mp3",
"./sounds/background-music-9.mp3",
"./sounds/background-music-10.mp3",
"./sounds/background-music-11.mp3",
"./sounds/background-music-12.mp3",
"./sounds/background-music-13.mp3",
"./sounds/background-music-14.mp3",
"./sounds/background-music-15.mp3",
"./sounds/background-music-16.mp3",
"./sounds/background-music-17.mp3",
"./sounds/background-music-18.mp3",
"./sounds/background-music-19.mp3",
"./sounds/background-music-20.mp3"),
  radomNumber: 0,
  musicShuffle() {
			this.randomNumber = Math.floor(Math.random() * this.arrayMusic.length-1);
      let source = document.querySelector(".music-background");
      source.src = this.arrayMusic[this.randomNumber];
	}
};
/**
 * Creates a new timer to track the
 * game elapsed time.
 * @class
 */
let oTimer = {
	timeNow: 0,
	timeGameStart: 0,
	elapsedTotalTime: 0,
	elapsedTimer: 0,
	startTimer() {
		this.timeGameStart = Date.now();
		/**We used this.elapsedTimer to stop the timer! and call
		the displayTime each second*/
		this.elapsedTimer = setInterval(this.displayTimer, 1000);
	},
	/**Calculate and display the time*/
	displayTimer() {
		this.elapsedTotalTime = Date.now() - oTimer.timeGameStart;
		let timeElapsedSec = Math.floor(this.elapsedTotalTime / 1000);
		this.elapsedSec = timeElapsedSec - (Math.floor(timeElapsedSec / 60) * 60);
		document.querySelectorAll(".span-timer-m").forEach(function(val) {
			val.textContent = Math.floor(timeElapsedSec / 60);
		});
		document.querySelectorAll(".span-timer-s").forEach(function(val) {
			val.textContent = timeElapsedSec - (Math.floor(timeElapsedSec / 60) * 60);
		});
	},
	/**return the current date*/
	date() {
		let timeNow = new Date();
		let day = timeNow.getDate();
		let month = timeNow.getMonth() + 1 //January is 0!
		let year = timeNow.getFullYear();
		return (day + "/" + month + "/" + year);
	},
	/**return the current time*/
	time() {
		let timeNow = new Date();
		let hours = timeNow.getHours();
		let minutes = timeNow.getMinutes();
		let seconds = timeNow.getSeconds();

		let minutes2 = (minutes < 10) ? "0" + minutes : minutes;
		let seconds2 = (seconds < 10) ? "0" + seconds : seconds;
		console.log(hours + ":" + minutes2 + ":" + seconds2);
		return (hours + ":" + minutes2 + ":" + seconds2);
	}
};
/**
 * Creates a new game functionality with the correct number of cards
 * @class
 */
class Game {
	/**
	* @description Represent the game logic
	* @constructor
	* @param {number} numberOfCards - The number of cards the game has. It can
	be from 16 (standard) up to 56 cards! In fact, it can expand up to 2x times
	the size   of the this.containerIcons array. However, I keep it fixed to 56.*/
	constructor(numberOfCards) {
    oMusic.musicShuffle();
		this.flagMusicTurnOff = false;
		this.flagstartTimer = false;
		oBoardInit = new Board(numberOfCards);
		/**track the flip cards*/
		this.flipIndex = 0;
		/**store the name of icons to compare*/
		this.arrayIconsFlipped = new Array("none", "none-1");
		/**store the id of span elements flipped*/
		this.arraySpanIdFlipped = new Array(2);
		/**store the div of elements flipped*/
		this.arrayDivIdFlipped = new Array(2);
		this.arrayIdStars = new Array(".star1", ".star2", ".star3");
		this.starRemoved = new Array(".star8", ".star7", ".star6", ".star5", ".star4");
		this.arrayIdStarsBlack = new Array(".star8b", ".star7b", ".star6b", ".star5b", ".star4b");
		this.starRemovedBlack = new Array(".star1b", ".star2b", ".star3b");
		/**to track the end of the game*/
		this.flipCorrectIndex = 0;
		/**to track misses*/
		this.flipMissIndex = 0;
		/**track the number of flipped cards at html(body)*/
		this.flipped = 0;
		/*Arrays to get the results from Memory*/
		this.arrayCurrentDate = new Array();
		this.currentTime = new Array();
		this.totalNumberOfCards = new Array();
		this.elapsedTimeMin = new Array();
		this.elapsedTimeSec = new Array();
		this.misses = new Array();
		this.flipped = new Array();
		this.destructor();
	}
	/**called only by constructor(): total Reset for oMemoryGame*/
	destructor() {
		/**reset the html (body: hits, miss and flipped cards)*/
		document.querySelectorAll(".span-flipped").forEach(function(val) {
			val = 0;
		});
		document.querySelectorAll(".span-hits").forEach(function(val) {
			val = 0;
		});
		document.querySelectorAll(".span-miss").forEach(function(val) {
			val = 0;
		});
		/**reset the music flag*/
		document.querySelector("#buttonTurnMusicOn").classList.add("active");
		document.querySelector("#buttonTurnMusicOff").classList.remove("active");
		/**reset the grid board*/
		let container = document.querySelector("#grid-container");
		let listSpans = container.querySelectorAll("span");
		let listDivs = container.querySelectorAll("div");
		for (let i = 0; i < listSpans.length; i++) {
			listSpans[i].classList.add("hide");
			listSpans[i].classList.remove("material-icons");
			listDivs[i].classList.remove("effect-correct");
		}
		/**reset the stars*/
		let containerStars = document.querySelector(".container-stars");
		let index = 1;
		containerStars.querySelectorAll("img").forEach(function(star) {
			if (index <= 3) {
				/**show yellow stars*/
				star.classList.remove("hide");
			} else if (index <= 11) {
				/**hide yellow & black stars*/
				star.classList.add("hide");
			} else {
				/**show black stars*/
				star.classList.remove("hide");
			}
			index++;
		});
		/**restart html(body: time)*/
		document.querySelectorAll(".span-timer-m").forEach(function(val) {
			val.textContent = 0;
		});
		document.querySelectorAll(".span-timer-s").forEach(function(val) {
			val.textContent = 0;
		});
	}
	/**called by function showCards() when the cards do not match*/
	effectError() {
		document.querySelector("#musicError").play();
		document.getElementById(this.arrayDivIdFlipped[0]).classList.add("effect-error");
		document.getElementById(this.arrayDivIdFlipped[1]).classList.add("effect-error");
	}
	/**called by function redoFlip: reset to restart only the round NOT THE GAME*/
	reset() {
		this.flipIndex = 0;
		this.arrayIconsFlipped.splice(0, 2);
		this.arraySpanIdFlipped.splice(0, 2);
		this.arrayDivIdFlipped.splice(0, 2);
		/**track mouse click restart! Is was removed before to avoid more than two cards
    flipped at once. We can say: allow game to "restart"!*/
		document.querySelector("#grid-container").addEventListener("click", runGame, true);
	}
	/**called by function showCards()*/
	redoFlip() {
		/**this way to write setTimeout is VERY important:
		it's because this in the setTimeout handler is referring to the window.*/
		setTimeout(() => {
			this.flipMissIndex++;
			if ((this.flipMissIndex % 2 === 0) && (this.arrayIdStars.length > 0)) {
				/**for yellow star*/
				document.querySelector(this.arrayIdStars[this.arrayIdStars.length - 1]).classList.add("hide");
				this.starRemoved[this.starRemoved.length] = this.arrayIdStars.pop();
				/*for black star*/
				document.querySelector(this.starRemovedBlack[this.starRemovedBlack.length - 1]).classList.remove("hide");
				this.arrayIdStarsBlack[this.arrayIdStarsBlack.length] = this.starRemovedBlack.pop();
			}
			const local_object = this;
			document.querySelectorAll(".span-miss").forEach(function(val) {
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
	/**called by function matchCards() when the cards match*/
	effectCorrect() {
		document.getElementById(this.arrayDivIdFlipped[0]).classList.add("effect-correct");
		document.getElementById(this.arrayDivIdFlipped[1]).classList.add("effect-correct");
	}
	/**saving the result in local storage*/
	savingResults() {
		/**Directly declaring and saving it! The first value is undefined, the comma will be used
		to split it writing in an array.*/
		localStorage.totalNumberOfCards = localStorage.totalNumberOfCards + "," + oBoardInit.totalCards;
		localStorage.flipped = localStorage.flipped + "," + this.flipped;
		localStorage.misses = localStorage.misses + "," + this.flipMissIndex;
		localStorage.elapsedTimeMin = localStorage.elapsedTimeMin + "," + document.querySelector(".span-timer-m").textContent;
		localStorage.elapsedTimeSec = localStorage.elapsedTimeSec + "," + document.querySelector(".span-timer-s").textContent;
		localStorage.currentDate = localStorage.currentDate + "," + oTimer.date();
		localStorage.currentTime = localStorage.currentTime + "," + oTimer.time();
		/*Used to debug!
		console.log("The total number of cards: " + localStorage.getItem("totalNumberOfCards"));
		console.log("The total number of flipped cards: " + localStorage.getItem("flipped"));
		console.log("The total number of missed cards: " + localStorage.getItem("misses"));
		console.log("The total time in min: " + localStorage.getItem("elapsedTimeMin"));
		console.log("The total time in sec: " + localStorage.getItem("elapsedTimeSec"));
		console.log("The current date is: " + localStorage.getItem("currentDate"));
		console.log("The current time is: " + localStorage.getItem("currentTime"));*/
		if (localStorage.length > 1) {
			this.displayResults();
		}
	}
  /*Used to get from localStorage and write the table*/
	displayResults() {
		/*transform everything in an array*/
		this.arrayCurrentDate = localStorage.currentDate.split(",");
		this.currentTime = localStorage.currentTime.split(",");
		this.totalNumberOfCards = localStorage.totalNumberOfCards.split(",");
		this.elapsedTimeMin = localStorage.elapsedTimeMin.split(",");
		this.elapsedTimeSec = localStorage.elapsedTimeSec.split(",");
		this.misses = localStorage.misses.split(",");
		this.flipped = localStorage.flipped.split(",");
		/*Appending the elements in a table!!!*/
		let loopLimit = document.getElementById("table-row").children.length;

		const fragment = document.createDocumentFragment();
		for (let i = this.arrayCurrentDate.length - 1; i > loopLimit; i--) {
			const newLine = document.createElement("tr");
			const newColumn = document.createElement("td");
			const newColumn2 = document.createElement("td");
			const newColumn3 = document.createElement("td");
			const newColumn4 = document.createElement("td");
			const newColumn5 = document.createElement("td");
			const newColumn6 = document.createElement("td");
			const newSpan = document.createElement("span");
			const newSpan2 = document.createElement("span");
			const newSpan3 = document.createElement("span");
			const newSpan4 = document.createElement("span");
			const newSpan5 = document.createElement("span");
			const newSpan6 = document.createElement("span");
			newSpan.textContent = this.arrayCurrentDate[i];
			newSpan2.textContent = this.currentTime[i];
			newSpan3.textContent = this.totalNumberOfCards[i];
			newSpan4.textContent = this.flipped[i];
			newSpan5.textContent = this.misses[i];
			newSpan6.textContent = this.elapsedTimeMin[i] + " m " + this.elapsedTimeSec[i] + " s";
			fragment.appendChild(newLine);
			newLine.appendChild(newColumn);
			newColumn.appendChild(newSpan);
			newLine.appendChild(newColumn2);
			newColumn2.appendChild(newSpan2);
			newLine.appendChild(newColumn3);
			newColumn3.appendChild(newSpan3);
			newLine.appendChild(newColumn4);
			newColumn4.appendChild(newSpan4);
			newLine.appendChild(newColumn5);
			newColumn5.appendChild(newSpan5);
			newLine.appendChild(newColumn6);
			newColumn6.appendChild(newSpan6);
		};
		/** reflow and repaint here -- once (Optimized)!*/
		document.getElementById("table-row").appendChild(fragment);
	}
	clearResults() {
		/**REMOVING all the tables lines.*/
		let myNode = document.getElementById("table-row");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}
	/**called by function showCards() when the flipped cards match*/
	matchCards() {
		this.flipCorrectIndex++;
		if (this.starRemoved.length >= 1) {
			/**for yellow star*/
			document.querySelector(this.starRemoved[this.starRemoved.length - 1]).classList.remove("hide");
			this.arrayIdStars.push(this.starRemoved.pop());
			/**for black star*/
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
	/**Win the game called by function showCards*/
	winGame() {
		clearTimeout(oTimer.elapsedTimer);
		document.querySelector("#musicWin").play();
		/**Showing the number of stars that he has*/
		/**Getting the number*/
		let numberOfYellowStars = this.arrayIdStars.length;
		/**I get the sidenav container*/
		let containerStars = document.querySelector(".container-stars-sidenav");
		let listStars = containerStars.querySelectorAll("img");
		for (let i = 0; i < numberOfYellowStars; i++) {
			listStars[i].classList.remove("hide");
		};
		document.getElementById("id-sidenav-1").classList.toggle("open");
		/*local storage*/
		this.savingResults();
	}
	/**Main logic function of this class that call other functions!*/
	showCards() {
		setTimeout(() => {
			/**to display element you need to add material-icons and remove hide*/
			document.getElementById(this.arraySpanIdFlipped[this.flipIndex]).classList.toggle("material-icons");
			document.getElementById(this.arraySpanIdFlipped[this.flipIndex]).classList.toggle("hide");
			document.getElementById(this.arrayDivIdFlipped[this.flipIndex]).classList.toggle("effect-rotate");
			this.flipIndex++;
			if (this.flipIndex === 2) {
				if ((this.arrayIconsFlipped[0] === this.arrayIconsFlipped[1]) && (this.arrayDivIdFlipped[0] != this.arrayDivIdFlipped[1])) {
					this.matchCards();
					document.querySelector("#musicMatch").play();
					if (this.flipCorrectIndex === (oBoardInit.totalCards / 2)) {
						this.winGame();
					}
				} else {
					/**prevent the user from selecting the same card twice*/
					document.querySelector("#grid-container").removeEventListener("click", runGame, true);
					this.effectError();
					this.redoFlip();
				}
			}
		}, 400); /**delay it important because it takes time to make the animation*/
	}
}
/**Global variables & objects*/
const numberOfCards = 16;
let oBoardInit = new Board(numberOfCards);
let oMemoryGame = new Game(numberOfCards);
/**
 * Main Game Function that Starts the Game at First Mouse Click
 *
 * @description runGame func. called at first mouse click on the board of cards.
 * @param {mouse event} evt - track mouse events at game board
 */
function runGame(evt) {
	if (!oMemoryGame.flagstartTimer) {
		oTimer.startTimer();
		oMemoryGame.flagstartTimer = true;
	}
	oMemoryGame.flipped++;
	document.querySelectorAll(".span-flipped").forEach(function(val) {
		val.textContent = oMemoryGame.flipped;
	});
	oMemoryGame.flagMusicTurnOff === false ? document.querySelector(".music-background").play() : document.querySelector(".music-background").pause()
	/**get the name of element flipped*/
	oMemoryGame.arrayIconsFlipped[oMemoryGame.flipIndex] = evt.target.textContent;
	/**avoid errors when clicking at same element*/
	if (evt.target.children.length != 0) {
		/**get the span and div of the flipped card*/
		oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex] = evt.target.children[0].id;
		oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.target.id;
		document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
		oMemoryGame.showCards();
	}
}
/**GAME START AT FIRST CLICK*/
document.querySelector("#grid-container").addEventListener("click", runGame, true);
/**homepage buttons HTML(body elements)*/
/**button refresh page*/
document.querySelector("#buttonRestart").addEventListener("click", function() {
	clearTimeout(oTimer.elapsedTimer);
	oMemoryGame = new Game(16);
});
/**button turn music off*/
document.querySelector("#buttonTurnMusicOff").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = true;
	document.querySelector(".music-background").pause();
	document.querySelector("#buttonTurnMusicOn").classList.remove("active");
	document.querySelector("#buttonTurnMusicOff").classList.add("active");
})
/**button turn music on*/
document.querySelector("#buttonTurnMusicOn").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = false;
	document.querySelector(".music-background").play();
	document.querySelector("#buttonTurnMusicOn").classList.add("active");
	document.querySelector("#buttonTurnMusicOff").classList.remove("active");
})
/**button zoomIn*/
document.querySelector("#buttonZoomIn").addEventListener("click", function() {
	document.body.style.zoom = 1.0; /*this line is compatible only with chrome and edge*/
	document.querySelector("body").classList.add("zoom-in");
	document.querySelector("body").classList.remove("zoom-out");
});
/**button zoomOut*/
document.querySelector("#buttonZoomOut").addEventListener("click", function() {
	document.body.style.zoom = 0.7; /*this line is compatible only with chrome and edge*/
	document.querySelector("body").classList.add("zoom-out");
	document.querySelector("body").classList.remove("zoom-in");
});
/**button increase board and restart game*/
document.querySelector("#buttonLevelHard").addEventListener("click", function() {
	clearTimeout(oTimer.elapsedTimer);
	if (oBoardInit.totalCards === 16) {
		oMemoryGame = new Game(24);
	} else if (oBoardInit.totalCards === 24) {
		oMemoryGame = new Game(32);
	} else if (oBoardInit.totalCards === 32) {
		oMemoryGame = new Game(40);
	} else if (oBoardInit.totalCards === 40) {
		oMemoryGame = new Game(48);
	} else {
		oMemoryGame = new Game(56);
	}
});
/**Button decrease board and restart game*/
document.querySelector("#buttonLevelEasy").addEventListener("click", function() {
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
/**button to display the results*/
document.querySelector("#b-results-sidenav-1").addEventListener("click", function() {
	document.getElementById("id-sidenav-3").classList.toggle("open");
});
/**button refresh <!--SIDENAV 1: WIN GAME MENU-->*/
document.querySelector("#b-restart-sidenav-1").addEventListener("click", function() {
	oMemoryGame = new Game(16);
	document.getElementById("id-sidenav-1").classList.toggle("open");
});
/**button close side nav <!--SIDENAV: WIN GAME MENU-->*/
document.querySelector("#b-cancel-sidenav-1").addEventListener("click", function() {
	document.getElementById("id-sidenav-1").classList.toggle("open");
});
/**<!--SIDENAV 2: OPEN AND CLOSE-->*/
function openNav() {
	document.getElementById("id-sidenav-2").classList.toggle("open");
}
function closeNav() {
	document.getElementById("id-sidenav-2").classList.toggle("open");
}
/**<!--SIDENAV 2: BUTTONS-->*/
document.querySelector("#b-restart-sidenav-48").addEventListener("click", function() {
	clearTimeout(oTimer.elapsedTimer);
	oMemoryGame = new Game(48);
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
document.querySelector("#b-restart-sidenav-24").addEventListener("click", function() {
	clearTimeout(oTimer.elapsedTimer);
	oMemoryGame = new Game(24);
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
document.querySelector("#b-restart-sidenav-16").addEventListener("click", function() {
	clearTimeout(oTimer.elapsedTimer);
	oMemoryGame = new Game(16);
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
/**button turn music on*/
document.querySelector("#b-sound-on").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = false;
	document.querySelector(".music-background").play();
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
/**button turn music off*/
document.querySelector("#b-sound-off").addEventListener("click", function() {
	oMemoryGame.flagMusicTurnOff = true;
	document.querySelector(".music-background").pause();
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
document.querySelector("#b-cancel-sidenav-2").addEventListener("click", function() {
	document.getElementById("id-sidenav-2").classList.toggle("open");
});
/**<!--SIDENAV 2: Hamburger and close buttons-->*/
document.querySelector(".id-hamburger-sidenav-2").addEventListener("click", function() {
	openNav();
});
/**--SIDENAV 3: OPEN AND CLOSE-->*/
/*icon to open*/
document.querySelector(".b-description").addEventListener("click", function() {
	document.getElementById("id-sidenav-3").classList.toggle("open");
  /*In this specific case, it should calculate to be displayed*/
  oMemoryGame.displayResults();
});
/*button at sidenav 2 to open the results sidenav 03*/
document.querySelector("#b-results-sidenav-2").addEventListener("click", function() {
	document.getElementById("id-sidenav-3").classList.toggle("open");
	/*In this specific case, it should calculate to be displayed*/
	oMemoryGame.displayResults();
});
/*button cancel to close the sidenav 03*/
document.querySelector("#b-cancel-sidenav-3").addEventListener("click", function() {
	document.getElementById("id-sidenav-3").classList.toggle("open");
});
document.querySelector("#b-clear-results").addEventListener("click", function() {
	window.localStorage.clear();
	oMemoryGame.clearResults();
});
