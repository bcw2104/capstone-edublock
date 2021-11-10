(function($){
	var pwChangeValid = [0,0];

	var changePassword = function(queryString){
		$.ajax({
			url:"/user/find/change.do",
			type:"post",
			data:queryString,
			success:function(){
				alert('비밀번호 변경이 완료되었습니다.');
				location.href='/';
			}
		});
	}

	var checkNewPassword = function(event){
		var userPw = $("#newPw").val();
		var userPwCk = $("#newPwCk").val();

		var formMsg = $(event).next();
		formMsg.empty();
		if(userPwCk != ""){
			if(userPw == userPwCk){
				formMsg.css("color", "#0000ff").text("일치");
				pwChangeValid[1] = 1;
			}
			else{
				formMsg.css("color", "#ff0000").text("비밀번호가 일치하지 않습니다");
				pwChangeValid[1]=0;
			}
		}else{
			pwChangeValid[1]=0;
		}
	}


	$(document).ready(function() {
		$("#newPw").on('focusout',function() {
			var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*-+])(?=.*[0-9]).{8,16}$/;
			var userPw = $(this).val();

			var formMsg = $(this).next();
			formMsg.empty();

			if(regExp.test(userPw)){
				formMsg.css("color", "#0000ff").text("사용 가능한 비밀번호입니다.");
				pwChangeValid[0] = 1;
			}
			else{
				formMsg.css("color", "#ff0000").text("8~16자의 영문, 숫자, 특수문자를 사용하세요.");
				pwChangeValid[0]=0;
			}
			checkNewPassword($("#newPwCk"));
		});

		$("#newPwCk").on('focusout',function() {
			checkNewPassword(this);
		});

		$("#passwordChangeBtn").on("click",function(){
			var validator = 0;
			for(var i = 0; i < pwChangeValid.length; i++){
				validator+=pwChangeValid[i];
			}

			if(validator != 2){
				alert("항목을 전부 확인해주세요.");
			}
			else{
				var queryString = $("#passwordChangeForm").serialize();
				changePassword(queryString);
			}
		});
	});
})(jQuery);