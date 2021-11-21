var wSize = 10;
var hSize = 10;
var canvasSize = 10;
var cursor = null;
var limit = 20;
var fuel = 50;
var mapEleCnt = 23;

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	ev.dataTransfer.effectAllowed = "copy";
}

function dragOver(ev) {
	var target = $(ev.path[0]);
	if(cursor != null && cursor != target.attr("id")){
		$("#"+cursor).removeClass("map-hover");
	}

	$(ev.path[0]).addClass("map-hover");
	cursor = target.attr("id");

	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();

	$("#"+cursor).removeClass("map-hover");
	cursor = null;

	var data = ev.dataTransfer.getData("text");
	if (ev.dataTransfer.effectAllowed == "copy") {
		var source = document.getElementById(data)
		ev.target.style.backgroundImage = "url('" + source.src + "')";
	}
}

function reset() {
	var ans = confirm("정말 초기화하시겠습니까?");
	if(ans){
		$(".map-board").empty();
		$(".element-board").empty();
		createMapBoard();
	}
}

//저장 - 서버에 전송
function save() {
	$(".map-board").find("div").each(function() {
		$(this).removeClass("guide-line");
	});

	html2canvas(document.querySelector("div.map-board")).then(canvas => {
		$(".map-thumbnail").append(canvas);
	});

	$(".map-board").find("div").each(function() {
		$(this).addClass("guide-line");
	});
}

function createOption(target, max) {
	for (var i = 1; i <= max; i++) {
		target.append("<option value='"+i+"'>"+i+"</option>");
	}
}

function createMapBoard() {
	for (var i = 1; i <= wSize * hSize; i++) {
		$(".map-board").append("<div id='map" + i + "' class='guide-line' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + canvasSize + "%;height:" + canvasSize + "%'></div>")
	}
}

function createElementBoard() {
	$(".map-board").after('<div class="element-board"></div>');

	for (var i = 1; i <= wSize * hSize; i++) {
		$(".element-board").append("<div id='ele" + i + "' class='element-item' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + canvasSize + "%;height:" + canvasSize + "%'></div>")
	}
}

// 부가 요소 설정
function setConfig() {
	if (wSize != $("#wSize").val() || hSize != $("#hSize").val()) {
		wSize = $("#wSize").val();
		hSize = $("#hSize").val();
		canvasSize = (Number(wSize) > Number(hSize) ? 100 / wSize : 100 / hSize);

		$(".map-board").empty();
		createMapBoard();
	}
	limit = $("#limit").val();
	fuel = $("#fuel").val();
}

function enableStep1(){
	$(".step1").removeAttr("disabled");
}
function disableStep1(){
	$(".step1").attr("disabled","disabled").remove;
	$(".step1-list").removeClass("show");
}

function enableStep2(){
	$(".step2").removeAttr("disabled");
}
function disableStep2(){
	$(".step2").attr("disabled","disabled");
	$(".step2-list").removeClass("show");
}

function enableResize(){
	$("#wSize").removeAttr("disabled");
	$("#hSize").removeAttr("disabled");
}

function disableResize(){
	$("#wSize").attr("disabled","disabled");
	$("#hSize").attr("disabled","disabled");
}

//이전 단계로 이동 (맵 설정)
function prev() {
	var ans = confirm("이전 단계로 이동시 2단계 설정이 초기화됩니다. 정말 이동하시겠습니까?");
	if(ans){
		$(".element-board").remove();
		enableResize();
		enableStep1();
		disableStep2();
		$("#progressBtn").attr("onclick","next()").text("다음");
	}
}

//다음 단계로 이동 (요소 설정)
function next() {
	createElementBoard();
	disableResize();
	enableStep2();
	disableStep1();
	$("#progressBtn").attr("onclick","prev()").text("이전");
}

function initMapElements(){
	var i=1;
	for(; i<=4; i++){
		$("#start").append('<li class = "map-ele-item"><img id="drag'+i+'" src="/resources/images/brace/maps/map1/index'+i+'.jpg" ondragstart="drag(event)"></li>')
	}
	for(; i<=8; i++){
		$("#dest").append('<li class = "map-ele-item"><img id="drag'+i+'" src="/resources/images/brace/maps/map1/index'+i+'.jpg" ondragstart="drag(event)"></li>')
	}
	for(; i<=mapEleCnt; i++){
		$("#road").append('<li class = "map-ele-item"><img id="drag'+i+'" src="/resources/images/brace/maps/map1/index'+i+'.jpg" ondragstart="drag(event)"></li>')
	}

	disableStep2();
}


$(document).ready(function() {
	createOption($("#wSize"),10);
	createOption($("#hSize"),10);
	createOption($("#limit"),50);
	createMapBoard();

	$("body").mousemove(function( ) {
		if(cursor != null){
			$("#"+cursor).removeClass("map-hover");
			cursor = null;
		}
	});

	initMapElements();
});
