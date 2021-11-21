<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/brace/custom.css">
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script src="/resources/js/brace/custom.js"></script>

<div class="container board-wrap" >
	<div class="mb-5 board-title font-32 font-weight-bold">만들기</div>
	<div class="setting">
		<div class="setting-title text-white p-2">맵 설정</div>
		<div class="row m-0 setting-form">
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
	</div>
	<div class="custom-wrap row mx-0 my-3">
		<div class="map-nav">
			<div class="map-nav-title text-white p-2">작업 도구</div>
			<div class="map-ele-list">
				<button type="button" class="btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#start">출발지</button>
				<ul id="start" class="p-0 collapse"> </ul>
				<button type="button" class="btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#dest">도착지</button>
				<ul id="dest" class="p-0 collapse"> </ul>
				<button type="button" class="btn w-100 dropdown-toggle" data-toggle="collapse" data-target="#road">도로</button>
				<ul id="road"class="p-0 collapse"> </ul>
			</div>
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
