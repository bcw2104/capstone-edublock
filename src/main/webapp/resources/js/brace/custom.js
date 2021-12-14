var wSize = 10;
var hSize = 10;
var canvasSize = 10;
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
	$(".map-hover").each(function(){
		$(this).removeClass("map-hover");
	})
	target.addClass("map-hover");
	cursor = target.attr("id");
}

function drop(ev) {
	ev.preventDefault();

	$(".map-hover").each(function(){
		$(this).removeClass("map-hover");
	})

	var blockId = parseInt(ev.dataTransfer.getData("blockId").substring(4));
	var source = ev.dataTransfer.getData("src");
	var check = 0;
	var index = parseInt(ev.target.id.substring(3));
	var type = ev.dataTransfer.getData("type");

	if (type == "drag") {	//작업 도구-> 작업 공간 이동
		if (ev.target.id.indexOf('map') == 0) {
			check = putBlock(index, blockId, wSize);
			if (check == 1) {
				$(ev.target).append('<img class="dragged-map" style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
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
			var param=0;
			if(blockId < 5){
				param = 5;
				if(blockId == 3){
					param = 1;
				}
				else if(blockId == 4){
					param = 3;
				}
				else if(blockId == 5){
					param = 5;
				}
				blockId = 3;
			}
			else if(blockId == 6){
				param = 5;
				blockId = 4;
			}
			else if(blockId <= 9){
				if(blockId == 7){
					param = 0;
				}
				else if(blockId == 8){
					param = 1;
				}
				else if(blockId == 9){
					param = 2;
				}
				blockId = 5;
			}

			if(addElement(index, blockId, param,wSize)){
				$("#"+parentId).empty();
				$(ev.target).append('<img class="dragged-element" style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
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
			deleteBlock(pIndex, wSize);
			check = putBlock(index, blockId, wSize);
			if (check == 1) {
				$("#"+parentId).empty();
				$(ev.target).append('<img class="dragged-map" style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
			}
			else {
				putBlock(pIndex, blockId, wSize);
				alert("길이 연결되지 않습니다");
			}
		}
		else if(ev.target.id.indexOf('ele') == 0){
			var param=0;
			if(blockId < 5){
				param = 5;
				if(blockId == 3){
					param = 1;
				}
				else if(blockId == 4){
					param = 3;
				}
				else if(blockId == 5){
					param = 5;
				}
				blockId = 3;
			}
			else if(blockId == 6){
				param = 5;
				blockId = 4;
			}
			else if(blockId <= 9){
				if(blockId == 7){
					param = 0;
				}
				else if(blockId == 8){
					param = 1;
				}
				else if(blockId == 9){
					param = 2;
				}
				blockId = 5;
			}
			if(addElement(index, blockId, param,wSize)){
				$("#"+parentId).empty();
				deleteElement(pIndex, wSize);
				$(ev.target).append('<img class="dragged-element" style="width:100%" alt="drag' + blockId + '" src="' + source + '" ondragstart="move(event)">');
			}
			else{
				alert("놓을 수 없는 자리입니다.");
			}
		}
		else if(ev.target.id.indexOf('trash')== 0){
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
	var thumbnailCanvas = document.getElementById("thumbnailCanvas");

	drawThumbnail(parseInt(getCookie("mid"))-1);

	var thumbnail = thumbnailCanvas.toDataURL("image/png");

	clearCanvas();

	$("#temp").css('background-image', 'url("'+thumbnail+'")');

	$("#temp").toggleClass("d-none");
	html2canvas(document.querySelector("#temp")).then(canvas => {
	    thumbnail = canvas.toDataURL("image/png", 0.5);
		var blobBin = atob(thumbnail.split(',')[1]);	// base64 데이터 디코딩
	    var array = [];
	    for (var i = 0; i < blobBin.length; i++) {
	        array.push(blobBin.charCodeAt(i));
	    }
	    var file = new Blob([new Uint8Array(array)], {type: 'image/png'});
		var formdata = new FormData();
    	formdata.append("gameId", gid);
		formdata.append("mapName", mapName);
		formdata.append("mapData", mapData);
		formdata.append("mapPoint", mapPoint);
		formdata.append("thumbnailData", file);

		$.ajax({
			url : "/custom/create/save.do",
			type:"post",
			enctype: "multipart/form-data",
			data : formdata,
			processData : false,	// data 파라미터 강제 string 변환 방지
    		contentType : false,
			success:function(res){
				if(res == "success"){
					alert("맵이 성공적으로 제작되었습니다.");
				}
			}
		});

		$("#temp").toggleClass("d-none");
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
		$(".element-board").append("<div id='ele" + i + "' class='custom-item' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + canvasSize + "%;height:" + canvasSize + "%'></div>")
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

function initElememt(){
	for (i = 3; i <= 9; i++) {
		$("#element").append('<li class = "ele-item"><img alt="drag' + i + '" src="/resources/images/brace/elements/element1/index' + i + '.png" ondragstart="drag(event)"></li>')
	}
}

function initMapElements(idx) {
	var i = 1;
	for (; i <= 4; i++) {
		$("#start").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map'+idx+'/index' + i + '.png" ondragstart="drag(event)"></li>')
	}
	for (; i <= 8; i++) {
		$("#dest").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map'+idx+'/index' + i + '.png" ondragstart="drag(event)"></li>')
	}
	for (; i <= mapEleCnt; i++) {
		$("#road").append('<li class = "map-ele-item"><img alt="drag' + i + '" src="/resources/images/brace/maps/map'+idx+'/index' +  i + '.png" ondragstart="drag(event)"></li>')
	}
	disableStep2();
}

function changeMapElement(idx){
	$(".map-ele-item").each(function(){
		var blockId = parseInt($(this).find("img").attr("alt").substring(4));
		$(this).find("img").attr("src","/resources/images/brace/maps/map"+idx+"/index"+ blockId + ".png");
	});

	$(".dragged-map").each(function(){
		var blockId = parseInt($(this).attr("alt").substring(4));
		$(this).attr("src","/resources/images/brace/maps/map"+idx+"/index"+ blockId + ".png");
	});
}

function setCookie(name, value) {
	var date = new Date();
	date.setTime(date.getTime() + 24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : 1;
}

var deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
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
	initElememt();
	initMapElements(parseInt(getCookie("mid")));

	$(".map-option-item").click(function(){
		var idx = $(this).attr("id").substring(3);
		changeMapElement(idx);
		deleteCookie("mid");
		setCookie("mid", idx);
	});
});
