class CustomPoint {
	constructor(lct, et, ist = 0) {
		this.lct = lct;
		this.et = et;
		this.ist = ist;
	}
}

class CustomMapImg {
	constructor(_in, d) {
		this.in = _in;
		this.d = d;
	}
}

//*** 상, 우, 하, 좌
const compass = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]

// 블록의 종류
const noneBlock = -1;
const endOfRoad = 0;
const straight = 1;
const curve = 2;
const threeWay = 3;
const intersection = 4;

// *** 요소의 종류
const used = -1;
const none = 0;
const startingPoint = 1;
const goalPoint = 2;
const trafficLight = 3;
const gasStation = 4;
const someObject = 5; // *** 추가

// 블록들의 클래스
class Block {
	constructor(blockNum) {
		this.blockNum = blockNum;
		this.imgList = null;
		this.pointMember = null;

		switch (blockNum) {
			case noneBlock:
				this.imgList = [
					[new CustomMapImg(0, 0), new CustomMapImg(0, 0)],
					[new CustomMapImg(0, 0), new CustomMapImg(0, 0)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)]
				];
				break;
			case endOfRoad:
				this.imgList = [
					[new CustomMapImg(1, 2), new CustomMapImg(1, 0)],
					[new CustomMapImg(2, 1), new CustomMapImg(2, 0)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)]
				];
				break;
			case straight:
				this.imgList = [
					[new CustomMapImg(1, 2), new CustomMapImg(1, 0)],
					[new CustomMapImg(1, 2), new CustomMapImg(1, 0)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)]
				];
				break;
			case curve:
				this.imgList = [
					[new CustomMapImg(1, 2), new CustomMapImg(3, 3)],
					[new CustomMapImg(2, 1), new CustomMapImg(1, 1)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(true, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)]
				];
				break;
			case threeWay:
				this.imgList = [
					[new CustomMapImg(3, 2), new CustomMapImg(3, 3)],
					[new CustomMapImg(1, 1), new CustomMapImg(1, 1)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(true, 0), new CustomPoint(true, 0), new CustomPoint(true, 0)],
					[new CustomPoint(false, 0), new CustomPoint(false, 0), new CustomPoint(false, 0)]
				];
				break;
			case intersection:
				this.imgList = [
					[new CustomMapImg(3, 2), new CustomMapImg(3, 3)],
					[new CustomMapImg(3, 1), new CustomMapImg(3, 0)]
				];
				this.pointMember = [
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
					[new CustomPoint(true, 0), new CustomPoint(true, 0), new CustomPoint(true, 0)],
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)]
				];
				break;
		}
	}

	copy() {

		const temp = new Block(this.blockNum);

		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				temp.pointMember[y][x].lct = this.pointMember[y][x].lct;
				temp.pointMember[y][x].et = this.pointMember[y][x].et;
				temp.pointMember[y][x].ist = this.pointMember[y][x].ist;
			}
		}

		for (let y = 0; y < 2; y++) {
			for (let x = 0; x < 2; x++) {
				temp.imgList[y][x].in = this.imgList[y][x].in;
				temp.imgList[y][x].d = this.imgList[y][x].d;
			}
		}

		return temp;
	}
}

// 맵의 최대 사이즈
let maxWidth = 20;
let maxHeight = 20;
// 시작점
let sPoint = { x: -1, y: -1 };
// 도착점
let gPoint = { x: -1, y: -1 };
// 시작 방향
let startingd = -1;
// 점들의 데이터
let points = new Array(maxHeight + 1).fill(null).map(() => new Array(maxWidth + 1));
// 이미지 번호를 담는 리스트
let images = new Array(maxHeight).fill(null).map(() => new Array(maxWidth));
//맵 이름, 맵 점수
let newMapName = null;
let newMapPoint = null;

// 맵의 사이즈
let mapWidth = 0;
let mapHeight = 0;

// *** 좌상단 점
let originPoint = { x: 0, y: 0 };

const mapObj = {
	mw: null,
	mh: null,
	pl: null,
	mil: null,
	sp: {
		x: null,
		y: null
	},
	gp: {
		x: null,
		y: null
	},
	op: {
		x: null,
		y: null
	},
	sf: null,
	sd: null,
	lb: 20
}

