<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>
<script type="text/javascript" src="/resources/js/community/action.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/community/style.css"/>

<div class="container board-wrap">
	<div class="position-relative mb-5">
	    <div class="board-title font-32 font-weight-bold">커뮤니티</div>
	    <div class="search-form-wrap">
	        <div class="search-form border-circle">
	        	<div class="input-group">
	        		<input type="text" id="searchInput" name="query" class="form-control border-0 border-circle">
	        		<button type="button" id="searchBtn" class="btn btn-white input-group-append border-circle">
	        			<img src="/resources/images/icon_search.svg" alt="search" />
	        		</button>
	        	</div>
	         </div>
	    </div>
	</div>
	<div class="sort-nav-warp">
		<ul class="nav nav-pills">
			<li class="nav-item"><a href="#pill1" id="maps" role="button" class="nav-link board-type active" data-toggle="pill">모든 작품</a></li>
			<li class="nav-item"><a href="#pill2" id="coms" role="button" class="nav-link board-type" data-toggle="pill">커뮤니티</a></li>
		</ul>
		<a role="button" id="create" class="btn btn-primary" href="/custom/create">작품 만들기</a>
	</div>
	<hr class="my-3"/>
	<!-- 본문 부분 -->
	<div class="tab-content">
		<div class="tab-pane container fade show active" id="pill1">
			<div class="option-wrap row m-0 ">
				<div class="form-group">
					<select class="sort form-control pointer">
						<option value="new">최신순</option>
						<option value="pop">인기순</option>
						<option value="like">좋아요순</option>
					</select>
				</div>
				<div class="form-group">
					<select id="gameType" class="form-control pointer">
						<option value="0">전체</option>
						<c:forEach items="${requestScope.gameType}" var="n">
						<option value="${n.gameId}">${n.gameName}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="row m-0 map-list">
			</div>
		</div>
		<div class="tab-pane fade container" id="pill2">
			<div class="option-wrap row m-0 ">
				<div class="form-group">
					<select class="sort form-control pointer">
						<option value="new">최신순</option>
						<option value="pop">인기순</option>
					</select>
				</div>
			</div>
			<table class="table post-list-table">
				<thead>
					<tr>
						<th class="col-1">번호</th>
						<th class="col-5">제목</th>
						<th class="col-2">글쓴이</th>
						<th class="col-3">작성일</th>
						<th class="col-1">조회</th>
					</tr>
				</thead>
				<tbody class="post-list"></tbody>
			</table>
		</div>
		<div id="pagination" class="mt-4"> </div>
	</div>
</div>