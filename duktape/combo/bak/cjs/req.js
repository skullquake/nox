try{
	//--------------------------------------------------------------------------------
	//request test
	//--------------------------------------------------------------------------------
	console.log('request');
	console.log(request);
	console.log(request.get('cmd',''));//second is fallback
	console.log(request.getAllVariable());
	console.log(request.hasCookie('foo'));
	console.log(request.getCookie('foo',''));//second is fallback
	console.log(request.getHeaderKeyValue('User-Agent',null));//second is fallback
	console.log(request.getUrl());
	console.log(request.getMethod());
	/*
	if(request.getMethod()=="POST"){
		if(request.getHeaderKeyValue('Content-type','')=="application/json"){
			console.log("application/json POST received");
			try{
				var data=JSON.parse(request.getData());
				console.log("json data parsed");
				Object.keys(data).forEach(function(a,b){
					console.log('----------------------------------------');
					console.log(b+":"+a+":"+data[a]);
				});
			}catch(e){
				console.log("Failed to parse json data");
			}finally{
			}
		}else{
			console.log("Only accept application/json for POST");
		}
	}else{
	}
	console.log(request.getCookie());
	*/
	//request.writeResponse(response);//how to get pointer???
}catch(e){
	writeHttpResponse(
		response,
		e.toString()
	);
}
