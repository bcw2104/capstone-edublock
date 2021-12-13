<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"  uri="http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript" src="/resources/js/community/view/action.js"></script>
<script type="text/javascript" src="/resources/js/pagination/pagination.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/customer/style.css"/>

<div class="container board-wrap">
	<div id="auth" class="d-none">${sessionScope.user != null ? sessionScope.user.userId : ''}</div>
	<div class="mb-4">
		<div class="board-title font-32 font-weight-bold">
			<c:if test="${requestScope.centerPost.boardType == 'notice'}">공지사항</c:if>
			<c:if test="${requestScope.centerPost.boardType == 'qna'}"> QnA</c:if>
			<c:if test="${requestScope.centerPost.boardType == 'faq'}"> FAQ</c:if>
		</div>
		<a class="float-right" href="/customer/${requestScope.centerPost.boardType}">
			<button type="button" class="btn btn-light">목록</button>
		</a>
	</div>
	<hr/>
	<div class="post-view-wrap">
		<div class="post-view">
			<div class="bg-light px-4 py-3">
				<div class="font-32 font-weight-bold">${requestScope.centerPost.postTitle}</div>
				<div class="row mx-0 mt-4 font-14">
					<img class="author-profile-img" alt="profile">
					<div class="author-info">
						<div id="boardType" class="d-none">${requestScope.centerPost.boardType}</div>
						<div id="postId" class="d-none">${requestScope.centerPost.postId}</div>
						<div id="postAuthor" class="d-none">${requestScope.centerPost.postAuthor}</div>
						<div class="ml-3">${requestScope.centerPost.postAuthorNickname}</div>
						<div class="ml-3 text-secondary">
							<fmt:formatDate value="${requestScope.centerPost.postDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
						</div>
					</div>
					<div class="hits text-right text-secondary">조회 수 ${requestScope.centerPost.hits}</div>
				</div>
			</div>
			<hr/>
			<div class="post-content p-4">${requestScope.centerPost.postContent}</div>
		</div>
		<c:if test="${sessionScope.user.userType == 'ADMIN' || sessionScope.user.userId == requestScope.centerPost.postAuthor}">
		<div class="text-right font-16 my-3 pr-2">
			<a class="text-secondary" href="/customer/${requestScope.centerPost.postId}/edit">수정</a>
			<span class="text-secondary mx-2">|</span>
			<a role="button" id="postDeleteBtn" class="text-secondary" >삭제</a>
		</div>
		</c:if>
	</div>
	<hr/>
	<div class="comment-view">
		<div class="py-3 px-4">
			<div class="comment-form-wrap">
				<form class="comment-form">
					<textarea name="commentContent" class="form-control" placeholder="답변을 입력해주세요."></textarea>
					<div class="text-right">
						<button type="button" class="btn btn-primary">등록</button>
					</div>
				</form>
			</div>
			<div class="font-16 font-weight-bold mt-5 my-2">댓글 <span id="commentCnt" class="text-danger"></span></div>
			<hr/>
			<div class="comment-list"> </div>
			<div id="pagination"></div>
		</div>
	</div>
</div>