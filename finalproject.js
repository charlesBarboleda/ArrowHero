let ctx = document.getElementById("movingArrowsCanvas").getContext("2d");
let ctx2 = document.getElementById("textCanvas").getContext("2d");
let ctx3 = document.getElementById("targetCanvas").getContext("2d");
let ctx4 = document.getElementById("healthBarCanvas").getContext("2d");
let ctx5 = document.getElementById("menuCanvas").getContext("2d");

let leftArrow = document.getElementById("leftArrow");
let upArrow = document.getElementById("upArrow");
let downArrow = document.getElementById("downArrow");
let rightArrow = document.getElementById("rightArrow");

let fLeftArrow = document.getElementById("fLeftArrow");
let fUpArrow = document.getElementById("fUpArrow");
let fDownArrow = document.getElementById("fDownArrow");
let fRightArrow = document.getElementById("fRightArrow");

let pixelsPerSecond = 10;
let score = 0;
let health = 388;

let leaderboardArray = [];

let perfectCount = 0;
let goodCount = 0;
let missCount = 0;
let earlyCount = 0;
let totalArrowsHit = 0;

let animateTitleId;
let animateGameOverId;

function animateTitle(){
	
	let opacity = 0;
	
	animateTitleId = setInterval(function(){
		ctx5.clearRect(0, 0, 400, 400);
		ctx5.font = "bold 50px Comic Sans MS";
		ctx5.fillStyle = "rgba(251, 101, 66, " + opacity + ")";
		ctx5.textAlign = "center";
		ctx5.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
		ctx5.lineWidth = 5;
		ctx5.strokeText("ARROW HERO", 200, 200);
		ctx5.stroke();
		ctx5.fillText("ARROW HERO", 200, 200);
		opacity += 0.01;
		
		if(opacity > 1){
			clearInterval(animateTitleId);
		}
	}, 10);
}
 


function removeListeners(){
	
	document.removeEventListener("click", listenerStartClick);
	document.removeEventListener("click", listenerEasyClick);
	document.removeEventListener("click", listenerMediumClick);
	document.removeEventListener("click", listenerHardClick);
	document.removeEventListener("click", listenerPlayAgainClick);
	document.removeEventListener("click", listenerViewStatsClick);
	document.removeEventListener("click", listenerLeaderboardClick);
	document.removeEventListener("click", listenerBackClick);
	
}

function clickableEasyButton(){
	
	document.addEventListener("click", listenerEasyClick = function(event){
		if((event.x > 143) && (event.x < 143 + 120) && (event.y > 253) && (event.y < 253 + 34)){
			gameStartCountDown();
			setTimeout(easy, 4500);
			removeListeners();
		}
	});
}

function clickableMediumButton(){
	
	document.addEventListener("click", listenerMediumClick = function(event){
		if((event.x > 123) && (event.x < 123 + 159) && (event.y > 303) && (event.y < 303 + 34)){
			gameStartCountDown();
			setTimeout(medium, 4500);
			removeListeners();
		}
	});
}

function clickableHardButton(){
	
	document.addEventListener("click", listenerHardClick = function(event){
		if((event.x > 143) && (event.x < 143 + 122) && (event.y > 353) && (event.y < 353 + 34)){
			gameStartCountDown();
			setTimeout(hard, 4500);
			removeListeners();
		}
	});
}

let listenerStartClick;
let listenerEasyClick;
let listenerMediumClick;
let listenerHardClick;

function clickableStartButton(){
	
	setTimeout(function(){
		document.addEventListener("click", listenerStartClick = function(event){
			if((event.x > 147) && (event.x < 151 + 113) && (event.y > 354) && (event.y < 354 + 34)){
				chooseDifficulty();
				removeListeners();
				clickableEasyButton();
				clickableMediumButton();
				clickableHardButton();
				clearInterval(animateTitleId);
			}
		});
	}, 2000);
}

function delayMainMenu(){
	
	setTimeout(animateTitle, 500);
	setTimeout(startButton, 2000);
}

function startButton(){

	ctx3.beginPath();
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(145, 273, 111, 32);
	ctx3.rect(145, 273, 111, 32);
	ctx3.stroke();
	
	ctx3.beginPath();
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("START", 200, 300);
}

