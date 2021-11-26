var wSize = 10;
var hSize = 10;
var canvasSize = 10;
var cursor = null;
var gid;
var mapEleCnt = 23;
var dragged;

function drag(ev) {
	ev.dataTransfer.setData("src", $(ev.target).attr("src"));
	ev.dataTransfer.setData("blockId", $(ev.target).attr("alt"));
	ev.dataTransfer.setData("type", "drag");
}

function move(ev) {
	ev.dataTransfer.setData("parentId", $(ev.target).parent().attr("id"));
	ev.dataTransfer.setData("src", $(ev.target).attr("src"));
	ev.dataTransfer.setData("blockId", $(ev.target).attr("alt"));
	ev.dataTransfer.setData("type", "move");
}

function dragOver(ev) {
	ev.preventDefault();

	var target = $(ev.path[0]);
	if (cursor != null && cursor != target.attr("id")) {
		$("#" + cursor).removeClass("map-hover");
	}

	target.addClass("map-hover");
	cursor = target.attr("id");
}

function drop(ev) {
	ev.preventDefault();

	$("#" + cursor).removeClass("map-hover");
	cursor = null;

	var blockId = parseInt(ev.dataTransfer.getData("blockId").substring(4));
	var source = ev.dataTransfer.getData("src");
	var check = 0;
	var index = parseInt(ev.target.id.substring(3));
	var type = ev.dataTransfer.getData("type");

	if (type == "drag") {	//작업 도구-> 작업 공간 이동
		if (ev.target.id.indexOf('map') == 0) {
			check = putBlock(index, blockId, wSize);
			if (check == 1) {
				$(ev.target).append('<img style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
				if(blockId <=4){
					$("#startEleBtn").attr("disabled", "disabled");
					$("#start").removeClass("show");
				}
				else if(blockId <=8){
					$("#endEleBtn").attr("disabled", "disabled").removeClass("show");
					$("#dest").removeClass("show");
				}
			}
			else {
				alert("길이 연결되지 않습니다");
			}
		}
		else if(ev.target.id.indexOf('ele') == 0){
			if(addElement(index, blockId, 5,wSize)){
				$("#"+parentId).empty();
				$(ev.target).append('<img style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
			}
			else{
				alert("놓을 수 없는 자리입니다.");
			}
		}
	}
	else if (type == "move") {
		var parentId = ev.dataTransfer.getData("parentId");
		var pIndex = parseInt(parentId.substring(3));

		if(ev.target.id.indexOf('map') == 0){
			check = putBlock(index, blockId, wSize);
			if (check == 1) {
				$("#"+parentId).empty();
				$(ev.target).append('<img style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
				deleteBlock(pIndex, wSize);
			}
			else {
				alert("길이 연결되지 않습니다");
			}
		}
		else if(ev.target.id.indexOf('ele') == 0){
			if(addElement(index, blockId, 5,wSize)){
				$("#"+parentId).empty();
				$(ev.target).append('<img style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
			}
			else{
				alert("놓을 수 없는 자리입니다.");
			}
		}
		else{
			$("#"+parentId).empty();

			if(parentId.indexOf('map') == 0 ){
				deleteBlock(pIndex, wSize);
				if(pIndex <=4){
					$("#startEleBtn").removeAttr("disabled");
				}
				else if(blockId <=8){
					$("#endEleBtn").removeAttr("disabled");
				}
			}
			else if(parentId.indexOf('ele') == 0 ){
				deleteElement(pIndex, wSize);
			}
		}
	}

}

function reset() {
	var ans = confirm("정말 초기화하시겠습니까?");
	if (ans) {
		$(".map-board").empty();
		$(".element-board").empty();
		initNewMap();
		initPoints();
		initImgs();
		initBoxes(wSize,hSize);
		createMapBoard();

		enableResize();
		enableStep1();
		disableStep2();
		$("#progressBtn").attr("onclick", "next()").text("다음");
	}
}

//저장 - 서버에 전송
function save() {
	/*
	$(".map-board").find("div").each(function() {
		$(this).removeClass("guide-line");
	});

	html2canvas(document.querySelector("div.map-board")).then(canvas => {
		$(".map-thumbnail").append(canvas);
	});

	$(".map-board").find("div").each(function() {
		$(this).addClass("guide-line");
	});
	*/

	var limit = $("#limit").val();
	var fuel = 20;
	var mapPoint = $("#score").val();
	var mapName;


	if($("#mapName").val().length == 0){
		alert("맵에 이름을 지어주세요.");
		return;
	}
	mapName = $("#mapName").val();

	fuel = isNaN(parseInt($("#fuel").val())) ? fuel : parseInt($("#fuel").val());

	setLimitElement(limit,fuel);
	var mapData = createMap();

	var queryString = {gameId:gid,mapName:mapName, mapData:mapData, mapPoint : mapPoint};

	$.ajax({
		url : "/custom/create/save.do",
		type:"post",
		data : queryString,
		success:function(res){
			if(res == "success"){
				alert("맵이 성공적으로 제작되었습니다.");
			}
		}
	});
}

function createOption(target, max, start, add) {
	for (var i = start; i <= max; i += add) {
		target.append("<option value='" + i + "'>" +  i + "</option>");
	}
}

function createMapBoard() {
	for (var i = 1; i <= wSize * hSize; i++) {
		$(".map-board").append("<div id='map" + i + "' class='custom-item guide-line' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + canvasSize + "%;height:" + canvasSize + "%'></div>")
	}
}

function createElementBoard() {
	$(".map-board").after('<div class="element-board"></div>');

	for (var i = 1; i <= wSize * hSize; i++) {
		$(".element-board").append("<div id='ele" + i + "' class='custom-item guide-line' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + canvasSize + "%;height:" + canvasSize + "%'></div>")
	}
}

// 부가 요소 설정
function setConfig() {
	if (wSize != $("#wSize").val() || hSize != $("#hSize").val()) {
		wSize = parseInt($("#wSize").val());
		hSize = parseInt($("#hSize").val());
		canvasSize = (wSize > hSize ? 100 / wSize : 100 / hSize);

		$(".map-board").empty();
		createMapBoard();

		enableResize();
		enableStep1();
		disableStep2();

		initNewMap();
		initPoints();
		initImgs();
		initBoxes(wSize, hSize);
	}
}

function enableStep1() {
	$(".step1").removeAttr("disabled");
}
function disableStep1() {
	$(".step1").attr("disabled", "disabled");
	$(".step1-list").removeClass("show");
}

function enableStep2() {
	$(".step2").removeAttr("disabled");
}
function disableStep2() {
	$(".step2").attr("disabled", "disabled");
	$(".step2-list").removeClass("show");
}

function enableResize() {
	$("#wSize").removeAttr("disabled");
	$("#hSize").removeAttr("disabled");
}

function disableResize() {
	$("#wSize").attr("disabled", "disabled");
	$("#hSize").attr("disabled", "disabled");
}

//이전 단계로 이동 (맵 설정)
function prev() {
	var ans = confirm("이전 단계로 이동시 2단계 설정이 초기화됩니다. 정말 이동하시겠습니까?");
	if (ans) {
		$(".element-board").remove();
		enableResize();
		enableStep1();
		disableStep2();

		initNewMap();
		initPoints();
		initImgs();
		$("#progressBtn").attr("onclick", "next()").text("다음");
		$("#saveBtn").remove();
	}
}

//다음 단계로 이동 (요소 설정)
function next() {
	if(boxValidation(wSize,hSize)){
		createElementBoard();
		disableResize();
		enableStep2();
		disableStep1();
		$("#progressBtn").attr("onclick", "prev()").text("이전");
		$("#progressBtnGroup").append('<button id="saveBtn" class="btn btn-primary" onclick="save()">저장</button>');
		try{
			mapEncoding(wSize,hSize);
		}
		catch(e){
			console.log(e);
		}
	}
	else{
		alert("맵을 완성해주세요.");
	}
}

function initMapElements() {
	var i = 1;
	for (; i <= 4; i++) {
		$("#start").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map1/index' + i + '.png" ondragstart="drag(event)"></li>')
	}
	for (; i <= 8; i++) {
		$("#dest").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map1/index' + i +   '.png" ondragstart="drag(event)"></li>')
	}
	for (; i <= mapEleCnt; i++) {
		$("#road").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map1/index' +  i + '.png" ondragstart="drag(event)"></li>')
	}

	for (i = 1; i <= 4; i++) {
		$("#element").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/elements/element1/index' + i + '.png" ondragstart="drag(event)"></li>')
	}
	disableStep2();
}


$(document).ready(function() {
	gid = $("#gId").text();

	createOption($("#wSize"), 10, 3, 1);
	createOption($("#hSize"), 10, 3, 1);
	createOption($("#limit"), 50, 5, 1);
	createOption($("#score"), 30, 5, 5);
	createMapBoard();

	initNewMap();
	initPoints();
	initBoxes(wSize, hSize);
	initMapElements();

	$("body").mousemove(function() {
		if (cursor != null) {
			$("#" + cursor).removeClass("map-hover");
			cursor = null;
		}
	});
});