function initNewMap() {
    mapObj.mw = null;
    mapObj.mh = null;
    mapObj.pl = null;
    mapObj.mil = null;
    mapObj.sp.x = null;
    mapObj.sp.y = null;
    mapObj.gp.x = null;
    mapObj.gp.y = null;
    mapObj.op.x = null;
    mapObj.op.y = null;
    mapObj.sf = null;
    mapObj.sd = null;
    mapObj.lb = null;
}

// 점 데이터 초기화
function initPoints() {
	for (let y = 0; y < maxHeight + 1; y++) {
		for (let x = 0; x < maxWidth + 1; x++) {
			if (x == 0 || y == 0 || x == maxWidth || y == maxHeight) {
				points[y][x] = new CustomPoint(false, 0);
			} else {
				points[y][x] = null;
			}
		}
	}
}

// 이미지 데이터 초기화
function initImgs() {
	for (let y = 0; y < maxHeight; y++) {
		for (let x = 0; x < maxWidth; x++) {
			images[y][x] = null;
		}
	}
}

// 맵의 사이즈 계산. 맵이 만들어져있지 않으면 null 리턴
function calSize(wSize,hSize) {
	const leftUpPos = { x: wSize, y: hSize };
	const rightDownPos = { x: 0, y: 0 };

	for (let y = 1; y <= hSize; y++) {
		for (let x = 1; x <= wSize; x++) {
			if(boxes[y][x] != null && boxes[y][x].blockId > 0){
				leftUpPos.y = leftUpPos.y > y ? y : leftUpPos.y;
				leftUpPos.x = leftUpPos.x > x ? x : leftUpPos.x;
				rightDownPos.y = rightDownPos.y < y ? y : rightDownPos.y;
				rightDownPos.x = rightDownPos.x < x ? x : rightDownPos.x;
			}
		}
	}

	leftUpPos.x = leftUpPos.x*2-1;
	leftUpPos.y = leftUpPos.y*2-1;
	rightDownPos.x = rightDownPos.x*2;
	rightDownPos.y = rightDownPos.y*2;

	mapWidth = rightDownPos.x - leftUpPos.x + 1;
	mapHeight = rightDownPos.y - leftUpPos.y + 1;
	originPoint.x = leftUpPos.x - 1;
	originPoint.y = leftUpPos.y - 1;

}

// 블록 시계방향 회전
function turnBlock(block, dir) {

	if (!(dir > 0)) {
		return block;
	}

	const temp = block.copy();

	block.imgList[0][0].in = temp.imgList[1][0].in;
	block.imgList[0][0].d = (temp.imgList[1][0].d + 1) % 4;
	block.imgList[0][1].in = temp.imgList[0][0].in;
	block.imgList[0][1].d = (temp.imgList[0][0].d + 1) % 4;
	block.imgList[1][0].in = temp.imgList[1][1].in;
	block.imgList[1][0].d = (temp.imgList[1][1].d + 1) % 4;
	block.imgList[1][1].in = temp.imgList[0][1].in;
	block.imgList[1][1].d = (temp.imgList[0][1].d + 1) % 4;

	block.pointMember[0][0].lct = temp.pointMember[2][0].lct;
	block.pointMember[0][0].et = temp.pointMember[2][0].et;
	block.pointMember[0][0].ist = temp.pointMember[2][0].ist;

	block.pointMember[0][1].lct = temp.pointMember[1][0].lct;
	block.pointMember[0][1].et = temp.pointMember[1][0].et;
	block.pointMember[0][1].ist = temp.pointMember[1][0].ist;

	block.pointMember[0][2].lct = temp.pointMember[0][0].lct;
	block.pointMember[0][2].et = temp.pointMember[0][0].et;
	block.pointMember[0][2].ist = temp.pointMember[0][0].ist;

	block.pointMember[1][0].lct = temp.pointMember[2][1].lct;
	block.pointMember[1][0].et = temp.pointMember[2][1].et;
	block.pointMember[1][0].ist = temp.pointMember[2][1].ist;

	block.pointMember[1][2].lct = temp.pointMember[0][1].lct;
	block.pointMember[1][2].et = temp.pointMember[0][1].et;
	block.pointMember[1][2].ist = temp.pointMember[0][1].ist;

	block.pointMember[2][0].lct = temp.pointMember[2][2].lct;
	block.pointMember[2][0].et = temp.pointMember[2][2].et;
	block.pointMember[2][0].ist = temp.pointMember[2][2].ist;

	block.pointMember[2][1].lct = temp.pointMember[1][2].lct;
	block.pointMember[2][1].et = temp.pointMember[1][2].et;
	block.pointMember[2][1].ist = temp.pointMember[1][2].ist;

	block.pointMember[2][2].lct = temp.pointMember[0][2].lct;
	block.pointMember[2][2].et = temp.pointMember[0][2].et;
	block.pointMember[2][2].ist = temp.pointMember[0][2].ist;

	turnBlock(block, dir - 1);
}

