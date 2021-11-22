<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/custom/style.css">

<div class="container board-wrap">
	<div class="mb-5 board-title font-32 font-weight-bold">창작마당</div>
	<div class="row m-0">
		<div class="mb-5 custom-item">
			<div class="card" onclick="location.href='/custom/create'">
				<img class="card-img-top" src="/resources/images/brace/main.png" style="width:100%" />
				<div class="card-body">
					<div class="card-text font-weight-bold my-1">만들기</div>
					<div class="card-text">게임을 만들고 공유해보세요!</div>
				</div>
			</div>
		</div>
		<div class="mb-5 custom-item">
			<div class="card" onclick="location.href='/community'">
				<img class="card-img-top" src="/resources/images/community/main.jpg" style="width:100%" />
				<div class="card-body">
					<div class="card-text font-weight-bold my-1">커뮤니티</div>
					<div class="card-text">커뮤니티에서 작품을 플레이해보세요!</div>
				</div>
			</div>
		</div>
	</div>
</div>