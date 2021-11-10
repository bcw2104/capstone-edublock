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
	var boardType = $("#boardType").val();
	var params = getParams();
	var query = (params["query"] == undefined ? "" : "?query="+params["query"]);
	params["p"] = (params["p"] == undefined ? 1 : params["p"]);

	if(query != "" ){
		$("#searchInput").attr("value",decodeURIComponent(params["query"]));
	}

	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/customer/"+boardType+"/list.do"+query,
		        success: function(response) {
		            done(response);
		        }
		    });
		 },
		pageNumber:params["p"],
		pageSize: 8,
	    callback: function(data, pagination) {
			if (typeof (history.pushState) != undefined) {
				var renewURL = location.href.split("?")[0];
				var queryString = (query=="" ? "?" : query+"&")+"p="+pagination.pageNumber;
		        history.pushState(null, null, renewURL+queryString);
    		}
			$(".post-list").empty();
			var html;
			for(var i in data){
				html = "<tr>"
			            +"<td>"+(1+Number(i))+"</td>"
			            +"<td>"
			                +"<a href='/customer/"+boardType+"/"+data[i].postId+"'>"+data[i].postTitle+"</a>"
			            +"</td>"
			            +"<td>"+data[i].postAuthorNickname+"</td>"
			            +"<td>"+timestampToDate(data[i].postDate)+"</td>"
			            +"<td>"+data[i].hits+"</td>"
			        +"</tr>"

				$(".post-list").append(html);
			}
	    }
	});
});