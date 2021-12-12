$(document).ready(function() {
    CKEDITOR.replace('editor');

	$("#postWriteForm").on("submit",function() {
		var title = $("#postTitle").val();
		var content = CKEDITOR.instances['editor'].getData();

		if(title != "" && content != ""){
			return true;
		}

		alert("제목과 글을 확인해주세요.");
		return false;
	});
});