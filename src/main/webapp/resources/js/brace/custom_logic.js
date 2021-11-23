class CustomPoint {
	constructor(isLocatable, elementType, initState = 0) {
		this.isLocatable = isLocatable;
		this.elementType = elementType;
		this.initState = initState;
	}
}

class CustomMapImg {
	constructor(imgNum, direction) {
		this.imgNum = imgNum;
		this.direction = direction;
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
const none = 0;
const sPoint = 1;
const gPoint = 2;
const trafficLight = 3;
const gasStation = 4;

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
					[new CustomPoint(false, 0), new CustomPoint(true, 0), new CustomPoint(false, 0)],
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
				temp.pointMember[y][x].isLocatable = this.pointMember[y][x].isLocatable;
				temp.pointMember[y][x].elementType = this.pointMember[y][x].elementType;
				temp.pointMember[y][x].initState = this.pointMember[y][x].initState;
			}
		}

		for (let y = 0; y < 2; y++) {
			for (let x = 0; x < 2; x++) {
				temp.imgList[y][x].imgNum = this.imgList[y][x].imgNum;
				temp.imgList[y][x].direction = this.imgList[y][x].direction;
			}
		}

		return temp;
	}
}

// 맵의 최대 사이즈
const maxWidth = 20;
const maxHeight = 20;
// 시작점
const startingPoint = { x: -1, y: -1 };
// 도착점
const goalPoint = { x: -1, y: -1 };
// 시작 방향
let startingDirection = -1;
// 점들의 데이터
const points = new Array(maxHeight + 1).fill(null).map(() => new Array(maxWidth + 1));
// 이미지 번호를 담는 리스트
const images = new Array(maxHeight).fill(null).map(() => new Array(maxWidth));
//맵 이름, 맵 점수
let newMapName = null;
let newMapPoint = null;

// 맵의 사이즈
let mapWidth = 0;
let mapHeight = 0;

// *** 좌상단 점
let originPoint = { x: 0, y: 0 };

const newMapData = {
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
	lb: null
}

