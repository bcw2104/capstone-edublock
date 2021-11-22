<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/community/style.css"/>

<div class="container board-wrap">
	<div class="position-relative mb-5">
	    <div class="board-title font-32 font-weight-bold">커뮤니티</div>
	    <div class="search-form-wrap">
	        <form action="/customer/${requestScope.boardType}" class="search-form border-circle" method="get">
	        	<div class="input-group">
	        		<input type="text" id="searchInput" name="query" class="form-control border-0 border-circle">
	        		<button type="submit" class="btn btn-white input-group-append border-circle">
	        			<img src="/resources/images/icon_search.svg" alt="search" />
	        		</button>
	        	</div>
	         </form>
	    </div>
	</div>
	<div class="sort-nav-warp">
		<ul class="nav nav-pills">
			<li class="nav-item"><a href="#pill1" class="nav-link active" data-toggle="pill">모든 작품</a></li>
			<li class="nav-item"><a href="#pill2" class="nav-link" data-toggle="pill">커뮤니티</a></li>
		</ul>
		<a role="button" class="btn btn-primary" href="/custom/create">작품 만들기</a>
	</div>
	<!-- 본문 부분 -->
	<div class="tab-content">
		<div class="tab-pane container fade show active" id="pill1">
			<h1>Pill 1</h1>
			<p>이 부분은 Pill1의 내용부분 입니다.</p>
		</div>
		<div class="tab-pane fade container" id="pill2">
			<h1>Pill 2</h1>
			<p>이 부분은 Pill2의 내용부분 입니다.</p>
		</div>
	</div>
</div>