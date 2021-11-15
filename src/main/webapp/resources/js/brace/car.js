
const imgCar = new Image();
imgCar.src = "/resources/images/brace/car.png";

const right = true;
const left = false;

const forward = 1;
const leftForward = 2;
const rightForward = 3;
const backward = 4;
const leftBackward = 5;
const rightBackward = 6;
const stay = 7;

const carWidth = 25;
const carHeight = 41;
const car = {
	pos: { x: -1, y: -1 },
	direction: { x: -1, y: -1 },
	turn: function(isRight) { // true는 우회전 false는 좌회전
		let dir = 1;

		if (isRight) {
			dir = -1;
		}

		const temp = this.x * dir;
		this.x = this.y * dir;
		this.y = temp;
	},
	go: function() {
		this.pos.x += this.direction.x;
		this.pos.y += this.direction.y;
	},
	back: function() {
		this.pos.x -= this.direction.x;
		this.pos.y -= this.direction.y;
	},
	forward: function() {
		this.go();
		this.go();
	},
	rightForward: function() {
		this.go();
		this.turn(right);
		this.go();
	},
	leftForward: function() {
		this.go();
		this.turn(left);
		this.go();
	},
	backward: function() {
		this.back();
		this.back();
	},
	rightBackward: function() {
		this.back();
		this.turn(left);
		this.back();
	},
	leftBackward: function() {
		this.back();
		this.turn(right);
		this.back();
	}
}

function calPos(dir) {
	switch (dir) {
		case forward: // 전진
			car.forward();
			break;
		case leftForward: // 전진 좌회전
			car.leftForward();
			break;
		case rightForward: // 전진 우회전
			car.rightForward();
			break;
		case backward: // 후진
			car.backward();
			break;
		case leftBackward: // 후진 좌회전
			car.leftBackward();
			break;
		case rightBackward: // 후진 우회전
			car.rightBackward();
			break;
		case stay: // 대기
			break;
	}
}

function rotateCar(carContext, dir = car.direction) {
	if (dir.x == 0) {
		if (dir.y > 0) {
			carContext.rotate(2 * (Math.PI / 2));
		}
	}
	else if (dir.x > 0) {
		carContext.rotate(1 * (Math.PI / 2))
	}
	else {
		carContext.rotate(3 * (Math.PI / 2))
	}
}

function forwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, distance = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (distance + (speed * 2 * (tileLength + lineWidth) / 100) < 2 * (tileLength + lineWidth)) {
		carContext.translate(startPos.x * (tileLength + lineWidth) + car.direction.x * (distance + speed * 2 * (tileLength + lineWidth)) / 100 + lineWidth / 2,
			startPos.y * (tileLength + lineWidth) + car.direction.y * (distance + speed * 2 * (tileLength + lineWidth)) / 100 + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	} else {
		carContext.translate(car.direction.x * (tileLength + lineWidth) + lineWidth / 2, car.direction.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { forwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, distance + (speed * 2 * (tileLength + lineWidth) / 100)); });
}

function backwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, distance = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (distance + (speed * 2 * (tileLength + lineWidth) / 100) < 2 * (tileLength + lineWidth)) {
		carContext.translate(startPos.x * (tileLength + lineWidth) - car.direction.x * (distance + speed * 2 * (tileLength + lineWidth) / 100) + lineWidth / 2,
			startPos.y * (tileLength + lineWidth) - car.direction.y * (distance + (speed * 2 * (tileLength + lineWidth) / 100)) + lineWidth / 2);
		rotateCar(carContext, startDir);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	} else {
		carContext.translate(car.direction.x * (tileLength + lineWidth) + lineWidth / 2, car.direction.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { backwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, distance + (speed * 2 * (tileLength + lineWidth) / 100)); });
}

function leftForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir, radian = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (radian + speed * Math.PI / 200 < Math.PI / 2) {
		carContext.translate((startPos.x) * (tileLength + lineWidth) + lineWidth / 2, (startPos.y) * (tileLength + lineWidth) + lineWidth / 2);
		carContext.translate(car.direction.y, car.direction.x);
		carContext.rotate(-(radian + speed * Math.PI / 100));
		carContext.translate(-car.direction.y, -car.direction.x);
		rotateCar(carContext, startDir);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	}
	else {
		carContext.translate(car.direction.x * (tileLength + lineWidth) + lineWidth / 2, car.direction.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { leftForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, endPos, radian + speed * Math.PI / 100); });
}

function rightForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir, radian = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (radian + speed * Math.PI / 200 < Math.PI / 2) {
		carContext.translate((startPos.x) * (tileLength + lineWidth) + lineWidth / 2, (startPos.y) * (tileLength + lineWidth) + lineWidth / 2);
		carContext.translate(-car.direction.y, -car.direction.x);
		carContext.rotate(radian + speed * Math.PI / 100);
		carContext.translate(car.direction.y, car.direction.x);
		rotateCar(carContext, startDir);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	}
	else {
		carContext.translate(endPos.x * (tileLength + lineWidth) + lineWidth / 2, endPos.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { rightForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, endPos, radian + speed * Math.PI / 100); });
}

function leftBackwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir, radian = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (radian + speed * Math.PI / 200 < Math.PI / 2) {
		carContext.translate((startPos.x) * (tileLength + lineWidth) + lineWidth / 2, (startPos.y) * (tileLength + lineWidth) + lineWidth / 2);
		carContext.translate(car.direction.y, car.direction.x);
		carContext.rotate(radian + speed * Math.PI / 200);
		carContext.translate(-car.direction.y, -car.direction.x);
		rotateCar(carContext, startDir);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	}
	else {
		carContext.translate(car.direction.x * (tileLength + lineWidth) + lineWidth / 2, car.direction.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { leftForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, endPos, radian + speed * Math.PI / 200); });
}

function rightBackwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir, radian = 0) {
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	if (radian + speed * Math.PI / 200 < Math.PI / 2) {
		carContext.translate((startPos.x) * (tileLength + lineWidth) + lineWidth / 2, (startPos.y) * (tileLength + lineWidth) + lineWidth / 2);
		carContext.translate(-car.direction.y, -car.direction.x);
		carContext.rotate(-(radian + speed * Math.PI / 200));
		carContext.translate(car.direction.y, car.direction.x);
		rotateCar(carContext, startDir);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	}
	else {
		carContext.translate(endPos.x * (tileLength + lineWidth) + lineWidth / 2, endPos.y * (tileLength + lineWidth) + lineWidth / 2);
		rotateCar(carContext);
		carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
		carContext.restore();
		return;
	}
	carContext.restore();

	requestAnimationFrame(() => { rightForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, endPos, radian + speed * Math.PI / 100); });
}

function stayAnimation(time = 0) {
	if (aniTime < time + speed) {
		setTimeout(() => stayAnimation(time + speed), aniTime / 100); // aniTime은 애니메이션당 걸리는 시간
	}
}

function carAnimation(carCanvas, dir, tileLength, lineWidth, speed, startPos, startDir) {
	const carContext = carCanvas.getContext("2d");

	switch (dir) {
		case forward: // 전진
			forwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos);
			break;
		case leftForward:
			leftForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir);
			break;
		case rightForward:
			rightForwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos, startDir);
			break;
		case backward:
			backwardAnimation(carCanvas, carContext, speed, tileLength, lineWidth, startPos);
			break;
		case leftBackward:
			break;
		case rightBackward:
			break;
		case stay:
			break;
	}
}

function createCar(carCanvas, tileLength, lineWidth) {
	const carContext = carCanvas.getContext("2d");
	carContext.clearRect(0, 0, carCanvas.width, carCanvas.height);
	carContext.save();
	carContext.translate(car.pos.x * (tileLength + lineWidth) + lineWidth / 2, car.pos.y * (tileLength + lineWidth) + lineWidth / 2);
	rotateCar(carContext);
	carContext.drawImage(imgCar, -carWidth / 2, -carHeight / 2);
	carContext.restore();
	console.log("차 생성")
}

function moveCar(carCanvas, dir, speed, tileLength, lineWidth, gameOver) {
	const startPos = { x: car.pos.x, y: car.pos.y };
	const startDir = { x: car.direction.x, y: car.direction.y };

	if (gameOver) {
		carAnimation(carCanvas, dir, tileLength, lineWidth, speed, startPos, endPos);
		// failAnimation();
	} else {
		calPos(dir);
		carAnimation(carCanvas, dir, tileLength, lineWidth, speed, startPos, startDir);
	}
}

function initCar(carCanvas, startingPos, startingDirection, tileLength, lineWidth) {
	car.pos.x = startingPos.x;
	car.pos.y = startingPos.y;
	car.direction.x = startingDirection.x;
	car.direction.y = startingDirection.y;
	createCar(carCanvas, tileLength, lineWidth);
}

// 방향별 실패시 애니메이션 추가

function getCarDir() {
	return car.direction;
}

function getCarPos() {
	return car.pos;
}

function getNextPos(dir) {
	let pos = { x: car.pos.x, y: car.pos.y };

	switch (dir) {
		case forward:
			pos.x = pos.x + 2 * car.direction.x;
			pos.y = pos.y + 2 * car.direction.y;
			break;
		case backward:
			pos.x = pos.x - 2 * car.direction.x;
			pos.y = pos.y - 2 * car.direction.y;
			break;
		case leftForward:
			pos.x = pos.x + car.direction.x + car.direction.y;
			pos.y = pos.y + car.direction.y + car.direction.x;
			break;
		case rightForward:
			pos.x = pos.x + car.direction.x - car.direction.y;
			pos.y = pos.y + car.direction.y - car.direction.x;
			break;
		case leftBackward:
			pos.x = pos.x - car.direction.x + car.direction.y;
			pos.y = pos.y - car.direction.x + car.direction.x;
			break;
		case rightBackward:
			pos.x = pos.x - car.direction.x - car.direction.y;
			pos.y = pos.y - car.direction.x - car.direction.x;
			break;
		case stay:
			break;

	}
	return pos;
}