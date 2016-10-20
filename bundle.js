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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map