function initNewMap() {
    newMapData.mw = null;
    newMapData.mh = null;
    newMapData.pl = null;
    newMapData.mil = null;
    newMapData.sp.x = null;
    newMapData.sp.y = null;
    newMapData.gp.x = null;
    newMapData.gp.y = null;
    newMapData.op.x = null;
    newMapData.op.y = null;
    newMapData.sf = null;
    newMapData.sd = null;
    newMapData.lb = null;
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
function calSize() {
	const leftUpPos = { x: 0, y: 0 };
	const rightDownPos = { x: maxWidth, y: maxHeight };
	const flag = { x: 1, y: 1, endX: false, endY: false };

	// 좌상단 좌표 구하기
	while (true) {
		if (!flag.endY) {
			for (let x = flag.x; x < maxWidth; x += 2) {
				if (points[flag.y][x] != null) {
					leftUpPos.y = flag.y - 1;
					flag.endY = true;
					break;
				}
			}
		}

		if (!flag.endX) {
			for (let y = flag.y; y < maxHeight; y += 2) {
				if (points[y][flag.x] != null) {
					leftUpPos.x = flag.x - 1;
					flag.endX = true;
					break;
				}
			}
		}

		flag.x += 2;
		flag.y += 2;

		if (flag.endX && flag.endY) {
			break;
		}

		if (!(flag.x < maxWidth)) {
			leftUpPos.x = -1;
			leftUpPos.y = -1;
			break;
		}

	}

	// 블록이 하나도 없는 경우
	if (leftUpPos.x == -1) {
		mapWidth = 0;
		mapHeight = 0;
	}

	// 우하단 좌표 구하기 준비
	flag.x = maxWidth - 1;
	flag.y = maxHeight - 1;
	flag.endX = false;
	flag.endY = false;

	// 우하단 좌표 구하기
	while (true) {
		if (!flag.endY) {
			for (let x = flag.x; x > 0; x -= 2) {
				if (points[flag.y][x] != null) {
					rightDownPos.y = flag.y + 1;
					flag.endY = true;
					break;
				}
			}
		}

		if (!flag.endX) {
			for (let y = flag.y; y > 0; y -= 2) {
				if (points[y][flag.x] != null) {
					rightDownPos.x = flag.x + 1;
					flag.endX = true;
					break;
				}
			}
		}

		flag.x -= 2;
		flag.y -= 2;

		if (flag.endX && flag.endY) {
			rightDownPos.x = flag.x;
			rightDownPos.y = flag.y;
			break;
		}
	}

	mapWidth = rightDownPos.x - leftUpPos.x;
	mapHeight = rightDownPos.y - leftUpPos.y;
	originPoint.x = leftUpPos.x;
	originPoint.y = leftUpPos.y;
}

// 블록 시계방향 회전
function turnBlock(block, dir) {

	if (!(dir > 0)) {
		return block;
	}

	const temp = block.copy();

	block.imgList[0][0].imgNum = temp.imgList[1][0].imgNum;
	block.imgList[0][0].direction = (temp.imgList[1][0].direction + 1) % 4;
	block.imgList[0][1].imgNum = temp.imgList[0][0].imgNum;
	block.imgList[0][1].direction = (temp.imgList[0][0].direction + 1) % 4;
	block.imgList[1][0].imgNum = temp.imgList[1][1].imgNum;
	block.imgList[1][0].direction = (temp.imgList[1][1].direction + 1) % 4;
	block.imgList[1][1].imgNum = temp.imgList[0][1].imgNum;
	block.imgList[1][1].direction = (temp.imgList[0][1].direction + 1) % 4;

	block.pointMember[0][0].isLocatable = temp.pointMember[1][0].isLocatable;
	block.pointMember[0][0].elementType = temp.pointMember[1][0].elementType;
	block.pointMember[0][0].initState = temp.pointMember[1][0].initState;

	block.pointMember[0][1].isLocatable = temp.pointMember[0][0].isLocatable;
	block.pointMember[0][1].elementType = temp.pointMember[0][0].elementType;
	block.pointMember[0][1].initState = temp.pointMember[0][0].initState;

	block.pointMember[0][2].isLocatable = temp.pointMember[0][1].isLocatable;
	block.pointMember[0][2].elementType = temp.pointMember[0][1].elementType;
	block.pointMember[0][2].initState = temp.pointMember[0][1].initState;

	block.pointMember[1][0].isLocatable = temp.pointMember[2][0].isLocatable;
	block.pointMember[1][0].elementType = temp.pointMember[2][0].elementType;
	block.pointMember[1][0].initState = temp.pointMember[2][0].initState;

	block.pointMember[1][2].isLocatable = temp.pointMember[0][2].isLocatable;
	block.pointMember[1][2].elementType = temp.pointMember[0][2].elementType;
	block.pointMember[1][2].initState = temp.pointMember[0][2].initState;

	block.pointMember[2][0].isLocatable = temp.pointMember[2][1].isLocatable;
	block.pointMember[2][0].elementType = temp.pointMember[2][1].elementType;
	block.pointMember[2][0].initState = temp.pointMember[2][1].initState;

	block.pointMember[2][1].isLocatable = temp.pointMember[2][2].isLocatable;
	block.pointMember[2][1].elementType = temp.pointMember[2][2].elementType;
	block.pointMember[2][1].initState = temp.pointMember[2][2].initState;

	block.pointMember[2][2].isLocatable = temp.pointMember[2][0].isLocatable;
	block.pointMember[2][2].elementType = temp.pointMember[2][0].elementType;
	block.pointMember[2][2].initState = temp.pointMember[1][2].initState;

	turnBlock(block, dir - 1);
}

function setBlock(pos, block) {
	for (let blockY = 0; blockY < 3; blockY++) {
		for (let blockX = 0; blockX < 3; blockX++) {
			if (points[pos.y - 1 + blockY][pos.x - 1 + blockX] == null) {
				points[pos.y - 1 + blockY][pos.x - 1 + blockX] = new CustomPoint(block.pointMember[blockY][blockX].isLocatable, block.pointMember[blockY][blockX].elementType, block.pointMember[blockY][blockX].initState);

				switch (points[pos.y - 1 + blockY][pos.x - 1 + blockX].elementType) {
					case 1:
						startingPoint.x = pos.x - 1 + blockX;
						startingPoint.y = pos.y - 1 + blockY;
						break;
					case 2:
						goalPoint.x = pos.x - 1 + blockX;
						goalPoint.y = pos.y - 1 + blockY;
						break;
				}
			}
		}
	}

	for (let blockY = 0; blockY < 2; blockY++) {
		for (let blockX = 0; blockX < 2; blockX++) {
			images[pos.y - 1 + blockY][pos.x - 1 + blockX] = new CustomMapImg(block.imgList[blockY][blockX].imgNum, block.imgList[blockY][blockX].direction);
		}
	}
}

// points와 images로 newMapData 정보들을 저장.
function setMapData() {
	calSize();
	if (newMapData.mw == 0) {
		initNewMap();
		throw "맵이 존재하지 않습니다."
	}
	newMapData.mw = mapWidth + 2;
	newMapData.mh = mapHeight + 2;
	newMapData.pl = new Array(newMapData.mh + 1).fill(null).map(() => new Array(newMapData.mw + 1));
	for (let y = 0; y < newMapData.mh + 1; y++) {
		for (let x = 0; x < newMapData.mw + 1; x++) {
			if (x == 0 || y == 0 || x == newMapData.mw || y == newMapData.mh) {
				newMapData.pl[y][x] = new CustomPoint(false, 0);
			}
			else {
				if (points[originPoint.y + y - 1][originPoint.x + x - 1] != null) {
					newMapData.pl[y][x] = points[originPoint.y + y - 1][originPoint.x + x - 1];
				}
				else {
					newMapData.pl[y][x] = new CustomPoint(false, 0);
				}
			}
		}
	}

	newMapData.mil = new Array(newMapData.mh).fill(null).map(() => Array(newMapData.mw));
	for (let y = 0; y < newMapData.mh; y++) {
		for (let x = 0; x < newMapData.mw; x++) {
			if (x == 0 || y == 0 || x == newMapData.mw - 1 || y == newMapData.mh - 1) {
				newMapData.pl[y][x] = new CustomMapImg(0, 0);
			}
			else {
				if (images[originPoint.y + y - 1][originPoint.x + x - 1] != null) {
					newMapData.mil[y][x] = images[originPoint.y + y - 1][originPoint.x + x - 1];
				}
				else {
					newMapData.mil[y][x] = new CustomMapImg(0, 0);
				}
			}
		}
	}

	if (startingPoint.x == -1) {
		initNewMap();
		throw "시작점이 정해지지 않았습니다."
	}
	newMapData.sp.x = startingPoint.x + 1;
	newMapData.sp.y = startingPoint.y + 1;
	if (goalPoint.x == -1) {
		initNewMap();
		throw "도착지가 정해지지 않았습니다."
	}
	newMapData.gp.x = goalPoint.x + 1;
	newMapData.gp.y = goalPoint.y + 1;
	newMapData.op.x = Math.floor((maxWidth - mapWidth) / 2) + 1;
	newMapData.op.y = Math.floor((maxHeight - mapHeight) / 2) + 1;
	newMapData.sf = document.getElementById("");
	newMapData.sd = startingDirection;
	newMapData.lb = document.getElementById("");
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
						direction = 2;
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
				if (boxes[y][x] == null){
					boxes[y][x] = new box(-1, false, false, false, false);
				}
				blockType = -1;
				direction = 0;
			}

			let block = new Block(blockType);

			switch (boxes[y][x].blockId) {
				case 1:
					block.pointMember[0][1].elementType = 1;
					block.pointMember[0][1].initState = 2;
					startingDirection = 0;
					break;
				case 2:
					block.pointMember[0][1].elementType = 1;
					block.pointMember[0][1].initState = 3;
					startingDirection = 1;
					break;
				case 3:
					block.pointMember[0][1].elementType = 1;
					block.pointMember[0][1].initState = 0;
					startingDirection = 2;
					break;
				case 4:
					block.pointMember[0][1].elementType = 1;
					block.pointMember[0][1].initState = 1;
					startingDirection = 3;
					break;
				case 5:
					block.pointMember[0][1].elementType = 2;
					block.pointMember[0][1].initState = 2;
					break;
				case 6:
					block.pointMember[0][1].elementType = 2;
					block.pointMember[0][1].initState = 3;
					break;
				case 7:
					block.pointMember[0][1].elementType = 2;
					block.pointMember[0][1].initState = 0;
					break;
				case 8:
					block.pointMember[0][1].elementType = 2;
					block.pointMember[0][1].initState = 1;
					break;
			}

			turnBlock(block, direction);

			const pos = { x: 2 * x - 1, y: 2 * y - 1 };
			setBlock(pos, block);
		}
	}

	setMapData();
}

