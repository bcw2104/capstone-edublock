
// *** 수정
class Point {
    constructor(isLocatable, x, y ,elementType, initState = 0) { // type이 0이면 아무것도 없는 것
        this.isLocatable = isLocatable;
        this.elementType = elementType;
        this.pos = {x: x, y: y};
        this.element = null;

        switch(elementType) {
            case none:
                break;
            case startingPoint:
                this.element = new StartPoint(initState);
                break;
            case goalPoint:
                this.element = new GoalPoint(initState);
                break;
            case trafficLight:
                this.element = new TrafficLight(initState);
                break;
            case gasStation:
                this.element = new GasStation(initState);
                break;
            case someObject:
                this.element = new SomeObject(initState);
                break;
        }
    }
}

class StartPoint {
    constructor(initState) {
        this.dir = initState;
    }

    init(initState) {
        this.dir = initState;
    }
}

class GoalPoint {
    constructor(initState) {
        this.dir = initState;
    }

    init(initState) {
        this.dir = initState;
    }
}

class TrafficLight {
    constructor(initState) {
        this.state = initState;
        this.maxState = 9;
        this.color = 0;
        this.changeColor();
    }

    init(initState) {
        this.state = initState;
        this.color = 0;
        this.changeColor();
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
        switch(this.state) {
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
}

class GasStation {
    constructor(initState) {
        this.gas = initState;
    }

    init(initState) {
        this.gas = initState;
    }
}

// *** 추가
// 장애물 객체. 장애물 종류에 따라 something이 바뀌고 something에 따라 그림이 바뀜.
class SomeObject {
    constructor(initState) {
        this.something = initState; // 0이면 없음, 1이상이면 어떤 장애물
        this.exist = 1;
    }

    init(initState) {
        this.something = initState;
        this.exist = 1;
    }
}

let tileLength = 50;
let elementSize = 70;
let lineWidth = 1;

let mapImgList = null;
let pointList = null;

let imgMap = null;
let imgMapList = [];

let imgEle = new Image();
imgEle.src = "/resources/images/brace/elements/element1/element.png"

for(var i=1; i<=4; i++){
	let temp = new Image();
	temp.src = "/resources/images/brace/maps/map"+i+"/road.png";
	imgMapList.push(temp);
}

function drawThumbnail(idx){
	mapImgList = mapObj.mil;
	mapWidth = mapObj.mw;
	mapHeight = mapObj.mh;
	imgMap = imgMapList[idx];
	pointList = new Array(mapHeight + 1).fill(null).map(() => new Array(mapWidth + 1)); // 각 점의 정보와 요소 세팅
	resizeCanvas();
	initPoint();
	initMap();
	drawElement();
}

function resizeCanvas(){
    $("canvas").each(function(i, element) {
    	element.width = mapWidth*(tileLength + lineWidth) + lineWidth;
    	element.height = mapHeight*(tileLength + lineWidth) + lineWidth;
    })
}

function clearCanvas() {
    const mapCanvas = document.getElementById("thumbnailCanvas");
    const mapContext = mapCanvas.getContext("2d");

    mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
}

function initPoint(){
	for (let y = 0; y < mapHeight + 1; y++) { // 포인트와 요소 초기화
        for (let x = 0; x < mapWidth + 1; x++) {
            pointList[y][x] = new Point(mapObj.pl[y][x].lct, x, y, mapObj.pl[y][x].et, mapObj.pl[y][x].ist);
        }
    }
}

function initMap() {
    const mapCanvas = document.getElementById("thumbnailCanvas");
    const mapContext = mapCanvas.getContext("2d");
    mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    drawMap(mapContext, mapImgList, mapHeight, mapWidth);
}

function drawMap(mapContext, mapImgList, mapHeight, mapWidth) {
    // imgMap을 통해 그림을 그림.
    for (let row = 0; row < mapHeight; row++) {
        for (let column = 0; column < mapWidth; column++) {
            mapContext.drawImage(imgMap,
                (tileLength + 2*lineWidth) * mapImgList[row][column].in,
                (tileLength + 2*lineWidth) * mapImgList[row][column].d,
                (tileLength + 2*lineWidth), (tileLength + 2*lineWidth),
                (tileLength + lineWidth) * column, (tileLength + lineWidth) * row,
                (tileLength + 2*lineWidth), (tileLength + 2*lineWidth));
        }
    }
}

function drawElement() {
    const elementCanvas = document.getElementById("thumbnailCanvas");
    const elementContext = elementCanvas.getContext("2d");

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (pointList[y][x].element != null) {
                elementContext.save();
                switch(pointList[y][x].elementType) {
                    case startingPoint:
                        elementContext.translate((tileLength + lineWidth) * (x + compass[pointList[y][x].element.dir].x) + lineWidth, (tileLength + lineWidth) * (y + compass[pointList[y][x].element.dir].y) + lineWidth);
                        elementContext.drawImage(imgEle, (tileLength + lineWidth) * startingPoint, 0, tileLength, tileLength, -elementSize/2, -elementSize/2, elementSize, elementSize);
                        break;
                    case goalPoint:
                        elementContext.translate((tileLength + lineWidth) * (x + compass[pointList[y][x].element.dir].x) + lineWidth, (tileLength + lineWidth) * (y + compass[pointList[y][x].element.dir].y) + lineWidth);
                        elementContext.drawImage(imgEle, (tileLength + lineWidth) * goalPoint, 0, tileLength, tileLength, -elementSize/2, -elementSize/2, elementSize, elementSize);
                        break;
                    case trafficLight:
                        elementContext.translate((tileLength + lineWidth) * x + lineWidth, (tileLength + lineWidth) * y + lineWidth);
                        elementContext.drawImage(imgEle, (tileLength + lineWidth) * trafficLight, (tileLength + lineWidth) * pointList[y][x].element.getColor(), tileLength, tileLength, -elementSize/2, -elementSize/2, elementSize, elementSize);
                        break;
                    case gasStation:
                        let remainGas = 1;
                        if(pointList[y][x].element.gas > 0) {
                            remainGas = 0;
                        }
                        elementContext.translate((tileLength + lineWidth) * x + lineWidth, (tileLength + lineWidth) * y + lineWidth);
                        elementContext.drawImage(imgEle, (tileLength + lineWidth) * gasStation, (tileLength + lineWidth) * remainGas, tileLength, tileLength, -elementSize/2, -elementSize/2, elementSize, elementSize);
                        break;
                    case someObject: // *** 추가
                        elementContext.translate((tileLength + lineWidth) * x + lineWidth, (tileLength + lineWidth) * y + lineWidth);
                        elementContext.drawImage(imgEle, (tileLength + lineWidth) * someObject, (tileLength + lineWidth) * pointList[y][x].element.something, tileLength, tileLength, -elementSize/2, -elementSize/2, elementSize, elementSize);
                        break;
                }
                elementContext.restore();
            }
        }
    }
}