function setBlock(pos, block) {
	for (let blockY = 0; blockY < 3; blockY++) {
		for (let blockX = 0; blockX < 3; blockX++) {
			if(points[pos.y - 1 + blockY][pos.x - 1 + blockX] == null || points[pos.y - 1 + blockY][pos.x - 1 + blockX].et == 0){
				points[pos.y - 1 + blockY][pos.x - 1 + blockX] = new CustomPoint(block.pointMember[blockY][blockX].lct, block.pointMember[blockY][blockX].et, block.pointMember[blockY][blockX].ist);
			}
			switch (points[pos.y - 1 + blockY][pos.x - 1 + blockX].et) {
				case 1:
					sPoint.x = pos.x-originPoint.x - 1 + blockX;
					sPoint.y = pos.y-originPoint.y - 1 + blockY;
					break;
				case 2:
					gPoint.x = pos.x-originPoint.x - 1 + blockX;
					gPoint.y = pos.y-originPoint.y - 1 + blockY;
					break;
			}
		}
	}
	for (let blockY = 0; blockY < 2; blockY++) {
		for (let blockX = 0; blockX < 2; blockX++) {
			images[pos.y - 1 + blockY][pos.x - 1 + blockX] = new CustomMapImg(block.imgList[blockY][blockX].in, block.imgList[blockY][blockX].d);
		}
	}
}

// points와 images로 mapObj 정보들을 저장.
function setMapData() {
	if (mapObj.mw == 0) {
		initNewMap();
		throw "맵이 존재하지 않습니다."
	}
	mapObj.mw = mapWidth + 2;
	mapObj.mh = mapHeight + 2;
	mapObj.pl = new Array(mapObj.mh + 1).fill(null).map(() => new Array(mapObj.mw + 1));
	for (let y = 0; y < mapObj.mh + 1; y++) {
		for (let x = 0; x < mapObj.mw + 1; x++) {
			if(mapObj.pl[y][x] == null || mapObj.pl[y][x].et == 0){
				if (x == 0 || y == 0 || x == mapObj.mw || y == mapObj.mh) {
					mapObj.pl[y][x] = new CustomPoint(false, 0);
				}
				else {
					if (points[originPoint.y + y-1][originPoint.x + x -1] != null) {
						mapObj.pl[y][x] = points[originPoint.y + y -1][originPoint.x + x -1];
					}
					else {
						mapObj.pl[y][x] = new CustomPoint(false, 0);
					}
				}
			}
		}
	}

	mapObj.mil = new Array(mapObj.mh).fill(null).map(() => Array(mapObj.mw));
	for (let y = 0; y < mapObj.mh; y++) {
		for (let x = 0; x < mapObj.mw; x++) {
			if (x == 0 || y == 0 || x == mapObj.mw-1 || y == mapObj.mh-1) {
				mapObj.mil[y][x] = new CustomMapImg(0, 0);
			}
			else {
				if (images[originPoint.y + y-1][originPoint.x + x-1] != null) {
					mapObj.mil[y][x] = images[originPoint.y + y-1][originPoint.x + x-1];
				}
				else {
					mapObj.mil[y][x] = new CustomMapImg(0, 0);
				}
			}
		}
	}

	if (sPoint.x == -1) {
		initNewMap();
		throw "시작점이 정해지지 않았습니다."
	}
	mapObj.sp.x = sPoint.x + 1 - originPoint.x;
	mapObj.sp.y = sPoint.y + 1 - originPoint.y;
	if (gPoint.x == -1) {
		initNewMap();
		throw "도착지가 정해지지 않았습니다."
	}
	mapObj.gp.x = gPoint.x + 1 - originPoint.x;
	mapObj.gp.y = gPoint.y + 1 - originPoint.y;
	mapObj.op.x = Math.floor((maxWidth - mapWidth) / 2) + 1;
	mapObj.op.y = Math.floor((maxHeight - mapHeight) / 2) + 1;
	mapObj.sd = startingDirection;
}