//*** 요소 데이터 newMapData에 추가
function addElement(index, elementType, initState) {
	let x = 2 * (index % 10) + 2 - originPoint.x;
	let y = 2 * parseInt(index / 10) + 2 - originPoint.y;

	if (newMapData.pl[y][x].isLocatable) {
		switch (elementType) {
			case trafficLight:
				newMapData.pl[y][x].elementType = trafficLight;
				newMapData.pl[y][x].initState = initState;
			case gasStation:
				newMapData.pl[y][x].elementType = gasStation;
				newMapData.pl[y][x].initState = initState;
		}
	}
	else {
		throw "둘 수 없는 곳입니다."
	}
}

// *** 요소 데이터 newMapData에서 제거
function deleteElement(index) {
	let x = 2 * (index % 10) + 2 - originPoint.x;
	let y = 2 * parseInt(index / 10) + 2 - originPoint.y;

	newMapData.pl[y][x].elementType = 0;
	newMapData.pl[y][x].initState = 0;
}

// 만든 맵을 저장할 때 호출되는 함수
function createMap() {
	return JSON.stringify(newMapData);
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
	const x = index % wSize + 1;
	const y = parseInt(index / wSize) + 1;
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
	const x = index % wSize + 1;
	const y = parseInt(index / wSize) + 1;
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