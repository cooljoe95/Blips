# Blips
[Blips](http://joekatz.me/Blips) is a one player game with bouncing balls that have a value that increases after 20 hits. Once the ball hits the paddle, it moves on to the next third of the screen. Multiple balls fall at the same time and the user is not allowed to miss any of the balls.

## Instructions
Click Play and you will be using the left, down, and right arrows to move the paddle. The down button (for the middle paddle) is different for most gamers expecting a smooth left and right transitions. The goal is to ensure that no ball goes past the paddle line, otherwise you lose. The number of balls will increase and the game will get harder.

## Screenshots
![link](images/blips.png)

## Code
```javascript
run () {
	this.updatePos();
	if ((this.y()) >= (paddle.y() - 20) && !this.lostBall()) {
		const offSet = paddle.x() + WIDTH_OF_PADDLE - this.x();
		if (offSet >= 0 && offSet <= WIDTH_OF_PADDLE) {
			this.hitPaddle();
		}
	}
}
```

This snippet is the code that checks to see if the ball has hit the paddle after updating the position.

```javascript
updatePos () {
	this.increaseXBy(this.dx);
	this.increaseYBy(this.dy);
	text.text = `Score: ${score}\t\t\t\t\t\tHigh Score: ${longestChain}`;
	this.updateDY();
}
```

This is the soul of the graphics simulator. I remembered some of my high school physics that that required I add to my velocity to create acceleration. And an acceleration towards the bottom of the screen gave the impression of gravity.
