<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/game/style.css">

<div class="container board-wrap">
	<div class="mb-5 board-title font-32 font-weight-bold">맵 선택하기</div>
	<div class="row m-0">
		<c:forEach items="${requestScope.mapList}" var="n" >
		<div class="map-item mb-5">
			<div class="card" onclick="location.href='/game/${requestScope.gameType.gameName}/${n.mapId}'">
				<img class="card-img-top" src="/resources/images/game/thumbnail/${n.mapId}/thumbnail.png" style="width:100%" />
				<div class="card-body">
					<div class="card-text font-weight-bold my-1">${n.mapName}</div>
					<div class="card-text">점수 : ${n.mapPoint}</div>
				</div>
			</div>
		</div>
		</c:forEach>
	</div>
</div>