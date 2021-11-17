<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" type="text/css" href="/resources/css/brace/style.css">
<link rel="stylesheet" href="/resources/css/brace/canvas.css">

<script src="/resources/js/blockly/blockly_compressed.js"></script>
<script src="/resources/js/blockly/blocks_compressed.js"></script>
<script src="/resources/js/blockly/javascript_compressed.js"></script>
<script src="/resources/js/blockly/acorn_interpreter.js"></script>

<script src="/resources/js/brace/myblock.js"></script>
<script src="/resources/js/brace/myblock_gen.js"></script>
<script src="/resources/js/brace/ko.js"></script>

<xml id="toolbox" style="display: none">
    <block type="start"></block>
    <block type="go"></block>
    <block type="left"></block>
    <block type="right"></block>
    <block type="repeat"></block>
</xml>


<div class="game-container">
	<div class="game-header row m-0 justify-content-between">
		<div class="mb-5">
			<div class="map-title">
				<span class="font-18 font-weight-bold">${requestScope.gameInfo.mapName}</span>
				<img id="passMark" class="pass ${requestScope.clear ? '' : 'd-none'}" src="/resources/images/icon_pass.png" alt="pass"/>
			</div>
			<c:if test="${requestScope.gameInfo.formal == 0}">
			<span class="font-15 text-secondary">${requestScope.gameInfo.authorId}</span>
			<span class="font-15 text-secondary"><fmt:formatDate value="${requestScope.gameInfo.regDate}" pattern="yyyy-MM-dd"/></span>
			</c:if>
		</div>
		<a href="/game/${requestScope.gameType.gameName}"><button class="btn btn-primary">목록으로</button></a>
	</div>
	<div class="row m-0">
		<div class="map-container mr-4">
			<canvas id="mapImgCanvas" class="canvas" width="1123" height="1123"></canvas>
	        <canvas id="gridCanvas" class="canvas" width="1123" height="1123"></canvas>
	        <canvas id="carImgCanvas" class="canvas" width="1123" height="1123"></canvas>
	        <canvas id="elementImgCanvas" class="canvas" width="1123" height="1123">이 브라우저를 지원하지 않습니다.</canvas>
		</div>
		<div id="blocklyDiv" class="block-nav">
			<div class="block-board-header text-white p-2">
				<div class="block-gen">블록 생성기</div>
				<div class="block-ass">블록 조립판</div>
				<div class="float-right mr-3">남은 블록 : <span id="blockLimitCnt"></span></div>
			</div>
		</div>
	</div>
</div>
<div class="btn-container">
	<div class="btn-group">
		<button class="btn btn-success" onclick="">확대</button>
		<button class="btn btn-success" onclick="">축소</button>
		<button class="btn btn-success" onclick="gridEvent()">격자무늬</button>
		<button class="btn btn-success" onclick="initCar()">초기화</button>
	</div>
	<button class="btn btn-primary" onclick="runWorkspace()">시작</button>
</div>

<script>
	const mapObj = JSON.parse(${requestScope.gameInfo.mapData});
	var limitBlock = mapObj.lb;
	$("#blockLimitCnt").text(limitBlock);

	var workspace = Blockly.inject('blocklyDiv',
	    { toolbox: document.getElementById('toolbox'),
			grid: {spacing: 20,
		          length: 3,
		          colour: '#ccc',
		          snap: true},
	     	trashcan: true,
	     	maxBlocks : mapObj.lb
		});

	function blockChange(event) {

		if (event.type == Blockly.Events.BLOCK_CREATE) {
			limitBlock-=event.ids.length;
	  	}
		else if (event.type == Blockly.Events.BLOCK_DELETE) {
			limitBlock+=event.ids.length;
	  	}
		$("#blockLimitCnt").text(limitBlock);
	}

	workspace.addChangeListener(Blockly.Events.disableOrphans);
	workspace.addChangeListener(blockChange);

	const generateCode = () => {
	    // 무한루프 방지 설정
	    window.LoopTrap = 1000;
	    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";';
	    var code = "(async function start(){" + Blockly.JavaScript.workspaceToCode(workspace) +"})();";
	    // 무한루프 방지 해제
	    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	    return code;
	}
	const runWorkspace = async () => {
	    var code = generateCode();
	    //console.log(code);
	    try {
	        console.log('Now running...');
	        await eval(code);

	        console.log('Done.');
	    } catch (e) {
	        alert(e);
	    } finally {
	        checkGoal();
	    }
	}
</script>
<script src="/resources/js/brace/game.js"></script>
