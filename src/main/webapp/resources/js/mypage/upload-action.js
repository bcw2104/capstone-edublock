
function checkFileSize(fileSize){
	var maxSize = 2 * 1024 * 1024;

	if(fileSize > maxSize){
		return false;
	}
	else{
		return true;
	}
}

function uploadFile(target){
	var fileSize = target.files[0].size;
	var fileExtension = target.files[0].name.substr(target.files[0].name.lastIndexOf(".")+1);

	if(target.files[0] != undefined){
		if(fileExtension == "svg" || fileExtension == "bmp" || fileExtension == "png" || fileExtension=="jpg" || fileExtension=="jpeg"){
			if(checkFileSize(fileSize)){
				var fReader = new FileReader();
				fReader.readAsDataURL(target.files[0]);
				fReader.onloadend = function(event){
			    	var form = $("#profileImgForm")[0];
					var data = new FormData(form);

					$.ajax({
						url: "/upload/profile.do",
			            type: "post",
			            enctype: "multipart/form-data",
			            data: data,
						processData: false,
			            contentType: false,
			            cache: false,
			            timeout: 600000,
			            success : function(res){
							if(res == "success"){
				            	alert("프로필 이미지가 변경되었습니다.");
								location.reload();
							}
							else{
								alert("업로드 도중 오류가 발생했습니다.");
							}
			            }
			        });
					$("#profileImgUploaderLabel").text(target.files && target.files.length ? target.files[0].name : target.value.replace(/^C:\\fakepath\\/i, ''));
				}
			}else{
				alert("이미지 크기가 2MB를 초과합니다.");
				$("#profileImgUploaderLabel").text("이미지 선택");
			}
		}else{
			alert("프로필 이미지의 확장자는 svg,bmp,png,jpg,jpeg만 가능합니다.");
			$("#profileImgUploaderLabel").text("이미지 선택");
		}
	}else{
		$("#profileImgUploaderLabel").text("이미지 선택");
	}
}

function getProfileImg(){
	$.ajax({
		url: "/upload/profile",
        type: "get",
        success : function(res){
        	$(".profile-img").attr("src",res);
        }
    });
}

$(document).ready(function() {
	$("#profileImgUploader").change(function() {
		uploadFile(this);
	});

	getProfileImg();
});