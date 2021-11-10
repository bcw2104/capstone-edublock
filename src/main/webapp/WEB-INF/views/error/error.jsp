<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page isErrorPage = "true" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Bootstrap4 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

<link rel="stylesheet" href="/resources/css/common.css">

<title>EBGS | Educational Block Coding Games</title>
</head>

<body class="body-font">
    <jsp:include page="/WEB-INF/views/common/header.jsp"></jsp:include>
    <div class="container" style="height:450px">
    	<div class="my-5 py-5 text-center">
    		<div class="font-weight-bold text-primary"style="font-size: 100px">${requestScope['javax.servlet.error.status_code']}</div>
    		<div class="mr-2 my-4 font-18">
			<c:if test="${requestScope['javax.servlet.error.status_code'] == 401}">
				접근 권한이 없는 페이지입니다.
			</c:if>
			<c:if test="${requestScope['javax.servlet.error.status_code'] == 404}">
				만료되었거나 존재하지 않는 페이지입니다.
			</c:if>
			<c:if test="${requestScope['javax.servlet.error.status_code'] == 405}">
				허용되지 않는 페이지입니다.
			</c:if>
			<c:if test="${requestScope['javax.servlet.error.status_code'] == 500}">
				서버에 오류가 발생했습니다.
			</c:if>
			</div>
			<a href="/"><button type="button" class="btn btn-primary" style="width:80px">홈으로</button></a>
		</div>
    </div>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>
</body>
</html>
