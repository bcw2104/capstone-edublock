<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="font-18 font-weight-bold p-4">회원 탈퇴</div>
<div class="p-4">
	<div class="text-danger font-weight-bold mb-4">회원 탈퇴시 계정에 관련된 모든 기록이 삭제됩니다. </div>
	<form class="mypage-content">
		<div class="form-group">
			<label class="font-14 font-weight-bold">탈퇴 아이디</label>
			<input type="text" class="form-control" value="${sessionScope.user.userId}" disabled="disabled">
		</div>
		<div class="form-group">
			<label class="font-14 font-weight-bold">비밀번호 확인</label>
			<input type="password" class="form-control">
		</div>
		<div class="text-right">
			<button type="button" class="btn btn-primary">회원 탈퇴</button>
		</div>
	</form>
</div>