
let limitTurn = 0;
let turn = 0; // 움직임 횟수. 시간같은 개념
let fuel = 0; // 자동차 연료
let speed = 1;
let gameOver = false;
let gameOverText = null;
let gridOn = true;

// const map = new Image();
// map.src = "./element.png";
// map.onload = function() {
//     const mapCanvas = document.getElementById("mapImgCanvas");
//     const mapContext = mapCanvas.getContext("2d");

//     mapContext.drawImage(map, 0, 0, 200, 200);
// }

window.onload = function() {
    resetCanvasOrigin();
    setCanvasOrigin();

    console.log("set origin");

    fuel = startingFuel;
    console.log("set fule");

    const mapCanvas = document.getElementById("mapImgCanvas");
    const carCanvas = document.getElementById("carImgCanvas");
    console.log("set canvas");

    initMap(mapCanvas, mapImgList, pointList, mapHeight, mapWidth); // 맵 그리기
    initCar(carCanvas, startingPos, startingDirection, tileLength, lineWidth); // 자동차 데이터 설정, 그리기
    drawElement(); // 요소 그리기
    drawBlackGrid();
    console.log("set img");

    console.log(mapImgList[1][1].in);
}

// const json = null; // DB에서 받아온 json파일
// const mapObj = JSON.parse(json);
const mapObj = {
    mapId: 1111,
    gameId: 1111,
    authorId: "1111",
    mapName: "1111",
    mapPoint: 1111,
    mapData: {
      mw: 22,
      mh: 22,
      pl: [
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, lct: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, lct: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 1, ist: 2},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 1, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0}
        ],
        [
            {lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},{lct: 0, et: 0, ist: 0},
        ]
      ],
      mil: [
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 2, d: 2}, {in: 2, d: 3}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 2, d: 2}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 2, d: 3}, {in: 2, d: 2}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 2, d: 3}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 3, d: 3}, {in: 3, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 2, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 2, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 2, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 2, d: 3}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 2, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 3, d: 0}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 2, d: 2}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 2, d: 2}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 2, d: 0}, {in: 2, d: 1}, {in: 2, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 2, d: 2}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 2, d: 3}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 2, d: 1}, {in: 2, d: 0}, {in: 1, d: 2}, {in: 3, d: 0}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 3, d: 1}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 1, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 3, d: 3}, {in: 3, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 3, d: 2}, {in: 3, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 1, d: 3}, {in: 2, d: 3}, {in: 1, d: 2}, {in: 1, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 2, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 1, d: 1}, {in: 2, d: 0}, {in: 2, d: 1}, {in: 2, d: 0}, {in: 0, d: 0}
        ],
        [
            {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}, {in: 0, d: 0}
        ],
      ],
      sp: {
        x: 2,
        y: 3
      },
      gp : {
        x : 21,
        y : 20
      },
      op : {
        x : 0,
        y : 0
      },
      sf: 50,
      sd: {
        x: 0,
        y: 1
      },
      lb: 1111
    }
  }

const mapId = mapObj.mapId;
const gameId = mapObj.gameId;
const authorId = mapObj.authorId;
const mapName = mapObj.mapName;
const mapPoint = mapObj.mapPoint;

const mapWidth = mapObj.mapData.mw;
const mapHeight = mapObj.mapData.mh;
const startingFuel = mapObj.mapData.sf;
const originPoint = mapObj.mapData.op;
const startingPos = mapObj.mapData.sp;
const goalPos = mapObj.mapData.gp;
const startingDirection = mapObj.mapData.sd; // 상(0,-1) 하(0, 1) 좌(-1, 0) 우(1, 0)
const mapImgList = mapObj.mapData.mil;
const pointList = new Array(mapHeight + 1).fill(null).map(() => new Array(mapWidth + 1)); // 각 점의 정보와 요소 세팅
for (let y = 0; y < mapHeight + 1; y++) { // 포인트와 요소 초기화
    for (let x = 0; x < mapWidth + 1; x++) {
        pointList[y][x] = new Point(mapObj.mapData.pl[y][x].lct, x, y, mapObj.mapData.pl[y][x].et, mapObj.mapData.pl[y][x].ist);
    }
}

