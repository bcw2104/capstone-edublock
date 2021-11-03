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

$(document).ready(function() {
	var params = getParams();
	params["p"] = (params["p"] == undefined ? 1 : params["p"]);

	 $.ajax({
        type: "get",
        url: "/game/myrank.do",
        success: function(data) {
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

	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/game/ranklist.do",
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
});