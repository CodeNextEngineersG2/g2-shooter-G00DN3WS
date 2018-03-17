// UI Variables
var canvas;
var canvasWidth;
var canvasHeight;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;



function setup(){

	canvasWidth = 500;
	canvasHeight = 500;
	canvas = createCanvas(canvasWidth, canvasHeight);
	gameScreen = select('#game-screen');
	canvas.parent(gameScreen);
	scoreDisplay = select("#score-display");
	
	scoreDisplay.html(score);
	resetGame();
 }

 function draw() {

 	if (gameRunning = true) {
 	
 	background(0);
 	drawShip();
 	drawAlien();

 	if(shipShooting == true){

 		drawBullet();

 	}

 	if(alienShooting == true){

 		drawAlienBullet();

 	}

 	}

 }

function drawShip() {

	fill(202,165,247);
	ellipse(shipX,shipY,shipDiameter,shipDiameter);

	if (keyIsDown(LEFT_ARROW) && shipX > shipDiameter/2) {

		shipX -= shipSpeed;

	}

	else if (keyIsDown(RIGHT_ARROW) && shipX < canvasWidth-shipDiameter/2) {

		shipX += shipSpeed;

	}

}

 function drawBullet(){

 	var hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);

 	fill(255,250,0);
 	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
 	//snip
 	bulletY -= 10;

 	if (bulletY < 0 && !hitAlien) {

 		return true;

 	}

 	else if(bulletY == 0){

 		shipShooting = false;

 	}

 	else if(hitAlien){

 		resetAlien();
 		alienVelocity++;
 		shipShooting = false;

 	}

 	score++;
 	scoreDisplay = score;

 	}

function keyPressed() {

	if (keyCode === 32 && !shipShooting && !gameRunning ){

		bulletX = shipX;

		bulletY = shipY;

		shipShooting = true;

	}

}

function drawAlien(){

	fill(135,255,195);
	ellipse(alienX,alienY,alienDiameter, alienDiameter);

	alienX += alienVelocity;

	if(alienX >= canvasWidth && alienX > alienDiameter/2){

		alienX -= alienVelocity;
		alienVelocity = -10;

	}


	else if(alienX <= alienDiameter/2){

		alienVelocity = 10;
		
	}

	if (random(4) < 1 && !alienShooting) {

		alienBulletX = alienX;

		alienBulletY = alienY;

		alienShooting = true;

	}

}

function drawAlienBullet(){

	var hitShip = checkCollision(shipX, shipY, shipDiameter, alienBulletX, alienBulletY, alienBulletDiameter);
	fill(255);
	ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);

	if (alienBulletY < canvasHeight && !hitShip) {

		alienBulletY += 10;

	}	

	else if (hitShip == true) {

		gameOver();

	}

	else {

		alienShooting = false;

	}

}

 function checkCollision(aX, aY, aD, bX, bY, bD){

 	var distance = dist(aX, aY, bX, bY);

 	if (aD/2 + bD/2 >= distance) {

 		return true;

 	}

 	else{

 		return false;

 	}

 }

 function resetAlien(){

 	alienX = abs(50);
 	alienY = abs(50);

 }

function gameOver(){

	gameRunning = false;
	alert("GAME OVER. Your score is" score);
	resetGame();

}

function resetGame(){
	
	shipX = 250;
	shipY = 450;
	shipDiameter = 100;
	shipSpeed = 20;
	bulletDiameter = 20;
	shipShooting = false;
	alienDiameter = 100;
	alienVelocity = 10;
	alienX = 50;
	alienY = 50;
	alienBulletDiameter = 20;
	alienShooting = false;
	
	score = 0;
	gameRunning = true;

}