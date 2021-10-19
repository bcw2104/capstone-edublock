<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/customer/board/action.js"></script>
<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/customer/style.css"/>

<div class="container board-wrap">
	<div class="position-relative mb-5">
	    <div class="board-title font-32 font-weight-bold">고객센터</div>
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
	<ul class="nav nav-pills nav-fill my-3">
        <li class="nav-item">
            <a class="nav-link ${requestScope.boardType == 'notice' ? 'active' : ''}" href="/customer/notice">공지사항</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${requestScope.boardType == 'qna' ? 'active' : ''}" href="/customer/qna">QnA</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${requestScope.boardType == 'faq' ? 'active' : ''}" href="/customer/faq">FAQ</a>
        </li>
    </ul>
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
		<tbody class="post-list">

		</tbody>
	</table>
	<input type="hidden" id="boardType" value="${requestScope.boardType}" />
	<div id="pagination" class="mt-4"> </div>
	<c:if test="${sessionScope.user != null && (sessionScope.user.userType == 'ADMIN' || requestScope.boardType == 'qna')}">
	<div class="text-right">
		<a href="/customer/${requestScope.boardType}/write"><button type="button" class="btn btn-primary">글쓰기</button></a>
	</div>
	</c:if>
</div>