function chooseDifficulty(){
	
	ctx5.clearRect(0, 0, 400, 400);
	ctx3.clearRect(0, 0, 400, 400);
	
	ctx5.font = "bold 35px Comic Sans MS";
	ctx5.fillStyle = "rgba(251, 101, 66, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";
	ctx5.lineWidth = 5;
	ctx5.strokeText("SELECT DIFFICULTY", 200, 100);
	ctx5.stroke();
	ctx5.fillText("SELECT DIFFICULTY", 200, 100);
	
	ctx3.beginPath(); // EASY
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(145, 173, 111, 32);
	ctx3.rect(145, 173, 111, 32);
	ctx3.stroke();
	
	ctx3.beginPath(); 
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("EASY", 200, 200);
	
	ctx3.beginPath(); // MEDIUM
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(125, 223, 150, 32);
	ctx3.rect(125, 223, 150, 32);
	ctx3.stroke();
	
	ctx3.beginPath(); 
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("MEDIUM", 200, 250);
	
	ctx3.beginPath(); // HARD
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(145, 273, 113, 32);
	ctx3.rect(145, 273, 113, 32);
	ctx3.stroke();
	
	ctx3.beginPath(); 
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("HARD", 200, 300);
	
}

function gameOverMenu(){
	
	clearCanvas();
	
	ctx3.beginPath(); // Your Score
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "white";
	ctx3.fillText("Your Score: " + score, 200, 200);
		
	ctx3.beginPath();
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fontStyle = "black";
	ctx3.lineWidth = 2;
	ctx3.strokeText("Your Score: " + score, 200, 200);
		
	ctx3.beginPath(); // Play Again
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(100, 223, 200, 32);
	ctx3.rect(100, 223, 200, 32);
	ctx3.stroke();
	
	ctx3.beginPath();
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("PLAY AGAIN", 200, 250);
		
	ctx3.beginPath(); // View Stats
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(95, 263, 210, 32);
	ctx3.rect(95, 263, 210, 32);
	ctx3.stroke();
	
	ctx3.beginPath();
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("VIEW STATS", 200, 290);
		
	ctx3.beginPath(); // Leaderboard
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(85, 303, 230, 32);
	ctx3.rect(85, 303, 230, 32);
	ctx3.stroke();
	
	ctx3.beginPath();
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("LEADERBOARD", 200, 330);
}

function viewStats(){
	
	clearCanvas();
	
	ctx5.beginPath();
	ctx5.font = "bold 50px Comic Sans MS";
	ctx5.fillStyle = "rgba(251, 101, 66, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";
	ctx5.lineWidth = 5;
	ctx5.strokeText("STATS", 200, 75);
	ctx5.fillText("STATS", 200, 75);
	
	ctx3.beginPath();
	ctx3.lineWidth = 2;
	ctx3.font = "bold 30px Comic Sans MS";
	
	ctx3.fillStyle = "rgba(0, 255, 0, 1)";
	ctx3.fillText("Perfect: " + perfectCount, 200, 130);
	ctx3.strokeStyle = "black";
	ctx3.strokeText("Perfect: " + perfectCount, 200, 130);
	
	ctx3.fillStyle = "rgba(255, 255, 0, 1)";
	ctx3.fillText("Good: " + goodCount, 200, 180);
	ctx3.strokeStyle = "black";
	ctx3.strokeText("Good: " + goodCount, 200, 180);
	
	ctx3.fillStyle = "rgba(255, 0, 255, 1)";
	ctx3.fillText("Early: " + earlyCount, 200, 230);
	ctx3.strokeStyle = "black";
	ctx3.strokeText("Early: " + earlyCount, 200, 230);
	
	ctx3.fillStyle = "rgba(255, 0, 255, 1)";
	ctx3.fillText("Miss: " + missCount, 200, 280);
	ctx3.strokeStyle = "black";
	ctx3.strokeText("Miss: " + missCount, 200, 280);
	
	ctx3.fillStyle = "white"
	ctx3.fillText("Total Hits: " + totalArrowsHit, 200, 330);
	ctx3.strokeStyle = "black";
	ctx3.strokeText("Total Hits: " + totalArrowsHit, 200, 330);
	
	ctx3.beginPath(); // Back
	ctx3.lineWidth = 2;
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(145, 363, 113, 32);
	ctx3.rect(145, 363, 113, 32);
	ctx3.stroke();
	
	ctx3.beginPath(); 
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("BACK", 200, 390);
}


