<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="/resources/js/mypage/action.js"></script>
<script type="text/javascript" src="/resources/js/mypage/upload-action.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/mypage/style.css">

<div class="container my-5">
	<div class="row m-0 bg-light border-circle">
		<nav class="mypage-nav mr-5">
			<div class="font-18 font-weight-bold p-4">마이페이지</div>
			<ul class="navbar-nav font-14">
			  <li class="nav-item">
			    <a role="button" class="nav-link py-3 px-4">내 정보</a>
			  </li>
			  <li class="nav-item">
			    <a role="button" class="nav-link py-3 px-4">비밀번호 변경</a>
			  </li>
			  <li class="nav-item">
			    <a role="button" class="nav-link py-3 px-4">회원 탈퇴</a>
			  </li>
			</ul>
		</nav>
		<div id="dynamicContentPage" class="mypage-content-container">
			<div class="mypage-content-page">
			<jsp:include page="/WEB-INF/views/user/info.jsp"></jsp:include>
			</div>
			<div class="mypage-content-page d-none">
			<jsp:include page="/WEB-INF/views/user/password.jsp"></jsp:include>
			</div>
			<div class="mypage-content-page d-none">
			<jsp:include page="/WEB-INF/views/user/away.jsp"></jsp:include>
			</div>
		</div>
	</div>
</div>