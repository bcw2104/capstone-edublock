<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="font-18 font-weight-bold p-4">내 정보</div>
<div class="px-4 pb-4">
	<div class="mypage-content">
		<div class="mb-4">
			<img class="profile-img mb-2" alt="profile" src="/resources/images/icon_profile.png">
			<div class="position-relative">
				<input type="file" id="newProfileImg" class="custom-file-input pointer"/>
				<label class="custom-file-label" for="newProfileImg">프로필 이미지</label>
			</div>
		</div>
		<form id="userInfoForm">
			<div class="form-group">
				<label class="font-14 font-weight-bold">아이디</label>
				<input type="text" class="form-control" value="${sessionScope.user.userId}" disabled="disabled">
			</div>
			<div class="form-group">
				<label class="font-14 font-weight-bold">닉네임</label>
				<div class="input-group">
					<input type="text" id="infoNickname" name="userNickname" class="form-control" value="${sessionScope.user.userNickname}">
					<button type="button" id="nickNameChangeBtn" class="btn btn-primary input-group-append" disabled="disabled">변경</button>
				</div>
			</div>
			<div class="form-group">
				<label class="font-14 font-weight-bold">이메일</label>
				<input type="text" class="form-control" value="${sessionScope.user.userEmail}" disabled="disabled">
			</div>
		</form>
	</div>
</div>