function clickableBackButton(){
	
	document.addEventListener("click", listenerBackClick = function(event){
		if((event.x > 143) && (event.x < 143 + 122) && (event.y > 442) && (event.y < 442 + 34)){
			removeListeners();
			gameOverMenu();
			if(!isGameOver){
				gameFinishedText();
			} else {
				gameOverText();
			}
			playAgainButton();
			viewStatsButton();
			leaderboardButton();
		}
	});
}

function leaderboardButton(){
	
	document.addEventListener("click", listenerLeaderboardClick = function(event){
		if((event.x > 90) && (event.x < 90 + 235) && (event.y > 384) && (event.y < 384 + 34)){
			clearInterval(animateGameOverId)
			clearInterval(animateGameFinishedId)
			leaderboard();
			removeListeners();
			clickableBackButton();
		}
	});
}

let timerId;
let timer = 60;

function gameTimer(){
	
	timer = 60;
	
	timerId = setInterval(function(){
		timer--;
		if(timer == 0){
			clearInterval(timerId);
			timer = 60;
			gameFinished();
		}
	}, 1000)
}

function swapArrayElements(firstElement, secondElement){
	
	let a = leaderboardArray[firstElement];
	leaderboardArray[firstElement] = leaderboardArray[secondElement];
	leaderboardArray[secondElement] = a;
}


function leaderboard(){
	
	clearCanvas();
	let length = leaderboardArray.length;
	let yPosition = 100;
	
	ctx5.beginPath(); // Local Leaderboard
	ctx5.font = "bold 30px Comic Sans MS";
	ctx5.fillStyle = "rgba(251, 101, 66, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";
	ctx5.lineWidth = 5;
	ctx5.strokeText("LOCAL LEADERBOARD", 200, 50);
	ctx5.fillText("LOCAL LEADERBOARD", 200, 50);
	
	for(let x=0;x<length;x++){
		ctx3.font = "bold 20px Comic Sans MS";
		ctx3.fillStyle = "white";
		ctx3.strokeStyle = "black"
		ctx3.lineWidth = 5;
		ctx3.textAlign = "center";
		ctx3.strokeText(x+1 + ". " + leaderboardArray[x].score + " points / " + leaderboardArray[x].difficulty + " / " + (60-leaderboardArray[x].time) + "sec", 200, yPosition); 
		ctx3.fillText(x+1 + ". " + leaderboardArray[x].score + " points / " + leaderboardArray[x].difficulty + " / " + (60-leaderboardArray[x].time) + "sec", 200, yPosition);
		yPosition += 25;
	}
	
	ctx3.beginPath(); // Back
	ctx3.lineWidth = 2;
	ctx3.fillStyle = "rgba(251, 101, 66, 1)";
	ctx3.fillRect(145, 363, 113, 32);
	ctx3.rect(145, 363, 113, 32);
	ctx3.stroke();
	
	ctx3.beginPath(); 
	ctx3.font = "bold 30px Comic Sans MS";
	ctx3.textAlign = "center";
	ctx3.fillStyle = "#46211A";
	ctx3.fillText("BACK", 200, 390);
}

function viewStatsButton(){
	
	document.addEventListener("click", listenerViewStatsClick = function(event){
		if((event.x > 100) && (event.x < 100 + 215) && (event.y > 344) && (event.y < 344 + 34)){
			clearInterval(animateGameOverId);
			clearInterval(animateGameFinishedId);
			removeListeners();
			viewStats();
			clickableBackButton();
		}
	});
}

let listenerPlayAgainClick;
let listenerViewStatsClick;
let listenerLeaderboardClick;
let listenerBackClick;

function playAgainButton(){
	
	document.addEventListener("click", listenerPlayAgainClick = function(event){
		if((event.x > 100) && (event.x < 110 + 200) && (event.y > 304) && (event.y < 304 + 34)){
			clearInterval(animateGameOverId);
			clearInterval(animateGameFinishedId);
			score = 0;
			chooseDifficulty();
			removeListeners();
			clickableEasyButton();
			clickableMediumButton();
			clickableHardButton();
		}
	});
}

let difficulty;

function LeaderboardEntry(score, difficulty, time){
	
	this.score = score
	this.difficulty = difficulty;
	this.time = time;
}