//  boxes로 points, images 데이터 추가
function mapEncoding(wSize,hSize) {
	let blockType = -1;
	let direction = -1;
	for (let y = 1; y <= hSize; y++) {
		for (let x = 1; x <= wSize; x++) {
			if (boxes[y][x] != null && boxes[y][x].blockId >= 0) {
				switch (boxes[y][x].blockId) {
					case 1: // 시작_위
						blockType = 0;
						direction = 0;
						break;
					case 2:
						blockType = 0;
						direction = 1;
						break;
					case 3:
						blockType = 0;
						direction = 2;
						break;
					case 4:
						blockType = 0;
						direction = 3;
						break;
					case 5:
						blockType = 0;
						direction = 0;
						break;
					case 6:
						blockType = 0;
						direction = 1;
						break;
					case 7:
						blockType = 0;
						direction = 2;
						break;
					case 8:
						blockType = 0;
						direction = 3;
						break;
					case 9:
						blockType = 0;
						direction = 0;
						break;
					case 10:
						blockType = 0;
						direction = 1;
						break;
					case 11:
						blockType = 0;
						direction = 2;
						break;
					case 12:
						blockType = 0;
						direction = 3;
						break;
					case 13:
						blockType = 1;
						direction = 0;
						break;
					case 14:
						blockType = 1;
						direction = 1;
						break;
					case 15:
						blockType = 2;
						direction = 1;
						break;
					case 16:
						blockType = 2;
						direction = 2;
						break;
					case 17:
						blockType = 2;
						direction = 3;
						break;
					case 18:
						blockType = 2;
						direction = 0;
						break;
					case 19:
						blockType = 3;
						direction = 0;
						break;
					case 20:
						blockType = 3;
						direction = 1;
						break;
					case 21:
						blockType = 3;
						direction = 2;
						break;
					case 22:
						blockType = 3;
						direction = 3;
						break;
					case 23:
						blockType = 4;
						direction = 0;
						break;
				}
			}
			else {
				blockType = -1;
				direction = 0;
			}

			let block = new Block(blockType);

			if (boxes[y][x] != null){
				switch (boxes[y][x].blockId) {
					case 1:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 1;
						block.pointMember[0][1].ist = 2;
						startingDirection = 0;
						break;
					case 2:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 1;
						block.pointMember[0][1].ist = 3;
						startingDirection = 1;
						break;
					case 3:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 1;
						block.pointMember[0][1].ist = 0;
						startingDirection = 2;
						break;
					case 4:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 1;
						block.pointMember[0][1].ist = 1;
						startingDirection = 3;
						break;
					case 5:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 2;
						block.pointMember[0][1].ist = 2;
						break;
					case 6:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 2;
						block.pointMember[0][1].ist = 3;
						break;
					case 7:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 2;
						block.pointMember[0][1].ist = 0;
						break;
					case 8:
						block.pointMember[1][1].et = -1;
						block.pointMember[0][1].et = 2;
						block.pointMember[0][1].ist = 1;
						break;
				}

				turnBlock(block, direction);
				const pos = { x: 2 * x - 1, y: 2 * y - 1 };
				setBlock(pos, block);
			}
		}
	}
	calSize(wSize,hSize);

	setMapData();
}

//*** 요소 데이터 mapObj에 추가
function addElement(index, et, ist,wSize) {
	var x = (index-1) % wSize + 1;
	var y = parseInt((index-1) / wSize) + 1;

	if(boxes[y][x] == null){
		return 0;
	}

	x = 2*x-originPoint.x;
	y = 2*y - originPoint.y;

	if(mapObj.pl[y][x].et != 0){
		return 0;
	}

	switch (et) {
		case trafficLight:
			mapObj.pl[y][x].et = trafficLight;
			mapObj.pl[y][x].ist = ist;
			break;
		case gasStation:
			mapObj.pl[y][x].et = gasStation;
			mapObj.pl[y][x].ist = ist;
			break;
	}
	return 1;
}

// *** 요소 데이터 mapObj에서 제거
function deleteElement(index,wSize) {
	var x = (index-1) % wSize + 1;
	var y = parseInt((index-1) / wSize) + 1;

	if(boxes[y][x] == null){
		return 0;
	}

	x = 2*x - originPoint.x;
	y = 2*y - originPoint.y;

	mapObj.pl[y][x].et = 0;
	mapObj.pl[y][x].ist = 0;
}

// 만든 맵을 저장할 때 호출되는 함수

function setLimitElement(limit,fuel){
	mapObj.sf = fuel;
	mapObj.lb = limit;
}

