try{
	console.log('--------------------------------------------------------------------------------');
	console.log('cpr::req wrapper test ['+new Date()+']:');
	console.log('--------------------------------------------------------------------------------');
	var r=new cpr_req();
	r.setRequestHeaders({'hk0':'hv0','hk1':'hv1','Set-Cookie':'asdf=asdf;'});
	console.log(r.getRequestHeaders());
	//r.setRequestUrl('http://httpbin.org/get')
	//r.setRequestUrl('http://localhost:8080/duk?src=./res/cjs/gc.js');//local locks (duk ctx)
	//r.setRequestUrl('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
	//r.setRequestUrl('http://127.0.0.1:8082/');//test for non duk rh
	//r.setRequestUrl('http://127.0.0.1');//test for non duk rh
	//r.setRequestUrl('http://localhost:8082/a.txt');//test for non duk rh
	r.setRequestUrl('http://127.0.0.1:8080/xas');//test for non duk rh
/*	
	console.log(r.getRequestUrl());
	r.setRequestParameters({'pk0':'pv0','pk1':'pv1'});
	console.log(r.getRequestParameters());
	r.setRequestMethod('GET');
	console.log(r.getRequestMethod());
	r.setRequestCookie({'ck0':'cv0','ck1':'cv1'});
	console.log(r.getRequestCookie());
*/	
	r.setRequestTimeout(3000);
	console.log(r.getRequestTimeout());
	if(r.execRequest()){
		console.log(r.getResponseHeaders());
		console.log(r.getResponseBody());
		console.log(r.getResponseCookie());
	}else{
		console.log(r.getResponseErrorMessage());
	};
}catch(e){
	console.error(e);
}
