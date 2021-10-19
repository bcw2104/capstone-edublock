<%@page import="kr.ebgs.dto.UserDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="/resources/css/header/style.css">
<link rel="stylesheet" type="text/css" href="/resources/css/header/modal-style.css">

<script type="text/javascript" src="/resources/js/header/action.js"></script>


<c:if test="${sessionScope.user == null}">
<div class="modal fade" id="signUpModal">
    <div class="modal-dialog">
        <div class="modal-content py-4 px-5">
        	<div class="text-center mb-3">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
        		<div><img alt="Logo" src="/resources/images/logo.png"></div>
            	<div class="font-24 mt-1">회원가입</div>
            </div>
            <div class="modal-body">
			    <form id="signUpForm">
				    <div class="form-group">
				        <input type="text" id="regId" class="custom-form-control form-control" name="userId"  autocomplete="off"  placeholder="아이디"/>
						<div class="form-msg"></div>
					</div>
					<div class="form-group">
			        	<input type="password" id="regPw" class="custom-form-control form-control" name="userPw" placeholder="비밀번호"/>
			        	<div class="form-msg"></div>
					</div>
					<div class="form-group">
				        <input type="password" id="regPwCk" class="custom-form-control form-control"  placeholder="비밀번호 확인"/>
				        <div class="form-msg"></div>
					</div>
					<div class="form-group ">
				    	<input type="text" id="regNickname" class="custom-form-control form-control" name="userNickname" placeholder="닉네임"/>
				    	<div class="form-msg"></div>
					</div>
			        <div class="form-group">
			        	<input type="text" id="regEmail" class="custom-form-control form-control" name="userEmail" placeholder="이메일"/>
			        	<div class="form-msg"></div>
					</div>
			        <button type="button" id="signUpFormSubmit" class="btn btn-primary w-100 font-20 font-weight-bold">회원가입</button>
			    </form>
			    <div class="text-center mt-4">
					<a role="button" class="text-secondary" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">이미 회원이신가요?</a>
				</div>
			</div>
        </div>
    </div>
</div>

<div class="modal fade" id="loginModal">
    <div class="modal-dialog">
        <div class="modal-content py-4 px-5">
        	<div class="text-center mb-3">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
        		<div><img alt="Logo" src="/resources/images/logo.png"></div>
            	<div class="font-24 mt-1">로그인</div>
            </div>
            <div class="modal-body">
			    <form id="loginForm">
				    <div class="form-group">
				        <input type="text" id="loginId" class="custom-form-control form-control" name="userId" autocomplete="off"  placeholder="아이디"/>
						<div class="form-msg"></div>
					</div>
					<div class="form-group">
			        	<input type="password" id="loginPw" class="custom-form-control form-control" name="userPw" placeholder="비밀번호"/>
			        	<div class="form-msg"></div>
					</div>
			        <button type="button" id="loginFormSubmit" class="btn btn-primary w-100 font-20 font-weight-bold">로그인</button>
			    </form>
			    <div class="text-center mt-4">
					<a role="button" class="text-secondary" data-dismiss="modal" data-toggle="modal" data-target="#signUpModal">회원가입</a>
					<span class="v_bar mx-2 text-secondary">|</span>
					<a class="text-secondary" href="">계정 찾기</a>
				</div>
			</div>
        </div>
    </div>
</div>

<div class="modal fade" id="confirmModal">
    <div class="modal-dialog">
        <div class="modal-content py-4 px-5">
        	<div class="text-center mb-3">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
        		<div><img alt="Logo" src="/resources/images/logo.png"></div>
            	<div class="font-24 mt-1">이메일 인증</div>
            </div>
            <div class="modal-body">
            	<div class="text-center">
            		인증 메일이 아래의 메일주소로 전송되었습니다.<br>
            		전송된 링크를 통해 인증을 완료해주세요.
            	</div>
            	<div id="confirmEmail" class="text-center text-primary font-weight-bold mt-4"> </div>
			    <div class="mt-4">
			    	<button type="button" class="btn btn-primary w-100 font-20 font-weight-bold" data-dismiss="modal">확인</button>
			    	<div id="confirmEmailSendMsg" class="font-14 mt-2 text-primary"></div>
				</div>
				<div class="text-center mt-4">
					<a role="button" id="emailResendBtn" class="text-secondary">이메일 다시 보내기</a>
				</div>
			</div>
        </div>
    </div>
</div>
</c:if>

<header class="container-fluid bg-light py-0 px-3 m-0">
	<div class="navbar navbar-expand-lg navbar-light p-0 m-0 w-100">
		<div class="navbar-header row m-0">
			<a href="/" class="navbar-brand">
				<img class="py-4" alt="Logo" src="/resources/images/logo.png">
			</a>
		</div>
		<button type="button" class="navbar-toggler ml-auto border-0" data-toggle="collapse" data-target="#userNavBar">
			<span class="navbar-toggler-icon"></span>
		</button>
		<nav id="userNavBar" class="collapse navbar-collapse">
			<ul class="navbar-nav ml-auto font-14 p-3 text-right">
			<c:choose>
				<c:when test="${sessionScope.user != null}">
				<li class="nav-item"><a role="button" class="nav-link" href="/user/logout.do">로그아웃</a></li>
				<li class="nav-item"><a role="button" class="nav-link" href="/user/mypage">마이페이지</a></li>
				</c:when>
				<c:otherwise>
				<li class="nav-item"><a role="button" class="nav-link" data-toggle="modal" data-target="#loginModal">로그인</a></li>
				<li class="nav-item"><a role="button" class="nav-link" data-toggle="modal" data-target="#signUpModal">회원 가입</a></li>
				</c:otherwise>
			</c:choose>
			</ul>
		</nav>
		<nav id="globalNavBar">
			<ul class="navbar-nav font-weight-bold text-dark font-18 flex-row">
				<li class="nav-item"><a class="nav-link" href="">GAME</a></li>
				<li class="nav-item"><a class="nav-link" href="">창작마당</a></li>
				<li class="nav-item"><a class="nav-link" href="">랭킹</a></li>
				<li class="nav-item"><a class="nav-link" href="/customer">고객센터</a></li>
			</ul>
		</nav>
	</div>
</header>