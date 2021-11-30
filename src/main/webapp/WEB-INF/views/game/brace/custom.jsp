<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/brace/custom.css">
<link rel="stylesheet" href="/resources/css/brace/canvas.css">
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script src="/resources/js/brace/custom_logic.js"></script>
<script src="/resources/js/brace/draw.js"></script>
<script src="/resources/js/brace/custom.js"></script>

<div class="container board-wrap" >
	<div class="row m-0 justify-content-between">
		<div class="mb-5 board-title font-32 font-weight-bold">만들기</div>
		<div class="dropdown mr-1">
			<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">맵 테마</button>
			<div class="dropdown-menu map-option">
				<img id="map1" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map1/index13.png">
				<img id="map2" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map2/index13.png">
				<img id="map3" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map3/index13.png">
				<img id="map4" class="map-option-item dropdown-item" src="/resources/images/brace/maps/map4/index13.png">
			</div>
		</div>
	</div>
	<div id="gId" class="d-none">${gameType.gameId}</div>
	<div class="setting">
		<div class="setting-title text-white p-2">맵 설정</div>
		<div class="row m-0 setting-form">
			<div class="mr-2">
				<input type="text" id="mapName" class="form-control" placeholder="맵 이름"/>
			</div>
			<div class="mr-2">
				<select id="wSize" class="form-control">
					<option value="10">가로</option>
				</select>
			</div>
			<div class="mr-2">
				<select id="hSize" class="form-control">
					<option value="10">세로</option>
				</select>
			</div>
			<div class="mr-2">
				<select id="limit" class="form-control">
					<option value="20">사용 가능 블록</option>
				</select>
			</div>
			<div class="mr-2">
				<select id="score" class="form-control">
					<option value="5">점수</option>
				</select>
			</div>
			<div class="mr-2">
				<input type="number" id="fuel" style="width:120px;" class="form-control" placeholder="제한 연료"/>
			</div>
			<button class="btn btn-primary" onclick="setConfig()">적용</button>
		</div>
	</div>
	<div class="custom-wrap row mx-0 my-3">
		<div class="map-nav">
			<div class="map-nav-title text-white p-2">작업 도구</div>
			<div class="map-ele-list">
				<button id="startEleBtn" type="button" class="step1 btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#start">출발지</button>
				<ul id="start" class="step1-list p-0 collapse show"> </ul>
				<button id="endEleBtn" type="button" class="step1 btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#dest">도착지</button>
				<ul id="dest" class="step1-list p-0 collapse"> </ul>
				<button type="button" class="step1 btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#road">도로</button>
				<ul id="road"class="step1-list p-0 collapse"> </ul>
				<button type="button" class="step2 btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#element">장애물</button>
				<ul id="element"class="step2-list p-0 collapse"> </ul>
				<div class="tool-wrap">
					<img id="trash" class ="trash" src = "/resources/images/brace/trash1.png" onmouseover="this.src = '/resources/images/brace/trash2.png'" onmouseout="this.src = '/resources/images/brace/trash1.png'" ondragover="dragOver(event)" ondrop="drop(event)"></img>
				</div>
			</div>
		</div>
		<div class="map-custom-box">
			<div class="map-nav-title text-white p-2">작업 공간</div>
			<div class="custom-board">
			    <div class="map-board"></div>
		    </div>
			<div id="progressBtnGroup" class="text-right mt-5">
			    <button class="btn btn-primary" onclick="reset()">초기화</button>
			    <button id="progressBtn" class="btn btn-primary" onclick="next()">다음</button>
			</div>
		</div>
	</div>
	<div class="map-thumbnail">
		<canvas id="thumbnailCanvas" class="canvas" width="1125" height="1125"></canvas>
	</div>
	<div id="temp" class="d-none"></div>
</div>