function gameFinishedText(){
	
	ctx5.clearRect(0, 0, 400, 400);
	ctx5.font = "bold 60px Comic Sans MS";
	ctx5.fillStyle = "rgba(145, 255, 36, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";;
	ctx5.lineWidth = 5;
	ctx5.strokeText("FINISHED", 200, 150);
	ctx5.stroke();
	ctx5.fillText("FINISHED", 200, 150);
}


function gameOverText(){
	
	ctx5.clearRect(0, 0, 400, 400);
	ctx5.font = "bold 60px Comic Sans MS";
	ctx5.fillStyle = "rgba(255, 0, 0, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";;
	ctx5.lineWidth = 5;
	ctx5.strokeText("GAME OVER", 200, 150);
	ctx5.stroke();
	ctx5.fillText("GAME OVER", 200, 150);
}

let animateGameFinishedId;

isGameOver = false;


function gameFinished(){
	
	isGameOver = false;
	
	leaderboardArray.push(new LeaderboardEntry(score, difficulty, timer));
	leaderboardArray.sort(function(a, b){return b.score - a.score;});
	
	if(leaderboardArray.length > 10){
		leaderboardArray.splice(10,1)
	}
	
	stop();
	
	let opacity = 0;
	animateGameFinishedId = setInterval(function(){
		ctx5.clearRect(0, 0, 400, 400);
		ctx5.font = "bold 60px Comic Sans MS";
		ctx5.fillStyle = "rgba(145, 255, 36, " + opacity + ")";
		ctx5.textAlign = "center";
		ctx5.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
		ctx5.lineWidth = 5;
		ctx5.strokeText("FINISHED", 200, 150);
		ctx5.stroke();
		ctx5.fillText("FINISHED", 200, 150);
		opacity += 0.01;
		
		if(opacity > 1){
			clearInterval(animateGameFinishedId);
		}
	}, 10);
	ctx5.clearRect(0, 0, 400, 400);
	ctx5.font = "bold 60px Comic Sans MS";
	ctx5.fillStyle = "rgba(145, 255, 36, 1)";
	ctx5.textAlign = "centernter";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";;
	ctx5.lineWidth = 5;
	ctx5.strokeText("FINISHED", 200, 150);
	ctx5.stroke();
	ctx5.fillText("FINISHED", 200, 150);
	
	gameOverMenu();
	playAgainButton();
	viewStatsButton();
	leaderboardButton();
}

function gameOver(){

	isGameOver = true;

	leaderboardArray.push(new LeaderboardEntry(score, difficulty, timer));
	leaderboardArray.sort(function(a, b){return b.score - a.score;});
	
	if(leaderboardArray.length > 10){
		leaderboardArray.splice(11,1)
	}
	
	stop();
	
	let opacity = 0;
	animateGameOverId = setInterval(function(){
		ctx5.clearRect(0, 0, 400, 400);
		ctx5.font = "bold 60px Comic Sans MS";
		ctx5.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
		ctx5.textAlign = "center";
		ctx5.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
		ctx5.lineWidth = 5;
		ctx5.strokeText("GAME OVER", 200, 150);
		ctx5.stroke();
		ctx5.fillText("GAME OVER", 200, 150);
		opacity += 0.01;
		
		if(opacity > 1){
			clearInterval(animateGameOverId);
		}
	}, 10);
	ctx5.clearRect(0, 0, 400, 400);
	ctx5.font = "bold 60px Comic Sans MS";
	ctx5.fillStyle = "rgba(255, 0, 0, 1)";
	ctx5.textAlign = "center";
	ctx5.strokeStyle = "rgba(0, 0, 0, 1)";;
	ctx5.lineWidth = 5;
	ctx5.strokeText("GAME OVER", 200, 150);
	ctx5.stroke();
	ctx5.fillText("GAME OVER", 200, 150);
	
	gameOverMenu();
	playAgainButton();
	viewStatsButton();
	leaderboardButton();
	
}

function healthBar(){
	
	let fillStyle;
	
	if(health >= 258){
		fillStyle = "#7FFF00";
	} else if(health >= 129){
		fillStyle = "yellow";
	} else {
		fillStyle = "red";
	}
	
	if(health > 388){
		health = 388;
	}
	
	ctx4.clearRect(0, 0, 400, 400);
	ctx4.beginPath();
	ctx4.rect(5, 5, 390, 15);
	ctx4.lineWidth = 3;
	ctx4.strokeStyle = "white";
	ctx4.stroke();
	ctx4.fillStyle = fillStyle;
	ctx4.fillRect(6, 6, health, 13);
	
}

