function getProfileImg(query){
	$.ajax({
		url: "/upload/profile",
        type: "get",
		data : {'query':query},
        success : function(res){
        	if(res == "fail"){
				alert("프로필 이미지를 불러오는데 실패했습니다.");
			}
			else{
        		$(".author-profile-img").attr("src",res);
			}
        }
    });
}

function getParams(){
    var queryString = location.search;
    var array = queryString.substring(1).split('&');
	var ret = {};
    for(var i = 0; i < array.length; i++){
		var temp = array[i].split('=');
		ret[temp[0]]=decodeURI(temp[1]);
	}
    return ret;
}

function timestampToDate(timestamp) {
	date = new Date(timestamp);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}


$(document).ready(function() {
	var postId = $("#postId").text();
	var loginId = $("#auth").text();
	var boardType = $("#boardType").text();
	var postAuthor = $("#postAuthor").text();

	var params = getParams();
	params["p"] = (params["p"] == undefined ? 1 : params["p"]);

	getProfileImg(postAuthor);

	$("#postDeleteBtn").on("click",function(){
		var ans = confirm("게시글을 삭제하시겠습니까?");

		if(ans == true){
			$.ajax({
				url: "/customer/"+postId+"/delete.do",
		        type: "post",
				success:function(){
					alert("게시글이 삭제되었습니다.");
					location.href = "/customer/"+boardType;
				}
			});
		}
	});

	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/customer/"+postId+"/comment/list.do",
		        success: function(response) {
		            done(response);
		        }
		    });
		 },
		pageNumber:params["p"],
		pageSize: 12,
	    callback: function(data, pagination) {
			if (typeof (history.pushState) != undefined) {
				var renewURL = location.href.split("?")[0];
				var queryString = "?p="+pagination.pageNumber;
		        history.pushState(null, null, renewURL+queryString);
    		}
			$(".comment-list").empty();
			$("#commentCnt").text(pagination.totalNumber)
			for(var i in data){
				var html = "<div id='cm_"+data[i].commentId+"' class='"+(data[i].parentId != data[i].commentId ? "sub ":"")+"comment-item p-3'>"
						+"<div class='cm-p d-none'>"+data[i].parentId+"</div>"
						+"<div class='comment-info'>"
							+"<span class='author font-15 font-weight-bold'>"+data[i].commentAuthorNickname+"</span>"
							+"<span class='font-13 ml-2 text-secondary'>"+timestampToDate(data[i].commentDate)+"</span>"
							+"<img class='comment-menu dropdown-toggle' data-toggle='dropdown' src='/resources/images/icon_menu.png'>"
							+"<div class='dropdown-menu'>"
							+(loginId == data[i].commentAuthor ? "<a role='button' class='dropdown-item comment-delete'>삭제</a>" : "")
							+"<a role='button' class='dropdown-item comment-report'>신고</a>"
							+"</div>"
						+"</div>"
						+"<div class='pt-1 pb-2 font-15 comment-content'><pre>"+data[i].commentContent+"</pre></div>"
						+"<a role='button' class='reply font-13 text-secondary'>답글</a>"
						+"</div>"
						+"<hr/>"

				$(".comment-list").append(html);
			}
	    }
	});

	$(".comment-view").on("click",function(event){
		var target = $(event.target);

		if(target.is("a.comment-delete")){
			commentId = target.parent().parent().parent().attr('id').split('_')[1];
			$.ajax({
					type: "post",
					url: "/customer/comment/"+commentId+"/delete.do",
					data:queryString,
					success: function() {
					    alert("댓글이 삭제되었습니다.");
						location.href=location.href.split("?")[0];
					},
					error:function(){
						$("#loginModal").modal("show");
					}
			    });
		}
		if(target.is("a.reply")){
			$(".reply-form").remove();
			var to = target.parent().find(".comment-info > .author").text();
			var parentId = target.parent().find(".cm-p").text();
			var html ="<div class='reply-form comment-form-wrap'>"
						+"<form class='comment-form'>"
							+"<input type='hidden' name='parentId' value='"+parentId+"'/>"
							+"<textarea name='commentContent' class='form-control' placeholder='답변을 입력해주세요.'>@"+to+"\n</textarea>"
							+"<div class='text-right'>"
								+"<button type='button' class='btn btn-primary'>등록</button>"
							+"</div>"
						+"</form>"
					+"</div>";

			target.after(html);
		}

		if(target.is(".comment-form button")){
			var commentContent = target.parent().prev().val();
			if(commentContent == ""){
				alert("내용을 작성해주세요.");
			}
			else{
				var form = target.parent().parent();
				var queryString = $(form).serialize();

				$.ajax({
					type: "post",
					url: "/customer/"+postId+"/comment/add.do",
					data:queryString,
					success: function() {
					    alert("댓글이 등록되었습니다.");
						location.href=location.href.split("?")[0];
					},
					error:function(){
						$("#loginModal").modal("show");
					}
			    });
			}
		}
	});
});