function setCanvasOrigin() {
    const mapCanvas = document.getElementById("mapImgCanvas");
    const mapContext = mapCanvas.getContext("2d");
    const gridCanvas = document.getElementById("gridCanvas");
    const gridContext = gridCanvas.getContext("2d");
    const carCanvas = document.getElementById("carImgCanvas");
    const carContext = carCanvas.getContext("2d");
    const elementCanvas = document.getElementById("elementImgCanvas");
    const elementContext = elementCanvas.getContext("2d");

    mapContext.translate((tileLength + lineWidth) * originPoint.x, (tileLength + lineWidth) * originPoint.y);
    gridContext.translate((tileLength + lineWidth) * originPoint.x, (tileLength + lineWidth) * originPoint.y);
    carContext.translate((tileLength + lineWidth) * originPoint.x, (tileLength + lineWidth) * originPoint.y);
    elementContext.translate((tileLength + lineWidth) * originPoint.x, (tileLength + lineWidth) * originPoint.y);
}

function resetCanvasOrigin() {
    const mapCanvas = document.getElementById("mapImgCanvas");
    const mapContext = mapCanvas.getContext("2d");
    const gridCanvas = document.getElementById("gridCanvas");
    const gridContext = gridCanvas.getContext("2d");
    const carCanvas = document.getElementById("carImgCanvas");
    const carContext = carCanvas.getContext("2d");
    const elementCanvas = document.getElementById("elementImgCanvas");
    const elementContext = elementCanvas.getContext("2d");

    mapContext.setTransform(1, 0, 0, 1, 0, 0);
    gridContext.setTransform(1, 0, 0, 1, 0, 0);
    carContext.setTransform(1, 0, 0, 1, 0, 0);
    elementContext.setTransform(1, 0, 0, 1, 0, 0);
}

function drawElement() {
    const elementCanvas = document.getElementById("elementImgCanvas");
    const elementContext = elementCanvas.getContext("2d");

    elementContext.clearRect(0, 0, elementCanvas.width, elementCanvas.height);

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            pointList[y][x].draw(elementContext, tileLength,lineWidth);
        }
    }
}

function initElementState() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (pointList[y][x].element != null) {
                pointList[y][x].element.setState(mapObj.mapData.pl[y][x].ist);
            }
        }
    }
}

function initGame() {
    resetCanvasOrigin();
    setCanvasOrigin();

    fuel = startingFuel;
    gridOn = true;

    const mapCanvas = document.getElementById("mapImgCanvas");
    const carCanvas = document.getElementById("carImgCanvas");

    initMap(mapCanvas, mapImgList, pointList); // 맵 그리기
    initCar(carCanvas, startingPos, startingDirection,tileLength,lineWidth); // 자동차 데이터 설정, 그리기
    initElementState(); // 요소 상태 초기화
    drawElement(); // 요소 그리기
    drawBlackGrid();
}

// function useElement(elementType) { // 특정 요소와 상호작용 함수
//     switch (elementType) {
//         case 3 : // 요소 타입에 따라 함수를 정의하고 실행.
//             // doSomething();
//             break;
//     }
// }

// 검은색 격자무늬를 그림
function drawBlackGrid() {
    const gridCanvas = document.getElementById("gridCanvas");
    const gridContext = gridCanvas.getContext("2d");

    gridContext.save();
    gridContext.beginPath();
    gridContext.lineWidth = lineWidth;

    for (let y = 1; y < mapHeight; y += 2) {
        gridContext.moveTo(tileLength + lineWidth + lineWidth/2, y * (tileLength + lineWidth) + lineWidth/2);
        gridContext.lineTo((tileLength + lineWidth) * (mapWidth - 1) + lineWidth/2, y * (tileLength + lineWidth) + lineWidth/2);
        gridContext.stroke();
    }

    for (let x = 1; x < mapWidth; x += 2) {
        gridContext.moveTo(x * (tileLength + lineWidth) + lineWidth/2, (tileLength + lineWidth) + lineWidth/2);
        gridContext.lineTo(x * (tileLength + lineWidth) + lineWidth/2, (tileLength + lineWidth) * (mapHeight - 1) + lineWidth/2);
        gridContext.stroke();
    }

    gridContext.closePath();
    gridContext.restore();
}