function targetArrows(){
	
	ctx3.drawImage(leftArrow, 10, 60, 75, 75);
	ctx3.drawImage(upArrow, 110, 60, 75, 75);
	ctx3.drawImage(downArrow, 210, 60, 75, 75);
	ctx3.drawImage(rightArrow, 310, 60, 75, 75);
}

function randomNumber(min, max){
	
	return Math.floor(Math.random() * (max - min) + min);
}

function Arrow(type){
	
	this.x = 0;
	this.y = 0;
	this.arrowImage;

	if(type == "leftArrow"){
		this.arrowImage = fLeftArrow;
	}else if (type == "rightArrow"){
		this.arrowImage = fRightArrow;
	}else if (type == "upArrow"){
		this.arrowImage = fUpArrow;
	}else if (type == "downArrow"){
		this.arrowImage = fDownArrow;
	}

	this.draw = function(){
		ctx.drawImage(this.arrowImage, this.x, this.y, 75, 75);
	};
}

let fadeOutInterval;
let fadeOutInterval2;
let fadeOutInterval3;
let fadeOutInterval4;

let leftArrows = [];
let upArrows = [];
let downArrows = [];
let rightArrows = [];

let isLeftAlreadyFading = false;
let isRightAlreadyFading = false;
let isUpAlreadyFading = false;
let isDownAlreadyFading = false;

function pulsingArrows(arrowType){
	
	let size = 75;
	let x;
	let y = 60;
	
	if(arrowType == "leftArrow" && !isLeftAlreadyFading){
		isLeftAlreadyFading = true;
		x = 10;
		fadeOutInterval = setInterval(function(){
			ctx2.clearRect(0, 30, 90, 140);
			ctx2.drawImage(leftArrow, x, y, size, size);
			x -= 0.5;
			y -= 0.5;
			size += 1;
			if(size > 95){
				size = 75;
				x = 10;
				clearInterval(fadeOutInterval);
				isLeftAlreadyFading = false;
				ctx2.clearRect(0, 30, 90, 140);
			}
		}, 5);
	} else if(arrowType == "upArrow" && !isUpAlreadyFading){
		isUpAlreadyFading = true;
		x = 110;
		fadeOutInterval2 = setInterval(function(){
			ctx2.clearRect(100, 30, 90, 140);
			ctx2.drawImage(upArrow, x, y, size, size);
			x -= 0.5;
			y -= 0.5;
			size += 1;
			if(size > 95){
				size = 75;
				x = 110;
				clearInterval(fadeOutInterval2);
				isUpAlreadyFading = false;
				ctx2.clearRect(100, 30, 90, 140);
			}
		}, 5);
	} else if(arrowType == "downArrow" && !isDownAlreadyFading){
		isDownAlreadyFading = true;
		x = 210;
		fadeOutInterval3 = setInterval(function(){
			ctx2.clearRect(200, 30, 90, 140);
			ctx2.drawImage(downArrow, x, y, size, size);
			x -= 0.5;
			y -= 0.5;
			size += 1;
			if(size > 95){
				size = 75;
				x = 210;
				clearInterval(fadeOutInterval3);
				isDownAlreadyFading = false;
				ctx2.clearRect(200, 30, 90, 140);
			}
		}, 5);
	} else if(arrowType == "rightArrow" && !isRightAlreadyFading){
		isRightAlreadyFading = true;
		x = 310;
		fadeOutInterval4 = setInterval(function(){
			ctx2.clearRect(300, 30, 90, 140);
			ctx2.drawImage(rightArrow, x, y, size, size);
			x -= 0.5;
			y -= 0.5;
			size += 1;
			if(size > 95){
				x = 310;
				size = 75;
				clearInterval(fadeOutInterval4);
				isRightAlreadyFading = false;
				ctx2.clearRect(300, 30, 90, 140);
			}
		}, 5);
	}
}

let arrowDownAllowed = true;

document.addEventListener("keydown", arrowKeyDown, false);
document.addEventListener("keyup", arrowKeyUp, false);
document.addEventListener("focus", documentFocus, false);

