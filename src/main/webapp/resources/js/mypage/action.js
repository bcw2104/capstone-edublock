(function($){
	$(document).ready(function() {
		var originNickname = $("#infoNickname").val();
		var pwChangeValid = [0,0];

		var modifyUserData = function(queryString,msg){
			$.ajax({
				url:"/user/modify.do",
				type:"post",
				data:queryString,
				success:function(){
					alert(msg);
					location.reload();
				}
			});
		}

		$(".nav-link").on("click",function(){
			$(".mypage-content-page").each(function() {
				$(this).addClass("d-none");
			});

			var parent = $(this).parent()[0];
			var items = $(".mypage-nav .nav-item");
			if(parent == items[0]){
				$(".mypage-content-page").eq(0).removeClass("d-none");
			}
			else if(parent == items[1]){
				$(".mypage-content-page").eq(1).removeClass("d-none");
			}
			else if(parent == items[2]){
				$(".mypage-content-page").eq(2).removeClass("d-none");
			}
		});

		//회원정보 변경 페이지
		$("#infoNickname").on("propertychange change keyup paste input",function(){
			if($("#infoNickname").val() == originNickname){
				$("#nickNameChangeBtn").attr("disabled","disabled");
			}
			else{
				$("#nickNameChangeBtn").removeAttr("disabled");
			}
		});


		$("#nickNameChangeBtn").on("click",function(){
			var queryString = $("#userInfoForm").serialize();

			modifyUserData(queryString,"회원 정보가 변경되었습니다.");
		});


		//비밀번호 변경 페이지
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

		$("#originPw").on('focusin',function() {
			$(this).next().empty();
		});

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
				$.ajax({
					url : "/user/check.do",
					type:"post",
					data:{"userPw":$("#originPw").val()},
					success:function(res){
						if(res == "success"){
							$("#originPw").next().empty();

							var queryString = $("#passwordChangeForm").serialize();
							modifyUserData(queryString,"비밀번호가 변경되었습니다.");
						}
						else{
							$("#originPw").next().css("color", "#ff0000").text("비밀번호가 일치하지 않습니다");
						}
					}
				});
			}
		});

		//회원탈퇴 페이지
		$("#awayBtn").on("click",function(){
			var queryString = $("#awayForm").serialize();

			$.ajax({
				url : "/user/delete.do",
				type:"post",
				data:queryString,
				success:function(res){
					if(res == "success"){
						alert("회원탈퇴가 완료되었습니다.");
						location.href="/";
					}
					else{
						$("#awayPw").next().css("color", "#ff0000").text("비밀번호가 일치하지 않습니다");
					}
				}
			});
		});

		$("#awayPw").on('focusin',function() {
			$(this).next().empty();
		});
	});
})(jQuery);