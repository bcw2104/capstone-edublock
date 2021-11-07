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

function getMyRank(type){
	$.ajax({
        type: "get",
        url: "/game/myrank.do",
		data:{t:type},
        success: function(data) {
			$("#myrank").empty();
			var html;
			if(data.userNickname == null){
				html = "<tr>"
						+"<td colspan='4'>내 순위를 보기 위해서는 로그인이 필요합니다.</td>"
						+"</tr>"
			}
			else{
	            html = "<tr>"
				            +"<td>"+data.rank+"</td>"
				            +"<td>"+data.userNickname+"</td>"
				            +"<td>"+data.score+"</td>"
				            +"<td>"+data.clear+"</td>"
				        +"</tr>";
			}
			$("#myrank").append(html);
        }
    });
}

function getList(type){
	var params = getParams();
	params["p"] = (params["p"] == undefined ? 1 : params["p"]);

	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/game/ranklist.do",
				data:{t:type},
		        success: function(response) {
		            done(response);
		        }
		    });
		 },
		pageNumber:params["p"],
		pageSize: 20,
	    callback: function(data, pagination) {
			if (typeof (history.pushState) != undefined) {
				var renewURL = location.href.split("?")[0];
				var queryString = "?p="+pagination.pageNumber;
		        history.pushState(null, null, renewURL+queryString);
    		}
			$(".rank-list").empty();
			var html;
			for(var i in data){
				html = "<tr>"
			            +"<td>"+data[i].rank+"</td>"
			            +"<td>"+data[i].userNickname+"</td>"
			            +"<td>"+data[i].score+"</td>"
			            +"<td>"+data[i].clear+"</td>"
			        +"</tr>"
				$(".rank-list").append(html);
			}
	    }
	});
}

$(document).ready(function() {
	getMyRank(0);
	getList(0);

	$("#gameType").on("change",function(){
		var type = $(this).val();
		getMyRank(type);
		getList(type);
	});
});