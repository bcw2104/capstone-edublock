var wSize = 10;
var hSize = 10;

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	ev.dataTransfer.effectAllowed = "copy";
}

function dragOver(ev) {
	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	if (ev.dataTransfer.effectAllowed == "copy") {
		var source = document.getElementById(data)
		ev.target.style.backgroundImage = "url('" + source.src + "')";
	}
}

function reset() {
	$(".map-board").empty();
	createBoard(wSize, hSize);
}

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

function createBoard(w, h) {
	var size = (Number(w) > Number(h) ? 100 / w : 100 / h);
	for (var i = 1; i <= w * h; i++) {
		$(".map-board").append("<div id='ele" + i + "' class='guide-line' ondrop='drop(event)' ondragover='dragOver(event)' style='width:" + size + "%;height:" + size + "%'></div>")
	}
}

function setConfig() {
	if (wSize != $("#wSize").val() || hSize != $("#hSize").val()) {
		wSize = $("#wSize").val();
		hSize = $("#hSize").val();

		$(".map-board").empty();
		createBoard(wSize, hSize);
	}
	var limit = $("#limit").val();
}


$(document).ready(function() {
	createOption($("#wSize"),12);
	createOption($("#hSize"),12);
	createOption($("#limit"),12);
	createBoard(wSize, hSize);
});
