
const imgEle = new Image();
imgEle.src = "/resources/images/brace/element.png"

const none = 0;
const startingPoint = 1;
const goalPoint = 2;
const trafLight = 3;

const elementSize = 50;

class Point {
	constructor(isLocatable, x, y, elementType, initState = 0) { // type이 0이면 아무것도 없는 것
		this.isLocatable = isLocatable;
		this.elementType = elementType;
		this.pos = { "x": x, "y": y };
		this.element = null;

		switch (elementType) {
			case none:
				break;
			case startingPoint:
				break;
			case goalPoint:
				break;
			case trafLight:
				this.element = new trafficLight(initState);
				break;
		}
	}

	draw(elementContext, tileLength, lineWidth) {
		if (this.element != null) {
			this.element.drawState(elementContext, tileLength, lineWidth, this.pos.x, this.pos.y);
		}
	}
}

class startPoint {
	constructor(initState) {
		this.state = initState;
	}
}

class trafficLight {
	constructor(initState) {
		this.state = initState;
		this.maxState = 9;
		this.color = 0;
		changeColor();
	}

	nextState() {
		this.state += 1;
		this.state %= this.maxState;
		this.changeColor();
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}

	getColor() {
		return this.color;
	}

	changeColor() {
		switch (this.state) {
			case 0:
			case 1:
			case 2:
				this.color = 0; // 초록불
				break;
			case 3:
			case 4:
				this.color = 1; // 노란불
				break;
			case 5:
			case 6:
			case 7:
			case 8:
				this.color = 2; // 빨간불
				break;
		}
	}

	drawState(elementContext, tileLength, lineWidth, x, y) {
		elementContext.drawImage(imgEle, this.elementType * elementSize, this.element.color * elementSize, elementSize, elementSize,
			x * (tileLength + lineWidth) + lineWidth / 2 - elementSize / 2,
			y * (tileLength + lineWidth) + lineWidth / 2 - elementSize / 2,
			elementSize, elementSize);
	}
}