<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" type="text/css" href="/resources/css/rank/style.css">
<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>

<div class="container board-wrap">
	<div class="mb-5 board-title font-32 font-weight-bold">전체 랭킹</div>

	<c:if test="${sessionScope.user != null}">
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
        <tbody>
	        <tr>
	            <td id="myRank">my</td>
	            <td id="myNickName">my</td>
	            <td id="myPoint">my</td>
	            <td id="myClearData">my</td>
	        </tr>
        </tbody>
    </table>
    </c:if>
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
        <tbody>
	        <tr>
	            <td>0</td>
	            <td>0</td>
	            <td>0</td>
	            <td>0</td>
	        </tr>
      	</tbody>
    </table>
   <div id="pagination" class="mt-4"> </div>
</div>