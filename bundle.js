/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	const WIDTH_OF_PADDLE = 197;
	const RADIUS_OF_BALL = 7;
	const MAX_NUM_OF_BALLS = 16;
	
	let stage;
	let waitingBalls = [];
	let ballsOnScreen = [];
	var nextRoundBalls = [];
	var paddle;
	
	class Paddle {
		addPaddleListener () {
			document.addEventListener('keydown', (event) => {
				switch (event.code) {
				case 'ArrowLeft':
					this.paddle.graphics.command.x = 3;
					break;
				case 'ArrowDown':
					this.paddle.graphics.command.x = 202;
					break;
				case 'ArrowRight':
					this.paddle.graphics.command.x = 401;
					break;
				}
				stage.update();
			});
		}
	
		constructor () {
			this.paddle = new createjs.Shape()
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
		constructor () {
			this.endX = 190 * Math.random() + 5;
			this.value = 1;
			this.ball = new createjs.Shape();
			this.dx = 1;
			this.dy = 7;
			this.ball.graphics
				.beginFill('#000000')
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
			this.score += this.value;
			this.hit = true;
			this.dy = -30;
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
			this.dx = 3;
			this.dy = 15;
			stage.addChild(this.ball);
			this.hit = false;
			ballsOnScreen.push(this);
		}
	
		removeBall () {
			stage.removeChild(this.ball);
			waitingBalls.push(this);
			this.dx = 1;
			this.hit = false;
			this.dy = 7;
		}
	
		lostBall () {
			if (this.ball.graphics.command.y > 560 + RADIUS_OF_BALL) {
				this.value = 1;
				return true;
			}
			return false;
		}
		updateDY () {
			if (this.hit) {
				this.dy += 1;
			}
		}
	
		updatePos () {
			this.increaseXBy(this.dx);
			this.increaseYBy(this.dy);
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
		if (ballsOnScreen.length < 5) {
			addBallToScreen();
		}
		removeBalls();
		stage.update();
	};
	
	const addTicker = () => {
		createjs.Ticker.setInterval(25);
		createjs.Ticker.setFPS(60);
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
		addTicker();
		stage.update();
	};
	
	document.addEventListener('DOMContentLoaded', () => {
		init();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map