function eraseBlackGrid() {
    const gridCanvas = document.getElementById("gridCanvas");
    const gridContext = gridCanvas.getContext("2d");
    gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
}

function gridEvent() {
    gridOn = !gridOn;

    if (gridOn) {
        drawBlackGrid();
    } else {
        eraseBlackGrid();
    }
}

// 다음 포인트를 반환
function nextPos(dir) {
    return getNextPos(dir);
}

// 다음 블록이 갈 수 있는지 판단하는 함수


function checkGoal() { // 코드가 실행된 뒤 마지막에 결과를 확인하는 함수
    if (block_isCarIn(2)) { // 2 == 골인지점
        // 골인 했을 때 실행할 것
        alert("도착했습니다.");
    }
}

// 게임 오버 확인하고 블록에서 빠져나오기
function checkGameOver() {
    if (gameOver) {
        throw gameOverText;
    }
}

// 블록의 시작에 필요한 함수
function readyBeforeMove(dir) {
    // 다음 위치가 갈 수 있는 곳인지 판단
    gameOver = !block_canGoTo(dir);
    gameOverText = '갈 수 없는 곳입니다.';

    // 앞 요소에 걸리는지 판단
    const point = pointList[getCarPos().y + getCarDir().y][getCarPos().x + getCarDir().x];
    switch (point.elementType) {
        case trafLight:
            if (point.getColor() == 2) {gameOver == true;}
            gameOverText = '빨간불에는 건널 수 없습니다.'
            break;
    }
}

// 블록의 끝에 필요한 함수
function setBeforeMove() {
    // 게임오버 조건 확인 (연료 체크)
    if (fuel == 0) {gameOver = true;}
    gameOverText = '연료가 바닥났습니다.';
    checkGameOver();

    // 맵 요소 상태 변경
    for (let y = 0; y < mapHeight + 1; y++) {
        for (let x = 0; x < mapWidth + 1; x++) {
            if (pointList[y][x].elelment != null) {
                pointList[y][x].elelment.nextState();
            }
        }
    }
    drawElement();
}

function action(dir) {
    const carCanvas = document.getElementById("carImgCanvas")
    readyBeforeMove(dir);
    moveCar(carCanvas, dir, speed, tileLength, lineWidth, gameOver)
    checkGameOver();
    setBeforeMove();
}

function block_forward() {
    action(forward);
}

function block_leftForward() {
    action(leftForward);
}

function block_rightForward() {
    action(rightForward);
}

function block_backward() {
    action(backward);
}

function block_leftBackward() {
    action(leftBackward);
}

function block_rightBackward() {
    action(rightBackward);
}

function block_stay() {
    action(stay);
}

function block_frontOfCar(elementType) { // 인자에 해당하는 요소가 앞에 있다면 true 없다면 false
    if (elementType == mapPoint[getCarPos().y + getCarDir().y][getCarPos().x + getCarDir().x].elementType) {
        return true;
    }
    return false;
}

function block_canGoTo(dir) {
    const next = nextPos(dir);
    const result = pointList[next.y][next.x].isLocatable;

    return result;
}

function block_getFuel() { // 정수형 반환
    return fuel;
}

function block_isCarIn(elementType) {
    if (pointList[getCarPos().y][getCarPos().x].elementType == elementType) {
        return true;
    } else {
        return false;
    }
}

function block_directionForward() {
    return forward;
}

function block_directionLeftForword() {
    return leftForward;
}

function block_directionRightForword() {
    return rightForward;
}

function block_directionBackword() {
    return backward;
}

function block_directionLeftbackward() {
    return leftBackward;
}

function block_directionRightBackword() {
    return rightBackward;
}

function block_directionStay() {
    return stay;
}

function block_startingPoint() {
    return startingPoint;
}

function block_goalPoint() {
    return goalPoint;
}

function block_trafficLight() {
    return trafLight;
}