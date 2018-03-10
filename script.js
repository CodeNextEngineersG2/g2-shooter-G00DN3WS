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

	console.log ('setup');
	canvasWidth = 500;
	canvasHeight = 500;
	canvas = createCanvas(canvasWidth, canvasHeight);
	gameScreen = select('#game-screen');
	canvas.parent(gameScreen);
	
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
	
 }

 function draw() {

 	background(0);
 	drawShip();
 	drawAlien();

 	if(shipShooting == true){

 		drawBullet();

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

 	fill(255,250,0);
 	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
 	//snip
 	bulletY -= 10;

 	if (bulletY < 0) {

 		drawBullet();

 	}

 	else if(bulletY == 0){

 		shipShooting = false;

 	}

 }

function keyPressed() {

	if (keyCode === 32 && shipShooting == false){

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

}


/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */


/*
 * draw()
 * This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