function createMap() {
	return JSON.stringify(mapObj);
}

function saveData() {
	try {
		createMap();
	}
	catch (e) {
		alert("저장 불가 : " + e);
	}
}

class box {
	constructor(blockId, up = null, right = null, down = null, left = null) {
		this.blockId = blockId;
		this.up = up;
		this.right = right;
		this.down = down;
		this.left = left;
	}
}

const boxes = [
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null, null, null]
]

function initBoxes(wSize, hSize) {
	for (let y = 0; y <= hSize + 1; y++) {
		for (let x = 0; x <= wSize + 1; x++) {
			if (x == 0 || y == 0 || x == wSize + 1 || y == hSize + 1) {
				boxes[y][x] = new box(-1, false, false, false, false);
			}
			else {
				boxes[y][x] = null;
			}
		}
	}
}
// *** 주변 box가 null인 경우를 제외하지 않음
function putBlock(index, blockId, wSize) {
	const x = (index-1) % wSize + 1;
	const y = parseInt((index-1) / wSize) + 1;
	var curbox = null;
	var blockId = Number(blockId);
	switch (blockId) {
		case 1:
			curbox = new box(blockId, true, false, false, false);
			break;
		case 2:
			curbox = new box(blockId, false, true, false, false);
			break;
		case 3:
			curbox = new box(blockId, false, false, true, false);
			break;
		case 4:
			curbox = new box(blockId, false, false, false, true);
			break;
		case 5:
			curbox = new box(blockId, true, false, false, false);
			break;
		case 6:
			curbox = new box(blockId, false, true, false, false);
			break;
		case 7:
			curbox = new box(blockId, false, false, true, false);
			break;
		case 8:
			curbox = new box(blockId, false, false, false, true);
			break;
		case 9:
			curbox = new box(blockId, true, false, false, false);
			break;
		case 10:
			curbox = new box(blockId, false, true, false, false);
			break;
		case 11:
			curbox = new box(blockId, false, false, true, false);
			break;
		case 12:
			curbox = new box(blockId, false, false, false, true);
			break;
		case 13:
			curbox = new box(blockId, true, false, true, false);
			break;
		case 14:
			curbox = new box(blockId, false, true, false, true);
			break;
		case 15:
			curbox = new box(blockId, false, true, true, false);
			break;
		case 16:
			curbox = new box(blockId, false, false, true, true);
			break;
		case 17:
			curbox = new box(blockId, true, false, false, true);
			break;
		case 18:
			curbox = new box(blockId, true, true, false, false);
			break;
		case 19:
			curbox = new box(blockId, true, true, false, true);
			break;
		case 20:
			curbox = new box(blockId, true, true, true, false);
			break;
		case 21:
			curbox = new box(blockId, false, true, true, true);
			break;
		case 22:
			curbox = new box(blockId, true, false, true, true);
			break;
		case 23:
			curbox = new box(blockId, true, true, true, true);
			break;

	}
	// 주변 box가 null인 경우를 포함하지 않음
	if ((boxes[y - 1][x] != null && boxes[y - 1][x].down != curbox.up) || (boxes[y + 1][x] != null && boxes[y + 1][x].up != curbox.down) || (boxes[y][x - 1] && boxes[y][x - 1].right != curbox.left) || (boxes[y][x + 1] != null && boxes[y][x + 1].left != curbox.right)) {
		return 0;
	}
	boxes[y][x] = curbox;
	return 1;
}

function deleteBlock(index, wSize) {
	const x = (index-1) % wSize + 1;
	const y = parseInt((index-1) / wSize) + 1;
	boxes[y][x] = null;
}

function boxValidation(wSize, hSize) {
	let starting = 0;
	let goal = 0;
	for (let y = 1; y <= hSize; y++) {
		for (let x = 1; x <= wSize; x++) {
			if (boxes[y][x] == null) {
				if ((boxes[y - 1][x] != null && boxes[y - 1][x].down)
						|| (boxes[y + 1][x] != null && boxes[y + 1][x].up)
						|| (boxes[y][x-1] != null && boxes[y][x - 1].right)
						|| (boxes[y][x+1] != null && boxes[y][x + 1].left)) {
					return 0;
				}
			}
			else {
				if (boxes[y][x].blockId <= 4) {
					starting++;
				}
				else if (boxes[y][x].blockId <= 8) {
					goal++;
				}
			}
		}
	}

	if (starting != 1 || goal != 1) {
		return 0;
	}

	return 1;
}