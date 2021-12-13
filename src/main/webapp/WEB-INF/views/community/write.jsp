<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="requestLink" value="${requestScope.centerPost != null ? requestScope.centerPost.postId+='/modify.do' : 'com/add.do'}"></c:set>
<script type="text/javascript" src="/resources/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/resources/js/community/write/action.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/customer/style.css"/>

<div class="container board-wrap">
	<div class="mb-4">
		<div class="board-title font-32 font-weight-bold">커뮤니티</div>
	</div>
	<div class="post-write-wrap">
		<form id="postWriteForm" action="/community/${requestLink}" class="post-write" method="post">
			<div class="form-group">
				<input type="text" id="postTitle" class="form-control" name="postTitle" value="${requestScope.centerPost != null ? requestScope.centerPost.postTitle : ''}"
						 placeholder="제목을 입력해주세요 (40자 이하)">
			</div>
			<div class="form-group">
				<textarea id="editor" name="postContent">${requestScope.centerPost != null ? requestScope.centerPost.postContent : '내용을 입력해주세요.'}</textarea>
			</div>
			<div class="text-right mt-4">
				<a href="/community"><button type="button" class="btn btn-primary">취소</button></a>
				<button type="submit" class="btn btn-primary">등록</button>
			</div>
		</form>
	</div>
</div>