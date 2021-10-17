<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="font-18 font-weight-bold p-4">비밀번호 변경</div>
<div class="p-4">
	<form id="passwordChangeForm" class="mypage-content">
		<div class="form-group">
			<label class="font-14 font-weight-bold">기존 비밀번호</label>
			<input type="password" id="originPw" class="form-control" autocomplete="off">
			<div class="form-msg"></div>
		</div>
		<div class="form-group">
			<label class="font-14 font-weight-bold">새 비밀번호</label>
			<input type="password" id="newPw" name="userPw" class="form-control">
			<div class="form-msg"></div>
		</div>
		<div class="form-group">
			<label class="font-14 font-weight-bold">비밀번호 확인</label>
			<input type="password" id="newPwCk" class="form-control">
			<div class="form-msg"></div>
		</div>
		<div class="text-right">
			<button type="button" id="passwordChangeBtn" class="btn btn-primary">변경</button>
		</div>
	</form>
</div>