<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>
<script type="text/javascript" src="/resources/js/rank/action.js"></script>

<div class="container board-wrap">
	<div class="row m-0 justify-content-between">
		<div class="mb-5 board-title font-32 font-weight-bold">전체 랭킹</div>
		<div class="form-group">
			<select id="gameType" class="form-control pointer" style="width:150px">
				<option value="0">전체</option>
				<c:forEach items="${requestScope.gameType}" var="n">
				<option value="${n.gameId}">${n.gameName}</option>
				</c:forEach>
			</select>
		</div>
	</div>

    <div class="my-2 font-20 font-weight-bold">내 순위</div>
    <table id="myRankTable" class="table text-center">
    	<thead>
	        <tr>
	            <th class="col-2">순위</th>
	            <th class="col-4">닉네임</th>
	            <th class="col-4">점수</th>
	            <th class="col-2">클리어</th>
	        </tr>
        </thead>
        <tbody id="myrank"></tbody>
    </table>
    <div class="mt-4 mb-2 font-20 font-weight-bold">전체 순위</div>
    <table id="totalRankTable" class="table text-center">
    	<thead>
	        <tr>
	            <th class="col-2">순위</th>
	            <th class="col-4">닉네임</th>
	            <th class="col-4">점수</th>
	            <th class="col-2">클리어</th>
	        </tr>
        </thead>
        <tbody class="rank-list">

      	</tbody>
    </table>
   <div id="pagination" class="mt-4"> </div>
</div>