function arrowKeyDown(e){
	
	if (!isGameStarted){
		return;
	}

	if (e.repeat != undefined){
		allowed = !e.repeat;
	}

	if (!allowed){
		return;
	}

	if (e.keyCode == 37){
		handleArrowKeyTiming(leftArrows);
		pulsingArrows("leftArrow");
		healthBar();
	}else if(e.keyCode == 38){
		handleArrowKeyTiming(upArrows);
		pulsingArrows("upArrow");
		healthBar();
	}else if(e.keyCode == 39){
		handleArrowKeyTiming(rightArrows);
		pulsingArrows("rightArrow");
		healthBar();
	}else if(e.keyCode == 40){
		handleArrowKeyTiming(downArrows);
		pulsingArrows("downArrow");
		healthBar();
	}
}

let countdownId;
let goCountDownId;

function gameStartCountDown(){
	
	clearCanvas();
	
	let countdown = 3;
	let size = 80;
	let opacity = 1;
	
	clearInterval(goCountDownId);
	clearInterval(countdownId);
	
	countdownId = setInterval(function(){
		ctx4.clearRect(0, 0, 400, 400);
		ctx4.font = "100px Comic Sans MS"
		ctx4.textAlign = "center";
		ctx4.fillStyle = "white";
		ctx4.strokeStyle = "black";
		ctx4.lineWidth = 3;
		ctx4.strokeText(countdown, 200, 250)
		ctx4.fillText(countdown, 200, 250);
		countdown--;
		if(countdown <= 0){
			clearInterval(countdownId);
		}
		
	}, 1000);
	
	setTimeout(function(){
		clearCanvas();
		goCountDownId = setInterval(function(){
			clearCanvas();
			ctx4.font = "bold " + size + "px Comic Sans MS"
			ctx4.fillStyle = "rgba(127, 255, 0, " + opacity + ")";
			ctx4.strokeStyle = "rgba(0, 0, 0, " + opacity + ")";
			ctx4.lineWidth = 2;
			ctx4.strokeText("GO!", 200, 250);
			ctx4.fillText("GO!", 200, 250);
			size += 0.5;
			opacity -= 0.01;
			if(opacity > 1){
				clearInterval(goCountDownId);
			}
		}, 1)
	}, 4000)
}

function handleArrowKeyTiming(arrowList){

	let target = 60;

	if(arrowList.length > 0){
		let handleArrow = getClosestNonLateArrow(arrowList, target);
		if(handleArrow.y > 130){
			clearInterval(accuracyId);
			fadeOut("TOO EARLY!");
			earlyCount++;
			score -= 5;
			if(health <= 0){
				gameOver();
			} else {
				health -= 30;
			}
			updateScore();
			return;
		}
		scoreArrowDeviation(handleArrow, getDeviationFromTarget(handleArrow, target), arrowList);
		return;
	}
}

function getDeviationFromTarget(arrow, target){
	
	return arrow.y - target;
}

function getClosestNonLateArrow(arrowList, target){
	
	let lateArrows = arrowList.filter(arrow => getDeviationFromTarget(arrow,target) <= -30);
	let eligibleArrows = arrowList.filter(arrow => !lateArrows.includes(arrow));
	
	if (eligibleArrows.length == 0){
		return getArrowWithSmallestDeviation(lateArrows, target);
	}else{
		return getArrowWithSmallestDeviation(eligibleArrows, target);
	}
}

function getArrowWithSmallestDeviation(arrowList, target){
	
	return arrowList.reduce((prev, curr) => getDeviationFromTarget(prev,target) < getDeviationFromTarget(curr, target) ? prev : curr);
}

function updateScore(){
	
	ctx5.clearRect(0, 0, 400, 400);
	ctx5.fillStyle = "white";
	ctx5.strokeText(score, 200, 390)
	ctx5.fillText(score, 200, 390);
}

function scoreArrowDeviation(arrow, deviation, arrowList){
	
	let absoluteDeviation = Math.abs(deviation);
	
	if(absoluteDeviation < 10){
		perfectArrow(arrow, arrowList);
	}else if(absoluteDeviation < 25){
		goodArrow(arrow, arrowList);
	}else if(deviation > 0){
		earlyArrow(arrow, arrowList);
	}

	updateScore();
}

function tryRemoveArrow(arrow, arrowList){
	
	if (arrowList.length > 0){
		arrowList.splice(arrowList.indexOf(arrow), 1);
	}
}

let accuracyId;

