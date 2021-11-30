<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/home/style.css">

<div class="container-fluid p-0">
	<div class="carousel slide" data-ride="carousel" data-interval="5000" id="banner">
		<!-- 이미지 -->
		<div class="carousel-inner">
			<div class="carousel-item active">
				<img class="w-100" src="/resources/images/sample.png">
				<div class="carousel-caption"></div>
			</div>
			<div class="carousel-item">
				<img class="w-100" src="/resources/images/sample.png">
				<div class="carousel-caption"></div>
			</div>
			<div class="carousel-item">
				<img class="w-100" src="/resources/images/sample.png">
				<div class="carousel-caption"></div>
			</div>
		</div>
		<!-- 인디케이터 -->
		<ul class="carousel-indicators">
			<li data-target="#banner" data-slide-to="0" class="active"></li>
			<li data-target="#banner" data-slide-to="1"></li>
			<li data-target="#banner" data-slide-to="2"></li>
		</ul>
		<!-- 이동 버튼 -->
		<a class="carousel-control-prev" href="#banner" data-slide="prev">
			<span class="carousel-control-prev-icon"></span>
		</a>
		<a class="carousel-control-next" href="#banner" data-slide="next">
			<span class="carousel-control-next-icon"></span>
		</a>
	</div>
</div>

<div class="container mt-5 w-fix">
	<div class="popular">
		<div class="board-title font-18 font-weight-bold mt-3 mb-5">인기 작품</div>
		<div class="row m-0">
			<c:forEach items="${requestScope.hotMapList}" var="n" >
			<div class="map-item mb-5">
				<div class="card" onclick="location.href='/game/${n.gameName}/${n.mapId}'">
					<img class="card-img-top" src="/resources/images/game/thumbnail/${n.thumbnail}" style="width:100%" />
					<div class="card-body">
						<div class="card-text font-weight-bold my-1">${n.mapName}</div>
						<div class="card-text py-2">${n.authorNickname}</div>
						<hr/>
						<div class="card-text pt-2 text-right">
							<img height="12px" src="/resources/images/icon_hits.png" alt="hits" />
							<span class="font-12 text-secondary ml-1">${n.hits}</span>
							<img class="ml-4" height="12px" src="/resources/images/icon_like.png" alt="like" />
							<span class="font-12 text-secondary ml-1">${n.like}</span>
						</div>
					</div>
				</div>
			</div>
			</c:forEach>
		</div>
	</div>
	<hr>
	<div class="new">
		<div class="board-title font-18 font-weight-bold mt-3 mb-5">새로운 작품</div>
		<div class="row m-0">
			<c:forEach items="${requestScope.newMapList}" var="n" >
			<div class="map-item mb-5">
				<div class="card" onclick="location.href='/game/${n.gameName}/${n.mapId}'">
					<img class="card-img-top" src="/resources/images/game/thumbnail/${n.thumbnail}" style="width:100%" />
					<div class="card-body">
						<div class="card-text font-weight-bold my-1">${n.mapName}</div>
						<div class="card-text py-2">${n.authorNickname}</div>
						<hr/>
						<div class="card-text pt-2 text-right">
							<img height="12px" src="/resources/images/icon_hits.png" alt="hits" />
							<span class="font-12 text-secondary ml-2">${n.hits}</span>
							<img class="ml-4" height="12px" src="/resources/images/icon_like.png" alt="like" />
							<span class="font-12 text-secondary ml-2">${n.like}</span>
						</div>
					</div>
				</div>
			</div>
			</c:forEach>
		</div>
	</div>
</div>