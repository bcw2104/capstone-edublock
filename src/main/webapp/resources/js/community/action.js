function sort1(arr,type){
	if(type == 'pop'){
		arr.sort(function(a, b) {
			return b.hits - a.hits;
		});
	}
	else if(type == 'like'){
		arr.sort(function(a, b) {
			return b.like - a.like;
		});
	}
	else{
		arr.sort(function(a, b) {
			return b.regDate - a.regDate;
		});
	}

	return arr;
}

function sort2(arr,type){
	if(type == 'pop'){
		arr.sort(function(a, b) {
			return b.hits - a.hits;
		});
	}
	else{
		arr.sort(function(a, b) {
			return b.postDate - a.postDate;
		});
	}

	return arr;
}

function getParams(){
    var queryString = location.search;
    var array = queryString.substring(1).split('&');
	var ret = {};
    for(var i = 0; i < array.length; i++){
		var temp = array[i].split('=');
		if(temp[0] != '')
			ret[temp[0]]=decodeURI(temp[1]);
	}

    return ret;
}

function paramsToQueryString(params){
    var queryString = "?"
    for(var i in params){
		queryString += i+"="+params[i]+"&";
	}
	queryString = queryString.substring(0,queryString.length-1);
    return queryString;
}

function changeURLParams(queryString){
	var renewURL = location.href.split("?")[0];
    history.pushState(null, null, renewURL+queryString);
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

function getMapList(params){
	if(params["query"] != undefined){
		$("#searchInput").attr("value",decodeURIComponent(params["query"]));
	}

	$('#pagination').empty();
	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/community/maps"+paramsToQueryString(params),
		        success: function(response) {
					response = sort1(response,params["sort"]);
		            done(response);
		        }
		    });
		 },
		pageNumber:(params["p"] == undefined ? 1 : params["p"]),
		pageSize: 20,
	    callback: function(data, pagination) {
			if (typeof (history.pushState) != undefined) {
				params["p"]=pagination.pageNumber;
				changeURLParams(paramsToQueryString(params));
    		}
			$(".map-list").empty();
			var html;
			for(var i in data){
				html = '<div class="map-item mb-5">'
						+'<div class="card" onclick="location.href=\'/game/'+data[i].gameName+'/'+data[i].mapId+'\'">'
							+'<img class="card-img-top" src="/resources/images/game/thumbnail/'+data[i].thumbnail+'" style="width:100%" />'
							+'<div class="card-body">'
								+'<div class="card-text font-weight-bold my-1">'+data[i].mapName+'</div>'
								+'<div class="card-text">'+data[i].authorNickname+'</div>'
								+'<div class="card-text">점수 : '+data[i].mapPoint+'</div>'
								+'<div class="card-text pt-2 text-right">'
									+'<img height="12px" src="/resources/images/icon_hits.png" alt="hits" />'
									+'<span class="font-12 text-secondary ml-1">'+data[i].hits+'</span>'
									+'<img class="ml-4" height="12px" src="/resources/images/icon_like.png" alt="like" />'
									+'<span class="font-12 text-secondary ml-1">'+data[i].like+'</span>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>';

				$(".map-list").append(html);
			}
	    }
	});
}

function getComList(params){
	if(params["query"] != undefined){
		$("#searchInput").attr("value",decodeURIComponent(params["query"]));
	}
	$('#pagination').empty();
	$('#pagination').pagination({
		dataSource: function(done) {
		    $.ajax({
		        type: "get",
		        url: "/community/coms"+paramsToQueryString(params),
		        success: function(response) {
					response = sort2(response,params["sort"]);
		            done(response);
		        }
		    });
		 },
		pageNumber:(params["p"] == undefined ? 1 : params["p"]),
		pageSize: 10,
	    callback: function(data, pagination) {
			if (typeof (history.pushState) != undefined) {
				params["p"]=pagination.pageNumber;
				changeURLParams(paramsToQueryString(params));
    		}
			$(".post-list").empty();
			var html;
			for(var i in data){
				html = "<tr>"
			            +"<td>"+(1+Number(i))+"</td>"
			            +"<td>"
			                +"<a href='/community/com/"+data[i].postId+"'>"+data[i].postTitle+"</a>"
			            +"</td>"
			            +"<td>"+data[i].postAuthorNickname+"</td>"
			            +"<td>"+timestampToDate(data[i].postDate)+"</td>"
			            +"<td>"+data[i].hits+"</td>"
			        +"</tr>"

				$(".post-list").append(html);
			}
	    }
	});
}

function getboardData(params){
	if(params["type"] == undefined || params["type"] == "maps"){
		getMapList(params);
		$("#create").attr("href","/custom/create").text("작품 만들기");
	}
	else{
		getComList(params);
		$("#create").attr("href","/community/com/write").text("글쓰기");
	}
}

$(document).ready(function() {
	var params = getParams();
	getboardData(params);
	$("#"+params["type"]).click();

	$(".board-type").on("click",function(){
		params = [];
		params["type"] = $(this).attr("id");
		changeURLParams(paramsToQueryString(params));
		getboardData(params);
	});

	$(".sort").on("change",function(){
		params["sort"] = $(this).val();
		changeURLParams(paramsToQueryString(params));
		getboardData(params);
	});

	$("#gameType").on("change",function(){
		params["gt"] = $(this).val();
		changeURLParams(paramsToQueryString(params));
		getMapList(params);
	});

	$("#searchBtn").on("click",function(){
		params["query"] = $("#searchInput").val();
		changeURLParams(paramsToQueryString(params));
		getboardData(params);
	});
});