function fadeOut(arrowAccuracy) {
	
	let opacity = 1.0
	let fillStyle;
	let font;
	let size;
	let y = 300;
	
	if(arrowAccuracy == "PERFECT!"){
		size = 50;
	}else if(arrowAccuracy == "GOOD!"){
		size = 35;
	}else if(arrowAccuracy == "TOO EARLY!"){
		size = 25;
	}else if(arrowAccuracy == "MISSED!"){
		size = 35;
	}
	
    accuracyId = setInterval(function(){
		if(arrowAccuracy == "PERFECT!"){
			fillStyle = "rgba(0, 255, 0, " + opacity + ")";
		}else if(arrowAccuracy == "GOOD!"){
			fillStyle = "rgba(255, 255, 0, " + opacity + ")";
		}else if(arrowAccuracy == "TOO EARLY!"){
			fillStyle = "rgba(255, 0, 255, " + opacity + ")";
		}else if(arrowAccuracy == "MISSED!"){
			fillStyle = "rgba(255, 0, 0, " + opacity + ")";
			y += 1;
			size = 35;
		}
		font = "bold " + size + "px Comic Sans";
        ctx2.clearRect(0, 0, 400, 400);
        ctx2.font = font;
		ctx2.textAlign = "center";
		ctx2.fillStyle = fillStyle;
		ctx2.fillText(arrowAccuracy, 200, y);
        opacity -= 0.03;
		size += 1;
        if(opacity<0){
            ctx2.clearRect(0, 0, 400, 400);
            clearInterval(accuracyId);
        }
    }, 10); 
}

function perfectArrow(arrow, arrowList){
	
	score += 10;
	perfectCount++;
	totalArrowsHit++;
	
	if(health >= 388){
		health = 388;
	} else {
		health += 25;
	}
	
	clearInterval(accuracyId);
	fadeOut("PERFECT!");
	
	tryRemoveArrow(arrow, arrowList);
	
	updateScore();
}

function goodArrow(arrow, arrowList){
	
	score += 5;
	goodCount++;
	totalArrowsHit++;

	if(health >= 388){
		health = 388;
	} else {
		health += 15;
	}
	
	clearInterval(accuracyId);
	fadeOut("GOOD!");
	
	tryRemoveArrow(arrow, arrowList);
	
	updateScore();
}

function earlyArrow(arrow, arrowList){
	
	score -= 5;
	earlyCount++;

	if(health <= 0){
		gameOver();
	} else {
		health -= 30;
	}
	
	clearInterval(accuracyId);
	fadeOut("TOO EARLY!");
	
	tryRemoveArrow(arrow, arrowList);
	
	updateScore();
}

function missArrow(arrow, arrowList){
	
	score -= 5;
	missCount++;

	if(health <= 0){
		gameOver();
	} else {
		health -= 30;
	}
	
	clearInterval(accuracyId);
	fadeOut("MISSED!");
	
	tryRemoveArrow(arrow, arrowList);
	
	updateScore();
}

function arrowKeyUp(e){
	allowed = true;
}

function documentFocus(e){
	allowed = true;
}

function depopulateArrows(){
	
	leftArrows = [];
	upArrows = [];
	downArrows = [];
	rightArrows = [];
}

function createRightArrow(){
	
	let newRightArrow = new Arrow("rightArrow");
	
	newRightArrow.y = 400;
	newRightArrow.x = 310;
	
	return newRightArrow;
}

function createDownArrow(){
	
	let newDownArrow = new Arrow("downArrow");
	
	newDownArrow.y = 400;
	newDownArrow.x = 210;
	
	return newDownArrow;
}

function createUpArrow(){
	
	let newUpArrow = new Arrow("upArrow");
	
	newUpArrow.y = 400;
	newUpArrow.x = 110;
	
	return newUpArrow;
}

function createLeftArrow(){
	
	let newLeftArrow = new Arrow("leftArrow");
	
	newLeftArrow.y = 400;
	newLeftArrow.x = 10;
	
	return newLeftArrow;
}

function drawArrows(){

    ctx.clearRect(0, 0, 400, 400);
    
	scrollArrowsUp(leftArrows);
    scrollArrowsUp(upArrows);
	scrollArrowsUp(downArrows);
	scrollArrowsUp(rightArrows);
}

