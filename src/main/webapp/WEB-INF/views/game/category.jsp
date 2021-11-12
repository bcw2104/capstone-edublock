<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/game/style.css">

<div class="container board-wrap">
	<div class="mb-5 board-title font-32 font-weight-bold">단계별 학습하기</div>
	<div class="row m-0">
		<c:forEach items="${requestScope.gameType}" var="n" >
		<div class="mb-5 game-item">
			<div class="card" onclick="location.href='/game/${n.gameName}'">
				<img class="card-img-top" src="/resources/images/${n.gameName}/main.png" style="width:100%" />
				<div class="card-body">
					<div class="card-text font-weight-bold my-1">${n.gameTitle}</div>
					<div class="card-text">${n.gameDescription}</div>
				</div>
			</div>
		</div>
		</c:forEach>
		<div class="mb-5 game-item">
			<div class="card">
				<img class="card-img-top" src="/resources/images/comming_soon.png" style="width:100%" />
				<div class="card-body">
					<div class="card-text font-weight-bold my-1">새로운 게임</div>
					<div class="card-text">출시 예정입니다.</div>
				</div>
			</div>
		</div>
	</div>
</div>