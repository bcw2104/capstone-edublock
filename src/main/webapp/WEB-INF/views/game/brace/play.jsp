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
    <block type="if"></block>
    <block type="stay"></block>
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
		<div class="header-options row m-0">
			<div class="dropdown mr-1">
				<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">맵 테마</button>
				<div class="dropdown-menu map-option">
					<img id="map1" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map1/index13.png">
					<img id="map2" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map2/index13.png">
					<img id="map3" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map3/index13.png">
					<img id="map4" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map4/index13.png">
				</div>
			</div>
			<a href="/game/${requestScope.gameType.gameName}"><button class="btn btn-primary">목록으로</button></a>
		</div>
	</div>
	<div class="row m-0">
		<div class="map-container mr-4">
			<canvas id="mapImgCanvas" class="canvas" width="1125" height="1125"></canvas>
	        <canvas id="gridCanvas" class="canvas" width="1125" height="1125"></canvas>
	        <canvas id="carImgCanvas" class="canvas" width="1125" height="1125"></canvas>
	        <canvas id="elementImgCanvas" class="canvas" width="1125" height="1125">이 브라우저를 지원하지 않습니다.</canvas>
	        <div class="btn-container">
				<div class="btn-group w-100">
					<button class="btn btn-success" onclick="gridEvent()">격자무늬</button>
					<button id="resetBtn" class="btn btn-success" onclick="resetGame()">초기화</button>
					<select id="speed" class="form-control btn btn-success">
						<option value="1">진행 속도</option>
						<option value="0.5">x0.5</option>
						<option value="0.75">x0.75</option>
						<option value="1">x1</option>
						<option value="1.25">x1.25</option>
						<option value="1.5">x1.5</option>
						<option value="1.75">x1.75</option>
						<option value="2">x2</option>
						<option value="3">x3</option>
					</select>
				</div>
				<button id="startBtn" class="btn btn-primary w-100 font-20" onclick="runWorkspace()">시작</button>
			</div>
	        <div class="map-help p-3">
        		<div class="map-aim mb-2 p-2">
	            	<div class="map-aim-title mr-2">목표</div>
	            	<span class="map-aim-content">자동차를 목적지까지 이동시켜주세요!</span>
	            </div>
	            <div class="py-2">
					<button class="btn btn-hint"><img src="/resources/images/icon_hint.png" alt="hint" /><span>힌트 보기</span></button>
	            </div>
	        </div>
		</div>
		<div id="blocklyDiv" class="block-nav">
			<div class="block-board-header text-white p-2">
				<div class="block-gen">블록 생성기</div>
				<div class="block-ass">블록 조립판</div>
				<div class="float-right mr-3">남은 연료 : <span id="fuelCnt"></span></div>
				<div class="float-right mr-3">남은 블록 : <span id="blockLimitCnt"></span></div>
			</div>
		</div>
	</div>
</div>

<script>
	const mapObj = ${requestScope.gameInfo.mapData};
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
			console.log(event.blockId);
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
		$("#startBtn").attr("disabled","disabled");
		$("#resetBtn").attr("disabled","disabled");
		runningSound.play();
	    var code = generateCode();
	    try {
	        await eval(code);
	    } catch (e) {
	        alert(e);
	    } finally {
	    	runningSound.pause();
	        checkGoal();
	        $("#startBtn").removeAttr("disabled");
	        $("#resetBtn").removeAttr("disabled");
	    }
	}
</script>
<script src="/resources/js/brace/game.js"></script>
