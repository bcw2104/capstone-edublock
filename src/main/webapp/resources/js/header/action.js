(function($){
	$(document).ready(function() {
		var confirmEmail="";

		var idValid = 0;
		var pwValid =0;
		var pwCheck = 0;
		var nicknameValid =0;
		var emailValid = 0;

		var isExist = function(key,value){
			var queryString = key+"="+value;
			return $.ajax({
				url : "/user/isexist.do",
				type:"get",
				data:queryString
			});
		}

		var passwordCheck = function(event){
			var userPw = $("#regPw").val();
			var userPwCk = $("#regPwCk").val();

			var formMsg = $(event).next();
			formMsg.empty();
			if(userPwCk != ""){
				if(userPw == userPwCk){
					formMsg.css("color", "#0000ff").text("일치");
					pwCheck = 1;
				}
				else{
					formMsg.css("color", "#ff0000").text("비밀번호가 일치하지 않습니다");
					pwCheck=0;
				}
			}else{
				pwCheck=0;
			}
		}

		$("#regId").on('focusout',function() {
			var userId = $(this).val();
			var regExp = /^[a-zA-Z0-9]{5,20}$/;

			var formMsg = $(this).next();
			formMsg.empty();

			if(userId == ""){
				formMsg.css("color", "#ff0000").text("사용하실 아이디를 입력해주세요.");
				idValid=0;
			}
			else if(regExp.test(userId)){
				isExist("userId",userId).done(function(data) {
					if(data == "false"){
						formMsg.css("color", "#0000ff").text("사용 가능한 아이디입니다.");
						idValid = 1;
					}
					else if(data == "true"){
						formMsg.css("color", "#ff0000").text("이미 존재하는 아이디입니다.");
						idValid=0;
					}
				});
			}
			else{
				formMsg.css("color", "#ff0000").text("5~20자의 영문, 숫자만 사용 가능합니다.");
				idValid=0;
			}
		});

		$("#regPw").on('focusout',function() {
			var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*-+])(?=.*[0-9]).{8,16}$/;
			var userPw = $(this).val();

			var formMsg = $(this).next();
			formMsg.empty();

			if(regExp.test(userPw)){
				formMsg.css("color", "#0000ff").text("사용 가능한 비밀번호입니다.");
				pwValid = 1;
			}
			else{
				formMsg.css("color", "#ff0000").text("8~16자의 영문, 숫자, 특수문자를 사용하세요.");
				pwValid=0;
			}
			passwordCheck($("#regPwCk"));
		});

		$("#regPwCk").on('focusout',function() {
			passwordCheck(this);
		});

		$("#regNickname").on('focusout',function() {
			var regExp = /^[a-zA-Z가-힣0-9]{2,10}$/;
			var userNickname = $(this).val();

			var formMsg = $(this).next();
			formMsg.empty();

			if(userNickname == ""){
				formMsg.css("color", "#ff0000").text("닉네임을 입력해주세요.");
				nicknameValid=0;
			}
			else if(regExp.test(userNickname)){
				isExist("userNickname",userNickname).done(function(data) {
					if(data == "false"){
						formMsg.css("color", "#0000ff").text("사용 가능한 닉네임입니다.");
						nicknameValid = 1;
					}
					else if(data == "true"){
						formMsg.css("color", "#ff0000").text("이미 존재하는 닉네임입니다.");
						nicknameValid=0;
					}
				});
			}
			else{
				formMsg.css("color", "#ff0000").text("2~10자의 영문, 숫자, 한글만 사용 가능합니다.");
				nicknameValid=0;
			}
		});

		$("#regEmail").on('focusout',function() {
			var regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i;
			var userEmail = $(this).val();

			var formMsg = $(this).next();
			formMsg.empty();

			if(userEmail == ""){
				formMsg.css("color", "#ff0000").text("이메일 주소를 입력해주세요.");
				emailValid=0;
			}
			else if(regExp.test(userEmail)){
				isExist("userEmail",userEmail).done(function(data) {
					if(data == "false"){
						formMsg.css("color", "#0000ff").text("사용 가능한 이메일입니다.");
						emailValid = 1;
					}
					else if(data == "true"){
						formMsg.css("color", "#ff0000").text("이미 사용중인 이메일 주소입니다.");
						emailValid=0;
					}
				});
			}
			else{
				formMsg.css("color", "#ff0000").text("올바르지 않은 이메일 주소입니다.");
				emailValid=0;
			}
		});

		$("#emailResendBtn").on("click",function(){
			if(confirmEmail == ""){
				alert("페이지에 오류가 발생했습니다.");

				location.reload();
				return false;
			}


			$.ajax({
				url : "/user/send.do",
				type:"post",
				data:{"userEmail":confirmEmail}
			});

			$("#confirmEmailSendMsg").text("인증 메일이 다시 전송되었습니다.");
			$("#confirmEmail").text(confirmEmail);

		});

		$("#signUpFormSubmit").on("click",function() {
			var validator = idValid + pwValid + pwCheck + nicknameValid  + emailValid;

			if(validator != 5){
				alert("항목을 전부 확인해주세요.");
			}
			else{
				var regEmail = $("#regEmail").val();
				var queryString = $("#signUpForm").serialize();
				$.ajax({
					url : "/user/signup.do",
					type:"post",
					data:queryString
				});

				$("#signUpForm")[0].reset();
				$(".form-msg").empty();

				$("#signUpModal").modal("hide");
				$("#confirmModal").modal("show");
				$("#confirmEmail").text(regEmail);

				confirmEmail = regEmail;
			}
		});

		//로그인
		$("#loginFormSubmit").on("click",function() {
			var loginId = $("#loginId").val();
			var loginPw = $("#loginPw").val();

			$("#loginId").next().empty();
			$("#loginPw").next().empty();

			if(loginId != "" && loginPw != ""){
				var queryString = $("#loginForm").serialize();
				$.ajax({
					url : "/user/login.do",
					type:"post",
					data:queryString,
					success:function(res){
						if(res == "success"){
							location.reload();
						}
						else if(res == "fail"){
							alert("아이디 또는 비밀번호가 일치하지 않습니다.");
						}
						else{
							$.ajax({
								url : "/user/send.do",
								type:"post",
								data:{'userEmail':res}
							});

							$("#loginModal").modal("hide");
							$("#confirmModal").modal("show");
							$("#confirmEmail").text(res);

							confirmEmail = res;
						}
					}
				});
			}
			else{
				if(loginId == ""){
					$("#loginId").next().css("color", "#ff0000").text("아이디를 입력해주세요.");
				}
				if(loginPw == ""){
					$("#loginPw").next().css("color", "#ff0000").text("비밀번호를 입력해주세요.");
				}
			}
		});
	});
})(jQuery);