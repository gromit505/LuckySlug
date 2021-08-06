const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src ="img/ground01.png";

const foodImg = new Image();
foodImg.src = "img/food0.png";

const foodImg2 = new Image();
foodImg2.src = "img/food2.png";

const foodImg3 = new Image();
foodImg3.src = "img/food3.png";

// Звуковые файлы
let chill = new Audio();

chill.src = "audio/chill-4.mp3";

let eatSound = new Audio();
eatSound.src = "audio/hum.mp3";

let boom = new Audio;
boom.src = "audio/boom.mp3";

/*function preload() {
	eatSound = loadSound("audio/hum.mp3")
}*/

let box = 32;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

let fooder2 = ctx.drawImage(foodImg2, 0, 0);

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}




function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			// alert('GAME OVER', boom.play());
			clearInterval(game, boom.play());


	}
}







function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	/*for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "blue";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}*/

	for(let i = 0; i < snake.length; i++) {
		if( i == 0) {
			ctx.drawImage(foodImg2, snake[i].x, snake[i].y);
		}
		else if ( i != 0) {
			ctx.fillStyle = "green";
			ctx.drawImage(foodImg3, snake[i].x, snake[i].y);
		}
	
	}

	ctx.fillStyle = "white";
	ctx.font = "48px Arial";
	ctx.fillText(score, box * 1.7, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		eatSound.play();
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else {
		snake.pop();
	}

	/*if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
		clearInterval(game);*/

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	if ( newHead.x < box) {
		newHead.x = (17) * box;
	}
	else if ( newHead.x > box * (17)) {
		newHead.x = box;
	}
	else if ( newHead.y < box * 3) {
		newHead.y = box * 17;
	}
	else if ( newHead.y > box * 17) {
		newHead.y = box * 3;
	};


if (eatTail != true) {
		chill.play();
	}

			



	snake.unshift(newHead);

}

let game = setInterval(drawGame, 150);
