

const init = () => {
	var stage = new createjs.Stage('root');
	const locs = [3, 202, 401];
	var paddle = new createjs.Shape();
	paddle.graphics.beginFill('#000000').drawRect(3, 550, 197, 10);
	stage.addChild(paddle);
	var ball = new createjs.Shape();
	ball.graphics.beginFill('#000000').drawCircle(100, 100, 15);
	stage.addChild(ball);

	document.addEventListener("keydown", (event) => {
		switch(event.code){
			case "ArrowLeft":
				paddle.graphics.command.x = locs[0];
				stage.update();
				break;
			case "ArrowDown":
				paddle.graphics.command.x = locs[1];
				stage.update();
				break;
			case "ArrowRight":
				paddle.graphics.command.x = locs[2];
				stage.update();
				break;
		}
	});
	stage.update();
};

document.addEventListener('DOMContentLoaded', () => {
	init();
});