function scrollArrowsUp(arrowList){
	
	for(let x=arrowList.length-1; x>=0; --x){
        let arrow = arrowList[x];
		if(--arrow.y > -100){
            arrow.draw();
        }else{
            missArrow(arrow, arrowList);
			healthBar();
			if(health <= 0){
				gameOver();
			} else {
				health -= 30;
			}
        }
	}
}

let maxArrowsOnScreen = 6;
let arrowDrawingID;
let leftArrowManagerID;
let upArrowManagerID;
let downArrowManagerID;
let rightArrowManagerID;

function easy(){
	
	difficulty = "Easy";
	pixelsPerSecond = 100;
	startGame();
}

function medium(){
	
	difficulty = "Medium";
	pixelsPerSecond = 200;
	startGame();
}

function hard(){
	
	difficulty = "Hard";
	pixelsPerSecond = 300;
	startGame();
}

let minimumPopulationTime;
let isGameStarted = false;

function clearCanvas(){
	
	ctx.clearRect(0, 0, 400, 400);
	ctx2.clearRect(0, 0, 400, 400);
	ctx3.clearRect(0, 0, 400, 400);
	ctx4.clearRect(0, 0, 400, 400);
	ctx5.clearRect(0, 0, 400, 400);
}

function startGame(){
	
	clearInterval(arrowDrawingID);
	
	stop();
	gameTimer();
	
	
	health = 388;
	perfectCount = 0;
	goodCount = 0;
	missCount = 0;
	earlyCount = 0;
	totalArrowsHit = 0;
	totalArrowsSpawn = perfectCount + goodCount + missCount + earlyCount;
	
	clearCanvas();
	targetArrows();
	healthBar();
	
	arrowDrawingID = setInterval(drawArrows, 1000/pixelsPerSecond);
	
	minimumPopulationTime = 1000 * 80 / pixelsPerSecond;

	leftArrowManagerID = setInterval(manageLeftArrows, 1);
	upArrowManagerID = setInterval(manageUpArrows, 1);
	downArrowManagerID = setInterval(manageDownArrows, 1);
	rightArrowManagerID = setInterval(manageRightArrows, 1);

	loopStop = false;
	leftLoopStart = true;
	upLoopStart = true;
	downLoopStart = true;
	rightLoopStart = true;
	isGameStarted = true;
}

let leftLoopStart = false;
let upLoopStart = false;
let downLoopStart = false;
let rightLoopStart = false;
let loopStop = false;

function manageLeftArrows(){
	
	if (leftLoopStart){
		leftLoopStart = false;
		populateArrowsLoop(leftArrows, "leftArrow");
	}
}

function manageUpArrows(){
	
	if (upLoopStart){
		upLoopStart = false;
		populateArrowsLoop(upArrows, "upArrow");
	}
}

function manageDownArrows(){
	
	if (downLoopStart){
		downLoopStart = false;
		populateArrowsLoop(downArrows, "downArrow");
	}
}

function manageRightArrows(){
	
	if (rightLoopStart){
		rightLoopStart = false;
		populateArrowsLoop(rightArrows, "rightArrow");
	}
}

function populateArrowsLoop(arrowArrayToPopulate, type){
	
	setTimeout(function(){
        if (!loopStop){
			if (getTotalArrowsOnScreen() < maxArrowsOnScreen){
				let arrow;
				if (type == "leftArrow"){
					arrow = createLeftArrow();
				}else if (type == "rightArrow"){
					arrow = createRightArrow();
				}else if (type == "upArrow"){
					arrow = createUpArrow();
				}else if (type == "downArrow"){
					arrow = createDownArrow();
				}
				arrowArrayToPopulate.push(arrow);
			}
		populateArrowsLoop(arrowArrayToPopulate, type);
		}
    }, randomNumber(minimumPopulationTime,5*minimumPopulationTime));
}

function getTotalArrowsOnScreen(){
	
	return leftArrows.length + upArrows.length + downArrows.length + rightArrows.length;
}

function stop(){
	
	health = 388;
	
	isGameStarted = false;
	loopStop = true;
	
	clearCanvas();
	depopulateArrows();
	
	clearInterval(fadeOutInterval);
	clearInterval(fadeOutInterval2);
	clearInterval(fadeOutInterval3);
	clearInterval(fadeOutInterval4);
	clearInterval(countdownId);
	clearInterval(goCountDownId);
	clearInterval(timerId);
}
