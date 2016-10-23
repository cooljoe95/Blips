const WIDTH_OF_PADDLE = 200;
const RADIUS_OF_BALL = 7;
const MAX_NUM_OF_BALLS = 16;
let LEVEL = 1;
let score = 0;
let stage;
let waitingBalls = [];
let ballsOnScreen = [];
var nextRoundBalls = [];
const text = new createjs.Text('Score: ', 'bold 36px Bungee Inline', '#000000');

var paddle;

class Paddle {
	addPaddleListener () {
		document.addEventListener('keydown', (event) => {
			switch (event.code) {
			case 'ArrowLeft':
				this.paddle.graphics.command.x = 0;
				break;
			case 'ArrowDown':
				this.paddle.graphics.command.x = 200;
				break;
			case 'ArrowRight':
				this.paddle.graphics.command.x = 400;
				break;
			}
			stage.update();
		});
	}

	constructor () {
		this.paddle = new createjs.Shape();
		this.addPaddleListener();
		this.paddle.graphics
			.beginFill('#000000')
			.drawRect(3, 550, WIDTH_OF_PADDLE, 3);
		stage.addChild(this.paddle);
	}

	x () {
		return this.paddle.graphics.command.x;
	}

	y () {
		return this.paddle.graphics.command.y;
	}
}

class Ball {
	constructor (powerup) {
		this.ball = new createjs.Shape();
		if (powerup) {
			this.powerup = true;
		}
		this.resetDXDY();
		let colors = ['#1846bA', '#25A38E', '#18A318', '#996C0D', '#CE3700', '#FF0E0E', '#FF0ED3'];
		let color = Math.floor(Math.random() * 7);
		this.ball.graphics
			.beginFill(colors[color])
			.drawCircle(0, 400, RADIUS_OF_BALL);
	}

	setX (x) {
		this.ball.graphics.command.x = x;
	}

	setY (y) {
		this.ball.graphics.command.y = y;
	}

	outOfBounds () {
		return 	this.ball.graphics.command.x > stage.canvas.width ||
						this.ball.graphics.command.y > stage.canvas.height;
	}

	increaseXBy (num) {
		this.ball.graphics.command.x += num;
	}

	increaseYBy (num) {
		this.ball.graphics.command.y += num;
	}

	hitPaddle () {
		score += Ball.value;
		if (score % 10 === 0) {
			LEVEL += 1;
		}
		this.dy = -(Math.round(Math.random() * 2) + 27);
		this.dx = 4;
	}

	x () {
		return this.ball.graphics.command.x;
	}

	y () {
		return this.ball.graphics.command.y;
	}

	addToScreen () {
		this.setX(0);
		this.setY(150);
		this.resetDXDY();
		stage.addChild(this.ball);
		ballsOnScreen.push(this);
	}

	removeBall () {
		stage.removeChild(this.ball);
		waitingBalls.push(this);
	}

	resetDXDY () {
		this.dx = 3;
		this.dy = -10;
	}

	lostBall () {
		if (this.ball.graphics.command.y > 560 + RADIUS_OF_BALL) {
			Ball.value = 1;
			return true;
		}
		return false;
	}
	updateDY () {
		this.dy += 1;
	}

	updatePos () {
		this.increaseXBy(this.dx);
		this.increaseYBy(this.dy);
		text.text = `Score: ${score}`;
		this.updateDY();
	}

	run () {
		this.updatePos();
		if ((this.y() + RADIUS_OF_BALL) >= paddle.y() && !this.lostBall()) {
			const offSet = paddle.x() + WIDTH_OF_PADDLE - this.x();
			if (offSet >= 0 && offSet <= WIDTH_OF_PADDLE) {
				this.hitPaddle();
			}
		}
	}
}

Ball.value = 1;

const addBallToScreen = () => {
	if (Math.random() < 0.05) {
		const ball = waitingBalls.pop();
		ball.addToScreen();
	}
};

const updateBall = (ball) => {
	ball.run();
	if (ball.outOfBounds()) {
		ball.removeBall();
	} else {
		nextRoundBalls.push(ball);
	}
};

const removeBalls = () => {
	nextRoundBalls = [];
	ballsOnScreen.forEach((ball) => {
		updateBall(ball);
	});
	ballsOnScreen = nextRoundBalls;
};

const tick = () => {
	// addPowerUps();
	if (ballsOnScreen.length < LEVEL) {
		addBallToScreen();
	}
	removeBalls();
	stage.update();
};

const addTicker = () => {
	createjs.Ticker.setFPS(55);
	createjs.Ticker.on('tick', tick);
};

const createBalls = () => {
	for (let i = 0; i < MAX_NUM_OF_BALLS; i++) {
		waitingBalls.push(new Ball());
	}
};

const init = () => {
	stage = new createjs.Stage('root');
	paddle = new Paddle();
	createBalls();
	text.x = 0;
	text.y = 50;

	stage.addChild(text);
	addTicker();
	stage.update();
};

document.addEventListener('DOMContentLoaded', () => {
	init();
});
