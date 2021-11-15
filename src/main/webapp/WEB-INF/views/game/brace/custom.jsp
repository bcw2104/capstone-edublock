<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/brace/custom.css">
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script src="/resources/js/brace/custom.js"></script>

<div class="container board-wrap my-5" >
	<div class="mb-5 board-title font-32 font-weight-bold">만들기</div>
	<div class="setting row m-0">
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
				<option value="1">사용 가능 블록</option>
			</select>
		</div>
		<button class="btn btn-primary" onclick="setConfig()">적용</button>
	</div>
	<div class="custom-wrap row mx-0 my-5">
		<div class="mr-5">
			<div class="map-nav-title text-white p-2">작업 도구</div>
			<ul class="map-ele-list">
			    <li class = "map-ele-item"><img id="drag1" src="/resources/images/brace/map/road_1_1.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag2" src="/resources/images/brace/map/road_1_2.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag3" src="/resources/images/brace/map/road_2_1.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag4" src="/resources/images/brace/map/road_2_2.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag5" src="/resources/images/brace/map/road_2_3.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag6" src="/resources/images/brace/map/road_2_4.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag7" src="/resources/images/brace/map/road_3_1.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag8" src="/resources/images/brace/map/road_3_2.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag9" src="/resources/images/brace/map/road_3_3.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag10" src="/resources/images/brace/map/road_3_4.png" draggable="true" ondragstart="drag(event)"></li>
			    <li class = "map-ele-item"><img id="drag11" src="/resources/images/brace/map/road_4.png" draggable="true" ondragstart="drag(event)"></li>
			</ul>
		</div>
		<div class="map-custom-box">
			<div class="map-nav-title text-white p-2">작업 공간</div>
		    <div class="map-board"></div>
			<div class="text-right mt-5">
			    <button class="btn btn-primary" onclick="reset()">초기화</button>
			    <button class="btn btn-primary" onclick="save()">저장</button>
				</div>
			</div>
		</div>
	</div>
	<div class="map-thumbnail"></div>
