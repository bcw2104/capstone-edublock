
const imgMap = new Image();
imgMap.src = "/resources/images/brace/road.png";

const tileLength = 25;
const lineWidth = 1;
const onRoad = "#b97a57";
const offRoad = "#b5e61d";

function initMap(mapCanvas, mapImgList, pointList, mapHeight, mapWidth) {
	const mapContext = mapCanvas.getContext("2d");
	mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
	drawMap(mapContext, mapImgList, pointList, mapHeight, mapWidth);
	console.log("맵 초기화");
}

function drawMap(mapContext, mapImgList, pointList, mapHeight, mapWidth) {
	drawGrid(mapContext, pointList, mapHeight, mapWidth);

	console.log(mapImgList);

	// mapImg를 통해 그림을 그림.
	for (let row = 0; row < mapHeight; row++) {
		for (let column = 0; column < mapWidth; column++) {
			mapContext.drawImage(imgMap, tileLength * mapImgList[row][column].in, tileLength * mapImgList[row][column].d, tileLength, tileLength,
				(tileLength + lineWidth) * column + lineWidth, (tileLength + lineWidth) * row + lineWidth, tileLength, tileLength);
		}
	}
}

function drawGrid(mapContext, pointList, mapHeight, mapWidth) {
	//테두리 그리기

	mapContext.save();

	for (let y = 0; y < mapHeight + 1; y++) {
		for (let x = 0; x < mapWidth + 1; x++) {
			if (pointList[y][x].isLocatable == 1) { mapContext.strokeStyle = onRoad; }
			else { mapContext.strokeStyle = offRoad; }

			mapContext.lineWidth = lineWidth;
			drawCross(mapContext, x, y);
		}
	}

	mapContext.restore();
}

function drawCross(mapContext, x, y) {
	// 가로선
	mapContext.beginPath();
	mapContext.moveTo((tileLength + lineWidth) * x - tileLength / 2, (tileLength + lineWidth) * y + lineWidth / 2);
	mapContext.lineTo((tileLength + lineWidth) * x + tileLength / 2 + lineWidth, (tileLength + lineWidth) * y + lineWidth / 2);
	mapContext.stroke();
	mapContext.closePath();

	// 세로선
	mapContext.beginPath();
	mapContext.moveTo((tileLength + lineWidth) * x + lineWidth / 2, (tileLength + lineWidth) * y - tileLength / 2);
	mapContext.lineTo((tileLength + lineWidth) * x + lineWidth / 2, (tileLength + lineWidth) * y + tileLength / 2 + lineWidth);
	mapContext.stroke();
	mapContext.closePath();
}