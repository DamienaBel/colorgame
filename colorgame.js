console.log('javascript works');


var numberDOM = document.getElementById("number"); 
var number = Number(numberDOM.textContent); //amount of squares
var randomSquare = Math.floor(Math.random()*number)+1; //random square that will be colored with the chosen color
var color;
var container = document.getElementById("container"); //wrapper for the square generator area
var win = 0; // helping variable to count amount of times user won
var loose = 0; //helping variable to count amount of times user failed
var game = true; //game controller
var scoreWin = document.getElementById("scoreWin"); //access score numbers from the screen
var scoreFail = document.getElementById("scoreFail"); //access score numbers from the screen


document.getElementById("plus").addEventListener("click", ()=>{ //incrementor for the amount of squares generated
	number = number===12?number:++number; //don't allow to generate more then 12 squares
	numberDOM.textContent = number;
	paintSquares();
});

document.getElementById("minus").addEventListener("click", ()=>{ //decrementor for the amount of squares generated
	number = number===2?number:--number; //less then 2 squares are not allowed
	numberDOM.textContent = number;
	paintSquares();
});

document.getElementById("mixButton").addEventListener("click", () => { //"start new game" button
	paintSquares(); 
	scoreWin.textContent = 0; 
	scoreFail.textContent = 0;
	numberDOM.contentText = 5;
	 });

container.addEventListener("click", (e) => { 	//was the user's guess correct?
	if (e.target.id === "div"+randomSquare) winFunc(); 
	else looseFunc();
	console.log('the right square is ...' + randomSquare);
}); 

//PAINT SQUARES
paintSquares();

//GENERATE COLORFUL SQUARES
function paintSquares() {
	game = true; //start the game
	container.innerHTML=''; //clean the "canvas"
	randomSquare = Math.floor(Math.random()*number)+1; //what square will be the right one?
	color = generateColor(); //generate a random color
	let newColor;
	document.getElementById("colorname").textContent = color; //write the generated color on the screen

	for (var i=1; i<=number; i++) { //for each square...
		var div = document.createElement("div");
		div.setAttribute("class", "square");
		div.setAttribute("id", "div"+i);	
		container.appendChild(div);
		newColor = generateColor(); //generate a random color for the square
		while (newColor==color) newColor=generateColor(); //and it should be DIFFERENT from the color we are searching for in this game
		console.log('color = '+color);
		console.log('new color = '+newColor);
		(i === randomSquare)? document.getElementById("div"+i).style.background = color:document.getElementById("div"+i).style.background = newColor; 
	}
}

//GENERATE A RANDOM COLOR
function generateColor() {
	return "rgb("+(Math.floor (Math.random() * 255))+", "+ (Math.floor (Math.random() * 255)) +", "+ (Math.floor (Math.random() * 255))+")";
}

//IF THE RIGHT SQUARE WAS CLICKED...
function winFunc() {
	if (game) {
		game=false;
		win++;
		scoreWin.classList.add("plusOnePoint");
		setTimeout(function() {	//change the number to the number++
  			scoreWin.textContent = win;
		}, 1000);	//but wait 1 s. for half of the animation to be completed
		setTimeout(function() { //after another 2s. the animation is fully completed
			scoreWin.classList.remove("plusOnePoint"); //so we remove the animation 
			paintSquares();// and pain a new canvas
		},2000);
	}
}

//IF THE WRONG SQUARE WAS CLICKED...
function looseFunc() {
	if(game) {
		game=false;
		loose++;
		console.log("loose");
		scoreFail.classList.add("minusOnePoint");
		setTimeout(function() {
  			scoreFail.textContent = loose;
		}, 1000);
		setTimeout(function() {
			scoreFail.classList.remove("minusOnePoint");
			paintSquares();
		},2000);
	}
}

// function containerEvent(e) {
// 		if (e.target.id === "div"+randomSquare) winFunc();
// 		else looseFunc();
// 		}
